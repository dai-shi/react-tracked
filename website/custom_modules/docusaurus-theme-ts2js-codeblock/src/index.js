/* eslint @typescript-eslint/no-var-requires: off */

const path = require('path');

module.exports = () => ({
  name: 'docusaurus-theme-ts2js-codeblock',
  getThemePath: () => path.resolve(__dirname, 'theme'),
});
