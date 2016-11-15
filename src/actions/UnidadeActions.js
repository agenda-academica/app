export const REQUEST_UNIDADE_CREATE = 'REQUEST_UNIDADE_CREATE'
export const SUCCESS_UNIDADE_CREATE = 'SUCCESS_UNIDADE_CREATE'
export const FAILURE_UNIDADE_CREATE = 'FAILURE_UNIDADE_CREATE'
export const requestUnidadeCreate = () => ({ type: REQUEST_UNIDADE_CREATE })
export const successUnidadeCreate = unidade => ({ type: SUCCESS_UNIDADE_CREATE, unidade })
export const failureUnidadeCreate = error => ({ type: FAILURE_UNIDADE_CREATE, error })

export const REQUEST_UNIDADE_FETCH = 'REQUEST_UNIDADE_FETCH'
export const SUCCESS_UNIDADE_FETCH = 'SUCCESS_UNIDADE_FETCH'
export const FAILURE_UNIDADE_FETCH = 'FAILURE_UNIDADE_FETCH'
export const requestUnidadeFetch = () => ({ type: REQUEST_UNIDADE_FETCH })
export const successUnidadeFetch = unidades => ({ type: SUCCESS_UNIDADE_FETCH, unidades })
export const failureUnidadeFetch = error => ({ type: FAILURE_UNIDADE_FETCH, error })

export const REQUEST_UNIDADE_UPDATE = 'REQUEST_UNIDADE_UPDATE'
export const SUCCESS_UNIDADE_UPDATE = 'SUCCESS_UNIDADE_UPDATE'
export const FAILURE_UNIDADE_UPDATE = 'FAILURE_UNIDADE_UPDATE'
export const requestUnidadeUpdate = () => ({ type: REQUEST_UNIDADE_UPDATE })
export const successUnidadeUpdate = unidade => ({ type: SUCCESS_UNIDADE_UPDATE, unidade })
export const failureUnidadeUpdate = error => ({ type: FAILURE_UNIDADE_UPDATE, error })

export const REQUEST_UNIDADE_DESTROY = 'REQUEST_UNIDADE_DESTROY'
export const SUCCESS_UNIDADE_DESTROY = 'SUCCESS_UNIDADE_DESTROY'
export const FAILURE_UNIDADE_DESTROY = 'FAILURE_UNIDADE_DESTROY'
export const requestUnidadeDestroy = () => ({ type: REQUEST_UNIDADE_DESTROY })
export const successUnidadeDestroy = unidade => ({ type: SUCCESS_UNIDADE_DESTROY, unidade })
export const failureUnidadeDestroy = error => ({ type: FAILURE_UNIDADE_DESTROY, error })

export const UNIDADE_SET_UNIDADE_SEDE = 'UNIDADE_SET_UNIDADE_SEDE'
export const setUnidadeSede = unidadeSede => ({ type: UNIDADE_SET_UNIDADE_SEDE, unidadeSede })

export const UNIDADE_PICKER_SET_SELECTED = 'UNIDADE_PICKER_SET_SELECTED'
export const setUnidadePickerSelected = selected => ({ type: UNIDADE_PICKER_SET_SELECTED, selected })
