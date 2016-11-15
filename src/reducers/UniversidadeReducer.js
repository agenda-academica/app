import {
  REQUEST_UNIVERSIDADE_CREATE,
  SUCCESS_UNIVERSIDADE_CREATE,
  FAILURE_UNIVERSIDADE_CREATE,

  REQUEST_UNIVERSIDADE_FETCH,
  SUCCESS_UNIVERSIDADE_FETCH,
  FAILURE_UNIVERSIDADE_FETCH,

  REQUEST_UNIVERSIDADE_UPDATE,
  SUCCESS_UNIVERSIDADE_UPDATE,
  FAILURE_UNIVERSIDADE_UPDATE,

  REQUEST_UNIVERSIDADE_DESTROY,
  SUCCESS_UNIVERSIDADE_DESTROY,
  FAILURE_UNIVERSIDADE_DESTROY,

  UNIVERSIDADE_PICKER_SET_SELECTED,
} from '../actions/UniversidadeActions'

export const initialPickerItem = { id: 0, abreviacao: '----------' }

const initialState = {
  loading: false,
  loaded: false,
  list: [],
  pickerSelected: initialPickerItem,
}

export default UniversidadeReducer = function(state = initialState, action) {
  let index
  let list
  switch (action.type) {

    case REQUEST_UNIVERSIDADE_CREATE:
      return { ...state, loading: true }
    case SUCCESS_UNIVERSIDADE_CREATE:
      return { ...state, loading: false, list: [...state.list, action.universidade] }
    case FAILURE_UNIVERSIDADE_CREATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_UNIVERSIDADE_FETCH:
      return { ...state, loading: true }
    case SUCCESS_UNIVERSIDADE_FETCH:
      return { ...state, loading: false, loaded: true, list: action.universidades }
    case FAILURE_UNIVERSIDADE_FETCH:
      return { ...state, loading: false, error: action.error }

    case REQUEST_UNIVERSIDADE_UPDATE:
      return { ...state, loading: true }
    case SUCCESS_UNIVERSIDADE_UPDATE:
      index = state.list.findIndex(item => item.id === action.universidade.id)
      list = [
        ...state.list.slice(0, index),
        action.universidade,
        ...state.list.slice(index + 1)
      ]
      return { ...state, loading: false, loaded: true, list }
    case FAILURE_UNIVERSIDADE_UPDATE:
      return { ...state, loading: false, error: action.error }

    case REQUEST_UNIVERSIDADE_DESTROY:
      return { ...state, loading: true }
    case SUCCESS_UNIVERSIDADE_DESTROY:
      index = state.list.findIndex(item => item.id === action.universidade.id)
      list = [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      return { ...state, loading: false, list }
    case FAILURE_UNIVERSIDADE_DESTROY:
      return { ...state, loading: false, error: action.error }

    case UNIVERSIDADE_PICKER_SET_SELECTED:
      return { ...state, pickerSelected: action.selected }

    default:
      return state
  }
}
