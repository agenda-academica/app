export const REQUEST_UNIVERSIDADE_CREATE = 'REQUEST_UNIVERSIDADE_CREATE'
export const SUCCESS_UNIVERSIDADE_CREATE = 'SUCCESS_UNIVERSIDADE_CREATE'
export const FAILURE_UNIVERSIDADE_CREATE = 'FAILURE_UNIVERSIDADE_CREATE'
export const requestUniversidadeCreate = () => ({ type: REQUEST_UNIVERSIDADE_CREATE })
export const successUniversidadeCreate = universidade =>
  ({ type: SUCCESS_UNIVERSIDADE_CREATE, universidade })
export const failureUniversidadeCreate = error => ({ type: FAILURE_UNIVERSIDADE_CREATE, error })

export const REQUEST_UNIVERSIDADE_FETCH = 'REQUEST_UNIVERSIDADE_FETCH'
export const SUCCESS_UNIVERSIDADE_FETCH = 'SUCCESS_UNIVERSIDADE_FETCH'
export const FAILURE_UNIVERSIDADE_FETCH = 'FAILURE_UNIVERSIDADE_FETCH'
export const requestUniversidadeFetch = () => ({ type: REQUEST_UNIVERSIDADE_FETCH })
export const successUniversidadeFetch = universidades =>
  ({ type: SUCCESS_UNIVERSIDADE_FETCH, universidades })
export const failureUniversidadeFetch = error => ({ type: FAILURE_UNIVERSIDADE_FETCH, error })

export const REQUEST_UNIVERSIDADE_UPDATE = 'REQUEST_UNIVERSIDADE_UPDATE'
export const SUCCESS_UNIVERSIDADE_UPDATE = 'SUCCESS_UNIVERSIDADE_UPDATE'
export const FAILURE_UNIVERSIDADE_UPDATE = 'FAILURE_UNIVERSIDADE_UPDATE'
export const requestUniversidadeUpdate = () => ({ type: REQUEST_UNIVERSIDADE_UPDATE })
export const successUniversidadeUpdate = universidade =>
  ({ type: SUCCESS_UNIVERSIDADE_UPDATE, universidade })
export const failureUniversidadeUpdate = error => ({ type: FAILURE_UNIVERSIDADE_UPDATE, error })

export const REQUEST_UNIVERSIDADE_DESTROY = 'REQUEST_UNIVERSIDADE_DESTROY'
export const SUCCESS_UNIVERSIDADE_DESTROY = 'SUCCESS_UNIVERSIDADE_DESTROY'
export const FAILURE_UNIVERSIDADE_DESTROY = 'FAILURE_UNIVERSIDADE_DESTROY'
export const requestUniversidadeDestroy = () => ({ type: REQUEST_UNIVERSIDADE_DESTROY })
export const successUniversidadeDestroy = universidade =>
  ({ type: SUCCESS_UNIVERSIDADE_DESTROY, universidade })
export const failureUniversidadeDestroy = error => ({ type: FAILURE_UNIVERSIDADE_DESTROY, error })

export const UNIVERSIDADE_PICKER_SET_SELECTED = 'UNIVERSIDADE_PICKER_SET_SELECTED'
export const setUniversidadePickerSelected = selected =>
  ({ type: UNIVERSIDADE_PICKER_SET_SELECTED, selected })
