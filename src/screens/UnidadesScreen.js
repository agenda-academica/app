import React, { PropTypes, Component } from 'react'
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
import { Card } from '../components'

class UnidadesScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Unidades',
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>Lista de unidades</Text>
            <Text style={styles.subtitle}>
              Visualize e edite qualquer uma das unidades que você tem cadastrado
            </Text>
          </View>
          <Card
            image={{ uri: 'http://www.leandrocristianini.com.br/wp-content/uploads/2015/06/logoFIAP1.jpg' }}
            imageStyle={{ backgroundColor: '#000' }}
            universidadeName="Faculdade de Informática e Administração Paulista"
            unidadeName="Paulista"
            buttonIconName="edit"
            buttonText="EDITAR"
            buttonOnPress={() => { console.log('Card onPress') }}
          />
          <Card
            image={{ uri: 'http://www.leandrocristianini.com.br/wp-content/uploads/2015/06/logoFIAP1.jpg' }}
            imageStyle={{ backgroundColor: '#000' }}
            universidadeName="Faculdade de Informática e Administração Paulista"
            unidadeName="Aclimação"
            buttonIconName="edit"
            buttonText="EDITAR"
            buttonOnPress={() => { console.log('Card onPress') }}
          />
          <Card
            image={{ uri: 'http://www.expressaoonline.com.br/wp-content/uploads/2015/09/Logo-USJT-SE-PENSAR-BEM.png' }}
            imageStyle={{ backgroundColor: '#04396b' }}
            universidadeName="Universidade São Judas Tadeu"
            unidadeName="Butantã"
            buttonIconName="edit"
            buttonText="EDITAR"
            buttonOnPress={() => { console.log('Card onPress') }}
          />
          <Card
            image={{ uri: 'http://www.expressaoonline.com.br/wp-content/uploads/2015/09/Logo-USJT-SE-PENSAR-BEM.png' }}
            imageStyle={{ backgroundColor: '#04396b' }}
            universidadeName="Universidade São Judas Tadeu"
            unidadeName="Mooca"
            buttonIconName="edit"
            buttonText="EDITAR"
            buttonOnPress={() => { console.log('Card onPress') }}
          />
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

export default UnidadesScreen
