// We only need to import the modules necessary for initial render
import App from '../layouts/App'
import Error404 from './404'
import Home from './home'
import templateRoute from './template'
import userRoute from './user'
import Redirect from './404/redirect'

var routerList = [...userRoute]

if (__DEBUG__) {
  routerList = [...routerList, ...templateRoute]
}

/*  Note: Instead of using JSX, we recommend using react-router
 PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => {
  for (let i in routerList) {
    routerList[i] = routerList[i](store)
  }

  return {
    path: '/',
    component: App,
    indexRoute: Home(store),
    childRoutes: [
      ...routerList,
      Error404(store),
      Redirect
    ]
  }
}
/*  Note: childRoutes can be chunked or otherwise loaded programmatically
 using getChildRoutes with the following signature:

 getChildRoutes (location, cb) {
 require.ensure([], (require) => {
 cb(null, [
 // Remove imports!
 require('./Counter').default(store)
 ])
 })
 }

 However, this is not necessary for code-splitting! It simply provides
 an API for async route definitions. Your code splitting should occur
 inside the route `getComponent` function, since it is only invoked
 when the route exists and matches.
 */

export default createRoutes
