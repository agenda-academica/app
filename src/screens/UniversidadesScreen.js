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
import { Button } from 'react-native-elements'

import Router from '../Router'
import { Card, Loading, EmptyList } from '../components'
import { API_URL } from '../constants/api'
import { applicationJSON } from '../utilities/requestHelpers'
import { fetchUniversidades } from '../utilities/fetchHelpers'

class UniversidadesScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Universidades',
    },
  }

  componentDidMount() {
    const { loaded, dispatch, credentials } = this.props
    !loaded && fetchUniversidades({ dispatch, credentials })
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  render() {
    const { universidade: { loading, list } } = this.props

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>Lista de universidades</Text>
            <Text style={styles.subtitle}>
              Visualize e edite qualquer uma das universidades que você tem cadastrado
            </Text>
          </View>
          {!list.length ? (
            <EmptyList
              icon="account-balance"
              message="Não há nenhuma universidade cadastrada"
              buttonText="Comece cadastrando por aqui"
              buttonPress={this._goToScreen('universidadesCreate')}
            />
          ) : list.map(universidade => (
            <Card
              key={`universidade-list-card-${universidade.id}`}
              image={{
                uri: universidade.logo || `https://placeholdit.imgix.net/~text?txtsize=180&txt=${universidade.abreviacao.toUpperCase()}&w=640&h=300&txttrack=0`
              }}
              imageStyle={{}}
              universidadeName={universidade.nome}
              buttonIconName="edit"
              buttonText="EDITAR"
              buttonOnPress={() => {
                this.props.navigator.push(Router.getRoute('universidadesCreate', universidade))
              }}
            />
          ))}
        </ScrollView>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Adicionar universidade"
            onPress={this._goToScreen('universidadesCreate')}
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
  credentials: state.authentication.credentials,
  universidade: state.universidade,
})

export default connect(mapStateToProps)(UniversidadesScreen)
