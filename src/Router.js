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
  RepresentanteCreateScreen,
  ShareMaterialCreateScreen,
  DisciplinasCreateScreen,
  EventosScreen,
} from './screens'

const Router = createRouter(() => ({
  authentication: () => CalendarioScreen,
  // authentication: () => AuthenticationScreen,
  home: () => HomeScreen,
  user: () => AboutScreen,
  eventos: () => AboutScreen,
  calendario: () => CalendarioScreen,
  universidades: () => UniversidadesScreen,
  unidades: () => UnidadesScreen,
  cursos: () => CursosScreen,
  turmas: () => TurmasScreen,
  eventos: () => EventosScreen,
  representantes: () => RepresentanteCreateScreen,
  shareMaterial: () => ShareMaterialCreateScreen,
  sobre: () => AboutScreen,

  loginForm: () => LoginFormScreen,
  signupForm: () => SignupFormScreen,
  eventoForm: () => EventoFormScreen,

  aulaCreate: () => AboutScreen,
  universidadesCreate: () => UniversidadesCreateScreen,
  unidadesCreate: () => UnidadesCreateScreen,
  cursosCreate: () => CursosCreateScreen,
  turmasCreate: () => TurmasCreateScreen,
  disciplinasCreate: () => DisciplinasCreateScreen,

  about: () => AboutScreen,
}))

export default Router
