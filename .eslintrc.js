module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state', 'config', 'item']
      }
    ],
    'no-unused-vars': ['off', { args: 'after-used' }],
    '@typescript-eslint/no-unused-vars': ['off', { args: 'after-used' }],
    '@typescript-eslint/no-unused-vars-experimental': ['error', { ignoreArgsIfArgsAfterAreUsed: true }],
    'no-bitwise': ['error', { int32Hint: true }]
  },
  settings: {},
  globals: {
    EventListenerOrEventListenerObject: true,
    StoreRootState: true
  }
}
