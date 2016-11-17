import {
  REQUEST_EVENTO_CREATE,
  SUCCESS_EVENTO_CREATE,
  FAILURE_EVENTO_CREATE,

  REQUEST_EVENTO_FETCH,
  SUCCESS_EVENTO_FETCH,
  FAILURE_EVENTO_FETCH,

  REQUEST_EVENTO_UPDATE,
  SUCCESS_EVENTO_UPDATE,
  FAILURE_EVENTO_UPDATE,

  REQUEST_EVENTO_DESTROY,
  SUCCESS_EVENTO_DESTROY,
  FAILURE_EVENTO_DESTROY,

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
  loading: false,
  loaded: false,
  list: [],
  eventoType: 0,
  dataInicio: new Date(),
  dataFim: new Date(),
  horaInicio: new Date(),
  horaFim: new Date(),
  notifyPeriod: 0,
}

export default EventoReducer = function(state = initialState, action) {
  switch(action.type) {
    case REQUEST_EVENTO_CREATE:
      return { ...state, loading: true }
    case SUCCESS_EVENTO_CREATE:
      return { ...state, loading: false, list: [...state.list, action.evento] }
    case FAILURE_EVENTO_CREATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_EVENTO_FETCH:
      return { ...state, loading: true }
    case SUCCESS_EVENTO_FETCH:
      return { ...state, loading: false, loaded: true, list: action.eventos }
    case FAILURE_EVENTO_FETCH:
      return { ...state, loading: false, error: action.error }

    case REQUEST_EVENTO_UPDATE:
      return { ...state, loading: true }
    case SUCCESS_EVENTO_UPDATE:
      index = state.list.findIndex(item => item.id === action.evento.id)
      list = [
        ...state.list.slice(0, index),
        action.evento,
        ...state.list.slice(index + 1)
      ]
      return { ...state, loading: false, loaded: true, list }
    case FAILURE_EVENTO_UPDATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_EVENTO_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_EVENTO_DESTROY:
      index = state.list.findIndex(item => item.id === action.evento.id)
      list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      return { ...state, loading: false, list }
    case FAILURE_EVENTO_DESTROY:
      return { ...state, loading: false, error: action.error }

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
