import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Icon,
  Dimensions,
} from 'react-native'
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation'
import { MaterialIcons } from '@exponent/vector-icons'
import ActionButton from 'react-native-action-button'

import Router from '../Router'
import { Card, Loading, EmptyList } from '../components'
import { fetchDisciplinas } from '../utilities/fetchHelpers'
import { dateFormat } from '../utilities/dateHelpers'
import placeholdit from '../constants/placeholdit'

class HomeScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Quadro de horário',
      ...SlidingTabNavigation.navigationBarStyles,
    },
  }

  componentWillMount() {
    const { dispatch, credentials, disciplina: { loaded } } = this.props
    !loaded && fetchDisciplinas({ dispatch, credentials })
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

  _weekdayCards(weekday) {
    const { disciplina: { list } } = this.props
    const condition = disciplina => disciplina.dia_semana === weekday
    return !list.some(condition) ? (
      <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 158,
      }}>
        <EmptyList
          icon="wb-sunny"
          message="Não há nenhuma aula agendada pra hoje (:"
          buttonText="Para cadastrar, clique aqui"
          buttonPress={this._goToScreen('disciplinasCreate')}
        />
      </View>
    ) : list.filter(condition).map(disciplina => (
      <Card
        key={`disciplina-terca-${disciplina.id}`}
        image={{
          uri:
            disciplina.universidade.logo ||
            placeholdit.card(disciplina.universidade.abreviacao.toUpperCase())
        }}
        title={disciplina.nome}
        subtitle={disciplina.hora_inicio.replace(/^.*T(\d{2}):(\d{2}).*$/, '$1h$2')}
        universidadeName={disciplina.universidade.nome}
        unidadeName={disciplina.unidade.nome}
        cursoName={disciplina.curso.nome}
        turmaName={disciplina.turma.nome}
        disciplinaName={disciplina.nome}
        buttonIconName="remove-red-eye"
        buttonText="VISUALIZAR"
        buttonOnPress={() => {
          this.props.navigator.push(Router.getRoute('disciplinasCreate', disciplina))
        }}
      />
    ))
  }

  render() {
    const { disciplina: { loading, list, loaded } } = this.props
    if (!loaded || loading) return <Loading show={true} />
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
            <ScrollView>{this._weekdayCards(0)}</ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="1">
            <ScrollView>{this._weekdayCards(1)}</ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="2">
            <ScrollView>{this._weekdayCards(2)}</ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="3">
            <ScrollView>{this._weekdayCards(3)}</ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="4">
            <ScrollView>{this._weekdayCards(4)}</ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="5">
            <ScrollView>{this._weekdayCards(5)}</ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="6">
            <ScrollView>{this._weekdayCards(6)}</ScrollView>
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Adicionar aula"
            onPress={this._goToScreen('disciplinasCreate')}
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

const mapStateToProps = state => ({
  disciplina: state.disciplina,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(HomeScreen)
