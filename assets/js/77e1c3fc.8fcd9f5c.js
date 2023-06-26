"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[710],{7942:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return p}});var a=n(959);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),l=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=l(e.components);return a.createElement(u.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=l(n),f=r,p=m["".concat(u,".").concat(f)]||m[f]||d[f]||s;return n?a.createElement(p,o(o({ref:t},c),{},{components:n})):a.createElement(p,o({ref:t},c))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=f;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[m]="string"==typeof e?e:r,o[1]=i;for(var l=2;l<s;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8569:function(e,t,n){n.d(t,{Z:function(){return o}});var a=n(959),r=n(5924),s={tabItem:"tabItem_wZYq"};function o(e){var t=e.children,n=e.hidden,o=e.className;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(s.tabItem,o),hidden:n},t)}},710:function(e,t,n){n.d(t,{Z:function(){return k}});var a=n(1966),r=n(959),s=n(5924),o=n(4214),i=n(8903),u=n(1719),l=n(9121),c=n(7456);function m(e){return function(e){var t,n;return null!=(t=null==(n=r.Children.map(e,(function(e){if(!e||(0,r.isValidElement)(e)&&(t=e.props)&&"object"==typeof t&&"value"in t)return e;var t;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:n.filter(Boolean))?t:[]}(e).map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes,default:t.default}}))}function d(e){var t=e.values,n=e.children;return(0,r.useMemo)((function(){var e=null!=t?t:m(n);return function(e){var t=(0,l.l)(e,(function(e,t){return e.value===t.value}));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,n])}function f(e){var t=e.value;return e.tabValues.some((function(e){return e.value===t}))}function p(e){var t=e.queryString,n=void 0!==t&&t,a=e.groupId,s=(0,i.k6)(),o=function(e){var t=e.queryString,n=void 0!==t&&t,a=e.groupId;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=a?a:null}({queryString:n,groupId:a});return[(0,u._X)(o),(0,r.useCallback)((function(e){if(o){var t=new URLSearchParams(s.location.search);t.set(o,e),s.replace(Object.assign({},s.location,{search:t.toString()}))}}),[o,s])]}function v(e){var t,n,a,s,o=e.defaultValue,i=e.queryString,u=void 0!==i&&i,l=e.groupId,m=d(e),v=(0,r.useState)((function(){return function(e){var t,n=e.defaultValue,a=e.tabValues;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!f({value:n,tabValues:a}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+n+'" but none of its children has the corresponding value. Available values are: '+a.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return n}var r=null!=(t=a.find((function(e){return e.default})))?t:a[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:o,tabValues:m})})),N=v[0],b=v[1],y=p({queryString:u,groupId:l}),h=y[0],g=y[1],k=(t=function(e){return e?"docusaurus.tab."+e:null}({groupId:l}.groupId),n=(0,c.Nk)(t),a=n[0],s=n[1],[a,(0,r.useCallback)((function(e){t&&s.set(e)}),[t,s])]),S=k[0],w=k[1],T=function(){var e=null!=h?h:S;return f({value:e,tabValues:m})?e:null}();return(0,r.useLayoutEffect)((function(){T&&b(T)}),[T]),{selectedValue:N,selectValue:(0,r.useCallback)((function(e){if(!f({value:e,tabValues:m}))throw new Error("Can't select invalid tab value="+e);b(e),g(e),w(e)}),[g,w,m]),tabValues:m}}var N=n(5922),b={tabList:"tabList_jK5K",tabItem:"tabItem_Jvfa"};function y(e){var t=e.className,n=e.block,i=e.selectedValue,u=e.selectValue,l=e.tabValues,c=[],m=(0,o.o5)().blockElementScrollPositionUntilNextRender,d=function(e){var t=e.currentTarget,n=c.indexOf(t),a=l[n].value;a!==i&&(m(t),u(a))},f=function(e){var t,n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":var a,r=c.indexOf(e.currentTarget)+1;n=null!=(a=c[r])?a:c[0];break;case"ArrowLeft":var s,o=c.indexOf(e.currentTarget)-1;n=null!=(s=c[o])?s:c[c.length-1]}null==(t=n)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.Z)("tabs",{"tabs--block":n},t)},l.map((function(e){var t=e.value,n=e.label,o=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:i===t?0:-1,"aria-selected":i===t,key:t,ref:function(e){return c.push(e)},onKeyDown:f,onClick:d},o,{className:(0,s.Z)("tabs__item",b.tabItem,null==o?void 0:o.className,{"tabs__item--active":i===t})}),null!=n?n:t)})))}function h(e){var t=e.lazy,n=e.children,a=e.selectedValue,s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){var o=s.find((function(e){return e.props.value===a}));return o?(0,r.cloneElement)(o,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},s.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})})))}function g(e){var t=v(e);return r.createElement("div",{className:(0,s.Z)("tabs-container",b.tabList)},r.createElement(y,(0,a.Z)({},e,t)),r.createElement(h,(0,a.Z)({},e,t)))}function k(e){var t=(0,N.Z)();return r.createElement(g,(0,a.Z)({key:String(t)},e))}},6737:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return c},default:function(){return N},frontMatter:function(){return l},metadata:function(){return m},toc:function(){return f}});var a=n(1966),r=n(9836),s=(n(959),n(7942)),o=n(710),i=n(8569),u=["components"],l={id:"tutorial-zustand-01",title:"Tutorial with zustand - Person Name",sidebar_label:"Person Name (zustand)"},c=void 0,m={unversionedId:"tutorial-zustand-01",id:"tutorial-zustand-01",title:"Tutorial with zustand - Person Name",description:"This tutorial shows tiny example code with zustand.",source:"@site/docs/tutorial-zustand-01.md",sourceDirName:".",slug:"/tutorial-zustand-01",permalink:"/docs/tutorial-zustand-01",draft:!1,tags:[],version:"current",frontMatter:{id:"tutorial-zustand-01",title:"Tutorial with zustand - Person Name",sidebar_label:"Person Name (zustand)"},sidebar:"docs",previous:{title:"Person Name (redux)",permalink:"/docs/tutorial-redux-01"},next:{title:"API",permalink:"/docs/api"}},d={},f=[{value:"With useStore",id:"with-usestore",level:2},{value:"With useTrackedStore",id:"with-usetrackedstore",level:2}],p={toc:f},v="wrapper";function N(e){var t=e.components,n=(0,r.Z)(e,u);return(0,s.kt)(v,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"This tutorial shows tiny example code with zustand.\nThere are two variants.\nThe first one is with useStore.\nThe second one is with useTrackedStore."),(0,s.kt)("h2",{id:"with-usestore"},"With useStore"),(0,s.kt)(o.Z,{defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"TabsUsedByRemarkPluginTs2Js"},(0,s.kt)(i.Z,{value:"js",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport create from 'zustand';\n\nconst useStore = create((set) => ({\n  firstName: 'React',\n  lastName: 'Tracked',\n  setFirstName: (firstName) => set({ firstName }),\n  setLastName: (lastName) => set({ lastName }),\n}));\n\nconst EditPerson = () => {\n  const firstName = useStore((state) => state.firstName);\n  const lastName = useStore((state) => state.lastName);\n  const setFirstName = useStore((state) => state.setFirstName);\n  const setLastName = useStore((state) => state.setLastName);\n  return (\n    <div>\n      <div>\n        First Name:\n        <input\n          value={firstName}\n          onChange={(e) => setFirstName(e.target.value)}\n        />\n      </div>\n      <div>\n        Last Name:\n        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  const firstName = useStore((state) => state.firstName);\n  const lastName = useStore((state) => (onlyFirstName ? null : state.lastName));\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {firstName}</div>\n      ) : (\n        <div>\n          Full Name: {firstName} {lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <>\n      <EditPerson />\n      <ShowPerson />\n    </>\n  );\n};\n\nexport default App;\n\n"))),(0,s.kt)(i.Z,{value:"ts",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport create from 'zustand';\n\ntype State = {\n  firstName: string;\n  lastName: string;\n  setFirstName: (firstName: string) => void;\n  setLastName: (lastName: string) => void;\n};\n\nconst useStore = create<State>((set) => ({\n  firstName: 'React',\n  lastName: 'Tracked',\n  setFirstName: (firstName) => set({ firstName }),\n  setLastName: (lastName) => set({ lastName }),\n}));\n\nconst EditPerson = () => {\n  const firstName = useStore((state) => state.firstName);\n  const lastName = useStore((state) => state.lastName);\n  const setFirstName = useStore((state) => state.setFirstName);\n  const setLastName = useStore((state) => state.setLastName);\n  return (\n    <div>\n      <div>\n        First Name:\n        <input\n          value={firstName}\n          onChange={(e) => setFirstName(e.target.value)}\n        />\n      </div>\n      <div>\n        Last Name:\n        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  const firstName = useStore((state) => state.firstName);\n  const lastName = useStore((state) => (onlyFirstName ? null : state.lastName));\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {firstName}</div>\n      ) : (\n        <div>\n          Full Name: {firstName} {lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <>\n      <EditPerson />\n      <ShowPerson />\n    </>\n  );\n};\n\nexport default App;\n\n")))),(0,s.kt)("p",null,"It's a bit tricky to make a selector conditional."),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://codesandbox.io/s/react-typescript-forked-y9bqu"},"CodeSandbox")),(0,s.kt)("h2",{id:"with-usetrackedstore"},"With useTrackedStore"),(0,s.kt)(o.Z,{defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"TabsUsedByRemarkPluginTs2Js"},(0,s.kt)(i.Z,{value:"js",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport create from 'zustand';\nimport { createTrackedSelector } from 'react-tracked';\n\nconst useStore = create((set) => ({\n  firstName: 'React',\n  lastName: 'Tracked',\n  setFirstName: (firstName) => set({ firstName }),\n  setLastName: (lastName) => set({ lastName }),\n}));\n\nconst useTrackedStore = createTrackedSelector(useStore);\n\nconst EditPerson = () => {\n  const state = useTrackedStore();\n  return (\n    <div>\n      <div>\n        First Name:\n        <input\n          value={state.firstName}\n          onChange={(e) => state.setFirstName(e.target.value)}\n        />\n      </div>\n      <div>\n        Last Name:\n        <input\n          value={state.lastName}\n          onChange={(e) => state.setLastName(e.target.value)}\n        />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const state = useTrackedStore();\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {state.firstName}</div>\n      ) : (\n        <div>\n          Full Name: {state.firstName} {state.lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <>\n      <EditPerson />\n      <ShowPerson />\n    </>\n  );\n};\n\nexport default App;\n\n"))),(0,s.kt)(i.Z,{value:"ts",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport create from 'zustand';\nimport { createTrackedSelector } from 'react-tracked';\n\ntype State = {\n  firstName: string;\n  lastName: string;\n  setFirstName: (firstName: string) => void;\n  setLastName: (lastName: string) => void;\n};\n\nconst useStore = create<State>((set) => ({\n  firstName: 'React',\n  lastName: 'Tracked',\n  setFirstName: (firstName) => set({ firstName }),\n  setLastName: (lastName) => set({ lastName }),\n}));\n\nconst useTrackedStore = createTrackedSelector(useStore);\n\nconst EditPerson = () => {\n  const state = useTrackedStore();\n  return (\n    <div>\n      <div>\n        First Name:\n        <input\n          value={state.firstName}\n          onChange={(e) => state.setFirstName(e.target.value)}\n        />\n      </div>\n      <div>\n        Last Name:\n        <input\n          value={state.lastName}\n          onChange={(e) => state.setLastName(e.target.value)}\n        />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const state = useTrackedStore();\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {state.firstName}</div>\n      ) : (\n        <div>\n          Full Name: {state.firstName} {state.lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <>\n      <EditPerson />\n      <ShowPerson />\n    </>\n  );\n};\n\nexport default App;\n\n")))),(0,s.kt)("p",null,"This works just the same without the tricky selector."),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://codesandbox.io/s/react-typescript-forked-drjcl"},"CodeSandbox")))}N.isMDXComponent=!0}}]);