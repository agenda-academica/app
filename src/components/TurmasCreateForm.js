import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'

import { ReduxFormInput } from './'

class TurmasCreateForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      touch,
      invalid,
    } = this.props

    return (
      <View style={styles.container}>
        <Field
          {...this.props}
          name="nome"
          component={ReduxFormInput}
          label="Turma*"
          placeholder="Ex: 4MSIN"
        />
        <Field
          {...this.props}
          keyboardType="email-address"
          name="email"
          component={ReduxFormInput}
          label="Email*"
          placeholder="Ex: 4msin.usjt@gmail.com"
        />
        <Field
          {...this.props}
          name="site"
          component={ReduxFormInput}
          label="Site"
          placeholder="Ex: Opcional"
        />
        <Field
          {...this.props}
          name="outras_informacoes"
          component={ReduxFormInput}
          label="Outas Informações"
          placeholder="Ex: Opcional"
        />
        <Button
          backgroundColor='#005bb1'
          title='CONTINUAR'
          disabled={invalid}
          buttonStyle={styles.submitButton}
          onPress={
            handleSubmit((values, dispatch, props) => {
              console.log("handling submit")
              console.log(values)
              console.log(props)
            })
          }
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

  return errors
}

TurmasCreateForm = reduxForm({
  form: 'turmasCreateForm',
  validate,
})(TurmasCreateForm)

TurmasCreateForm = connect(
  state => ({
    initialValues: state.turmas || { nome: null },
  })
)(TurmasCreateForm)

export default TurmasCreateForm
