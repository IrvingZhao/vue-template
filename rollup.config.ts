// 编译 electron index 和 preload 使用
import commonjs from '@rollup/plugin-commonjs'
import typescriptPlugin from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import copy from 'rollup-plugin-copy'

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
      { src: 'env', dest: 'dist-electron' },
      { src: 'electron/devtools', dest: 'dist-electron' }
    ]
  })
]

const external = ['electron', 'child_process', 'fs', 'path', 'url', 'module', 'os']

export default [
  {
    input: 'electron/index.ts',
    output: {
      file: 'dist-electron/index.js',
      format: 'cjs'
    },
    plugins,
    external
  },
  {
    input: 'electron/preload.ts',
    output: {
      file: 'dist-electron/preload.js',
      format: 'cjs'
    },
    plugins,
    external
  }
]
