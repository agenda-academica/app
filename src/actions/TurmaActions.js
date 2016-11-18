export const REQUEST_TURMA_CREATE = 'REQUEST_TURMA_CREATE'
export const SUCCESS_TURMA_CREATE = 'SUCCESS_TURMA_CREATE'
export const FAILURE_TURMA_CREATE = 'FAILURE_TURMA_CREATE'
export const requestTurmaCreate = () => ({ type: REQUEST_TURMA_CREATE })
export const successTurmaCreate = turma => ({ type: SUCCESS_TURMA_CREATE, turma })
export const failureTurmaCreate = error => ({ type: FAILURE_TURMA_CREATE, error })

export const REQUEST_TURMA_FETCH = 'REQUEST_TURMA_FETCH'
export const SUCCESS_TURMA_FETCH = 'SUCCESS_TURMA_FETCH'
export const FAILURE_TURMA_FETCH = 'FAILURE_TURMA_FETCH'
export const requestTurmaFetch = () => ({ type: REQUEST_TURMA_FETCH })
export const successTurmaFetch = turmas => ({ type: SUCCESS_TURMA_FETCH, turmas })
export const failureTurmaFetch = error => ({ type: FAILURE_TURMA_FETCH, error })

export const REQUEST_TURMA_UPDATE = 'REQUEST_TURMA_UPDATE'
export const SUCCESS_TURMA_UPDATE = 'SUCCESS_TURMA_UPDATE'
export const FAILURE_TURMA_UPDATE = 'FAILURE_TURMA_UPDATE'
export const requestTurmaUpdate = () => ({ type: REQUEST_TURMA_UPDATE })
export const successTurmaUpdate = turma => ({ type: SUCCESS_TURMA_UPDATE, turma })
export const failureTurmaUpdate = error => ({ type: FAILURE_TURMA_UPDATE, error })

export const REQUEST_TURMA_DESTROY = 'REQUEST_TURMA_DESTROY'
export const SUCCESS_TURMA_DESTROY = 'SUCCESS_TURMA_DESTROY'
export const FAILURE_TURMA_DESTROY = 'FAILURE_TURMA_DESTROY'
export const requestTurmaDestroy = () => ({ type: REQUEST_TURMA_DESTROY })
export const successTurmaDestroy = turma => ({ type: SUCCESS_TURMA_DESTROY, turma })
export const failureTurmaDestroy = error => ({ type: FAILURE_TURMA_DESTROY, error })

export const TURMA_PICKER_SET_SELECTED = 'TURMA_PICKER_SET_SELECTED'
export const setTurmaPickerSelected = selected => ({ type: TURMA_PICKER_SET_SELECTED, selected })
export const TURMA_SET_UPDATE = 'TURMA_SET_UPDATE'
export const setUpdate = update => ({ type: TURMA_SET_UPDATE, update })

export const TURMA_PUSH_REPRESENTANTE = 'TURMA_PUSH_REPRESENTANTE'
export const pushRepresentante = representante => ({ type: TURMA_PUSH_REPRESENTANTE, representante })
export const TURMA_POP_REPRESENTANTE = 'TURMA_POP_REPRESENTANTE'
export const popRepresentante = representante => ({ type: TURMA_POP_REPRESENTANTE, representante })
export const TURMA_SET_REPRESENTANTES = 'TURMA_SET_REPRESENTANTES'
export const setRepresentantes = representantes => ({ type: TURMA_SET_REPRESENTANTES, representantes })
