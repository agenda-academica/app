export const REQUEST_EVENTO_CREATE = 'REQUEST_EVENTO_CREATE'
export const SUCCESS_EVENTO_CREATE = 'SUCCESS_EVENTO_CREATE'
export const FAILURE_EVENTO_CREATE = 'FAILURE_EVENTO_CREATE'
export const requestEventoCreate = () => ({ type: REQUEST_EVENTO_CREATE })
export const successEventoCreate = evento => ({ type: SUCCESS_EVENTO_CREATE, evento })
export const failureEventoCreate = error => ({ type: FAILURE_EVENTO_CREATE, error })

export const REQUEST_EVENTO_FETCH = 'REQUEST_EVENTO_FETCH'
export const SUCCESS_EVENTO_FETCH = 'SUCCESS_EVENTO_FETCH'
export const FAILURE_EVENTO_FETCH = 'FAILURE_EVENTO_FETCH'
export const requestEventoFetch = () => ({ type: REQUEST_EVENTO_FETCH })
export const successEventoFetch = eventos => ({ type: SUCCESS_EVENTO_FETCH, eventos })
export const failureEventoFetch = error => ({ type: FAILURE_EVENTO_FETCH, error })

export const REQUEST_EVENTO_UPDATE = 'REQUEST_EVENTO_UPDATE'
export const SUCCESS_EVENTO_UPDATE = 'SUCCESS_EVENTO_UPDATE'
export const FAILURE_EVENTO_UPDATE = 'FAILURE_EVENTO_UPDATE'
export const requestEventoUpdate = () => ({ type: REQUEST_EVENTO_UPDATE })
export const successEventoUpdate = evento => ({ type: SUCCESS_EVENTO_UPDATE, evento })
export const failureEventoUpdate = error => ({ type: FAILURE_EVENTO_UPDATE, error })

export const REQUEST_EVENTO_DESTROY = 'REQUEST_EVENTO_DESTROY'
export const SUCCESS_EVENTO_DESTROY = 'SUCCESS_EVENTO_DESTROY'
export const FAILURE_EVENTO_DESTROY = 'FAILURE_EVENTO_DESTROY'
export const requestEventoDestroy = () => ({ type: REQUEST_EVENTO_DESTROY })
export const successEventoDestroy = evento => ({ type: SUCCESS_EVENTO_DESTROY, evento })
export const failureEventoDestroy = error => ({ type: FAILURE_EVENTO_DESTROY, error })

export const EVENTO_SET_UNIVERSIDADE = 'EVENTO_SET_UNIVERSIDADE'
export const setUniversidade = universidade => ({ type: EVENTO_SET_UNIVERSIDADE, universidade })
export const EVENTO_SET_UNIDADE = 'EVENTO_SET_UNIDADE'
export const setUnidade = unidade => ({ type: EVENTO_SET_UNIDADE, unidade })
export const EVENTO_SET_CURSO = 'EVENTO_SET_CURSO'
export const setCurso = curso => ({ type: EVENTO_SET_CURSO, curso })
export const EVENTO_SET_TURMA = 'EVENTO_SET_TURMA'
export const setTurma = turma => ({ type: EVENTO_SET_TURMA, turma })
export const EVENTO_SET_DISCIPLINA = 'EVENTO_SET_DISCIPLINA'
export const setDisciplina = disciplina => ({ type: EVENTO_SET_DISCIPLINA, disciplina })

export const EVENTO_SET_TYPE = 'EVENTO_SET_TYPE'
export const setType = eventoType => ({ type: EVENTO_SET_TYPE, eventoType })

export const EVENTO_SET_DATA_INICIO = 'EVENTO_SET_DATA_INICIO'
export const setDataInicio = dataInicio => ({ type: EVENTO_SET_DATA_INICIO, dataInicio })
export const EVENTO_SET_DATA_FIM = 'EVENTO_SET_DATA_FIM'
export const setDataFim = dataFim => ({ type: EVENTO_SET_DATA_FIM, dataFim })
export const EVENTO_SET_HORA_INICIO = 'EVENTO_SET_HORA_INICIO'
export const setHoraInicio = horaInicio => ({ type: EVENTO_SET_HORA_INICIO, horaInicio })
export const EVENTO_SET_HORA_FIM = 'EVENTO_SET_HORA_FIM'
export const setHoraFim = horaFim => ({ type: EVENTO_SET_HORA_FIM, horaFim })

export const EVENTO_SET_NOTIFY_PERIOD = 'EVENTO_SET_NOTIFY_PERIOD'
export const setNotifyPeriod = notifyPeriod => ({ type: EVENTO_SET_NOTIFY_PERIOD, notifyPeriod })

export const eventoTypes = ['Prova', 'Trabalho', 'Outros']
