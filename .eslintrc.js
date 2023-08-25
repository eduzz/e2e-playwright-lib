module.exports = {
  extends: ['@eduzz/eslint-config'],
  plugins: ['sonarjs', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'max-lines': ['error', 5000],
    'import/order': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['block-like', 'function'], next: '*' },
      { blankLine: 'always', prev: ['*'], next: ['block-like', 'function'] },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      {
        blankLine: 'any',
        prev: ['export', 'import'],
        next: ['export', 'import']
      },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['export'] }
    ]
  },
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^@playwright', '^@?\\w'],
              // Internal packages.
              ['^(@(pages|data))(/.*|$)'],
              ['^(@(helpers))(/.*|$)'],
              ['^(@)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$']
            ]
          }
        ]
      }
    }
  ]
}
