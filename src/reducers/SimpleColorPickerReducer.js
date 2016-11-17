import {
  SIMPLE_COLOR_PICKER_SET_SHOW,
  SIMPLE_COLOR_PICKER_SET_SELECTED,
} from '../actions/SimpleColorPickerActions'
import { colors } from '../components/SimpleColorPicker'

const initialState = {
  show: false,
  selected: colors[0][0],
}

export default SimpleColorPickerReducer = function(state = initialState, action) {
  switch(action.type) {
    case SIMPLE_COLOR_PICKER_SET_SHOW:
      return { ...state, show: action.show }
    case SIMPLE_COLOR_PICKER_SET_SELECTED:
      return { ...state, selected: action.selected }
    default:
      return state
  }
}
