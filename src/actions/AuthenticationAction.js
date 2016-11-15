export const REQUEST_LOGIN_AUTHENTICATION = 'REQUEST_LOGIN_AUTHENTICATION'
export const SUCCESS_LOGIN_AUTHENTICATION = 'SUCCESS_LOGIN_AUTHENTICATION'
export const FAILURE_LOGIN_AUTHENTICATION = 'FAILURE_LOGIN_AUTHENTICATION'

export const requestLoginAuthentication = () => ({ type: REQUEST_LOGIN_AUTHENTICATION })
export const successLoginAuthentication = credentials => ({ type: SUCCESS_LOGIN_AUTHENTICATION, credentials })
export const failureLoginAuthentication = error => ({ type: FAILURE_LOGIN_AUTHENTICATION, error })
