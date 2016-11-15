import { createRouter } from '@exponent/ex-navigation'

import AboutScreen from '../components/AboutScreen'
import {
  HomeScreen,
  CalendarioScreen,
  UniversidadesScreen,
  UnidadesScreen,
  CursosScreen,
  TurmasScreen,
  UniversidadesCreateScreen,
  UnidadesCreateScreen,
  CursosCreateScreen,
  TurmasCreateScreen,
  AuthenticationScreen,
  LoginFormScreen,
  SignupFormScreen,
  EventoFormScreen,
} from './screens'

const Router = createRouter(() => ({
  // authentication: () => EventoFormScreen,
  authentication: () => AuthenticationScreen,
  home: () => HomeScreen,
  user: () => AboutScreen,
  eventos: () => AboutScreen,
  calendario: () => CalendarioScreen,
  universidades: () => UniversidadesScreen,
  unidades: () => UnidadesScreen,
  cursos: () => CursosScreen,
  turmas: () => TurmasScreen,
  sobre: () => AboutScreen,

  loginForm: () => LoginFormScreen,
  signupForm: () => SignupFormScreen,
  eventoForm: () => EventoFormScreen,

  aulaCreate: () => AboutScreen,
  universidadesCreate: () => UniversidadesCreateScreen,
  unidadesCreate: () => UnidadesCreateScreen,
  cursosCreate: () => CursosCreateScreen,
  turmasCreate: () => TurmasCreateScreen,

  about: () => AboutScreen,
}))

export default Router
