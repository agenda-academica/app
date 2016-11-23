import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Icon,
} from 'react-native'
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation'
import { MaterialIcons } from '@exponent/vector-icons'
import ActionButton from 'react-native-action-button'

import Router from '../Router'
import { Card, EmptyList, Loading } from '../components'
import { fetchCursos } from '../utilities/fetchHelpers'
import { setUpdate } from '../actions/CursoActions'

class CursosScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Cursos',
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  componentWillMount() {
    const { curso: { loaded }, dispatch, credentials } = this.props
    if (!loaded) fetchCursos({ dispatch, credentials })
  }

  render() {
    const { dispatch, curso: { loading, list } } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>Lista de cursos</Text>
            <Text style={styles.subtitle}>
              Visualize e edite qualquer um dos cursos que você tem cadastrado
            </Text>
          </View>
          {!list.length ? (
            <EmptyList
              icon="school"
              message="Não há nenhum curso cadastrado"
              buttonText="Comece cadastrando por aqui"
              buttonPress={this._goToScreen('cursosCreate')}
            />
          ) : list.map(curso => (
            <Card
              key={`curso-list-card-${curso.id}`}
              image={{
                uri:
                  curso.universidade.logo ||
                  `https://placeholdit.imgix.net/~text?txtsize=180&txt=${curso.universidade.abreviacao.toUpperCase()}&w=640&h=300&txttrack=0`
              }}
              imageStyle={{}}
              universidadeName={curso.universidade.nome}
              unidadeName={curso.unidade.nome}
              cursoName={curso.nome}
              buttonIconName="edit"
              buttonText="EDITAR"
              buttonOnPress={() => {
                dispatch(setUpdate(curso))
                this.props.navigator.push(Router.getRoute('cursosCreate'))
              }}
            />
          ))}
        </ScrollView>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Adicionar curso"
            onPress={this._goToScreen('cursosCreate')}
          >
            <MaterialIcons name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <Loading show={loading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    color: '#aaa',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  tabIndicator: {
    backgroundColor: '#FFEB3B',
  },
})

const mapStateToProps = state => ({
  curso: state.curso,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(CursosScreen)
