module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true,
    jest: true,
  },
  globals: {
    def: 'readonly',
    get: 'readonly',
    subject: 'readonly',
  },
  rules: {
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
  },
};
