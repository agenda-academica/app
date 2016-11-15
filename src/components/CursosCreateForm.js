import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'

import { ReduxFormInput } from './'

class CursosCreateForm extends Component {
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

  if (!values.abreviacao)
    errors.abreviacao = ' - Obrigatório'

  return errors
}

CursosCreateForm = reduxForm({
  form: 'cursosCreateForm',
  validate,
})(CursosCreateForm)

CursosCreateForm = connect(
  state => ({
    initialValues: state.cursos || { nome: null },
  })
)(CursosCreateForm)

export default CursosCreateForm
