import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Router from '../Router'

import { UniversidadesCreateForm, Loading } from '../components'
import { DestroyAlert } from '../components'
import { API_URL } from '../constants/api'
import { applicationJSON } from '../utilities/requestHelpers'
import {
  requestUniversidadeDestroy,
  successUniversidadeDestroy,
  failureUniversidadeDestroy,
} from '../actions/UniversidadeActions'
import * as Navigation from '../Navigation'
import { isEmptyObject } from '../utilities/validationHelpers'

class UniversidadesCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Universidades',
      renderRight: ({ params }) =>
        isEmptyObject(params) ? <View></View> : (
          <DestroyAlert
            title="Excluir Universidade"
            message={
              'Tem certeza que deseja excluir esta universidade? Esta ação é permanente e, após'
              + ' a confirmação, não será possível reverter. Ao excluir a universidade, todos os'
              + ' dados de Unidades, Cursos, Turmas, Disciplinas e Eventos relacionados a esta'
              + ' universidade, também serão excluídos. Deseja continuar?'
            }
            entity={params}
            yesOnPress={({ dispatch, credentials, next }) => {
              const method = 'DELETE'
              const headers = { ...applicationJSON, ...credentials }
              dispatch(requestUniversidadeDestroy())
              return fetch(`${API_URL}/universidades/${params.id}`, { method, headers })
                .then(res => {
                  res.json().then(data => {
                    dispatch(successUniversidadeDestroy(data))
                    next()
                  })
                })
                .catch(error => dispatch(failureUniversidadeDestroy(error)))
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
                'Cadastrar universidade' :
                'Editar universidade'
              }
            </Text>
            <Text style={styles.subtitle}>
              {
                !Object.keys(params).length ?
                'Informe no formulário abaixo, os dados da universidade a ser cadastrada.' :
                'Informe no formulário abaixo, os dados da universidade que deseja editar.'
              }
            </Text>
          </View>

          <UniversidadesCreateForm
            successRedirect={this._goBack}
            update={params}
          />
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loading} />
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

export default connect(mapStateToProps)(UniversidadesCreateScreen)
