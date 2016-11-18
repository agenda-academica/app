import {
  REQUEST_LOGIN_AUTHENTICATION,
  SUCCESS_LOGIN_AUTHENTICATION,
  FAILURE_LOGIN_AUTHENTICATION,

  REQUEST_MY_ACCOUNT_UPDATE,
  SUCCESS_MY_ACCOUNT_UPDATE,
  FAILURE_MY_ACCOUNT_UPDATE,

  REQUEST_MY_ACCOUNT_DESTROY,
  SUCCESS_MY_ACCOUNT_DESTROY,
  FAILURE_MY_ACCOUNT_DESTROY,

  MY_ACCOUNT_SET_SHOW_PASSWORD_FIELD,
} from '../actions/AuthenticationAction'

const initialState = {
  loading: false,
  loaded: false,
  error: null,
  hasAuthenticated: false,
  credentials: {},
  user: {},
  showPasswordField: false,
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
        user: action.user,
      }
    case FAILURE_LOGIN_AUTHENTICATION:
      return { ...state, loading: false, loaded: true, error: action.error }

    case REQUEST_MY_ACCOUNT_UPDATE:
      return { ...state, loading: true }
    case SUCCESS_MY_ACCOUNT_UPDATE:
      return { ...state, loading: false, loaded: true, user: action.user }
    case FAILURE_MY_ACCOUNT_UPDATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_MY_ACCOUNT_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_MY_ACCOUNT_DESTROY:
      return { ...state, loading: false, user: {} }
    case FAILURE_MY_ACCOUNT_DESTROY:
      return { ...state, loading: false, error: action.error }

    case MY_ACCOUNT_SET_SHOW_PASSWORD_FIELD:
      return { ...state, showPasswordField: action.show }
    default:
      return state
  }
}
