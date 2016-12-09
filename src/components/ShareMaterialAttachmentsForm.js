import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Exponent from 'exponent'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox, List, ListItem } from 'react-native-elements'
import { StyleSheet, View, Picker, Text, Image, Alert, NativeModules } from 'react-native'
import { MaterialIcons } from '@exponent/vector-icons'

import { ReduxFormInput } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { pushMaterial, popMaterial, setSelected } from '../actions/ShareMaterialActions'
import * as placeholdit from '../constants/placeholdit'

class ShareMaterialAttachmentsForm extends Component {
  componentDidMount() {
    const { dispatch, turma: { update } } = this.props
    !isEmptyObject(update) && dispatch(setRepresentantes(update.representantes))
  }
  render() {
    const {
      handleSubmit,
      reset,
      invalid,
      dispatch,
      turma: { pickerSelected: turmaPickerSelected },
      shareMaterial: { anexos, selected: currentSelectedMaterial },
    } = this.props

    const currentSelectedMaterialUri = !!currentSelectedMaterial && currentSelectedMaterial.uri
    const currentSelectedMaterialExt = !!currentSelectedMaterial && currentSelectedMaterial.ext

    return (
      <View style={{ marginBottom: 20 }}>
        <Field
          {...this.props}
          name="titulo"
          component={ReduxFormInput}
          label="Título*"
          placeholder="Ex: Unified Modeling Language"
        />
        <FormLabel>Material</FormLabel>
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Button
              title={`${!currentSelectedMaterialUri ? 'Selecionar' : 'Alterar'}...`}
              backgroundColor="#2C3E50"
              buttonStyle={{ marginTop: 10 }}
              onPress={() => {
                NativeModules.FilePickerManager
                  .pickFile({ title: 'Selecione um arquivo', type: '*/*' })
                  .then(file => dispatch(setSelected(file)))
                  .catch(err => { console.error('Error [ShareMaterialAttachmentsForm][FilePickerManager]', err) })
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              title="Adicionar..."
              backgroundColor="#00AA00"
              disabled={invalid || !turmaPickerSelected || !turmaPickerSelected.id || !currentSelectedMaterialUri}
              buttonStyle={{ marginTop: 10 }}
              onPress={handleSubmit(fields => {
                const file = { uri: currentSelectedMaterialUri, ext: currentSelectedMaterialExt }
                dispatch(pushMaterial({ ...fields, file }))
                dispatch(setSelected(undefined))
                reset()
              })}
            />
          </View>
        </View>

        <FormLabel labelStyle={{ marginBottom: 0 }}>
          Materiais adicionados
        </FormLabel>
        {!anexos.length ? (
          <View style={styles.emptyListContainer}>
            <MaterialIcons name="attach-file" style={styles.emptyListIcon} />
            <Text style={{ color: '#333', marginTop: 5, }}>
              A lista de materiais está vazia.
            </Text>
          </View>
        ) : (
          <List containerStyle={styles.listContainerStyle}>
            {anexos.map((material, index) => (
              <ListItem
                key={`material-list-item-${index}`}
                title={material.titulo}
                subtitle={turmaPickerSelected && turmaPickerSelected.nome || ''}
                rightIcon={{ name: 'remove-circle', color: 'red' }}
                onPress={() => dispatch(popMaterial(material))}
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
    paddingTop: 15,
    paddingBottom: 35,
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
  if (!values.titulo)
    errors.titulo = ' - Obrigatório'

  return errors
}

ShareMaterialAttachmentsForm = reduxForm({
  form: 'shareMaterialAttachmentsForm',
  validate,
})(ShareMaterialAttachmentsForm)

const mapStateToProps = state => ({
  universidade: state.universidade,
  turma: state.turma,
  shareMaterial: state.shareMaterial,
  credentials: state.authentication.credentials,
})

ShareMaterialAttachmentsForm = connect(mapStateToProps)(ShareMaterialAttachmentsForm)

export default ShareMaterialAttachmentsForm
