/* eslint react/jsx-props-no-spreading: off */

import React, { useState } from 'react';
import * as ts from 'typescript';
import prettier from 'prettier/standalone';
import parserTypescript from 'prettier/parser-typescript';

// import CodeBlock from '@docusaurus/theme-classic/src/theme/CodeBlock';
import CodeBlock from '../../../../../node_modules/@docusaurus/theme-classic/src/theme/CodeBlock';

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
    tailingComma: 'all',
  });
};

const style = on => ({
  border: 0,
  padding: 10,
  backgroundColor: on ? 'rgb(1, 22, 39)' : 'inherit',
  color: on ? 'lightgray' : 'dimgray',
  cursor: 'pointer',
});

export default (props) => {
  const { ts2js, children } = props;
  const [lang, setLang] = useState('javascript');
  if (ts2js) {
    const code = format(lang === 'javascript' ? stripTypes(children) : children);
    return (
      <div>
        <div>
          <button type="button" style={style(lang === 'javascript')} onClick={() => setLang('javascript')}>JavaScript</button>
          <button type="button" style={style(lang === 'typescript')} onClick={() => setLang('typescript')}>TypeScript</button>
        </div>
        <CodeBlock {...props} className={`language-${lang}`}>{code}</CodeBlock>
      </div>
    );
  }
  return <CodeBlock {...props} />;
};
