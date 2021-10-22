/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_PROFILE: string
  VITE_I18N_LOCALE: string
  VITE_I18N_FAIL_LOCALE: string
}

interface StoreRootState {}

declare type ComponentColor = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'text' | 'orange' | 'cyan'
declare type ComponentSize = 'large' | 'medium' | 'small' | 'mini' | 'tiny'

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
