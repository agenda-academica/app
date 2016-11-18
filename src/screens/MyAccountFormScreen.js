import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Exponent from 'exponent'
import { Field, reduxForm } from 'redux-form'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { FormLabel, Button } from 'react-native-elements'

import { MyAccountForm, Loading, DestroyAlert, ReduxFormInput } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { destroy } from '../utilities/turmaHelpers'
import * as placeholdit from '../constants/placeholdit'
import { uploadImage } from '../actions/UploadAction'

class MyAccountFormScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Minha Conta',
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
      authentication: { loading },
      upload: { loading: uploadLoading },
    } = this.props
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Minhas Informações
            </Text>
            <Text style={styles.subtitle}>
              Nesta área você pode alterar suas informações pessoais e de acesso
              a Agenda Acadêmica.
            </Text>
          </View>

          <MyAccountForm next={this._goBack} />
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loading || uploadLoading} />
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
  authentication: state.authentication,
  upload: state.upload,
})

export default connect(mapStateToProps)(MyAccountFormScreen)
