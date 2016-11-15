export const REQUEST_DISCIPLINA_CREATE = 'REQUEST_DISCIPLINA_CREATE'
export const SUCCESS_DISCIPLINA_CREATE = 'SUCCESS_DISCIPLINA_CREATE'
export const FAILURE_DISCIPLINA_CREATE = 'FAILURE_DISCIPLINA_CREATE'
export const requestDisciplinaCreate = () => ({ type: REQUEST_DISCIPLINA_CREATE })
export const successDisciplinaCreate = disciplina => ({ type: SUCCESS_DISCIPLINA_CREATE, disciplina })
export const failureDisciplinaCreate = error => ({ type: FAILURE_DISCIPLINA_CREATE, error })

export const REQUEST_DISCIPLINA_FETCH = 'REQUEST_DISCIPLINA_FETCH'
export const SUCCESS_DISCIPLINA_FETCH = 'SUCCESS_DISCIPLINA_FETCH'
export const FAILURE_DISCIPLINA_FETCH = 'FAILURE_DISCIPLINA_FETCH'
export const requestDisciplinaFetch = () => ({ type: REQUEST_DISCIPLINA_FETCH })
export const successDisciplinaFetch = disciplinas => ({ type: SUCCESS_DISCIPLINA_FETCH, disciplinas })
export const failureDisciplinaFetch = error => ({ type: FAILURE_DISCIPLINA_FETCH, error })

export const REQUEST_DISCIPLINA_UPDATE = 'REQUEST_DISCIPLINA_UPDATE'
export const SUCCESS_DISCIPLINA_UPDATE = 'SUCCESS_DISCIPLINA_UPDATE'
export const FAILURE_DISCIPLINA_UPDATE = 'FAILURE_DISCIPLINA_UPDATE'
export const requestDisciplinaUpdate = () => ({ type: REQUEST_DISCIPLINA_UPDATE })
export const successDisciplinaUpdate = disciplina => ({ type: SUCCESS_DISCIPLINA_UPDATE, disciplina })
export const failureDisciplinaUpdate = error => ({ type: FAILURE_DISCIPLINA_UPDATE, error })

export const REQUEST_DISCIPLINA_DESTROY = 'REQUEST_DISCIPLINA_DESTROY'
export const SUCCESS_DISCIPLINA_DESTROY = 'SUCCESS_DISCIPLINA_DESTROY'
export const FAILURE_DISCIPLINA_DESTROY = 'FAILURE_DISCIPLINA_DESTROY'
export const requestDisciplinaDestroy = () => ({ type: REQUEST_DISCIPLINA_DESTROY })
export const successDisciplinaDestroy = disciplina => ({ type: SUCCESS_DISCIPLINA_DESTROY, disciplina })
export const failureDisciplinaDestroy = error => ({ type: FAILURE_DISCIPLINA_DESTROY, error })

export const DISCIPLINA_PICKER_SET_SELECTED = 'DISCIPLINA_PICKER_SET_SELECTED'
export const setDisciplinaPickerSelected = selected => ({ type: DISCIPLINA_PICKER_SET_SELECTED, selected })

export const DISCIPLINA_SET_HORA_INICIO = 'DISCIPLINA_SET_HORA_INICIO'
export const setHoraInicio = horaInicio => ({ type: DISCIPLINA_SET_HORA_INICIO, horaInicio })
export const DISCIPLINA_SET_HORA_FIM = 'DISCIPLINA_SET_HORA_FIM'
export const setHoraFim = horaFim => ({ type: DISCIPLINA_SET_HORA_FIM, horaFim })
export const DISCIPLINA_SET_DIA_SEMANA = 'DISCIPLINA_SET_DIA_SEMANA'
export const setDiaSemana = diaSemana => ({ type: DISCIPLINA_SET_DIA_SEMANA, diaSemana })
export const DISCIPLINA_SET_NOTIFY_AT = 'DISCIPLINA_SET_NOTIFY_AT'
export const setNotifyAt = notifyAt => ({ type: DISCIPLINA_SET_NOTIFY_AT, notifyAt })
