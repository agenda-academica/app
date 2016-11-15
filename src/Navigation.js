import { NavigationActions } from '@exponent/ex-navigation'
import Store from './state/Store'
import Router from './Router'

export const goHome = () => {
  let navigatorUID = Store.getState().navigation.currentNavigatorUID
  console.log('[Navigation] navigatorUID:', navigatorUID)
  Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('home')))
}
export const goBack = () => {
  Store.dispatch(NavigationActions.pop())
}
