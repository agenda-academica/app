import {
  REQUEST_TURMA_CREATE,
  SUCCESS_TURMA_CREATE,
  FAILURE_TURMA_CREATE,

  REQUEST_TURMA_FETCH,
  SUCCESS_TURMA_FETCH,
  FAILURE_TURMA_FETCH,

  REQUEST_TURMA_UPDATE,
  SUCCESS_TURMA_UPDATE,
  FAILURE_TURMA_UPDATE,

  REQUEST_TURMA_DESTROY,
  SUCCESS_TURMA_DESTROY,
  FAILURE_TURMA_DESTROY,

  TURMA_PICKER_SET_SELECTED,
  TURMA_SET_UPDATE,

  TURMA_PUSH_REPRESENTANTE,
  TURMA_POP_REPRESENTANTE,
  TURMA_SET_REPRESENTANTES,
} from '../actions/TurmaActions'

export const initialPickerItem = { id: 0, nome: '----------', curso: {} }

const initialState = {
  loading: false,
  loaded: false,
  list: [],
  pickerSelected: initialPickerItem,
  representantes: [],
  update: {},
}

export default TurmaReducer = function(state = initialState, action) {
  let index
  let list
  let representantes
  switch (action.type) {

    case REQUEST_TURMA_CREATE:
      return { ...state, loading: true }
    case SUCCESS_TURMA_CREATE:
      return { ...state, loading: false, list: [...state.list, action.turma] }
    case FAILURE_TURMA_CREATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_TURMA_FETCH:
      return { ...state, loading: true }
    case SUCCESS_TURMA_FETCH:
      return { ...state, loading: false, loaded: true, list: action.turmas }
    case FAILURE_TURMA_FETCH:
      return { ...state, loading: false, error: action.error }

    case REQUEST_TURMA_UPDATE:
      return { ...state, loading: true }
    case SUCCESS_TURMA_UPDATE:
      index = state.list.findIndex(item => item.id === action.turma.id)
      list = [
        ...state.list.slice(0, index),
        action.turma,
        ...state.list.slice(index + 1)
      ]
      return { ...state, loading: false, loaded: true, list }
    case FAILURE_TURMA_UPDATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_TURMA_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_TURMA_DESTROY:
      index = state.list.findIndex(item => item.id === action.turma.id)
      list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      return { ...state, loading: false, list }
    case FAILURE_TURMA_DESTROY:
      return { ...state, loading: false, error: action.error }

    case TURMA_PICKER_SET_SELECTED:
      return { ...state, pickerSelected: action.selected }
    case TURMA_SET_UPDATE:
      return { ...state, update: action.update }

    case TURMA_PUSH_REPRESENTANTE:
      return { ...state, representantes: [...state.representantes, action.representante] }
    case TURMA_POP_REPRESENTANTE:
      index = state.representantes.findIndex(item => item === action.representante)
      representantes = [
        ...state.representantes.slice(0, index),
        ...state.representantes.slice(index + 1),
      ]
      return { ...state, representantes }
    case TURMA_SET_REPRESENTANTES:
      return { ...state, representantes: action.representantes }

    default:
      return state
  }
}
