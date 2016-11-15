import { AGENDA_ACADEMICA_SET_BOOTSTRAPPED } from '../actions/AgendaAcademicaActions'

const initialState = {
  bootstrapped: false,
}

export default AgendaAcademicaReducer = function(state = initialState, action) {
  switch(action.type) {
    case AGENDA_ACADEMICA_SET_BOOTSTRAPPED:
      return { ...state, bootstrapped: action.bootstrapped }
    default:
      return state
  }
}
