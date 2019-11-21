/* eslint @typescript-eslint/no-var-requires: off */

const ts = require('typescript');
const prettier = require('prettier/standalone');
const parserTypescript = require('prettier/parser-typescript');

const stripTypes = (origCode) => {
  const modifiedCode = origCode.replace(/\n\n/g, '\n//-\n');
  const result = ts.transpileModule(modifiedCode, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2018,
      module: ts.ModuleKind.ES2018,
      jsx: ts.JsxEmit.Preserve,
    },
  });
  const code = result.outputText;
  return code.replace(/\r/g, '').replace(/\n\/\/-\n/g, '\n\n');
};

const format = (code) => {
  return prettier.format(code, {
    parser: 'typescript',
    plugins: [parserTypescript],
    singleQuote: true,
    trailingComma: 'all',
  });
};

const transformNode = (node) => {
  const jscode = format(stripTypes(node.value));
  const tscode = format(node.value);
  node.meta = `${node.meta} jslen=${jscode.length}`;
  node.value = jscode + tscode;
};

module.exports = () => {
  const transformer = (node) => {
    if (node.type === 'code' && node.meta === 'ts2js') {
      transformNode(node);
    } else if (Array.isArray(node.children)) {
      node.children.forEach(transformer);
    }
  };
  return transformer;
};
