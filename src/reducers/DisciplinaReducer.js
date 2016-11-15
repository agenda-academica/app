import {
  REQUEST_DISCIPLINA_CREATE,
  SUCCESS_DISCIPLINA_CREATE,
  FAILURE_DISCIPLINA_CREATE,

  REQUEST_DISCIPLINA_FETCH,
  SUCCESS_DISCIPLINA_FETCH,
  FAILURE_DISCIPLINA_FETCH,

  REQUEST_DISCIPLINA_UPDATE,
  SUCCESS_DISCIPLINA_UPDATE,
  FAILURE_DISCIPLINA_UPDATE,

  REQUEST_DISCIPLINA_DESTROY,
  SUCCESS_DISCIPLINA_DESTROY,
  FAILURE_DISCIPLINA_DESTROY,

  DISCIPLINA_PICKER_SET_SELECTED,

  DISCIPLINA_SET_HORA_INICIO,
  DISCIPLINA_SET_HORA_FIM,
  DISCIPLINA_SET_DIA_SEMANA,
  DISCIPLINA_SET_NOTIFY_AT,
} from '../actions/DisciplinaActions'
import { weekdays, notifications } from '../constants/shared'

export const initialPickerItem = { id: 0, nome: '----------', turma: {} }

const initialState = {
  loading: false,
  loaded: false,
  list: [],
  horaInicio: new Date(),
  horaFim: new Date(),
  pickerSelected: initialPickerItem,
  diaSemana: weekdays[0].value,
  notifyAt: notifications[0].value,
}

export default DisciplinaReducer = function(state = initialState, action) {
  let index
  let list
  switch (action.type) {

    case REQUEST_DISCIPLINA_CREATE:
      return { ...state, loading: true }
    case SUCCESS_DISCIPLINA_CREATE:
      return { ...state, loading: false, list: [...state.list, action.disciplina] }
    case FAILURE_DISCIPLINA_CREATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_DISCIPLINA_FETCH:
      return { ...state, loading: true }
    case SUCCESS_DISCIPLINA_FETCH:
      return { ...state, loading: false, loaded: true, list: action.disciplinas }
    case FAILURE_DISCIPLINA_FETCH:
      return { ...state, loading: false, error: action.error }

    case REQUEST_DISCIPLINA_UPDATE:
      return { ...state, loading: true }
    case SUCCESS_DISCIPLINA_UPDATE:
      index = state.list.findIndex(item => item.id === action.disciplina.id)
      list = [
        ...state.list.slice(0, index),
        action.disciplina,
        ...state.list.slice(index + 1)
      ]
      return { ...state, loading: false, loaded: true, list }
    case FAILURE_DISCIPLINA_UPDATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_DISCIPLINA_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_DISCIPLINA_DESTROY:
      index = state.list.findIndex(item => item.id === action.disciplina.id)
      list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      return { ...state, loading: false, list }
    case FAILURE_DISCIPLINA_DESTROY:
      return { ...state, loading: false, error: action.error }

    case DISCIPLINA_PICKER_SET_SELECTED:
      return { ...state, pickerSelected: action.selected }

    case DISCIPLINA_SET_HORA_INICIO:
      return { ...state, horaInicio: action.horaInicio }
    case DISCIPLINA_SET_HORA_FIM:
      return { ...state, horaFim: action.horaFim }
    case DISCIPLINA_SET_DIA_SEMANA:
      return { ...state, diaSemana: action.diaSemana }
    case DISCIPLINA_SET_NOTIFY_AT:
      return { ...state, notifyAt: action.notifyAt }

    default:
      return state
  }
}
