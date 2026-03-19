module.exports = {
  '{backend,shared}/src/**/*.ts': ['eslint --fix', 'prettier --write'],
  'backend/test/**/*.ts': ['eslint --fix', 'prettier --write'],
  'mobile/**/*.{ts,tsx}': ['prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
