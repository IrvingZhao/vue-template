import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'
import deepmerge from 'deepmerge'

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
  conversationWindow.loadURL(`${basePath}${path}`)
  return conversationWindow
}

export default initWindow
