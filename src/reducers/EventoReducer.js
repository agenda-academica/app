import {
  EVENTO_ATTACH_TO_DISCIPLINA,
  EVENTO_SET_UNIVERSIDADE,
  EVENTO_SET_UNIDADE,
  EVENTO_SET_CURSO,
  EVENTO_SET_TURMA,
  EVENTO_SET_DISCIPLINA,
} from '../actions/EventoActions'

const initialState = {
  attach: false,
}

export default EventoReducer = function(state = initialState, action) {
  switch(action.type) {
    case EVENTO_ATTACH_TO_DISCIPLINA:
      return { ...state, attach: action.attach }
    case EVENTO_SET_UNIVERSIDADE:
      return { ...state, universidade: action.universidade }
    case EVENTO_SET_UNIDADE:
      return { ...state, unidade: action.unidade }
    case EVENTO_SET_CURSO:
      return { ...state, curso: action.curso }
    case EVENTO_SET_TURMA:
      return { ...state, turma: action.turma }
    case EVENTO_SET_DISCIPLINA:
      return { ...state, disciplina: action.disciplina }
    default:
      return state
  }
}
