import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createNavigationEnabledStore, NavigationReducer } from '@exponent/ex-navigation'
import { reducer as formReducer } from 'redux-form'

import {
  upload,
  authentication,
  agendaAcademica,
  signup,
  universidade,
  evento,
} from '../reducers'

const thunk = store => next => action => {
  return typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)
}

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
})

const store = createStoreWithNavigation(
  combineReducers({
    navigation: NavigationReducer,
    form: formReducer,
    upload,
    authentication,
    agendaAcademica,
    signup,
    universidade,
    evento,
  }),
  applyMiddleware(thunk)
)

export default store
