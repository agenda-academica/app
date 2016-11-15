import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox, List, ListItem } from 'react-native-elements'
import { StyleSheet, View, Picker } from 'react-native'
import { MaterialIcons } from '@exponent/vector-icons'

import { ReduxFormInput } from './'

class RepresentantesCreateForm extends Component {
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
        <List
          containerStyle={{
            borderBottomColor: "#fff",
            borderTopColor: '#f0f0f0',
            marginBottom: 10
          }}
        >
          <ListItem
            title="José da Silva"
            subtitle="4MSIN, josedasilva@email.com"
            rightIcon={{ name: 'remove-circle', color: 'red' }}
            onPress={() => console.log('qqq')}
          />
        </List>
        <View style={{ alignItems: 'flex-end' }}>
          <MaterialIcons
            name="add-circle"
            style={{
              color: '#0084FF',
              fontSize: 30,
              marginRight: 10,
            }}
          />
        </View>
        <FormLabel>Turma</FormLabel>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={'hello'}
            onValueChange={value => dispatch(setUniversidadePickerSelected(value))}
            prompt="Selecione uma turma..."
          >
            <Picker.Item label="4MSIN" value="hello" />
          </Picker>
        </View>
        <Field
          {...this.props}
          name="nome"
          component={ReduxFormInput}
          label="Nome*"
          placeholder="Ex: José da Silva"
        />
        <Field
          {...this.props}
          name="abreviacao"
          component={ReduxFormInput}
          label="Email*"
          placeholder="Ex: josedasilva@email.com"
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
  pickerContainerDisabled: {
    borderBottomColor: '#f2f2f2',
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  picker: {
    flex: 1,
    height: 30,
    color: '#86939e',
  },
  pickerDisabled: {
    color: '#e2e2e2',
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

RepresentantesCreateForm = reduxForm({
  form: 'cursosCreateForm',
  validate,
})(RepresentantesCreateForm)

RepresentantesCreateForm = connect(
  state => ({
    initialValues: state.cursos || { nome: null },
  })
)(RepresentantesCreateForm)

export default RepresentantesCreateForm
