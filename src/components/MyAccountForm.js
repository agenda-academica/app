import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Exponent from 'exponent'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import { MaterialIcons } from '@exponent/vector-icons'

import { uploadImage } from '../actions/UploadAction'
import { setShowPasswordField } from '../actions/AuthenticationAction'
import { ReduxFormInput } from './'
import * as placeholdit from '../constants/placeholdit'
import { API_URL } from '../constants/api'
import { applicationJSON } from '../utilities/requestHelpers'
import {
  isValidEmail,
  hasSpecialChars,
  hasNumbersChars,
  hasUppercaseChars,
  isEmptyObject,
} from '../utilities/validationHelpers'
import { save } from '../utilities/authenticationHelpers'

class MyAccountForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      touch,
      invalid,
      dispatch,
      imageUpload,
      dirty,
      next,
      authentication: {
        credentials,
        showPasswordField,
        user: { loading, avatar },
      },
    } = this.props

    const imageUploadUri = !!imageUpload && imageUpload.uri
    console.log('dirty', dirty)

    return (
      <View style={styles.container}>
        <FormLabel>Avatar</FormLabel>
        <View style={{ marginTop: 10, }}>
          <Image
            resizeMode="cover"
            source={{ uri: imageUploadUri || avatar || placeholdit.card('😎') }}
            style={{
              flex: 1,
              height: 150,
              marginHorizontal: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'rgba(0,0,0,.1)',
            }}
          />
          <Button
            onPress={() => Exponent.ImagePicker
              .launchImageLibraryAsync({ allowsEditing: false, aspect: [100, 100] })
              .then(image => dispatch(uploadImage(image)))
            }
            title={`${!avatar ? 'Selecionar' : 'Alterar'} imagem...`}
            icon={{ name: 'photo' }}
            buttonStyle={{ marginTop: 8 }}
            backgroundColor="#00AA00"
          />
        </View>
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
          label="Email"
          placeholder="Ex: gabrielramos@email.com"
          editable={false}
        />
        {showPasswordField ? (
          <View>
            <Field
              {...this.props}
              name="password"
              component={ReduxFormInput}
              label="Nova senha*"
              placeholder="••••••"
              secureTextEntry={true}
            />
            <Field
              {...this.props}
              name="passwordConfirm"
              component={ReduxFormInput}
              label="Confirmar sua nova senha*"
              placeholder="••••••"
              secureTextEntry={true}
            />
          </View>
        ) : (
          <View>
            <FormLabel>Senha</FormLabel>
            <View style={{ marginTop: 10, }}>
              <Button
                title="Alterar senha..."
                icon={{ name: 'vpn-key' }}
                onPress={() => Alert.alert(
                  'Alterar senha',
                  'Deseja realmente alterar sua senha?',
                  [
                    { text: 'Não' },
                    { text: 'Sim', onPress: () => dispatch(setShowPasswordField(true)) },
                  ]
                )}
                backgroundColor="#E65722"
              />
            </View>
          </View>
        )}
        <Button
          backgroundColor='#005bb1'
          title='SALVAR'
          icon={{ name: 'save' }}
          disabled={invalid || (!invalid && !imageUploadUri && !dirty)}
          buttonStyle={styles.submitButton}
          onPress={handleSubmit(values => save({ values, ...this.props, imageUploadUri }))}
        />

        <View style={styles.separator} />

        <MaterialIcons
          name="warning"
          style={{
            fontSize: 200,
            color: '#D50000',
            alignSelf: 'center',
          }}
        />
        <Text style={styles.title}>
          Apagar conta
        </Text>
        <View style={{ marginHorizontal: 15 }}>
          <Text style={styles.subtitle}>
            Você pode apagar completamente os dados da sua conta e, consequentemente, perderá todos
            os dados cadastrados até hoje e não terá mais acesso a Agenda Acadêmica com o usuário
            atual.
          </Text>
          <Text style={styles.subtitle}>
            Cuidado! Pois, uma vez aceita a confirmação para apagar sua conta, não será
            possível reverter. Pense bem antes de prosseguir.
          </Text>
        </View>
        <Button
          title="APAGAR CONTA"
          icon={{ name: 'close' }}
          buttonStyle={{ marginTop: 10, }}
          onPress={() => Alert.alert(
            'Apagar conta',
            'Tem certeza que deseja apagar todos os dados cadastrado até hoje? Pense bem, pois,'
            +' uma vez aceita a confirmação para apagar sua conta, não será possível reverter'
            +' a ação e você acabará perdendo todos os seus dados. Deseja realmente apagar sua'
            +' conta?',
            [
              { text: 'Não' },
              { text: 'Sim', onPress: () => dispatch(setShowPasswordField(true)) },
            ]
          )}
          backgroundColor="#E65722"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    alignSelf: 'center',
    marginBottom: 10,
  },
  subtitle: {
    color: '#aaa',
    marginBottom: 8,
  },
  separator: {
    width: 100,
    height: 1,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 40,
  },
  logoFieldContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 150,
    marginHorizontal: 20,
    marginTop: 10,
  },
  logoImage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRightContentContainer: {
    flex: 2,
    paddingLeft: 10,
  },
  logoDisclaimerText: {
    color: '#ccc',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 15,
  },
})

MyAccountForm.propTypes = {
  next: PropTypes.func.isRequired,
}

const validate = (values, props) => {
  const errors = {}

  if (!values.first_name)
    errors.first_name = ' - Obrigatório'

  if (!values.last_name)
    errors.last_name = ' - Obrigatório'

  if (!values.email)
    errors.email = ' - Obrigatório'
  else if (!isValidEmail(values.email))
    errors.email = ' - Insira um email válido'

  if (props.authentication.showPasswordField) {
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
  }

  return errors
}

MyAccountForm = reduxForm({
  form: 'myAccountForm',
  validate
})(MyAccountForm)

const mapStateToProps = state => ({
  initialValues: state.authentication.user,
  authentication: state.authentication,
  imageUpload: state.upload.image,
})

MyAccountForm = connect(mapStateToProps)(MyAccountForm)

export default MyAccountForm
