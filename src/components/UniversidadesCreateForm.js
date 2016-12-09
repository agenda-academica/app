import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Exponent from 'exponent'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import ReactNative, { StyleSheet, Text, View, Image, Alert, NativeModules } from 'react-native'
import { RNS3 } from 'react-native-aws3'
import md5 from 'md5'
import ENV from '../../env'

import { uploadImage } from '../actions/UploadAction'
import { ReduxFormInput } from './'
import { API_URL } from '../constants/api'
import * as placeholdit from '../constants/placeholdit'
import { applicationJSON } from '../utilities/requestHelpers'
import { isEmptyObject } from '../utilities/validationHelpers'
import {
  requestUniversidadeCreate,
  successUniversidadeCreate,
  failureUniversidadeCreate,

  requestUniversidadeUpdate,
  successUniversidadeUpdate,
  failureUniversidadeUpdate,
} from '../actions/UniversidadeActions'

class UniversidadesCreateForm extends Component {
  _save({ values, logo }) {
    const { universidade: { update } } = this.props
    if (isEmptyObject(update)) this._create({ values, logo })
    else this._update({ values, logo })
  }

  _create({ values, logo }) {
    const { dispatch, credentials, successRedirect } = this.props

    const method = 'POST'
    const headers = { ...applicationJSON, ...credentials }
    const universidade = { ...values, logo }
    const body = JSON.stringify({ universidade })

    return fetch(`${API_URL}/universidades`, { method, headers, body })
      .then(res => res.json().then(data => {
        dispatch(uploadImage(undefined))
        if (data.errors && data.errors.length)
          dispatch(failureUniversidadeCreate(data.errors[0]))
        else {
          dispatch(successUniversidadeCreate(data))
          successRedirect()
        }
      }))
      .catch(error => dispatch(failureUniversidadeCreate(error)))
  }

  _update({ values, logo }) {
    const { universidade: { update }, dispatch, credentials, successRedirect } = this.props

    const method = 'PUT'
    const headers = { ...applicationJSON, ...credentials }
    const universidade = { ...values, logo }
    const body = JSON.stringify({ universidade })

    return fetch(`${API_URL}/universidades/${update.id}`, { method, headers, body })
      .then(res => res.json().then(data => {
        dispatch(uploadImage(undefined))
        if (data.errors && data.errors.length)
          dispatch(failureUniversidadeUpdate(data.errors[0]))
        else {
          dispatch(successUniversidadeUpdate(data))
          successRedirect()
        }
      }))
      .catch(error => dispatch(failureUniversidadeUpdate(error)))
  }

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
      credentials,
      successRedirect,
    } = this.props
    const { universidade: { update } } = this.props

    const imageUploadUri = !!imageUpload && imageUpload.uri
    const imageUploadExt = !!imageUpload && imageUpload.ext
    const imagePlaceholder = placeholdit.size({ width: 150, height: 150 })

    return (
      <View style={styles.container}>
        <Field
          {...this.props}
          name="nome"
          component={ReduxFormInput}
          label="Universidade*"
          placeholder="Ex: Universidade São Judas Tadeu"
        />
        <Field
          {...this.props}
          name="abreviacao"
          component={ReduxFormInput}
          label="Abreviação*"
          placeholder="Ex: USJT"
        />
        <Field
          {...this.props}
          name="site"
          component={ReduxFormInput}
          label="Site"
          placeholder="Ex: http://www.usjt.br"
        />
        <FormLabel>Logo</FormLabel>
        <View style={styles.logoFieldContainer}>
          <Image
            source={{ uri: imageUploadUri || update.logo || imagePlaceholder }}
            style={styles.logoImage}
          />
          <View style={styles.logoRightContentContainer}>
            <Text style={styles.logoDisclaimerText}>
              Selecione uma imagem com tamanho quadrado para que seja exibido
              corretamente nos cards de listagem de universidades.
            </Text>
            <Button
              onPress={() => {
                NativeModules.FilePickerManager
                  .pickFile({ title: 'Selecione uma imagem', type: 'image/*' })
                  .then(file => dispatch(uploadImage(file)))
                  .catch(err => { console.error('Error [UniversidadesCreateForm][FilePickerManager]', err) })
              }
              }
              title={!imageUpload && !update.logo ? 'Selecionar' : 'Alterar'}
              small={true}
            />
          </View>
        </View>
        <Button
          backgroundColor='#005bb1'
          title='CONTINUAR'
          disabled={invalid}
          buttonStyle={styles.submitButton}
          onPress={handleSubmit(values => {
            if (!imageUploadUri) {
              const logo = undefined
              this._save({ values, logo })
            }
            else {
              const file = {
                uri: imageUploadUri,
                name: `${md5(new Date())}.${imageUploadExt}`,
                type: 'application/octet-stream',
              }
              const options = {
                keyPrefix: 'uploads/',
                bucket: ENV['AWS_S3_BUCKET'],
                region: ENV['AWS_S3_REGION'],
                accessKey: ENV['AWS_S3_ACCESS_KEY'],
                secretKey: ENV['AWS_S3_SECRET_KEY'],
                successActionStatus: 201
              }

              dispatch(requestUniversidadeCreate())
              return RNS3.put(file, options).then(resImage => {
                if (resImage.status !== 201) throw new Error('Failed to upload image to S3')
                this._save({ values, logo: resImage.body.postResponse.location })
              })
            }
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

UniversidadesCreateForm.propTypes = {
  successRedirect: PropTypes.func.isRequired,
}

const validate = values => {
  const errors = {}
  if (!values.nome)
    errors.nome = ' - Obrigatório'

  if (!values.abreviacao)
    errors.abreviacao = ' - Obrigatório'

  return errors
}

UniversidadesCreateForm = reduxForm({
  form: 'universidadesCreateForm',
  validate,
})(UniversidadesCreateForm)

const mapStateToProps = state => ({
  initialValues: state.universidade.update,
  imageUpload: state.upload.image,
  credentials: state.authentication.credentials,
  universidade: state.universidade,
})

UniversidadesCreateForm = connect(mapStateToProps)(UniversidadesCreateForm)

export default UniversidadesCreateForm
