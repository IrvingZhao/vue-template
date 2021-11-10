import { BrowserWindowConstructorOptions } from 'electron'
import MainWindowInit from './mainWindow'

export default function initWindow(basePath: string, baseOption: BrowserWindowConstructorOptions) {
  MainWindowInit(basePath, baseOption)
}
