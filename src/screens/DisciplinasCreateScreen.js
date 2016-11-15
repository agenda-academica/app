import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { DisciplinasCreateForm, Loading, DestroyAlert } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { destroy } from '../utilities/disciplinaHelpers'

class DisciplinasCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Disciplinas',
      backgroundColor: '#005bb1',
      renderRight: ({ params }) =>
        !isEmptyObject(params) && (
          <DestroyAlert
            title="Excluir Disciplina"
            message={
              'Tem certeza que deseja excluir esta disciplina? Esta ação é permanente e, após'
              + ' a confirmação, não será possível reverter. Ao excluir a disciplina, todos os'
              + ' dados de Eventos relacionados a esta'
              + ' disciplina, também serão excluídos. Deseja continuar?'
            }
            entity={params}
            yesOnPress={destroy}
          />
        ),
    },
  }

  _goBack = () => {
    this.props.navigator.pop()
  }

  render() {
    const {
      universidade: { loading: loadingUniversidade },
      unidade: { loading: loadingUnidade },
      curso: { loading: loadingCurso },
      turma: { loading: loadingTurma },
      disciplina: { loading: loading },
    } = this.props
    const { params } = this.props.route
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {
                isEmptyObject(params) ?
                'Cadastrar disciplina' :
                'Editar disciplina'
              }
            </Text>
            <Text style={styles.subtitle}>
              {
                isEmptyObject(params) ?
                'Informe no formulário abaixo, os dados da disciplina a ser cadastrada.' :
                'Informe no formulário abaixo, os dados da disciplina que deseja editar.'
              }
            </Text>
          </View>

          <DisciplinasCreateForm update={params} next={this._goBack} />
          <KeyboardSpacer />
        </ScrollView>
        <Loading
          show={loadingUniversidade || loadingUnidade || loadingCurso || loadingTurma || loading}
        />
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
})

const mapStateToProps = state => ({
  universidade: state.universidade,
  unidade: state.unidade,
  curso: state.curso,
  turma: state.turma,
  disciplina: state.disciplina,
})

export default connect(mapStateToProps)(DisciplinasCreateScreen)
