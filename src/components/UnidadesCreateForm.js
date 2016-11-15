import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'

import { ReduxFormInput } from './'
import { API_URL } from '../constants/api'

class UnidadesCreateForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      touch,
      invalid,
      dispatch,
      credentials,
    } = this.props

    console.log('credentials', credentials)

    return (
      <View style={styles.container}>
        <Field
          {...this.props}
          name="nome"
          component={ReduxFormInput}
          label="Unidade*"
          placeholder="Ex: Butantã"
        />
        <Field
          {...this.props}
          name="endereco"
          component={ReduxFormInput}
          label="Endereço*"
          placeholder="Ex: Av. Vital Brasil, 1000"
        />
        <Field
          {...this.props}
          name="outras_informacoes"
          component={ReduxFormInput}
          label="Outas Informações"
          placeholder="Ex: Opcional"
        />
        <CheckBox
          title="Unidade Sede"
          checked={true}
        />
        <Button
          backgroundColor='#005bb1'
          title='CONTINUAR'
          disabled={invalid}
          buttonStyle={styles.submitButton}
          onPress={handleSubmit(values => {
          })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50
  },
  submitButton: {
    marginTop: 15,
  },
})

const validate = values => {
  const errors = {}
  if (!values.nome)
    errors.nome = ' - Obrigatório'

  if (!values.endereco)
    errors.endereco = ' - Obrigatório'

  return errors
}

UnidadesCreateForm = reduxForm({
  form: 'unidadesCreateForm',
  validate,
})(UnidadesCreateForm)

UnidadesCreateForm = connect(
  state => {
    return {
      initialValues: state.unidades || { nome: null },
    }
  }
)(UnidadesCreateForm)

export default UnidadesCreateForm
