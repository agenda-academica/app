export const REQUEST_SIGNUP = 'REQUEST_SIGNUP'
export const SUCCESS_SIGNUP = 'SUCCESS_SIGNUP'
export const FAILURE_SIGNUP = 'FAILURE_SIGNUP'

export const requestSignup = () => ({ type: REQUEST_SIGNUP })
export const successSignup = () => ({ type: SUCCESS_SIGNUP })
export const failureSignup = errors => ({ type: FAILURE_SIGNUP, errors })
