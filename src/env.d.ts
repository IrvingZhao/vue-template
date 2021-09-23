/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_PROFILE: string
  VITE_I18N_LOCALE: string
  VITE_I18N_FAIL_LOCALE: string
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
