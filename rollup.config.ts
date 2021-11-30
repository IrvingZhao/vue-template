import { readdirSync } from 'fs'
import { resolve } from 'path'
import commonjs from '@rollup/plugin-commonjs'
import typescriptPlugin from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'

const sourcePath = 'electron' // 源码目录
const distPath = 'dist-electron' // 编译后目录
const external = ['electron'] // 不引入编译，直接改为require的import

const plugins = [
  typescriptPlugin({
    tsconfig: false,
    include: ['electron/**/*.ts'],
    target: 'esnext',
    module: 'esnext',
    strict: true,
    importHelpers: true,
    moduleResolution: 'node',
    experimentalDecorators: true,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    sourceMap: false,
    baseUrl: 'node_modules',
    noImplicitAny: false,
    resolveJsonModule: true
  }),
  commonjs(),
  nodeResolve(),
  copy({
    targets: [
      { src: 'env', dest: distPath },
      { src: 'electron/devtools', dest: distPath }
    ]
  })
]

const workerPath = `${sourcePath}/worker`
const workerDir = resolve(__dirname, workerPath)
const workerFiles = readdirSync(workerDir)
const workerBuildConfig = workerFiles
  .filter((item) => item !== 'index.ts')
  .map((item) => {
    return {
      input: `${workerPath}/${item}`,
      output: {
        file: `${distPath}/worker/${item}.js`,
        format: 'cjs'
      },
      plugins,
      external
    }
  })

export default [
  ...workerBuildConfig,
  {
    input: `${sourcePath}/index.ts`,
    output: {
      file: `${distPath}/index.js`,
      format: 'cjs'
    },
    plugins,
    external
  },
  {
    input: `${sourcePath}/preload.ts`,
    output: {
      file: `${distPath}/preload.js`,
      format: 'cjs'
    },
    plugins,
    external
  }
]
