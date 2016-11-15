import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { UnidadesCreateForm, Loading, DestroyAlert } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { destroy } from '../utilities/unidadeHelpers'

class UnidadesCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Unidades',
      backgroundColor: '#005bb1',
      renderRight: ({ params }) =>
        !isEmptyObject(params) && (
          <DestroyAlert
            title="Excluir Unidade"
            message={
              'Tem certeza que deseja excluir esta unidade? Esta ação é permanente e, após'
              + ' a confirmação, não será possível reverter. Ao excluir a unidade, todos os'
              + ' dados de Cursos, Turmas, Disciplinas e Eventos relacionados a esta'
              + ' unidade, também serão excluídos. Deseja continuar?'
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
    } = this.props
    const { params } = this.props.route

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} ref="scrollView">
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {
                !Object.keys(params).length ?
                'Cadastrar unidade' :
                'Editar unidade'
              }
            </Text>
            <Text style={styles.subtitle}>
              {
                !Object.keys(params).length ?
                'Informe no formulário abaixo, os dados da unidade a ser cadastrada.' :
                'Informe no formulário abaixo, os dados da unidade que deseja editar.'
              }
            </Text>
          </View>

          <UnidadesCreateForm update={params} next={this._goBack} />
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loadingUniversidade || loadingUnidade} />
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
})

export default connect(mapStateToProps)(UnidadesCreateScreen)
