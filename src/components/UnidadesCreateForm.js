import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, View, Picker } from 'react-native'

import { ReduxFormInput, UniversidadePicker } from '../components'
import { API_URL } from '../constants/api'
import { applicationJSON } from '../utilities/requestHelpers'
import {
  setUnidadeSede,
  requestUnidadeCreate,
  successUnidadeCreate,
  failureUnidadeCreate,
} from '../actions/UnidadeActions'
import { save } from '../utilities/unidadeHelpers'
import { initialPickerItem } from '../reducers/UniversidadeReducer'
import { isEmptyObject } from '../utilities/validationHelpers'

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
      next,
      update,
      universidade: {
        loading,
        list: universidadeList,
        pickerSelected: universidadePickerSelected,
      },
      unidade: { unidadeSede },
    } = this.props

    let selectedUniversidade = initialPickerItem
    if (!isEmptyObject(update)) selectedUniversidade = update.universidade

    return (
      <View style={styles.container}>
        <UniversidadePicker selected={selectedUniversidade} />
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
          label="Outras Informações"
          placeholder="Ex: Opcional"
        />
        <CheckBox
          title="Unidade Sede"
          checked={unidadeSede}
          checkedColor="#005bb1"
          onPress={() => { dispatch(setUnidadeSede(!unidadeSede)) }}
        />
        <Button
          backgroundColor='#005bb1'
          title='CONTINUAR'
          disabled={invalid || !universidadePickerSelected.id}
          buttonStyle={styles.submitButton}
          onPress={
            handleSubmit(fields => {
              const values = {
                ...fields,
                universidade_id: universidadePickerSelected.id,
                unidade_sede: Number(unidadeSede),
              }
              save({ values, ...this.props, next })
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

  if (!values.endereco)
    errors.endereco = ' - Obrigatório'

  return errors
}

UnidadesCreateForm = reduxForm({
  form: 'unidadesCreateForm',
  validate,
})(UnidadesCreateForm)

const mapStateToProps = state => ({
  universidade: state.universidade,
  unidade: state.unidade,
  credentials: state.authentication.credentials,
})

UnidadesCreateForm = connect(mapStateToProps)(UnidadesCreateForm)

export default UnidadesCreateForm
