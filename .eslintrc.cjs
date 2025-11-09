module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2023: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier', // 포매팅 충돌 방지를 위해
  ],
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off'
  }
};
