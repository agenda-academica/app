import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { TurmasCreateForm, Loading, DestroyAlert } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { destroy } from '../utilities/turmaHelpers'

class TurmasCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Turmas',
      backgroundColor: '#005bb1',
      renderRight: ({ params }) =>
        !isEmptyObject(params) && (
          <DestroyAlert
            title="Excluir Turma"
            message={
              'Tem certeza que deseja excluir esta turma? Esta ação é permanente e, após'
              + ' a confirmação, não será possível reverter. Ao excluir a turma, todos os'
              + ' dados de Disciplinas e Eventos relacionados a esta'
              + ' turma, também serão excluídos. Deseja continuar?'
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
      turma: { loading },
    } = this.props
    const { params } = this.props.route
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {
                isEmptyObject(params) ?
                'Cadastrar turma' :
                'Editar turma'
              }
            </Text>
            <Text style={styles.subtitle}>
              {
                isEmptyObject(params) ?
                'Informe no formulário abaixo, os dados da turma a ser cadastrada.' :
                'Informe no formulário abaixo, os dados da turma que deseja editar.'
              }
            </Text>
          </View>

          <TurmasCreateForm update={params} next={this._goBack} />
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loadingUniversidade || loadingUnidade || loadingCurso || loading} />
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
})

export default connect(mapStateToProps)(TurmasCreateScreen)
