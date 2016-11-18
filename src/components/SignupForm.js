import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, ScrollView, Text } from 'react-native'

import { ReduxFormInput } from './'
import { API_URL } from '../constants/api'
import { requestSignup, successSignup, failureSignup } from '../actions/SignupActions'
import {
  hasSpecialChars,
  hasNumbersChars,
  hasUppercaseChars,
  isValidEmail,
} from '../utilities/validationHelpers'

class SignupForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      touch,
      invalid,
      dispatch,
      submitErrors,
      successRedirect,
    } = this.props

    return (
      <ScrollView style={styles.container}>
        <Field
          {...this.props}
          name="first_name"
          component={ReduxFormInput}
          label="Nome*"
          placeholder="Ex: Gabriel"
        />
        <Field
          {...this.props}
          name="last_name"
          component={ReduxFormInput}
          label="Sobrenome*"
          placeholder="Ex: Ramos"
        />
        <Field
          {...this.props}
          keyboardType="email-address"
          name="email"
          component={ReduxFormInput}
          label="Email*"
          placeholder="Ex: gabrielramos@email.com"
        />
        <Field
          {...this.props}
          name="password"
          component={ReduxFormInput}
          label="Senha*"
          placeholder="••••••"
          secureTextEntry={true}
        />
        <Field
          {...this.props}
          name="passwordConfirm"
          component={ReduxFormInput}
          label="Confirmar sua senha*"
          placeholder="••••••"
          secureTextEntry={true}
        />
        <Button
          backgroundColor='#005bb1'
          title='CONTINUAR'
          disabled={invalid}
          buttonStyle={styles.submitButton}
          onPress={
            handleSubmit(values => {
              dispatch(requestSignup())
              return fetch(`${API_URL}/auth`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              }).then(res => {
                const body = JSON.parse(res._bodyText)
                if (body.errors) {
                  dispatch(failureSignup(body.errors))
                }
                else {
                  dispatch(successSignup())
                  successRedirect()
                }
              }).catch(error => { dispatch(failureSignup(error)) })
            })
          }
        />
        <Text style={styles.submitErrorMessage}>
          {!!submitErrors && submitErrors.email}
        </Text>
      </ScrollView>
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
  submitErrorMessage: {
    color: 'red',
    alignSelf: 'center',
    marginTop: 20,
  },
})

const validate = values => {
  const errors = {}

  if (!values.first_name)
    errors.first_name = ' - Obrigatório'

  if (!values.last_name)
    errors.last_name = ' - Obrigatório'

  if (!values.email)
    errors.email = ' - Obrigatório'
  else if (!isValidEmail(values.email))
    errors.email = ' - Insira um email válido'

  if (!values.password)
    errors.password = ' - Obrigatório'
  else if (
    values.password.length < 8 ||
    !hasSpecialChars(values.password) ||
    !hasNumbersChars(values.password) ||
    !hasUppercaseChars(values.password)
  ) errors.password = ' - A senha deve conter no mínimo 8 caracteres,'
      + ' letras maiúsculas, números e letras'

  if (!values.passwordConfirm)
    errors.passwordConfirm = ' - Obrigatório'
  else if (values.password !== values.passwordConfirm)
    errors.passwordConfirm = ' - A confirmação não coincide com a senha digitada anteriormente'

  return errors
}

SignupForm.propTypes = {
  successRedirect: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  submitErrors: state.signup.errors
})

SignupForm = reduxForm({ form: 'signupForm', validate })(SignupForm)
SignupForm = connect(mapStateToProps)(SignupForm)

export default SignupForm
