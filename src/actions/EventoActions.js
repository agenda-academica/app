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
export const setType = eventoType => ({ type: EVENTO_SET_UNIVERSIDADE, eventoType })
