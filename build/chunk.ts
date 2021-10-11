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

moduleResolves.push({
  pattern: /\/node_modules\//,
  executor: 'vendor'
})

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
