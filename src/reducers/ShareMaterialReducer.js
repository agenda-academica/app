import {
  SHARE_MATERIAL_PUSH_MATERIAL,
  SHARE_MATERIAL_POP_MATERIAL,
  SHARE_MATERIAL_SET_SELECTED,
} from '../actions/ShareMaterialActions'

const initialState = {
  loading: false,
  loaded: false,
  list: [],
  selected: undefined,
}

export default ShareMaterialReducer = function(state = initialState, action) {
  let index
  let list

  switch(action.type) {
    case SHARE_MATERIAL_PUSH_MATERIAL:
      return { ...state, list: [...state.list, action.material] }
    case SHARE_MATERIAL_POP_MATERIAL:
      index = state.list.findIndex(item => item === action.material)
      return { ...state, list: [...state.list.slice(0, index), ...state.list.slice(index + 1)] }
    case SHARE_MATERIAL_SET_SELECTED:
      return { ...state, selected: action.selected }
    default:
      return state
  }
}
