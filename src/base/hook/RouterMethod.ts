import { useRouter, useRoute, RouteLocationRaw, LocationAsPath, RouteQueryAndHash, RouteLocationOptions, NavigationFailure } from 'vue-router'

type RouterPromiseResult = NavigationFailure | void | undefined
type RouterTarget = string | (LocationAsPath & RouteQueryAndHash & RouteLocationOptions)

const routerAppendTo = (to: RouterTarget): Promise<RouterPromiseResult> => {
  const current = useRoute()
  const router = useRouter()
  let target: RouteLocationRaw
  if (typeof to === 'object') {
    const toPath = to.path
    const targetPath = current.path + (toPath.startsWith('/') ? '' : '/') + toPath
    target = {
      ...to,
      path: targetPath
    }
  } else {
    target = current.path + (to.startsWith('/') ? '' : '/') + to
  }
  return router.push(target)
}

const routerPushTo = (to: RouterTarget): Promise<RouterPromiseResult> => {
  const router = useRouter()
  return router.push(to)
}

const replaceTo = (to: RouterTarget): Promise<RouterPromiseResult> => {
  const router = useRouter()
  let target: RouteLocationRaw
  if (typeof to === 'object') {
    target = to
  } else {
    target = {
      path: to,
      replace: true
    }
  }
  return router.push(target)
}

const routerGoBack = () => {
  const router = useRouter()
  router.go(-1)
}

export default function useRouterMethod() {
  return {
    routerAppendTo,
    routerPushTo,
    replaceTo,
    routerGoBack
  }
}
