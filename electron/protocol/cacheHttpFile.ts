import { ProtocolRequest, ProtocolResponse } from 'electron'
import fs, { createReadStream } from 'fs'
import http from 'http'
import https from 'https'
import { createHash } from 'crypto'
import path from 'path'
import { PassThrough } from 'stream'
import zlib, { gunzip, gunzipSync, createGunzip } from 'zlib'
import { ProtocolType } from './register'

const handle = (request: ProtocolRequest, callback: (response: NodeJS.ReadableStream | ProtocolResponse) => void) => {
  const urlReg = /^cache:\/\/auto\?path=(.*)$/
  const urlMatch = urlReg.exec(request.url)
  if (!urlMatch) {
    return
  }
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
  const folder = 'D:\\tmp\\cache'
  const filePath = path.join(folder, fileName)
  if (fs.existsSync(filePath)) {
    console.info('read cache file ============= ')
    callback(fs.createReadStream(filePath))
  } else {
    console.info('read remote file ===========')
    const tempFile = path.join(folder, `tmp_${fileName}`)
    const outputStream = fs.createWriteStream(tempFile)

    const sender = sendUrl.indexOf('https') === 0 ? https : http
    https.get(
      sendUrl,
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
          ;(isZip ? res.pipe(createGunzip()) : res).pipe(outputStream).on('close', () => {
            fs.renameSync(tempFile, filePath)
            callback(createReadStream(filePath))
          })
        } else {
          callback(res)
        }
      }
    )

    // callback(result)
  }
}

const protocol: ProtocolType = {
  scheme: 'cache',
  handle,
  type: 'stream'
}

export default protocol
