import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { EventoForm, Loading, SimpleColorPicker } from '../components'
import { DestroyAlert } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { destroy } from '../utilities/eventoHelpers'

class EventoFormScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Eventos',
      backgroundColor: '#005bb1',
      renderRight: ({ params }) =>
        !isEmptyObject(params) && (
          <DestroyAlert
            title="Excluir Turma"
            message={
              'Tem certeza que deseja excluir este evento? Esta ação é permanente e, após'
              + ' a confirmação, não será possível reverter. Deseja continuar?'
            }
            entity={params}
            yesOnPress={destroy}
          />
        ),
    },
  }

  _goBack = () => this.props.navigator.pop()

  render() {
    const {
      universidade: { loading: loadingUniversidade },
      unidade: { loading: loadingUnidade },
      curso: { loading: loadingCurso },
      turma: { loading: loadingTurma },
      disciplina: { loading: loadingDisciplina },
      evento: { loading: loadingEvento },
    } = this.props
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
        <Loading
          show={
            loadingUniversidade ||
            loadingUnidade ||
            loadingCurso ||
            loadingTurma ||
            loadingDisciplina ||
            loadingEvento
          }
        />
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
  universidade: state.universidade,
  unidade: state.unidade,
  curso: state.curso,
  turma: state.turma,
  disciplina: state.disciplina,
  evento: state.evento,
})

export default connect(mapStateToProps)(EventoFormScreen)
