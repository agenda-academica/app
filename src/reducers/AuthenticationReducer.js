import {
  REQUEST_LOGIN_AUTHENTICATION,
  SUCCESS_LOGIN_AUTHENTICATION,
  FAILURE_LOGIN_AUTHENTICATION,
} from '../actions/AuthenticationAction'

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  hasAuthenticated: false,
  credentials: {},
}

export default AuthenticationReducer = function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN_AUTHENTICATION:
      return { ...state, loading: true }
    case SUCCESS_LOGIN_AUTHENTICATION:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        hasAuthenticated: true,
        credentials: action.credentials,
      }
    case FAILURE_LOGIN_AUTHENTICATION:
      return { ...state, loading: false, loaded: true, error: action.error }
    default:
      return state
  }
}
