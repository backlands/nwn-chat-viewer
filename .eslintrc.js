module.exports = {
  extends: '@vizworx/eslint-config-react',
  env: {
    jest: true,
  },
  rules: {
    'react/prop-types': 0,
    'no-param-reassign': ['error', { props: false }],
  },
  overrides: [
    {
      files: [
        'documentation/**',
        '**/spec.js',
        '**/spec.jsx',
        '**/testing/**',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
      },
    },
  ],
};
