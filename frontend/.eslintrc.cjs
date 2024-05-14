module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'node_modules',
    'jest.config.js',
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'tsconfig.json',
    'tsconfig.eslint.json',
    'postcss.config.js',
    'tailwind.config.js',
    'vite.config.js',
    'vercel.json',
    'components.json',
    '.prettierrc',
  ],

  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.3.1' } },
  plugins: ['react-refresh'],
  rules: {
    "linebreak-style": 0,
    eqeqeq: ['error', 'always'],
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    
    "react/prop-types": 0,
    "react/jsx-uses-vars": "error",
    "no-unused-vars": "warn",

  }
}
