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
import { fetchTurmas } from '../utilities/fetchHelpers'
import { setUpdate } from '../actions/TurmaActions'

class TurmasScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Turmas',
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  componentWillMount() {
    const { turma: { loaded }, dispatch, credentials } = this.props
    if (!loaded) fetchTurmas({ dispatch, credentials })
  }

  render() {
    const { dispatch, turma: { loading, list } } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>Lista de turmas</Text>
            <Text style={styles.subtitle}>
              Visualize e edite qualquer uma das turmas que você tem cadastrado
            </Text>
          </View>
          {!list.length ? (
            <EmptyList
              icon="insert-emoticon"
              message="Não há nenhuma turma cadastrada"
              buttonText="Comece cadastrando por aqui"
              buttonPress={this._goToScreen('turmasCreate')}
            />
          ) : list.map(turma => (
            <Card
              key={`turma-list-card-${turma.id}`}
              image={{
                uri:
                  turma.universidade.logo ||
                  `https://placeholdit.imgix.net/~text?txtsize=180&txt=${turma.universidade.abreviacao.toUpperCase()}&w=640&h=300&txttrack=0`
              }}
              imageStyle={{}}
              listItem={turma.representantes.map(representante => ({
                icon: 'person', text: `${representante.nome} ${representante.sobrenome}`,
              }))}
              universidadeName={turma.universidade.nome}
              unidadeName={turma.unidade.nome}
              cursoName={turma.curso.nome}
              turmaName={turma.nome}
              buttonIconName="edit"
              buttonText="EDITAR"
              buttonOnPress={() => {
                dispatch(setUpdate(turma))
                this.props.navigator.push(Router.getRoute('turmasCreate'))
              }}
            />
          ))}
        </ScrollView>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Adicionar turma"
            onPress={this._goToScreen('turmasCreate')}
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
  turma: state.turma,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(TurmasScreen)
