/* eslint react/jsx-props-no-spreading: off */
/* eslint import/no-unresolved: warn */

import React, { useState } from 'react';

// import CodeBlock from '@docusaurus/theme-classic/src/theme/CodeBlock';
import CodeBlock from '../../../../../node_modules/@docusaurus/theme-classic/src/theme/CodeBlock';

const style = on => ({
  border: 0,
  margin: 0,
  padding: 10,
  backgroundColor: on ? 'rgb(41, 45, 62)' : 'inherit',
  color: on ? 'lightgray' : 'dimgray',
  cursor: 'pointer',
});

export default (props) => {
  const { ts2js, jslen, children } = props;
  const [lang, setLang] = useState('javascript');
  if (ts2js) {
    const code = lang === 'javascript' ? children.slice(0, jslen) : children.slice(jslen);
    return (
      <div>
        <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.1)' }}>
          <button type="button" style={style(lang === 'javascript')} onClick={() => setLang('javascript')}>JavaScript</button>
          <button type="button" style={style(lang === 'typescript')} onClick={() => setLang('typescript')}>TypeScript</button>
        </div>
        <CodeBlock {...props} className={`language-${lang}`}>{code}</CodeBlock>
      </div>
    );
  }
  return <CodeBlock {...props} />;
};
