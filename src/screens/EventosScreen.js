import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Icon, Dimensions } from 'react-native'
import { SlidingTabNavigation, SlidingTabNavigationItem } from '@exponent/ex-navigation'
import { MaterialIcons } from '@exponent/vector-icons'
import ActionButton from 'react-native-action-button'
import { List, ListItem } from 'react-native-elements'

import Router from '../Router'
import { Card, Loading, EmptyList } from '../components'
import { fetchEventos } from '../utilities/fetchHelpers'
import { dateFormat } from '../utilities/dateHelpers'
import * as placeholdit from '../constants/placeholdit'
import { setPromisesLoaded } from '../actions/PickerSyncActions'

const TypeTabHeader = ({ icon, text }) => (
  <View style={{ flex: 10, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 25 }}>
    <View style={{ marginRight: 10 }}>
      <MaterialIcons name={icon} style={{ alignSelf: 'center', fontSize: 50, color: '#aaa' }} />
    </View>
    <View>
      <Text style={{ color: '#aaa' }}>{text}</Text>
    </View>
  </View>
)

class EventosScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Eventos',
      ...SlidingTabNavigation.navigationBarStyles,
    },
  }

  componentWillMount() {
    const { dispatch, credentials, evento: { loaded } } = this.props
    !loaded && fetchEventos({ dispatch, credentials })
  }

  _renderLabel = ({ route }) => {
    let title
    if (route.key === '0') title = 'Provas'
    else if (route.key === '1') title = 'Trabalhos'
    else if (route.key === '2') title = 'Outros'

    return <Text style={styles.tabLabel}>{title.toUpperCase()}</Text>
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  _card(list) {
    const { dispatch } = this.props
    return (
      <List
        containerStyle={{
          borderBottomColor: "#fff",
          borderTopColor: '#f0f0f0',
          marginBottom: 30
        }}
      >
        {
          list.map(event => (
            <ListItem
              key={`point-event-${event.id}`}
              title={event.titulo}
              subtitle={
                dateFormat.hhmm(new Date(event.hora_inicio), 'h')
                +' às '+ dateFormat.hhmm(new Date(event.hora_fim), 'h')
                +', '+ event.universidade.abreviacao
                +', '+ event.unidade.nome
                +', '+ event.curso.abreviacao
                +', '+ event.turma.nome
              }
              leftIcon={{ name: "circle", type: 'font-awesome', color: event.cor }}
              onPress={() => {
                dispatch(setPromisesLoaded(false, []))
                this.props.navigator.push(Router.getRoute('eventoForm', event))
              }}
            />
          ))
        }
      </List>
    )
  }

  render() {
    const { evento: { loading, list, loaded } } = this.props
    if (!loaded || loading) return <Loading show={true} />

    const provas = list.filter(evento => evento.tipo === 'Prova')
    const trabalhos = list.filter(evento => evento.tipo === 'Trabalho')
    const outros = list.filter(evento => evento.tipo === 'Outros')

    return (
      <View style={styles.container}>
        <SlidingTabNavigation
          id="events-tab-navigation"
          navigatorUID="events-tab-navigation"
          initialTab={0}
          renderLabel={this._renderLabel}
          barBackgroundColor="#0084FF"
          indicatorStyle={styles.tabIndicator}
        >
          <SlidingTabNavigationItem id="0">
            {!provas.length ? (
              <View style={styles.emptyListContainer}>
                <EmptyList
                  icon="security"
                  message="Não há nenhuma prova agendada ainda"
                  buttonText="Comece cadastrando por aqui"
                  buttonPress={this._goToScreen('eventoForm')}
                />
              </View>
            ) : (
              <ScrollView>
                <TypeTabHeader icon="security" text="Lista de provas agendadas" />
                {this._card(provas)}
              </ScrollView>
            )}
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="1">
            {!trabalhos.length ? (
              <View style={styles.emptyListContainer}>
                <EmptyList
                  icon="work"
                  message="Não há nenhum trabalho agendado ainda"
                  buttonText="Comece cadastrando por aqui"
                  buttonPress={this._goToScreen('eventoForm')}
                />
              </View>
            ) : (
              <ScrollView>
                <TypeTabHeader icon="work" text="Lista de trabalhos agendados" />
                {this._card(trabalhos)}
              </ScrollView>
            )}
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="2">
            {!outros.length ? (
              <View style={styles.emptyListContainer}>
                <EmptyList
                  icon="assistant"
                  message="Não há nenhum outro tipo de evento agendado ainda"
                  buttonText="Comece cadastrando por aqui"
                  buttonPress={this._goToScreen('eventoForm')}
                />
              </View>
            ) : (
              <ScrollView>
                <TypeTabHeader icon="assistant" text="Outros tipos de eventos agendados" />
                {this._card(outros)}
              </ScrollView>
            )}
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>

        <ActionButton buttonColor="rgb(231,76,60)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Criar evento"
            onPress={this._goToScreen('eventoForm')}
          >
            <MaterialIcons name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <Loading show={loading} />
      </View>
    )
  }
}

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

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
  emptyListContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    width: windowWidth,
    height: windowHeight - 178,
  },
})

const mapStateToProps = state => ({
  evento: state.evento,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(EventosScreen)
