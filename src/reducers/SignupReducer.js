import {
  REQUEST_SIGNUP,
  SUCCESS_SIGNUP,
  FAILURE_SIGNUP,
} from '../actions/SignupActions'

const initialState = {
  loading: false,
  loaded: false,
  errors: undefined,
}

export default SignupReducer = function(state = initialState, action) {
  switch(action.type) {
    case REQUEST_SIGNUP:
      return { ...state, loading: true }
    case SUCCESS_SIGNUP:
      return { ...state, loading: false, errors: undefined }
    case FAILURE_SIGNUP:
      return { ...state, loading: false, errors: action.errors }
    default:
      return state
  }
}
