import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Icon, Dimensions } from 'react-native'
import { SlidingTabNavigation, SlidingTabNavigationItem } from '@exponent/ex-navigation'
import { MaterialIcons } from '@exponent/vector-icons'
import ActionButton from 'react-native-action-button'

import Router from '../Router'
import { Card, Loading, EmptyList } from '../components'
import { fetchEventos } from '../utilities/fetchHelpers'
import { dateFormat } from '../utilities/dateHelpers'
import * as placeholdit from '../constants/placeholdit'

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
    return list.map(evento => (
      <Card
        key={`evento-${evento.id}`}
        image={{
          uri:
            evento.universidade.logo ||
            placeholdit.card(evento.universidade.abreviacao.toUpperCase())
        }}
        title={evento.titulo}
        subtitle={`${evento.data_inicio.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')} às ${evento.hora_inicio.replace(/^.*T(\d{2}):(\d{2}).*$/, '$1h$2')}`}
        description={evento.descricao}
        listItem={[
          { icon: 'arrow-drop-down-circle', color: evento.cor, text: `Começa dia ${evento.data_inicio.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')} às ${evento.hora_inicio.replace(/^.*T(\d{2}):(\d{2}).*$/, '$1h$2')}` },
          { icon: 'arrow-drop-down-circle', color: evento.cor, text: `Termina dia ${evento.data_fim.replace(/^(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')} às ${evento.hora_fim.replace(/^.*T(\d{2}):(\d{2}).*$/, '$1h$2')}` },
        ]}
        universidadeName={evento.universidade.nome}
        unidadeName={evento.unidade.nome}
        cursoName={evento.curso.nome}
        turmaName={evento.turma.nome}
        disciplinaName={evento.disciplina.nome}
        buttonIconName="edit"
        buttonText="EDITAR"
        buttonOnPress={() => this.props.navigator.push(Router.getRoute('eventoForm', evento))}
      />
    ))
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
              <ScrollView>{this._card(provas)}</ScrollView>
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
              <ScrollView>{this._card(trabalhos)}</ScrollView>
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
              <ScrollView>{this._card(outros)}</ScrollView>
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
