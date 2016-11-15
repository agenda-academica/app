import {
  EVENTO_ATTACH_TO_DISCIPLINA,
  EVENTO_SET_UNIVERSIDADE,
  EVENTO_SET_UNIDADE,
  EVENTO_SET_CURSO,
  EVENTO_SET_TURMA,
  EVENTO_SET_DISCIPLINA,
  EVENTO_SET_TYPE,
  EVENTO_SET_DATA_INICIO,
  EVENTO_SET_DATA_FIM,
  EVENTO_SET_HORA_INICIO,
  EVENTO_SET_HORA_FIM,
  EVENTO_SET_NOTIFY_PERIOD,
} from '../actions/EventoActions'

const initialState = {
  attach: false,
  eventoType: 0,
  dataInicio: new Date(),
  dataFim: new Date(),
  horaInicio: new Date(),
  horaFim: new Date(),
  notifyPeriod: 0,
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
    case EVENTO_SET_TYPE:
      return { ...state, eventoType: action.eventoType }
    case EVENTO_SET_DATA_INICIO:
      return { ...state, dataInicio: action.dataInicio }
    case EVENTO_SET_DATA_FIM:
      return { ...state, dataFim: action.dataFim }
    case EVENTO_SET_HORA_INICIO:
      return { ...state, horaInicio: action.horaInicio }
    case EVENTO_SET_HORA_FIM:
      return { ...state, horaFim: action.horaFim }
    case EVENTO_SET_NOTIFY_PERIOD:
      return { ...state, notifyPeriod: action.notifyPeriod }
    default:
      return state
  }
}
