import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Icon } from 'react-native'
import { SlidingTabNavigation, SlidingTabNavigationItem } from '@exponent/ex-navigation'
import { MaterialIcons } from '@exponent/vector-icons'
import ActionButton from 'react-native-action-button'

import Router from '../Router'
import { Card, Loading } from '../components'
import { fetchEventos } from '../utilities/fetchHelpers'
import { dateFormat } from '../utilities/dateHelpers'
import placeholdit from '../constants/placeholdit'

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

  _card(type) {
    const { evento: { list } } = this.props
    return list.filter(evento => evento.tipo === type).map(evento => (
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
            <ScrollView>{this._card('Prova')}</ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="1">
            <ScrollView>{this._card('Trabalho')}</ScrollView>
          </SlidingTabNavigationItem>

          <SlidingTabNavigationItem id="2">
            <ScrollView>{this._card('Outros')}</ScrollView>
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>

        <ActionButton buttonColor="rgba(231,76,60,1)">
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
  evento: state.evento,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(EventosScreen)
