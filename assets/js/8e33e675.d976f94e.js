"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[590],{7942:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return f}});var a=n(959);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),c=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=c(e.components);return a.createElement(o.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,o=e.parentName,l=u(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,f=d["".concat(o,".").concat(m)]||d[m]||p[m]||i;return n?a.createElement(f,s(s({ref:t},l),{},{components:n})):a.createElement(f,s({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,s=new Array(i);s[0]=m;var u={};for(var o in t)hasOwnProperty.call(t,o)&&(u[o]=t[o]);u.originalType=e,u[d]="string"==typeof e?e:r,s[1]=u;for(var c=2;c<i;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8569:function(e,t,n){n.d(t,{Z:function(){return s}});var a=n(959),r=n(5924),i={tabItem:"tabItem_wZYq"};function s(e){var t=e.children,n=e.hidden,s=e.className;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,s),hidden:n},t)}},710:function(e,t,n){n.d(t,{Z:function(){return S}});var a=n(1966),r=n(959),i=n(5924),s=n(4214),u=n(8903),o=n(1719),c=n(9121),l=n(7456);function d(e){return function(e){var t,n;return null!=(t=null==(n=r.Children.map(e,(function(e){if(!e||(0,r.isValidElement)(e)&&(t=e.props)&&"object"==typeof t&&"value"in t)return e;var t;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})))?void 0:n.filter(Boolean))?t:[]}(e).map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes,default:t.default}}))}function p(e){var t=e.values,n=e.children;return(0,r.useMemo)((function(){var e=null!=t?t:d(n);return function(e){var t=(0,c.l)(e,(function(e,t){return e.value===t.value}));if(t.length>0)throw new Error('Docusaurus error: Duplicate values "'+t.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.')}(e),e}),[t,n])}function m(e){var t=e.value;return e.tabValues.some((function(e){return e.value===t}))}function f(e){var t=e.queryString,n=void 0!==t&&t,a=e.groupId,i=(0,u.k6)(),s=function(e){var t=e.queryString,n=void 0!==t&&t,a=e.groupId;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return null!=a?a:null}({queryString:n,groupId:a});return[(0,o._X)(s),(0,r.useCallback)((function(e){if(s){var t=new URLSearchParams(i.location.search);t.set(s,e),i.replace(Object.assign({},i.location,{search:t.toString()}))}}),[s,i])]}function v(e){var t,n,a,i,s=e.defaultValue,u=e.queryString,o=void 0!==u&&u,c=e.groupId,d=p(e),v=(0,r.useState)((function(){return function(e){var t,n=e.defaultValue,a=e.tabValues;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:a}))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+n+'" but none of its children has the corresponding value. Available values are: '+a.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");return n}var r=null!=(t=a.find((function(e){return e.default})))?t:a[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:s,tabValues:d})})),h=v[0],k=v[1],b=f({queryString:o,groupId:c}),g=b[0],y=b[1],S=(t=function(e){return e?"docusaurus.tab."+e:null}({groupId:c}.groupId),n=(0,l.Nk)(t),a=n[0],i=n[1],[a,(0,r.useCallback)((function(e){t&&i.set(e)}),[t,i])]),w=S[0],N=S[1],j=function(){var e=null!=g?g:w;return m({value:e,tabValues:d})?e:null}();return(0,r.useLayoutEffect)((function(){j&&k(j)}),[j]),{selectedValue:h,selectValue:(0,r.useCallback)((function(e){if(!m({value:e,tabValues:d}))throw new Error("Can't select invalid tab value="+e);k(e),y(e),N(e)}),[y,N,d]),tabValues:d}}var h=n(5922),k={tabList:"tabList_jK5K",tabItem:"tabItem_Jvfa"};function b(e){var t=e.className,n=e.block,u=e.selectedValue,o=e.selectValue,c=e.tabValues,l=[],d=(0,s.o5)().blockElementScrollPositionUntilNextRender,p=function(e){var t=e.currentTarget,n=l.indexOf(t),a=c[n].value;a!==u&&(d(t),o(a))},m=function(e){var t,n=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":var a,r=l.indexOf(e.currentTarget)+1;n=null!=(a=l[r])?a:l[0];break;case"ArrowLeft":var i,s=l.indexOf(e.currentTarget)-1;n=null!=(i=l[s])?i:l[l.length-1]}null==(t=n)||t.focus()};return r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":n},t)},c.map((function(e){var t=e.value,n=e.label,s=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:u===t?0:-1,"aria-selected":u===t,key:t,ref:function(e){return l.push(e)},onKeyDown:m,onClick:p},s,{className:(0,i.Z)("tabs__item",k.tabItem,null==s?void 0:s.className,{"tabs__item--active":u===t})}),null!=n?n:t)})))}function g(e){var t=e.lazy,n=e.children,a=e.selectedValue,i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){var s=i.find((function(e){return e.props.value===a}));return s?(0,r.cloneElement)(s,{className:"margin-top--md"}):null}return r.createElement("div",{className:"margin-top--md"},i.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})})))}function y(e){var t=v(e);return r.createElement("div",{className:(0,i.Z)("tabs-container",k.tabList)},r.createElement(b,(0,a.Z)({},e,t)),r.createElement(g,(0,a.Z)({},e,t)))}function S(e){var t=(0,h.Z)();return r.createElement(y,(0,a.Z)({key:String(t)},e))}},3858:function(e,t,n){n.r(t),n.d(t,{assets:function(){return l},contentTitle:function(){return o},default:function(){return f},frontMatter:function(){return u},metadata:function(){return c},toc:function(){return d}});var a=n(1966),r=n(9836),i=(n(959),n(7942)),s=(n(710),n(8569),["components"]),u={id:"recipes",title:"Recipes",sidebar_label:"Recipes"},o=void 0,c={unversionedId:"recipes",id:"recipes",title:"Recipes",description:"React Tracked provides a primitive API,",source:"@site/docs/recipes.md",sourceDirName:".",slug:"/recipes",permalink:"/docs/recipes",draft:!1,tags:[],version:"current",frontMatter:{id:"recipes",title:"Recipes",sidebar_label:"Recipes"},sidebar:"docs",previous:{title:"API",permalink:"/docs/api"},next:{title:"Debugging",permalink:"/docs/debugging"}},l={},d=[{value:"Recipes for createContainer",id:"recipes-for-createcontainer",level:2},{value:"useReducer (props)",id:"usereducer-props",level:3},{value:"useReducer (embedded)",id:"usereducer-embedded",level:3},{value:"useState (props)",id:"usestate-props",level:3},{value:"useState (empty object)",id:"usestate-empty-object",level:3},{value:"useReducer (with persistence)",id:"usereducer-with-persistence",level:3},{value:"useState (with propState)",id:"usestate-with-propstate",level:3},{value:"useReducer (with event listener)",id:"usereducer-with-event-listener",level:3},{value:"useState (with update functions)",id:"usestate-with-update-functions",level:3},{value:"Recipes for useTrackedState and useTracked",id:"recipes-for-usetrackedstate-and-usetracked",level:2},{value:"useSelectorWithTracking",id:"useselectorwithtracking",level:3},{value:"useTrackedByName (based on useState)",id:"usetrackedbyname-based-on-usestate",level:3},{value:"useTrackedWithImmer (based on useState)",id:"usetrackedwithimmer-based-on-usestate",level:3},{value:"Recipes for useUpdate (useDispatch)",id:"recipes-for-useupdate-usedispatch",level:2},{value:"useSafeDispatch",id:"usesafedispatch",level:3}],p={toc:d},m="wrapper";function f(e){var t=e.components,n=(0,r.Z)(e,s);return(0,i.kt)(m,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"React Tracked provides a primitive API,\nand there are various ways to use it for apps."),(0,i.kt)("h2",{id:"recipes-for-createcontainer"},"Recipes for createContainer"),(0,i.kt)("p",null,"The argument ",(0,i.kt)("inlineCode",{parentName:"p"},"useValue")," in ",(0,i.kt)("inlineCode",{parentName:"p"},"createContainer")," is so flexible\nand there are various usages."),(0,i.kt)("h3",{id:"usereducer-props"},"useReducer (props)"),(0,i.kt)("p",null,"This is the most typical usage.\nYou define a generic reducer and pass ",(0,i.kt)("inlineCode",{parentName:"p"},"reducer")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"initialState")," as props."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const {\n  Provider,\n  useTracked,\n  // ...\n} = createContainer(({ reducer, initialState, init }) => useReducer(reducer, initialState, init));\n\nconst reducer = ...;\n\nconst App = ({ initialState }) => (\n  <Provider reducer={reducer} initialState={initialState}>\n    ...\n  </Provider>\n);\n")),(0,i.kt)("h3",{id:"usereducer-embedded"},"useReducer (embedded)"),(0,i.kt)("p",null,"For most cases, you would have a static reducer.\nIn this case, define useValue with the reducer in advance.\nThe ",(0,i.kt)("inlineCode",{parentName:"p"},"initialState")," can be defined in useValue like the following example,\nor can be taken from props: ",(0,i.kt)("inlineCode",{parentName:"p"},"({ initialState }) => useReducer(...)")),(0,i.kt)("p",null,"This is good for TypeScript because the hooks returned by ",(0,i.kt)("inlineCode",{parentName:"p"},"createContainer")," is already typed."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const reducer = ...;\nconst initialState = ...;\n\nconst {\n  Provider,\n  useTracked,\n  // ...\n} = createContainer(() => useReducer(reducer, initialState));\n\n\nconst App = () => (\n  <Provider>\n    ...\n  </Provider>\n);\n")),(0,i.kt)("h3",{id:"usestate-props"},"useState (props)"),(0,i.kt)("p",null,"If you don't need reducer, useState would be simpler."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const {\n  Provider,\n  useTracked,\n  // ...\n} = createContainer(({ initialState }) => useState(initialState);\n\n\nconst App = ({ initialState }) => (\n  <Provider initialState={initialState}>\n    ...\n  </Provider>\n);\n")),(0,i.kt)("h3",{id:"usestate-empty-object"},"useState (empty object)"),(0,i.kt)("p",null,"You could even start with completely an empty object."),(0,i.kt)("p",null,"This might not be TypeScript friendly. Although, you could do this: ",(0,i.kt)("inlineCode",{parentName:"p"},"useState<State>({})")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const {\n  Provider,\n  useTracked,\n  // ...\n} = createContainer(() => useState({});\n\nconst App = () => (\n  <Provider>\n    ...\n  </Provider>\n);\n")),(0,i.kt)("h3",{id:"usereducer-with-persistence"},"useReducer (with persistence)"),(0,i.kt)("p",null,"Here's how to persist state in localStorage."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const reducer = ...;\nconst initialState = ...; // used only if localStorage is empty.\nconst storageKey = 'persistedState';\n\nconst init = () => {\n  let preloadedState;\n  try {\n    preloadedState =  JSON.parse(window.localStorage.getItem(storageKey));\n    // validate preloadedState if necessary\n  } catch (e) {\n    // ignore\n  }\n  return preloadedState || initialState;\n};\n\nconst useValue = () => {\n  const [state, dispatch] = useReducer(reducer, null, init);\n  useEffect(() => {\n    window.localStorage.setItem(storageKey, JSON.stringify(state));\n  }, [state]);\n  return [state, dispatch];\n};\n\nconst {\n  Provider,\n  useTracked,\n  // ...\n} = createContainer(useValue);\n\nconst App = () => (\n  <Provider>\n    ...\n  </Provider>\n);\n")),(0,i.kt)("p",null,"Using async storage is a bit tricky.\nSee ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/dai-shi/react-tracked/issues/8#issuecomment-548095476"},"the thread")," for an example."),(0,i.kt)("h3",{id:"usestate-with-propstate"},"useState (with propState)"),(0,i.kt)("p",null,"If you already have a state and would like to use Provider with it,\nyou can sync a container state with a state from props."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const useValue = ({ propState }) => {\n  const [state, setState] = useState(propState);\n  useEffect(() => { // or useLayoutEffect\n    setState(propState);\n  }, [propState]);\n  return [state, setState];\n};\n\nconst {\n  Provider,\n  useTracked,\n  // ...\n} = createContainer(useValue);\n\nconst App = ({ propState }) => (\n  <Provider propState={propState}>\n    ...\n  </Provider>\n);\n")),(0,i.kt)("p",null,"Note that ",(0,i.kt)("inlineCode",{parentName:"p"},"propState")," has to be updated immutably."),(0,i.kt)("h3",{id:"usereducer-with-event-listener"},"useReducer (with event listener)"),(0,i.kt)("p",null,"Here's how to dispatch actions by DOM events."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const reducer = ...;\nconst initialState = ...;\n\nconst useValue = () => {\n  const [state, dispatch] = useReducer(reducer, initialState);\n  useEffect(() => {\n    const listener = () => {\n      dispatch({\n        type: 'WINDOW_RESIZED',\n        width: window.innerWidth,\n        height: window.innerHeight,\n      });\n    };\n    window.addEventListener('resize', listener);\n    return () => {\n      window.removeEventListener('resize', listener);\n    };\n  }, []);\n  return [state, dispatch];\n};\n\nconst {\n  Provider,\n  useTracked,\n  // ...\n} = createContainer(useValue);\n\nconst App = () => (\n  <Provider>\n    ...\n  </Provider>\n);\n")),(0,i.kt)("h3",{id:"usestate-with-update-functions"},"useState (with update functions)"),(0,i.kt)("p",null,"If you want to have custom update functions,\nyou can store them in a state object.\nBe sure to use ",(0,i.kt)("inlineCode",{parentName:"p"},"useCallback")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"useMemo"),"\nto make the state object stable."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const useValue = () => {\n  const [count, setCount] = useState(0);\n  const increment = useCallback(() => setCount((c) => c + 1), []);\n  const decrement = useCallback(() => setCount((c) => c - 1), []);\n  const state = useMemo(() => ({\n    count,\n    increment,\n    decrement,\n  }), [count, increment, decrement]);\n  return [state, () => { throw new Error('use functions in the state') }];\n};\n\nconst {\n  Provider,\n  useTrackedState,\n} = createContainer(useValue);\n\nconst App = () => (\n  <Provider>\n    ...\n  </Provider>\n);\n")),(0,i.kt)("p",null,"Note: With custom update functions, you don't get the benefit\neven if you enable ",(0,i.kt)("inlineCode",{parentName:"p"},"concurrentMode")," in ",(0,i.kt)("inlineCode",{parentName:"p"},"createContainer"),"."),(0,i.kt)("h2",{id:"recipes-for-usetrackedstate-and-usetracked"},"Recipes for useTrackedState and useTracked"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"useTrackedState")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"useTracked")," hooks are useful as is,\nbut new hooks can also be created based on them."),(0,i.kt)("h3",{id:"useselectorwithtracking"},"useSelectorWithTracking"),(0,i.kt)("p",null,"Selector interface is useful to share selection logic.\nYou can create a selector hook with state usage tracking very easily."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const useSelectorWithTracking = selector => selector(useTrackedState());\n")),(0,i.kt)("p",null,"Note: This is different from ",(0,i.kt)("inlineCode",{parentName:"p"},"useSelector")," which has no tracking support\nand triggers re-render based on the ref equality of selected value."),(0,i.kt)("h3",{id:"usetrackedbyname-based-on-usestate"},"useTrackedByName (based on useState)"),(0,i.kt)("p",null,"Sometimes, you might want to select a state by its property name.\nHere's a custom hook to return a tuple ",(0,i.kt)("inlineCode",{parentName:"p"},"[value, setValue]")," selected by a name."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"const useTrackedByName = (name) => {\n  const [state, setState] = useTracked();\n  const update = useCallback((newVal) => {\n    setState(oldVal => ({\n      ...oldVal,\n      [name]: typeof newVal === 'function' ? newVal(oldVal[name]) : newVal,\n    }));\n  }, [setState, name]);\n  return [state[name], update];\n};\n")),(0,i.kt)("h3",{id:"usetrackedwithimmer-based-on-usestate"},"useTrackedWithImmer (based on useState)"),(0,i.kt)("p",null,"Updating a property deep in a state object is troublesome.\nHere's a custom hook to use ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/immerjs/immer"},"immer")," for setState."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"import produce from 'immer';\n\nconst useTrackedWithImmer = () => {\n  const [state, setState] = useTracked();\n  const update = useCallback((updater) => {\n    setState(oldVal => produce(oldVal, updater));\n  }, [setState]);\n  return [state, update];\n};\n")),(0,i.kt)("p",null,"Note: This can also be done at ",(0,i.kt)("inlineCode",{parentName:"p"},"createContainer"),"."),(0,i.kt)("h2",{id:"recipes-for-useupdate-usedispatch"},"Recipes for useUpdate (useDispatch)"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"useUpdate")," simply returns the second item\nin a tuple returned by ",(0,i.kt)("inlineCode",{parentName:"p"},"useState")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"useReducer"),".\nIt can also be extended as a custom hook."),(0,i.kt)("h3",{id:"usesafedispatch"},"useSafeDispatch"),(0,i.kt)("p",null,"This is a modified version of useDispatch that calls ",(0,i.kt)("inlineCode",{parentName:"p"},"getUntrackedObject"),"\nrecursively on an action object before dispatching it."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-javascript"},"import { getUntrackedObject } from 'react-tracked';\n\nconst untrackDeep = (obj) => {\n  if (typeof obj !== 'object' || obj === null) return obj;\n  const untrackedObj = getUntrackedObject(obj);\n  if (untrackedObj !== null) return untrackedObj;\n  const newObj = {};\n  let modified = false;\n  Object.entries(obj).forEach(([k, v]) => {\n    newObj[k] = untrackDeep(v);\n    if (newObj[k] !== null) {\n      modified = true;\n    } else {\n      newObj[k] = v;\n    }\n  });\n  return modified ? newObj : obj;\n};\n\nconst useSafeDispatch = () => {\n  const dispatch = useDispatch();\n  return useCallback((action) => {\n    dispatch(untrackDeep(action));\n  }, [dispatch]);\n};\n")))}f.isMDXComponent=!0}}]);