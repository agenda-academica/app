import {
  CALENDARIO_SET_MODAL_VISIBLE,
  CALENDARIO_SET_SELECTED_DATE,
} from '../actions/CalendarioActions'
import { notifications } from '../constants/shared'

const initialState = {
  loading: false,
  loaded: false,
  list: [],
  modalVisible: false,
  selectedDate: new Date(),
}

export default CalendarioReducer = function(state = initialState, action) {
  switch(action.type) {
    case CALENDARIO_SET_MODAL_VISIBLE:
      return { ...state, modalVisible: action.visible }
    case CALENDARIO_SET_SELECTED_DATE:
      return { ...state, selectedDate: action.date }
    default:
      return state
  }
}
