interface ModuleResolve {
  pattern: RegExp
  executor: ((id: string, regResult: RegExpExecArray) => string) | string
}

const moduleResolves: ModuleResolve[] = []

// vue 独立输出文件
moduleResolves.push({
  pattern: /\/node_modules\/vue/,
  executor: 'vue'
})

const elementPlusComponentReg = /element-plus\/[^/]*\/components\/([^/]*)/
// element-plus
moduleResolves.push({
  pattern: /\/node_modules\/element-plus/,
  executor(id) {
    if (id.indexOf('element-plus/es/component') > -1) {
      const componentName = elementPlusComponentReg.exec(id)?.[1]
      return `element-plus/${componentName}`
    }
    return 'element-plus/index'
  }
})

// vendor 需放在最后
moduleResolves.push({
  pattern: /\/node_modules\//,
  executor: 'vendor'
})

// 放在最后
// 异步引入组件配置信息，src/module/check/a.vue => module/check
moduleResolves.push({
  pattern: /\/src\/([^/])*\/*/,
  executor(id) {
    const paths = id.split('/')
    const result: string[] = []
    let check = false
    for (let i = 0; i < paths.length; i += 1) {
      const pathItem = paths[i]
      if (check) {
        result.push(pathItem)
      }
      if (pathItem === 'src') {
        check = true
      }
    }
    result.pop()
    return result.join('/')
  }
})

export default moduleResolves
