"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[710],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return p}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},s=Object.keys(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(a=0;a<s.length;a++)n=s[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),u=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=u(n),p=r,f=d["".concat(l,".").concat(p)]||d[p]||m[p]||s;return n?a.createElement(f,o(o({ref:t},c),{},{components:n})):a.createElement(f,o({ref:t},c))}));function p(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,o[1]=i;for(var u=2;u<s;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8215:function(e,t,n){n.d(t,{Z:function(){return r}});var a=n(7294);function r(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},9877:function(e,t,n){n.d(t,{Z:function(){return c}});var a=n(7462),r=n(7294),s=n(2389),o=n(5979),i=n(6010),l="tabItem_LplD";function u(e){var t,n,s,u=e.lazy,c=e.block,m=e.defaultValue,d=e.values,p=e.groupId,f=e.className,v=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),N=null!=d?d:v.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),y=(0,o.lx)(N,(function(e,t){return e.value===t.value}));if(y.length>0)throw new Error('Docusaurus error: Duplicate values "'+y.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var h=null===m?m:null!=(t=null!=m?m:null==(n=v.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(s=v[0])?void 0:s.props.value;if(null!==h&&!N.some((function(e){return e.value===h})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+h+'" but none of its children has the corresponding value. Available values are: '+N.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var b=(0,o.UB)(),k=b.tabGroupChoices,g=b.setTabGroupChoices,S=(0,r.useState)(h),T=S[0],w=S[1],F=[],P=(0,o.o5)().blockElementScrollPositionUntilNextRender;if(null!=p){var O=k[p];null!=O&&O!==T&&N.some((function(e){return e.value===O}))&&w(O)}var x=function(e){var t=e.currentTarget,n=F.indexOf(t),a=N[n].value;a!==T&&(P(t),w(a),null!=p&&g(p,a))},E=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a=F.indexOf(e.currentTarget)+1;n=F[a]||F[0];break;case"ArrowLeft":var r=F.indexOf(e.currentTarget)-1;n=F[r]||F[F.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":c},f)},N.map((function(e){var t=e.value,n=e.label,s=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:T===t?0:-1,"aria-selected":T===t,key:t,ref:function(e){return F.push(e)},onKeyDown:E,onFocus:x,onClick:x},s,{className:(0,i.Z)("tabs__item",l,null==s?void 0:s.className,{"tabs__item--active":T===t})}),null!=n?n:t)}))),u?(0,r.cloneElement)(v.filter((function(e){return e.props.value===T}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},v.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==T})}))))}function c(e){var t=(0,s.Z)();return r.createElement(u,(0,a.Z)({key:String(t)},e))}},5007:function(e,t,n){n.r(t),n.d(t,{assets:function(){return d},contentTitle:function(){return c},default:function(){return v},frontMatter:function(){return u},metadata:function(){return m},toc:function(){return p}});var a=n(7462),r=n(3366),s=(n(7294),n(3905)),o=n(9877),i=n(8215),l=["components"],u={id:"tutorial-zustand-01",title:"Tutorial with zustand - Person Name",sidebar_label:"Person Name (zustand)"},c=void 0,m={unversionedId:"tutorial-zustand-01",id:"tutorial-zustand-01",title:"Tutorial with zustand - Person Name",description:"This tutorial shows tiny example code with zustand.",source:"@site/docs/tutorial-zustand-01.md",sourceDirName:".",slug:"/tutorial-zustand-01",permalink:"/docs/tutorial-zustand-01",tags:[],version:"current",frontMatter:{id:"tutorial-zustand-01",title:"Tutorial with zustand - Person Name",sidebar_label:"Person Name (zustand)"},sidebar:"docs",previous:{title:"Person Name (redux)",permalink:"/docs/tutorial-redux-01"},next:{title:"API",permalink:"/docs/api"}},d={},p=[{value:"With useStore",id:"with-usestore",level:2},{value:"With useTrackedStore",id:"with-usetrackedstore",level:2}],f={toc:p};function v(e){var t=e.components,n=(0,r.Z)(e,l);return(0,s.kt)("wrapper",(0,a.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"This tutorial shows tiny example code with zustand.\nThere are two variants.\nThe first one is with useStore.\nThe second one is with useTrackedStore."),(0,s.kt)("h2",{id:"with-usestore"},"With useStore"),(0,s.kt)(o.Z,{defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"TabsUsedByRemarkPluginTs2Js"},(0,s.kt)(i.Z,{value:"js",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport create from 'zustand';\n\nconst useStore = create((set) => ({\n  firstName: 'React',\n  lastName: 'Tracked',\n  setFirstName: (firstName) => set({ firstName }),\n  setLastName: (lastName) => set({ lastName }),\n}));\n\nconst EditPerson = () => {\n  const firstName = useStore((state) => state.firstName);\n  const lastName = useStore((state) => state.lastName);\n  const setFirstName = useStore((state) => state.setFirstName);\n  const setLastName = useStore((state) => state.setLastName);\n  return (\n    <div>\n      <div>\n        First Name:\n        <input\n          value={firstName}\n          onChange={(e) => setFirstName(e.target.value)}\n        />\n      </div>\n      <div>\n        Last Name:\n        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  const firstName = useStore((state) => state.firstName);\n  const lastName = useStore((state) => (onlyFirstName ? null : state.lastName));\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {firstName}</div>\n      ) : (\n        <div>\n          Full Name: {firstName} {lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <>\n      <EditPerson />\n      <ShowPerson />\n    </>\n  );\n};\n\nexport default App;\n\n"))),(0,s.kt)(i.Z,{value:"ts",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport create from 'zustand';\n\ntype State = {\n  firstName: string;\n  lastName: string;\n  setFirstName: (firstName: string) => void;\n  setLastName: (lastName: string) => void;\n};\n\nconst useStore = create<State>((set) => ({\n  firstName: 'React',\n  lastName: 'Tracked',\n  setFirstName: (firstName) => set({ firstName }),\n  setLastName: (lastName) => set({ lastName }),\n}));\n\nconst EditPerson: React.FC = () => {\n  const firstName = useStore((state) => state.firstName);\n  const lastName = useStore((state) => state.lastName);\n  const setFirstName = useStore((state) => state.setFirstName);\n  const setLastName = useStore((state) => state.setLastName);\n  return (\n    <div>\n      <div>\n        First Name:\n        <input\n          value={firstName}\n          onChange={(e) => setFirstName(e.target.value)}\n        />\n      </div>\n      <div>\n        Last Name:\n        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson: React.FC = () => {\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  const firstName = useStore((state) => state.firstName);\n  const lastName = useStore((state) => (onlyFirstName ? null : state.lastName));\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {firstName}</div>\n      ) : (\n        <div>\n          Full Name: {firstName} {lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App: React.FC = () => {\n  return (\n    <>\n      <EditPerson />\n      <ShowPerson />\n    </>\n  );\n};\n\nexport default App;\n\n")))),(0,s.kt)("p",null,"It's a bit tricky to make a selector conditional."),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://codesandbox.io/s/react-typescript-forked-y9bqu"},"CodeSandbox")),(0,s.kt)("h2",{id:"with-usetrackedstore"},"With useTrackedStore"),(0,s.kt)(o.Z,{defaultValue:"js",values:[{label:"JavaScript",value:"js"},{label:"TypeScript",value:"ts"}],mdxType:"TabsUsedByRemarkPluginTs2Js"},(0,s.kt)(i.Z,{value:"js",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-javascript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport create from 'zustand';\nimport { createTrackedSelector } from 'react-tracked';\n\nconst useStore = create((set) => ({\n  firstName: 'React',\n  lastName: 'Tracked',\n  setFirstName: (firstName) => set({ firstName }),\n  setLastName: (lastName) => set({ lastName }),\n}));\n\nconst useTrackedStore = createTrackedSelector(useStore);\n\nconst EditPerson = () => {\n  const state = useTrackedStore();\n  return (\n    <div>\n      <div>\n        First Name:\n        <input\n          value={state.firstName}\n          onChange={(e) => state.setFirstName(e.target.value)}\n        />\n      </div>\n      <div>\n        Last Name:\n        <input\n          value={state.lastName}\n          onChange={(e) => state.setLastName(e.target.value)}\n        />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson = () => {\n  const state = useTrackedStore();\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {state.firstName}</div>\n      ) : (\n        <div>\n          Full Name: {state.firstName} {state.lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App = () => {\n  return (\n    <>\n      <EditPerson />\n      <ShowPerson />\n    </>\n  );\n};\n\nexport default App;\n\n"))),(0,s.kt)(i.Z,{value:"ts",mdxType:"TabItemUsedByRemarkPluginTs2Js"},(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-typescript"},"import * as React from 'react';\nimport { useState } from 'react';\nimport create from 'zustand';\nimport { createTrackedSelector } from 'react-tracked';\n\ntype State = {\n  firstName: string;\n  lastName: string;\n  setFirstName: (firstName: string) => void;\n  setLastName: (lastName: string) => void;\n};\n\nconst useStore = create<State>((set) => ({\n  firstName: 'React',\n  lastName: 'Tracked',\n  setFirstName: (firstName) => set({ firstName }),\n  setLastName: (lastName) => set({ lastName }),\n}));\n\nconst useTrackedStore = createTrackedSelector(useStore);\n\nconst EditPerson: React.FC = () => {\n  const state = useTrackedStore();\n  return (\n    <div>\n      <div>\n        First Name:\n        <input\n          value={state.firstName}\n          onChange={(e) => state.setFirstName(e.target.value)}\n        />\n      </div>\n      <div>\n        Last Name:\n        <input\n          value={state.lastName}\n          onChange={(e) => state.setLastName(e.target.value)}\n        />\n      </div>\n    </div>\n  );\n};\n\nconst ShowPerson: React.FC = () => {\n  const state = useTrackedStore();\n  const [onlyFirstName, setOnlyFirstName] = useState(false);\n  return (\n    <div>\n      <button type=\"button\" onClick={() => setOnlyFirstName((s) => !s)}>\n        {onlyFirstName ? 'Showing only first name' : 'Showing full name'}\n      </button>\n      {onlyFirstName ? (\n        <div>First Name: {state.firstName}</div>\n      ) : (\n        <div>\n          Full Name: {state.firstName} {state.lastName}\n        </div>\n      )}\n    </div>\n  );\n};\n\nconst App: React.FC = () => {\n  return (\n    <>\n      <EditPerson />\n      <ShowPerson />\n    </>\n  );\n};\n\nexport default App;\n\n")))),(0,s.kt)("p",null,"This works just the same without the tricky selector."),(0,s.kt)("p",null,(0,s.kt)("a",{parentName:"p",href:"https://codesandbox.io/s/react-typescript-forked-drjcl"},"CodeSandbox")))}v.isMDXComponent=!0}}]);