import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Router from '../Router'
import { FontAwesome } from '@exponent/vector-icons'
import { Button } from 'react-native-elements'

import { EventoForm, Loading, SimpleColorPicker } from '../components'
import { DestroyAlert } from '../components'
import { API_URL } from '../constants/api'
import { applicationJSON } from '../utilities/requestHelpers'
import {
  requestUniversidadeUpdate,
  successUniversidadeUpdate,
  failureUniversidadeUpdate,
} from '../actions/UniversidadeActions'
import * as Navigation from '../Navigation'

class EventoFormScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Eventos',
      renderRight: (route, props) =>
        !props.params || !Object.keys(props.params).length ? <View></View> : (
          <DestroyAlert
            route={route}
            props={props}
            title="Excluir Universidade"
            message={
              'Tem certeza que deseja excluir esta universidade? Esta ação é permanente e, após'
              + ' a confirmação, não será possível reverter. Ao excluir a universidade, todos os'
              + ' dados de Unidades, Cursos, Turmas, Disciplinas e Eventos relacionados a esta'
              + ' universidade, também serão excluídos. Deseja confirmar?'
            }
            yesOnPress={({ dispatch, credentials }) => {
              const method = 'DELETE'
              const headers = { ...applicationJSON, ...credentials }
              dispatch(requestUniversidadeUpdate())
              return fetch(`${API_URL}/universidades/${route.params.id}`, { method, headers })
                .then(res => {
                  res.json().then(data => {
                    dispatch(successUniversidadeUpdate(data))
                    Navigation.goHome()
                  })
                })
                .catch(error => dispatch(failureUniversidadeUpdate(error)))
            }}
          />
        ),
    },
  }

  _goBack = () => this.props.navigator.pop()

  render() {
    const { loading } = this.props
    const { params } = this.props.route

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {
                !Object.keys(params).length ?
                'Cadastrar evento' :
                'Editar evento'
              }
            </Text>
            <Text style={styles.subtitle}>
              {
                !Object.keys(params).length ?
                'Informe no formulário abaixo, os dados do evento a ser cadastrado.' :
                'Informe no formulário abaixo, os dados do evento que deseja editar.'
              }
            </Text>
          </View>

          <EventoForm
            next={this._goBack}
            update={params}
          />
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loading} />
        <SimpleColorPicker />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    color: '#aaa',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
})

const mapStateToProps = state => ({
  loading: state.universidade.loading,
})

export default connect(mapStateToProps)(EventoFormScreen)
