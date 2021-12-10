import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import deepmerge from 'deepmerge'
import { resolve } from 'path'

const config: BrowserWindowConstructorOptions = {
  title: 'Beem',
  width: 1200,
  height: 723,
  minWidth: 960,
  minHeight: 640
}

const path = '/index.html'

function initWindow(basePath, baseOption: BrowserWindowConstructorOptions): BrowserWindow {
  const option = deepmerge(baseOption, config)
  const conversationWindow = new BrowserWindow(option)

  conversationWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url === 'about:blank') {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          frame: false,
          fullscreenable: false,
          backgroundColor: 'black',
          webPreferences: {
            preload: resolve(__dirname, 'preload2.js')
          }
        }
      }
    }
    return { action: 'deny' }
  })

  conversationWindow.webContents.addListener('did-create-window', (win, detail) => {
    console.info('did-create-window', detail.options.webPreferences?.preload)
  })

  conversationWindow.loadURL(`${basePath}${path}`)

  return conversationWindow
}

export default initWindow
