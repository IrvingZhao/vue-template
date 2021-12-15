import { ProtocolRequest, ProtocolResponse } from 'electron'
import fs, { createReadStream } from 'fs'
import http from 'http'
import https from 'https'
import { createHash } from 'crypto'
import path from 'path'
import { createGunzip } from 'zlib'
import { ProtocolType } from './register'

const retryAction = <T>(maxTimes: number, interval: number, method: (...args) => Promise<T>, ...args): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    if (!method) {
      reject()
    } else {
      const count = 0
      const exec = () => {
        if (maxTimes > -1 && count > maxTimes) {
          return
        }
        method(...args)
          .then(resolve)
          .catch(() => {
            setTimeout(exec, interval)
          })
      }
      exec()
    }
  })
}

const sendRequest = (fileName: string, savePath: string, remoteUrl: string): Promise<void | http.IncomingMessage> => {
  return new Promise((resolve, reject) => {
    const { get } = remoteUrl.indexOf('https') === 0 ? https : http
    const req = get(
      remoteUrl,
      {
        headers: {
          accept: '*/*',
          'accept-charset': 'utf-8',
          'accept-encoding': 'gzip',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36 Edg/93.0.961.52 WhatsApp/2 Twitterbot'
        }
      },
      (res) => {
        if (res.statusCode === 200) {
          const isZip = res.headers['content-encoding'] === 'gzip'
          const tempFile = path.join(savePath, `tmp_${fileName}`)
          const cacheFile = path.join(savePath, fileName)
          const outputStream = fs.createWriteStream(tempFile)
          const reader = isZip ? res.pipe(createGunzip()) : res
          reader.pipe(outputStream).on('close', () => {
            fs.renameSync(tempFile, cacheFile)
            resolve()
          })
        } else {
          resolve(res)
        }
        res.on('error', reject)
      }
    )
    req.on('error', reject)
  })
}

const requestCache = {}

const handle = (request: ProtocolRequest, callback: (response: NodeJS.ReadableStream | ProtocolResponse) => void) => {
  const urlReg = /^cache:\/\/auto\?path=(.*)$/
  const urlMatch = urlReg.exec(request.url)
  if (!urlMatch) {
    return
  }
  console.info(request.headers)
  const md5 = createHash('md5')
  const sha512 = createHash('sha512')

  const sendUrl = urlMatch[1]

  md5.update(sendUrl)
  sha512.update(sendUrl)
  const sendUrlMd5 = md5.digest('hex')
  const sendUrlSha512 = sha512.digest('hex')

  const lastPointIndex = sendUrl.lastIndexOf('.')
  let suffix = ''
  if (lastPointIndex > 0) {
    suffix = sendUrl.substring(lastPointIndex + 1)
  }
  const fileName = `${sendUrlMd5}-${sendUrlSha512}.${suffix}`
  const savePath = 'D:\\tmp\\cache'
  const filePath = path.join(savePath, fileName)
  if (fs.existsSync(filePath)) {
    console.info('read cache file ============= ')
    callback(fs.createReadStream(filePath))
  } else {
    if (requestCache[fileName]) {
      console.info('add cache === ', fileName)
      requestCache[fileName].push(callback)
      return
    }
    console.info('create cache ==== ', fileName)
    requestCache[fileName] = [callback]

    retryAction(-1, 5000, sendRequest, fileName, savePath, sendUrl)
      .then((data) => {
        const tmp = requestCache[fileName]
        requestCache[fileName] = null
        console.info('execute callback === ', tmp.length)
        tmp.forEach((item) => {
          console.info('execute callback item ===========')
          const callbackData = data || createReadStream(filePath)
          item(callbackData)
        })
      })
      .catch((e) => undefined)
  }
}

const protocol: ProtocolType = {
  scheme: 'cache',
  handle,
  type: 'stream'
}

export default protocol
