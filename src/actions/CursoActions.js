export const REQUEST_CURSO_CREATE = 'REQUEST_CURSO_CREATE'
export const SUCCESS_CURSO_CREATE = 'SUCCESS_CURSO_CREATE'
export const FAILURE_CURSO_CREATE = 'FAILURE_CURSO_CREATE'
export const requestCursoCreate = () => ({ type: REQUEST_CURSO_CREATE })
export const successCursoCreate = curso => ({ type: SUCCESS_CURSO_CREATE, curso })
export const failureCursoCreate = error => ({ type: FAILURE_CURSO_CREATE, error })

export const REQUEST_CURSO_FETCH = 'REQUEST_CURSO_FETCH'
export const SUCCESS_CURSO_FETCH = 'SUCCESS_CURSO_FETCH'
export const FAILURE_CURSO_FETCH = 'FAILURE_CURSO_FETCH'
export const requestCursoFetch = () => ({ type: REQUEST_CURSO_FETCH })
export const successCursoFetch = cursos => ({ type: SUCCESS_CURSO_FETCH, cursos })
export const failureCursoFetch = error => ({ type: FAILURE_CURSO_FETCH, error })

export const REQUEST_CURSO_UPDATE = 'REQUEST_CURSO_UPDATE'
export const SUCCESS_CURSO_UPDATE = 'SUCCESS_CURSO_UPDATE'
export const FAILURE_CURSO_UPDATE = 'FAILURE_CURSO_UPDATE'
export const requestCursoUpdate = () => ({ type: REQUEST_CURSO_UPDATE })
export const successCursoUpdate = curso => ({ type: SUCCESS_CURSO_UPDATE, curso })
export const failureCursoUpdate = error => ({ type: FAILURE_CURSO_UPDATE, error })

export const REQUEST_CURSO_DESTROY = 'REQUEST_CURSO_DESTROY'
export const SUCCESS_CURSO_DESTROY = 'SUCCESS_CURSO_DESTROY'
export const FAILURE_CURSO_DESTROY = 'FAILURE_CURSO_DESTROY'
export const requestCursoDestroy = () => ({ type: REQUEST_CURSO_DESTROY })
export const successCursoDestroy = curso => ({ type: SUCCESS_CURSO_DESTROY, curso })
export const failureCursoDestroy = error => ({ type: FAILURE_CURSO_DESTROY, error })

export const CURSO_PICKER_SET_SELECTED = 'CURSO_PICKER_SET_SELECTED'
export const setCursoPickerSelected = selected => ({ type: CURSO_PICKER_SET_SELECTED, selected })
export const CURSO_SET_UPDATE = 'CURSO_SET_UPDATE'
export const setUpdate = update => ({ type: CURSO_SET_UPDATE, update })
