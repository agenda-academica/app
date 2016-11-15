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
import { fetchUnidades } from '../utilities/fetchHelpers'

class UnidadesScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Unidades',
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  componentWillMount() {
    const { unidade: { loaded }, dispatch, credentials } = this.props
    if (!loaded) fetchUnidades({ dispatch, credentials })
  }

  render() {
    const { unidade: { loading, list } } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>Lista de unidades</Text>
            <Text style={styles.subtitle}>
              Visualize e edite qualquer uma das unidades que você tem cadastrado
            </Text>
          </View>
          {!list.length ? (
            <EmptyList
              icon="place"
              message="Não há nenhuma unidade cadastrada"
              buttonText="Comece cadastrando por aqui"
              buttonPress={this._goToScreen('unidadesCreate')}
            />
          ) : list.map(unidade => (
            <Card
              key={`unidade-list-card-${unidade.id}`}
              image={{
                uri:
                  unidade.universidade.logo ||
                  `https://placeholdit.imgix.net/~text?txtsize=180&txt=${unidade.universidade.abreviacao.toUpperCase()}&w=640&h=300&txttrack=0`
              }}
              imageStyle={{}}
              universidadeName={unidade.universidade.nome}
              unidadeName={unidade.nome}
              buttonIconName="edit"
              buttonText="EDITAR"
              buttonOnPress={() => {
                this.props.navigator.push(Router.getRoute('unidadesCreate', unidade))
              }}
            />
          ))}
        </ScrollView>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Adicionar unidade"
            onPress={this._goToScreen('unidadesCreate')}
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
  unidade: state.unidade,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(UnidadesScreen)
