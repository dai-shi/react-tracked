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

const rand = Date.now();

const transformNode = (node) => {
  const jscode = format(stripTypes(node.value));
  const tscode = format(node.value);
  node.children = [{
    type: 'jsx',
    value: `<Tabs${rand}
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'TypeScript', value: 'ts', },
  ]}
>
<TabItem${rand} value="js">`,
  }, {
    type: node.type,
    lang: 'javascript',
    value: jscode,
  }, {
    type: 'jsx',
    value: `</TabItem${rand}>
<TabItem${rand} value="ts">`,
  }, {
    type: node.type,
    lang: 'typescript',
    value: tscode,
  }, {
    type: 'jsx',
    value: `</TabItem${rand}>
</Tabs${rand}>`,
  }];
  node.type = 'element';
  delete node.lang;
  delete node.meta;
  delete node.value;
};

module.exports = () => {
  let transformed = false;
  const transformer = (node) => {
    if (node.type === 'code' && node.meta === 'ts2js') {
      transformNode(node);
      transformed = true;
    } else if (Array.isArray(node.children)) {
      node.children.forEach(transformer);
    }
    if (node.type === 'root' && transformed) {
      node.children.unshift({
        type: 'import',
        value: `import Tabs${rand} from '@theme/Tabs';
import TabItem${rand} from '@theme/TabItem';`,
      });
    }
  };
  return transformer;
};
