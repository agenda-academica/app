import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Exponent from 'exponent'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox, List, ListItem } from 'react-native-elements'
import { StyleSheet, View, Picker, Text, Image, Alert } from 'react-native'
import { MaterialIcons } from '@exponent/vector-icons'

import { ReduxFormInput } from '../components'
import { isValidEmail, isEmptyObject } from '../utilities/validationHelpers'
import { initialPickerItem as initialTurmaPickerItem } from '../reducers/TurmaReducer'
import { pushRepresentante, popRepresentante, setRepresentantes } from '../actions/TurmaActions'
import * as placeholdit from '../constants/placeholdit'

class TurmaRepresentantesForm extends Component {
  componentDidMount() {
    console.log('this.props', this.props)
    const { dispatch, turma: { update } } = this.props
    console.log('[componentWillMount] update:', update)
    !isEmptyObject(update) && dispatch(setRepresentantes(update.representantes))
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
      update,
      turma: { representantes },
    } = this.props

    console.log('repre update', update)

    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Field
            {...this.props}
            name="nome"
            component={ReduxFormInput}
            label="Nome*"
            placeholder="Ex: Steve"
          />
          <Field
            {...this.props}
            name="sobrenome"
            component={ReduxFormInput}
            label="Sobrenome*"
            placeholder="Ex: Jobs"
          />
          <Field
            {...this.props}
            keyboardType="email-address"
            name="email"
            component={ReduxFormInput}
            label="Email*"
            placeholder="Ex: steve@jobs.com"
          />
          <Button
            title="Adicionar..."
            backgroundColor="#008000"
            disabled={invalid}
            buttonStyle={{ marginTop: 10 }}
            onPress={handleSubmit(fields => {
              dispatch(pushRepresentante({ ...fields }))
              reset()
            })}
          />
        </View>

        <FormLabel labelStyle={{ marginBottom: 0 }}>
          Representantes adicionados
        </FormLabel>
        {!representantes.length ? (
          <View style={styles.emptyListContainer}>
            <MaterialIcons name="person" style={styles.emptyListIcon} />
            <Text style={{ color: '#333', marginTop: 5, }}>
              A lista de representantes está vazia.
            </Text>
          </View>
        ) : (
          <List containerStyle={styles.listContainerStyle}>
            {representantes.map((representante, index) => (
              <ListItem
                key={`representante-list-item-${index}`}
                title={`${representante.nome} ${representante.sobrenome}`}
                subtitle={representante.email}
                rightIcon={{ name: 'remove-circle', color: 'red' }}
                onPress={() => dispatch(popRepresentante(representante))}
              />
            ))}
          </List>
        )}
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
  preview: {
    flex: 1,
    height: 100,
    marginHorizontal: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.1)',
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  emptyListIcon: {
    color: '#666',
    fontSize: 50,
  },
  listContainerStyle: {
    borderBottomColor: "#fff",
    borderTopColor: '#f0f0f0',
    marginBottom: 10,
    marginTop: 10,
  },
})

const validate = values => {
  const errors = {}

  if (!values.nome)
    errors.nome = ' - Obrigatório'

  if (!values.sobrenome)
    errors.sobrenome = ' - Obrigatório'

  if (!values.email)
    errors.email = ' - Obrigatório'
  else if (!isValidEmail(values.email))
    errors.email = ' - Insira um email válido'

  return errors
}

TurmaRepresentantesForm = reduxForm({
  form: 'turmaRepresentantesForm',
  validate,
})(TurmaRepresentantesForm)

const mapStateToProps = state => ({
  turma: state.turma,
})

TurmaRepresentantesForm = connect(mapStateToProps)(TurmaRepresentantesForm)

export default TurmaRepresentantesForm
