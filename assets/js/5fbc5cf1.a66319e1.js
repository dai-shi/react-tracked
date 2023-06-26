"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[207],{7942:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return k}});var a=n(959);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(n),m=r,k=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return n?a.createElement(k,i(i({ref:t},p),{},{components:n})):a.createElement(k,i({ref:t},p))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[u]="string"==typeof e?e:r,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7176:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return k},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return u}});var a=n(1966),r=n(9836),o=(n(959),n(7942)),i=["components"],c={id:"api",title:"API",sidebar_label:"API"},s=void 0,l={unversionedId:"api",id:"api",title:"API",description:"There are two main functions exported from the library,",source:"@site/docs/api.md",sourceDirName:".",slug:"/api",permalink:"/docs/api",draft:!1,tags:[],version:"current",frontMatter:{id:"api",title:"API",sidebar_label:"API"},sidebar:"docs",previous:{title:"Person Name (zustand)",permalink:"/docs/tutorial-zustand-01"},next:{title:"Recipes",permalink:"/docs/recipes"}},p={},u=[{value:"createTrackedSelector",id:"createtrackedselector",level:2},{value:"createContainer",id:"createcontainer",level:2},{value:"Provider",id:"provider",level:3},{value:"useTracked",id:"usetracked",level:3},{value:"useUpdate",id:"useupdate",level:3},{value:"useTrackedState",id:"usetrackedstate",level:3},{value:"useSelector",id:"useselector",level:3},{value:"memo",id:"memo",level:2},{value:"getUntrackedObject",id:"getuntrackedobject",level:2}],d={toc:u},m="wrapper";function k(e){var t=e.components,n=(0,r.Z)(e,i);return(0,o.kt)(m,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"There are two main functions exported from the library,\n",(0,o.kt)("inlineCode",{parentName:"p"},"createContainer")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"createTrackedSelector"),"."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"createTrackedSelector")," is a building block function\nwhich takes a ",(0,o.kt)("inlineCode",{parentName:"p"},"useSelector")," hook and creates a ",(0,o.kt)("inlineCode",{parentName:"p"},"useTrackedSelector")," hook."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"createContainer")," is a higher level function for React Context-like usage,\nwhich creates a provider and other hooks."),(0,o.kt)("h2",{id:"createtrackedselector"},"createTrackedSelector"),(0,o.kt)("p",null,"This is a function to create a hook with state usage tracking.\nIt takes one argument ",(0,o.kt)("inlineCode",{parentName:"p"},"useSelector"),", which is provided by\n",(0,o.kt)("a",{parentName:"p",href:"https://react-redux.js.org/api/hooks"},"react-redux")," or\nany other hooks with the same signature and behavior."),(0,o.kt)("p",null,"The created hook ",(0,o.kt)("inlineCode",{parentName:"p"},"useTrackedSelector")," (or whatever named)\nis a hook that returns ",(0,o.kt)("inlineCode",{parentName:"p"},"state")," wrapped by Proxies for usage tracking.\nIt behaves the same as ",(0,o.kt)("a",{parentName:"p",href:"#usetrackedstate"},"useTrackedState")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"createContainer"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { useSelector } from 'react-redux'; // or any similar library\nimport { createTrackedSelector } from 'react-tracked';\n\nconst useTrackedSelector = createTrackedSelector(useSelector);\n\nconst Component = () => {\n  const state = useTrackedSelector();\n  // ...\n};\n")),(0,o.kt)("h2",{id:"createcontainer"},"createContainer"),(0,o.kt)("p",null,"It takes two arguments, the first argument is ",(0,o.kt)("inlineCode",{parentName:"p"},"useValue"),",\nwhich is a hook that returns a tuple ",(0,o.kt)("inlineCode",{parentName:"p"},"[state, update]"),".\nTypically, it's with useReducer or useState,\nbut it can be any custom hooks based on them."),(0,o.kt)("p",null,"The second argument is ",(0,o.kt)("inlineCode",{parentName:"p"},"options"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"type Options = {\n  defaultState?: State;\n  defaultUpdate?: Update;\n  stateContextName?: string;\n  updateContextName?: string;\n  concurrentMode?: boolean;\n}\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"defaultState")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"defaultUpdate")," are to specify context default values in case you want something without Provider."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"stateContextName")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"updateContextName")," are to specify context display names."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"concurrentMode")," is to enable using ",(0,o.kt)("inlineCode",{parentName:"li"},"useContextUpdate")," from ",(0,o.kt)("inlineCode",{parentName:"li"},"use-context-selector")," for concurrent features, available since React 18.")),(0,o.kt)("p",null,"Note: you can create multiple containers in one app."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { createContainer } from 'react-tracked';\n\nconst useValue = (props) => useReducer(...);\n\nconst {\n  Provider,\n  useTracked,\n  useUpdate,\n  useTrackedState,\n  useSelector,\n} = createContainer(useValue);\n")),(0,o.kt)("h3",{id:"provider"},"Provider"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Provider")," returned by createContainer has to be put\nin the parent component.\nTypically, it's close to the root component,\nbut it can be (sometimes desirably) lower in the component tree."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const App = (props) => (\n  <Provider {...props}>\n    ...\n  </Provider>\n);\n")),(0,o.kt)("h3",{id:"usetracked"},"useTracked"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"useTracked")," hook returned by createContainer is the recommended hook.\nIt simply returns the ",(0,o.kt)("inlineCode",{parentName:"p"},"[state, update]")," tuple that ",(0,o.kt)("inlineCode",{parentName:"p"},"useValue")," returns.\nThe ",(0,o.kt)("inlineCode",{parentName:"p"},"state")," is wrapped by Proxies for usage tracking."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const Component = () => {\n  const [state, dispatch] = useTracked();\n  // ...\n};\n")),(0,o.kt)("h3",{id:"useupdate"},"useUpdate"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"useUpdate")," hook returned by createContainer is for ",(0,o.kt)("inlineCode",{parentName:"p"},"update")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"useValue"),';\nIt\'s named "update" ambiguously, but typically\nit would be renamed to "dispatch" for useReducer,\n"setState" for useState, or any "update" function.'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const Component = () => {\n  const dispatch = useUpdate();\n  // ...\n};\n")),(0,o.kt)("h3",{id:"usetrackedstate"},"useTrackedState"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"useTrackedState")," hook returned by createContainer is for ",(0,o.kt)("inlineCode",{parentName:"p"},"state")," from ",(0,o.kt)("inlineCode",{parentName:"p"},"useValue"),";\nThis is wrapped by Proxies as same as ",(0,o.kt)("inlineCode",{parentName:"p"},"useTracked"),".\nUse this hook if you don't need ",(0,o.kt)("inlineCode",{parentName:"p"},"update"),".\nThis hook is compatible with ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/dai-shi/reactive-react-redux"},"reactive-react-redux"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const Component = () => {\n  const state = useTrackedState();\n  // ...\n};\n")),(0,o.kt)("h3",{id:"useselector"},"useSelector"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"useSelector")," hook returned by createContainer is an optional hook.\nUse this hook if state usage tracking doesn't work or fit well.\nThis hook is compatible with ",(0,o.kt)("a",{parentName:"p",href:"https://react-redux.js.org/api/hooks"},"react-redux"),".\nIt would ease transition from/to react-redux apps."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const Component = () => {\n  const selected = useSelector(selector);\n  // ...\n};\n")),(0,o.kt)("h2",{id:"memo"},"memo"),(0,o.kt)("p",null,"There is a utility function exported from the library."),(0,o.kt)("p",null,"This should be used instead of ",(0,o.kt)("inlineCode",{parentName:"p"},"React.memo")," if props\ninclude objects being tracked. Otherwise, usage tracking may not\nwork correctly because a memoized component doesn't always render\nwhen a parent component renders."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { memo } from 'react-tracked';\n\nconst ChildComponent = memo(({ num1, str1, obj1, obj2 }) => {\n  // ...\n});\n")),(0,o.kt)("h2",{id:"getuntrackedobject"},"getUntrackedObject"),(0,o.kt)("p",null,"There are some cases when we need to get an original object\ninstead of a tracked object.\nAlthough it's not a recommended pattern,\nthe library exports a function as an escape hatch."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { getUntrackedObject } from 'react-tracked';\n\nconst Component = () => {\n  const state = useTrackedState();\n  const dispatch = useUpdate();\n  const onClick = () => {\n    // this leaks a proxy outside render\n    dispatch({ type: 'FOO', value: state.foo });\n\n    // this works as expected\n    dispatch({ type: 'FOO', value: getUntrackedObject(state.foo) });\n  };\n  // ...\n};\n")))}k.isMDXComponent=!0}}]);