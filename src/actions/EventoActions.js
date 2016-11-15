export const EVENTO_ATTACH_TO_DISCIPLINA = 'EVENTO_ATTACH_TO_DISCIPLINA'
export const attachToDisciplina = attach => ({ type: EVENTO_ATTACH_TO_DISCIPLINA, attach })

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
