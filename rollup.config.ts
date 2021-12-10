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

const entryPath = [
  {
    path: ''
  },
  {
    path: 'worker',
    exclude: /index.ts/
  }
]

export default entryPath
  .map((item) => {
    return {
      read: item,
      files: readdirSync(resolve(__dirname, sourcePath, item.path), { withFileTypes: true })
    }
  })
  .map((item) => {
    const basePath = item.read.path && `${item.read.path}/`
    return item.files
      .filter((dir) => dir.isFile() && !item.read.exclude?.test(dir.name))
      .map((dir) => dir.name)
      .map((fileName) => {
        const output = `${fileName.substring(0, fileName.lastIndexOf('.'))}.js`
        return {
          input: `${sourcePath}/${basePath}${fileName}`,
          output: {
            file: `${distPath}/${basePath}${output}`,
            format: 'cjs'
          },
          plugins,
          external
        }
      })
  })
  .flat()
