import moduleResolves from 'build/chunk'

const outputDir = 'dist'

export default {
  outDir: outputDir,
  rollupOptions: {
    output: {
      manualChunks(id) {
        for (let i = 0; i < moduleResolves.length; i += 1) {
          const pathExecutor = moduleResolves[i]
          const patternResult = pathExecutor.pattern.exec(id)
          if (patternResult) {
            if (pathExecutor.executor instanceof Function) {
              return pathExecutor.executor(id, patternResult)
            }
            return pathExecutor.executor
          }
        }
        return undefined
      }
    }
  }
}
