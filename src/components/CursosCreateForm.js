import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'

import { ReduxFormInput, UniversidadePicker, UnidadePicker } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { initialPickerItem as initialUniversidadePickerItem } from '../reducers/UniversidadeReducer'
import { initialPickerItem as initialUnidadePickerItem } from '../reducers/UnidadeReducer'
import { save } from '../utilities/cursoHelpers'

class CursosCreateForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      touch,
      invalid,
      dispatch,
      next,
      update,
      credentials,
      universidade: { pickerSelected: universidadePickerSelected },
      unidade: { pickerSelected: unidadePickerSelected },
    } = this.props

    let selectedUniversidade = initialUniversidadePickerItem
    if (!isEmptyObject(update)) selectedUniversidade = update.universidade

    let selectedUnidade = initialUnidadePickerItem
    if (!isEmptyObject(update)) selectedUnidade = update.unidade

    return (
      <View style={styles.container}>
        <UniversidadePicker selected={selectedUniversidade} />
        <UnidadePicker
          selected={selectedUnidade}
          filter={
            unidade => (
              universidadePickerSelected instanceof Object &&
              unidade.universidade.id === universidadePickerSelected.id
            ) || !unidade.id
          }
        />
        <Field
          {...this.props}
          name="nome"
          component={ReduxFormInput}
          label="Curso*"
          placeholder="Ex: Sistemas de Informação"
        />
        <Field
          {...this.props}
          name="abreviacao"
          component={ReduxFormInput}
          label="Abreviação*"
          placeholder="Ex: SI"
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
          disabled={invalid || (unidadePickerSelected instanceof Object && !unidadePickerSelected.id)}
          buttonStyle={styles.submitButton}
          onPress={
            handleSubmit(fields => {
              const values = { ...fields, unidade_id: unidadePickerSelected.id }
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

  if (!values.abreviacao)
    errors.abreviacao = ' - Obrigatório'

  return errors
}

CursosCreateForm = reduxForm({ form: 'cursosCreateForm', validate })(CursosCreateForm)

const mapStateToProps = state => ({
  universidade: state.universidade,
  unidade: state.unidade,
  credentials: state.authentication.credentials,
})

CursosCreateForm = connect(mapStateToProps)(CursosCreateForm)

export default CursosCreateForm
