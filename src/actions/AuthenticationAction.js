export const REQUEST_LOGIN_AUTHENTICATION = 'REQUEST_LOGIN_AUTHENTICATION'
export const SUCCESS_LOGIN_AUTHENTICATION = 'SUCCESS_LOGIN_AUTHENTICATION'
export const FAILURE_LOGIN_AUTHENTICATION = 'FAILURE_LOGIN_AUTHENTICATION'
export const requestLoginAuthentication = () => ({ type: REQUEST_LOGIN_AUTHENTICATION })
export const successLoginAuthentication = ({ user, credentials }) => ({ type: SUCCESS_LOGIN_AUTHENTICATION, credentials, user })
export const failureLoginAuthentication = error => ({ type: FAILURE_LOGIN_AUTHENTICATION, error })

export const REQUEST_MY_ACCOUNT_UPDATE = 'REQUEST_MY_ACCOUNT_UPDATE'
export const SUCCESS_MY_ACCOUNT_UPDATE = 'SUCCESS_MY_ACCOUNT_UPDATE'
export const FAILURE_MY_ACCOUNT_UPDATE = 'FAILURE_MY_ACCOUNT_UPDATE'
export const requestMyAccountUpdate = () => ({ type: REQUEST_MY_ACCOUNT_UPDATE })
export const successMyAccountUpdate = user => ({ type: SUCCESS_MY_ACCOUNT_UPDATE, user })
export const failureMyAccountUpdate = error => ({ type: FAILURE_MY_ACCOUNT_UPDATE, error })

export const REQUEST_MY_ACCOUNT_DESTROY = 'REQUEST_MY_ACCOUNT_DESTROY'
export const SUCCESS_MY_ACCOUNT_DESTROY = 'SUCCESS_MY_ACCOUNT_DESTROY'
export const FAILURE_MY_ACCOUNT_DESTROY = 'FAILURE_MY_ACCOUNT_DESTROY'
export const requestMyAccountDestroy = () => ({ type: REQUEST_MY_ACCOUNT_DESTROY })
export const successMyAccountDestroy = user => ({ type: SUCCESS_MY_ACCOUNT_DESTROY, user })
export const failureMyAccountDestroy = error => ({ type: FAILURE_MY_ACCOUNT_DESTROY, error })

export const MY_ACCOUNT_SET_SHOW_PASSWORD_FIELD = 'MY_ACCOUNT_SET_SHOW_PASSWORD_FIELD'
export const setShowPasswordField = show => ({ type: MY_ACCOUNT_SET_SHOW_PASSWORD_FIELD, show })

export const QQQ_SET_FILE = 'QQQ_SET_FILE'
export const setFile = file => ({ type: QQQ_SET_FILE, file })
