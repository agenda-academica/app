import React, { Component } from 'react'
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

export default class HomeScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Quadro de horário',
      ...SlidingTabNavigation.navigationBarStyles,
    },
  }

  componentWillMount() {
    console.log('[HomeScreen]: componentWillMount method')
  }

  _renderLabel = ({route}) => {
    let title
    if (route.key === '0') title = 'D'
    else if (route.key === '1') title = 'S'
    else if (route.key === '2') title = 'T'
    else if (route.key === '3') title = 'Q'
    else if (route.key === '4') title = 'Q'
    else if (route.key === '5') title = 'S'
    else if (route.key === '6') title = 'S'

    return <Text style={styles.tabLabel}>{title.toUpperCase()}</Text>
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  render() {
    return (
      <View style={styles.container}>
        <SlidingTabNavigation
          id="tab-navigation"
          navigatorUID="tab-navigation"
          initialTab={new Date().getDay().toString()}
          renderLabel={this._renderLabel}
          barBackgroundColor="#0084FF"
          indicatorStyle={styles.tabIndicator}
        >
          <SlidingTabNavigationItem id="0">
            <ScrollView>
              <Card
                image={{ uri: 'http://www.expressaoonline.com.br/wp-content/uploads/2015/09/Logo-USJT-SE-PENSAR-BEM.png' }}
                imageStyle={{ backgroundColor: '#04396b' }}
                title="Inteligência Artificial"
                subtitle="19h20"
                universidadeName="Universidade São Judas Tadeu"
                unidadeName="Butantã"
                cursoName="Sistemas de Informação"
                turmaName="4MSIN"
                disciplinaName="Inteligência Artificial"
                buttonIconName="remove-red-eye"
                buttonText="VISUALIZAR"
                buttonOnPress={() => { console.log('Card onPress') }}
              />
              <Card
                image={{ uri: 'https://s3-sa-east-1.amazonaws.com/agenda-academica/fiap-logo_.jpg' }}
                imageStyle={{ backgroundColor: '#04396b' }}
                title="Sistemas Especialistas"
                subtitle="21h00"
                universidadeName="Faculdade de Informática e Administração Paulista"
                unidadeName="Paulista"
                cursoName="Sistemas de Informação"
                turmaName="3NSI"
                disciplinaName="Sistemas Especialistas"
                buttonIconName="remove-red-eye"
                buttonText="VISUALIZAR"
                buttonOnPress={() => { console.log('Card onPress') }}
              />
            </ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="1">
            <ScrollView>
              <Card
                image={{ uri: 'http://www.expressaoonline.com.br/wp-content/uploads/2015/09/Logo-USJT-SE-PENSAR-BEM.png' }}
                imageStyle={{ backgroundColor: '#04396b' }}
                title="Inteligência Artificial"
                subtitle="19h20"
                universidadeName="Universidade São Judas Tadeu"
                unidadeName="Butantã"
                cursoName="Sistemas de Informação"
                turmaName="4MSIN"
                disciplinaName="Inteligência Artificial"
                buttonIconName="remove-red-eye"
                buttonText="VIEW NOW"
                buttonOnPress={() => { console.log('Card onPress') }}
              />
            </ScrollView>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="2">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="3">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="4">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="5">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="6">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Adicionar aula"
            onPress={this._goToScreen('universidadesCreate')}
          >
            <MaterialIcons name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  tabLabel: {
    margin: 8,
    fontSize: 13,
    color: '#fff',
  },

  tabIndicator: {
    backgroundColor: '#FFEB3B',
  },

  quoteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  quoteMarks: {
    alignSelf: 'flex-start',
    color: '#E91E63',
    fontSize: 36,
    left: -8,
    bottom: -42,
    marginTop: -64,
  },

  quoteText: {
    color: '#222',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    margin: 8,
  },

  quoteAuthor: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },

  selectedTab: {
    backgroundColor: '#0084FF',
  },
})
