import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { Loading, CursosCreateForm, DestroyAlert } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { destroy } from '../utilities/cursoHelpers'

class CursosCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Cursos',
      backgroundColor: '#005bb1',
      renderRight: ({ params }) =>
        !isEmptyObject(params) && (
          <DestroyAlert
            title="Excluir Curso"
            message={
              'Tem certeza que deseja excluir este curso? Esta ação é permanente e, após'
              + ' a confirmação, não será possível reverter. Ao excluir o curso, todos os'
              + ' dados de Turmas, Disciplinas e Eventos relacionados a este'
              + ' curso, também serão excluídos. Deseja continuar?'
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
    } = this.props
    const { params } = this.props.route

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {
                isEmptyObject(params) ?
                'Cadastrar curso' :
                'Editar curso'
              }
            </Text>
            <Text style={styles.subtitle}>
              {
                isEmptyObject(params) ?
                'Informe no formulário abaixo, os dados do curso a ser cadastrado.' :
                'Informe no formulário abaixo, os dados do curso que deseja editar.'
              }
            </Text>
          </View>

          <CursosCreateForm next={this._goBack} update={params} />
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loadingUniversidade || loadingUnidade || loadingCurso} />
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
})

export default connect(mapStateToProps)(CursosCreateScreen)
