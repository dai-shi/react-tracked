"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[823],{8860:(e,t,n)=>{n.d(t,{xA:()=>c,yg:()=>f});var a=n(7953);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=u(n),p=r,f=m["".concat(l,".").concat(p)]||m[p]||d[p]||s;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=p;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[m]="string"==typeof e?e:r,o[1]=i;for(var u=2;u<s;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},9800:(e,t,n)=>{n.d(t,{A:()=>o});var a=n(7953),r=n(8835);const s={tabItem:"tabItem_lILU"};function o(e){let{children:t,hidden:n,className:o}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.A)(s.tabItem,o),hidden:n},t)}},9259:(e,t,n)=>{n.d(t,{A:()=>S});var a=n(3911),r=n(7953),s=n(8835),o=n(2427),i=n(5926),l=n(4076),u=n(1781),c=n(3519);function m(e){return function(e){var t,n;return null!=(t=null==(n=r.Children.map(e,(e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:n.filter(Boolean))?t:[]}(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:r}}=e;return{value:t,label:n,attributes:a,default:r}}))}function d(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=null!=t?t:m(n);return function(e){const t=(0,u.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((e=>e.value)).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const a=(0,i.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=n?n:null}({queryString:t,groupId:n});return[(0,l.aZ)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(a.location.search);t.set(s,e),a.replace({...a.location,search:t.toString()})}),[s,a])]}function N(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,s=d(e),[o,i]=(0,r.useState)((()=>function(e){var t;let{defaultValue:n,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:a}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+n+'" but none of its children has the corresponding value. Available values are: '+a.map((e=>e.value)).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return n}const r=null!=(t=a.find((e=>e.default)))?t:a[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[l,u]=f({queryString:n,groupId:a}),[m,N]=function(e){let{groupId:t}=e;const n=function(e){return e?"docusaurus.tab."+e:null}(t),[a,s]=(0,c.Dv)(n);return[a,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:a}),v=(()=>{const e=null!=l?l:m;return p({value:e,tabValues:s})?e:null})();(0,r.useLayoutEffect)((()=>{v&&i(v)}),[v]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!p({value:e,tabValues:s}))throw new Error("Can't select invalid tab value="+e);i(e),u(e),N(e)}),[u,N,s]),tabValues:s}}var v=n(126);const y={tabList:"tabList_DfGC",tabItem:"tabItem_dqXl"};function h(e){let{className:t,block:n,selectedValue:i,selectValue:l,tabValues:u}=e;const c=[],{blockElementScrollPositionUntilNextRender:m}=(0,o.a_)(),d=e=>{const t=e.currentTarget,n=c.indexOf(t),a=u[n].value;a!==i&&(m(t),l(a))},p=e=>{var t;let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{var a;const t=c.indexOf(e.currentTarget)+1;n=null!=(a=c[t])?a:c[0];break}case"ArrowLeft":{var r;const t=c.indexOf(e.currentTarget)-1;n=null!=(r=c[t])?r:c[c.length-1];break}}null==(t=n)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":n},t)},u.map((e=>{let{value:t,label:n,attributes:o}=e;return r.createElement("li",(0,a.A)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:e=>c.push(e),onKeyDown:p,onClick:d},o,{className:(0,s.A)("tabs__item",y.tabItem,null==o?void 0:o.className,{"tabs__item--active":i===t})}),null!=n?n:t)})))}function g(e){let{lazy:t,children:n,selectedValue:a}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a}))))}function b(e){const t=N(e);return r.createElement("div",{className:(0,s.A)("tabs-container",y.tabList)},r.createElement(h,(0,a.A)({},e,t)),r.createElement(g,(0,a.A)({},e,t)))}function S(e){const t=(0,v.A)();return r.createElement(b,(0,a.A)({key:String(t)},e))}},6240:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>f,frontMatter:()=>i,metadata:()=>u,toc:()=>m});var a=n(3911),r=(n(7953),n(8860)),s=n(9259),o=n(9800);const i={id:"tutorial-redux-01",title:"Tutorial with react-redux - Person Name",sidebar_label:"Person Name (redux)"},l=void 0,u={unversionedId:"tutorial-redux-01",id:"tutorial-redux-01",title:"Tutorial with react-redux - Person Name",description:"This tutorial shows tiny example code with react-redux.",source:"@site/docs/tutorial-redux-01.md",sourceDirName:".",slug:"/tutorial-redux-01",permalink:"/docs/tutorial-redux-01",draft:!1,tags:[],version:"current",frontMatter:{id:"tutorial-redux-01",title:"Tutorial with react-redux - Person Name",sidebar_label:"Person Name (redux)"},sidebar:"docs",previous:{title:"ToDo App (async)",permalink:"/docs/tutorial-04"},next:{title:"Person Name (zustand)",permalink:"/docs/tutorial-zustand-01"}},c={},m=[{value:"With useSelector",id:"with-useselector",level:2},{value:"With useTrackedSelector",id:"with-usetrackedselector",level:2}],d={toc:m},p="wrapper";function f(e){let{components:t,...n}=e;return(0,r.yg)(p,(0,a.A)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("p",null,"This tutorial shows tiny example code with react-redux.\nThere are two variants.\nThe first one is with useSelector.\nThe second one is with useTrackedSelector."),(0,r.yg)("h2",{id:"with-useselector"},"With useSelector"),(0,r.yg)(s.A,{defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"TabsUsedByRemarkPluginTs2Js"},(0,r.yg)(o.A,{value:"js",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-javascript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport { createStore } from 'redux';\nimport { Provider, useDispatch, useSelector } from 'react-redux';\n\nconst initialState = {\n  firstName: 'React',\n  lastName: 'Tracked',\n};\n\nconst reducer = (state = initialState, action) => {\n  switch (action.type) {\n    case 'setFirstName':\n      return { ...state, firstName: action.firstName };\n    case 'setLastName':\n      return { ...state, lastName: action.lastName };\n    default:\n      return state;\n  }\n};\n\nconst store = createStore(reducer);\n\nconst EditPerson = () => {\n  const dispatch = useDispatch();\n  const firstName = useSelector((state) => state.firstName);\n  const lastName = useSelector((state) => state.lastName);\n  const setFirstName = (e) => {\n    const firstName = e.target.value;\n    dispatch({ type: 'setFirstName', firstName });\n  };\n  const setLastName = (e) => {\n    const lastName = e.target.value;\n    dispatch({ type: 'setLastName', lastName });\n  };\n  return (\n    <div>\n      <div>\n        First Name:\n        <input value={firstName} onChange={setFirstName} />\n      </div>\n      <div>\n        Last Name:\n        <input value={lastName} onChange={setLastName} />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  const firstName = useSelector((state) => state.firstName);\n  const lastName = useSelector((state) =>\n    onlyFirstName ? null : state.lastName,\n  );\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {firstName}</div>\n      ) : (\n        <div>\n          Full Name: {firstName} {lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <Provider store={store}>\n      <EditPerson />\n      <ShowPerson />\n    </Provider>\n  );\n};\n\nexport default App;\n\n"))),(0,r.yg)(o.A,{value:"ts",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport { createStore } from 'redux';\nimport { Provider, useDispatch, useSelector } from 'react-redux';\n\nconst initialState = {\n  firstName: 'React',\n  lastName: 'Tracked',\n};\n\ntype State = typeof initialState;\n\ntype Action =\n  | { type: 'setFirstName'; firstName: string }\n  | { type: 'setLastName'; lastName: string };\n\nconst reducer = (state = initialState, action: Action) => {\n  switch (action.type) {\n    case 'setFirstName':\n      return { ...state, firstName: action.firstName };\n    case 'setLastName':\n      return { ...state, lastName: action.lastName };\n    default:\n      return state;\n  }\n};\n\nconst store = createStore(reducer);\n\nconst EditPerson = () => {\n  const dispatch = useDispatch();\n  const firstName = useSelector((state: State) => state.firstName);\n  const lastName = useSelector((state: State) => state.lastName);\n  const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {\n    const firstName = e.target.value;\n    dispatch({ type: 'setFirstName', firstName });\n  };\n  const setLastName = (e: React.ChangeEvent<HTMLInputElement>) => {\n    const lastName = e.target.value;\n    dispatch({ type: 'setLastName', lastName });\n  };\n  return (\n    <div>\n      <div>\n        First Name:\n        <input value={firstName} onChange={setFirstName} />\n      </div>\n      <div>\n        Last Name:\n        <input value={lastName} onChange={setLastName} />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  const firstName = useSelector((state: State) => state.firstName);\n  const lastName = useSelector((state: State) =>\n    onlyFirstName ? null : state.lastName,\n  );\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {firstName}</div>\n      ) : (\n        <div>\n          Full Name: {firstName} {lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <Provider store={store}>\n      <EditPerson />\n      <ShowPerson />\n    </Provider>\n  );\n};\n\nexport default App;\n\n")))),(0,r.yg)("p",null,"It's a bit tricky to make a selector conditional."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://codesandbox.io/s/react-typescript-forked-r9kw1"},"CodeSandbox")),(0,r.yg)("h2",{id:"with-usetrackedselector"},"With useTrackedSelector"),(0,r.yg)(s.A,{defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"TabsUsedByRemarkPluginTs2Js"},(0,r.yg)(o.A,{value:"js",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-javascript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport { createStore } from 'redux';\nimport { Provider, useDispatch, useSelector } from 'react-redux';\nimport { createTrackedSelector } from 'react-tracked';\n\nconst initialState = {\n  firstName: 'React',\n  lastName: 'Tracked',\n};\n\nconst reducer = (state = initialState, action) => {\n  switch (action.type) {\n    case 'setFirstName':\n      return { ...state, firstName: action.firstName };\n    case 'setLastName':\n      return { ...state, lastName: action.lastName };\n    default:\n      return state;\n  }\n};\n\nconst store = createStore(reducer);\n\nconst useTrackedSelector = createTrackedSelector(useSelector);\n\nconst EditPerson = () => {\n  const dispatch = useDispatch();\n  const state = useTrackedSelector();\n  const setFirstName = (e) => {\n    const firstName = e.target.value;\n    dispatch({ type: 'setFirstName', firstName });\n  };\n  const setLastName = (e) => {\n    const lastName = e.target.value;\n    dispatch({ type: 'setLastName', lastName });\n  };\n  return (\n    <div>\n      <div>\n        First Name:\n        <input value={state.firstName} onChange={setFirstName} />\n      </div>\n      <div>\n        Last Name:\n        <input value={state.lastName} onChange={setLastName} />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const state = useTrackedSelector();\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {state.firstName}</div>\n      ) : (\n        <div>\n          Full Name: {state.firstName} {state.lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <Provider store={store}>\n      <EditPerson />\n      <ShowPerson />\n    </Provider>\n  );\n};\n\nexport default App;\n\n"))),(0,r.yg)(o.A,{value:"ts",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-typescript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport { createStore } from 'redux';\nimport { Provider, useDispatch, useSelector } from 'react-redux';\nimport { createTrackedSelector } from 'react-tracked';\n\nconst initialState = {\n  firstName: 'React',\n  lastName: 'Tracked',\n};\n\ntype State = typeof initialState;\n\ntype Action =\n  | { type: 'setFirstName'; firstName: string }\n  | { type: 'setLastName'; lastName: string };\n\nconst reducer = (state = initialState, action: Action) => {\n  switch (action.type) {\n    case 'setFirstName':\n      return { ...state, firstName: action.firstName };\n    case 'setLastName':\n      return { ...state, lastName: action.lastName };\n    default:\n      return state;\n  }\n};\n\nconst store = createStore(reducer);\n\nconst useTrackedSelector = createTrackedSelector<State>(useSelector);\n\nconst EditPerson = () => {\n  const dispatch = useDispatch();\n  const state = useTrackedSelector();\n  const setFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {\n    const firstName = e.target.value;\n    dispatch({ type: 'setFirstName', firstName });\n  };\n  const setLastName = (e: React.ChangeEvent<HTMLInputElement>) => {\n    const lastName = e.target.value;\n    dispatch({ type: 'setLastName', lastName });\n  };\n  return (\n    <div>\n      <div>\n        First Name:\n        <input value={state.firstName} onChange={setFirstName} />\n      </div>\n      <div>\n        Last Name:\n        <input value={state.lastName} onChange={setLastName} />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const state = useTrackedSelector();\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {state.firstName}</div>\n      ) : (\n        <div>\n          Full Name: {state.firstName} {state.lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <Provider store={store}>\n      <EditPerson />\n      <ShowPerson />\n    </Provider>\n  );\n};\n\nexport default App;\n\n")))),(0,r.yg)("p",null,"This works just the same without the tricky selector."),(0,r.yg)("p",null,(0,r.yg)("a",{parentName:"p",href:"https://codesandbox.io/s/react-typescript-forked-n2olx"},"CodeSandbox")))}f.isMDXComponent=!0}}]);