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
  ShareMaterialsCreateScreen,
  DisciplinasCreateScreen,
  EventosScreen,
  MyAccountFormScreen,
  ShareMaterialsScreen,
} from './screens'

const Router = createRouter(() => ({
  authentication: () => AuthenticationScreen,
  home: () => HomeScreen,
  user: () => AboutScreen,
  eventos: () => AboutScreen,
  calendario: () => CalendarioScreen,
  universidades: () => UniversidadesScreen,
  unidades: () => UnidadesScreen,
  cursos: () => CursosScreen,
  turmas: () => TurmasScreen,
  eventos: () => EventosScreen,
  shareMaterials: () => ShareMaterialsScreen,
  sobre: () => AboutScreen,

  loginForm: () => LoginFormScreen,
  signupForm: () => SignupFormScreen,
  eventoForm: () => EventoFormScreen,
  myAccountForm: () => MyAccountFormScreen,

  aulaCreate: () => AboutScreen,
  universidadesCreate: () => UniversidadesCreateScreen,
  unidadesCreate: () => UnidadesCreateScreen,
  cursosCreate: () => CursosCreateScreen,
  turmasCreate: () => TurmasCreateScreen,
  disciplinasCreate: () => DisciplinasCreateScreen,
  shareMaterialsCreate: () => ShareMaterialsCreateScreen,

  about: () => AboutScreen,
}))

export default Router
