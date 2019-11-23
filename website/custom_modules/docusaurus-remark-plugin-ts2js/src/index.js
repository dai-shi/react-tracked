/* eslint @typescript-eslint/no-var-requires: off */

const ts = require('typescript');
const prettier = require('prettier/standalone');
const parserTypescript = require('prettier/parser-typescript');

const stripTypes = (origCode) => {
  const modifiedCode = origCode.replace(/\n\n/g, '\n//--EMPTYLINE--\n');
  const result = ts.transpileModule(modifiedCode, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2018,
      module: ts.ModuleKind.ES2018,
      jsx: ts.JsxEmit.Preserve,
    },
  });
  const code = result.outputText;
  return code.replace(/\r/g, '').replace(/\n\/\/--EMPTYLINE--\n/g, '\n\n');
};

const format = (code) => {
  return prettier.format(code, {
    parser: 'typescript',
    plugins: [parserTypescript],
    singleQuote: true,
    trailingComma: 'all',
  });
};

const uniqueId = 'UsedByRemarkPluginTs2Js'; // should this be configurable? maybe unnecessary.

const nodeForImport = {
  type: 'import',
  value: `import Tabs${uniqueId} from '@theme/Tabs';
import TabItem${uniqueId} from '@theme/TabItem';`,
};

const matchNode = node => node.type === 'code' && node.meta === 'ts2js';

// this returns a list to replace the node
const transformNode = (node) => {
  const jscode = format(stripTypes(node.value));
  const tscode = format(node.value);
  return [{
    type: 'jsx',
    value: `<Tabs${uniqueId}
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'TypeScript', value: 'ts', },
  ]}
>
<TabItem${uniqueId} value="js">`,
  }, {
    type: node.type,
    lang: 'javascript',
    value: jscode,
  }, {
    type: 'jsx',
    value: `</TabItem${uniqueId}>
<TabItem${uniqueId} value="ts">`,
  }, {
    type: node.type,
    lang: 'typescript',
    value: tscode,
  }, {
    type: 'jsx',
    value: `</TabItem${uniqueId}>
</Tabs${uniqueId}>`,
  }];
};

module.exports = () => {
  let transformed = false;
  const transformer = (node) => {
    if (matchNode(node)) {
      transformed = true;
      return transformNode(node);
    }
    if (Array.isArray(node.children)) {
      let index = 0;
      while (index < node.children.length) {
        const result = transformer(node.children[index]);
        if (result) {
          node.children.splice(index, 1, ...result);
          index += result.length;
        } else {
          index += 1;
        }
      }
    }
    if (node.type === 'root' && transformed) {
      node.children.unshift(nodeForImport);
    }
    return null;
  };
  return transformer;
};
