import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native'

import { ReduxFormInput } from './'
import { API_URL } from '../constants/api'
import {
  requestLoginAuthentication,
  successLoginAuthentication,
  failureLoginAuthentication,
} from '../actions/AuthenticationAction'
import { isValidEmail } from '../utilities/validationHelpers'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync'

class LoginForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      touch,
      invalid,
      dispatch,
      successRedirect,
      loginError,
    } = this.props

    return (
      <View style={styles.container}>
        <Field
          {...this.props}
          keyboardType="email-address"
          name="email"
          component={ReduxFormInput}
          label="Email*"
          placeholder="Ex: email@email.com"
        />
        <Field
          {...this.props}
          name="password"
          component={ReduxFormInput}
          label="Senha*"
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
              dispatch(requestLoginAuthentication())
              return fetch(`${API_URL}/auth/sign_in`, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              }).then(response => {
                response.json().then(data => {
                  console.log('data', data)
                  if (data.errors && data.errors.length)
                    dispatch(failureLoginAuthentication(data.errors[0]))
                  else {
                    const { headers: { map: header } } = response
                    const credentials = {
                      'client': header['client'],
                      'access-token': header['access-token'],
                      'token-type': header['token-type'],
                      'expiry': header['expiry'],
                      'uid': header['uid'],
                    }
                    const { data: user } = data
                    dispatch(successLoginAuthentication({ credentials, user }))
                    registerForPushNotificationsAsync(credentials)
                    successRedirect()
                  }
                })
              }).catch(error => dispatch(failureLoginAuthentication(error)))
            })
          }
        />
        <Text style={{ alignSelf: 'center', color: 'red', marginTop: 20 }}>{loginError}</Text>
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
  if (!values.email)
    errors.email = ' - Obrigatório'
  else if (!isValidEmail(values.email))
    errors.email = ' - Insira um email válido'

  if (!values.password)
    errors.password = ' - Obrigatório'

  return errors
}

LoginForm.propTypes = {
  successRedirect: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  initialValues: state.authentication || {},
  loginError: state.authentication.error,
})

LoginForm = reduxForm({ form: 'loginForm', validate })(LoginForm)
LoginForm = connect(mapStateToProps)(LoginForm)

export default LoginForm
