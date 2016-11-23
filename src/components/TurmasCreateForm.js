import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, View, Text} from 'react-native'

import {
  ReduxFormInput,
  UniversidadePicker,
  UnidadePicker,
  CursoPicker
} from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { initialPickerItem as initialUniversidadePickerItem } from '../reducers/UniversidadeReducer'
import { initialPickerItem as initialUnidadePickerItem } from '../reducers/UnidadeReducer'
import { initialPickerItem as initialCursoPickerItem } from '../reducers/CursoReducer'
import { save } from '../utilities/turmaHelpers'

class TurmasCreateForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      touch,
      invalid,
      next,
      universidade: { pickerSelected: universidadePickerSelected },
      unidade: { pickerSelected: unidadePickerSelected },
      curso: { pickerSelected: cursoPickerSelected },
      turma: { update, representantes },
      children,
    } = this.props

    let selectedUniversidade = initialUniversidadePickerItem
    if (!isEmptyObject(update)) selectedUniversidade = update.universidade

    let selectedUnidade = initialUnidadePickerItem
    if (!isEmptyObject(update)) selectedUnidade = update.unidade

    let selectedCurso = initialCursoPickerItem
    if (!isEmptyObject(update)) selectedCurso = update.curso

    return (
      <View style={styles.container}>
        <UniversidadePicker selected={selectedUniversidade} />
        <UnidadePicker
          selected={selectedUnidade}
          disabled={!universidadePickerSelected || !universidadePickerSelected.id}
          filter={
            unidade => (
              universidadePickerSelected instanceof Object &&
              unidade.universidade.id === universidadePickerSelected.id
            ) || !unidade.id
          }
        />
        <CursoPicker
          selected={selectedCurso}
          disabled={!unidadePickerSelected || !unidadePickerSelected.id}
          filter={
            curso => (
              unidadePickerSelected instanceof Object &&
              curso instanceof Object && curso.unidade instanceof Object &&
              curso.unidade.id === unidadePickerSelected.id
            ) || !curso.id
          }
        />
        <Field
          {...this.props}
          name="nome"
          component={ReduxFormInput}
          label="Turma*"
          placeholder="Ex: 4MSIN"
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

        {React.cloneElement(children, {...{ ...this.props, update }})}

        <Button
          backgroundColor='#005bb1'
          title='SALVAR'
          disabled={invalid || !representantes.length}
          onPress={
            handleSubmit(fields => {
              const values = { ...fields, representantes, curso_id: cursoPickerSelected.id }
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

const mapStateToProps = state => ({
  initialValues: state.turma.update,
  universidade: state.universidade,
  unidade: state.unidade,
  curso: state.curso,
  turma: state.turma,
  credentials: state.authentication.credentials,
})

TurmasCreateForm = connect(mapStateToProps)(TurmasCreateForm)

export default TurmasCreateForm
