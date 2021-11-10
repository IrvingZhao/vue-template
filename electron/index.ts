import path from 'path'
import { app, BrowserWindowConstructorOptions } from 'electron'
import getEnv from './config/env'
import initWindows from './windows'

const env = getEnv()

app.setName('VueTemplate')

let basePath: string
if (env?.ENV_PROFILE === 'development') {
  basePath = `http://localhost:3000`
} else {
  basePath = path.resolve(__dirname, '../', 'dist')
}

const electronBaseOption: BrowserWindowConstructorOptions = {
  titleBarStyle: 'hidden',
  frame: false,
  show: true,
  webPreferences: {
    devTools: true,
    preload: path.resolve(__dirname, 'preload.js')
  }
}

app.whenReady().then(() => {
  initWindows(basePath, electronBaseOption)
  // session.defaultSession.loadExtension(path.resolve(__dirname, './devtools'), { allowFileAccess: true })
  // registerUWFile()
})
