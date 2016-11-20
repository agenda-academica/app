import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Exponent from 'exponent'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox, List, ListItem } from 'react-native-elements'
import { StyleSheet, View, Picker, Text, Image, Alert } from 'react-native'
import { MaterialIcons } from '@exponent/vector-icons'

import { ReduxFormInput, UniversidadePicker, TurmaPicker } from '../components'
import { isEmptyObject } from '../utilities/validationHelpers'
import { initialPickerItem as initialTurmaPickerItem } from '../reducers/TurmaReducer'
import { pushMaterial, popMaterial, setSelected } from '../actions/ShareMaterialActions'
import * as placeholdit from '../constants/placeholdit'
import { save } from '../utilities/shareMaterialHelpers'

class ShareMaterialCreateForm extends Component {
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      touch,
      invalid,
      dispatch,
      universidade: { pickerSelected: universidadePickerSelected },
      turma: { pickerSelected: turmaPickerSelected },
      shareMaterial: { anexos, selected: currentSelectedMaterial },
    } = this.props

    const currentSelectedMaterialUri = !!currentSelectedMaterial && currentSelectedMaterial.uri

    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 50 }}>
          <UniversidadePicker disabled={!!anexos.length} />
          <TurmaPicker
            selected={initialTurmaPickerItem}
            disabled={!universidadePickerSelected || !universidadePickerSelected.id || !!anexos.length}
            filter={
              turma => (
                universidadePickerSelected instanceof Object &&
                turma instanceof Object && turma.universidade instanceof Object &&
                turma.universidade.id === universidadePickerSelected.id
              ) || !turma.id
            }
          />
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
                onPress={() => Exponent.ImagePicker
                  .launchImageLibraryAsync({ allowsEditing: false, aspect: [100, 100] })
                  .then(image => dispatch(setSelected(image)))
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button
                title="Adicionar..."
                backgroundColor="#00AA00"
                disabled={invalid || !turmaPickerSelected || !turmaPickerSelected.id || !currentSelectedMaterialUri}
                buttonStyle={{ marginTop: 10 }}
                onPress={handleSubmit(fields => {
                  dispatch(pushMaterial({ ...fields, file: currentSelectedMaterialUri, }))
                  dispatch(setSelected(undefined))
                  reset()
                })}
              />
            </View>
          </View>
          {!!currentSelectedMaterialUri && (
            <View>
              <FormLabel>Preview</FormLabel>
              <Image
                resizeMode="cover"
                source={{ uri: currentSelectedMaterialUri || placeholdit.card('😎') }}
                style={styles.preview}
              />
              <Image source={{ uri: currentSelectedMaterialUri }} />
            </View>
          )}
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
                subtitle={turmaPickerSelected.nome}
                rightIcon={{ name: 'remove-circle', color: 'red' }}
                onPress={() => dispatch(popMaterial(material))}
              />
            ))}
          </List>
        )}
        <Button
          backgroundColor='#005bb1'
          title='COMPARTILHAR'
          icon={{ name: 'share' }}
          disabled={!anexos.length}
          buttonStyle={styles.submitButton}
          onPress={() => Alert.alert(
            'Confirmação',
            'Tudo pronto? Tem certeza que anexou todos os materiais que desejava?',
            [
              { text: 'Não' },
              { text: 'Sim', onPress: () => save({ anexos, ...this.props }) }
            ]
          )}
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
  if (!values.titulo)
    errors.titulo = ' - Obrigatório'

  return errors
}

ShareMaterialCreateForm = reduxForm({
  form: 'shareMaterialCreateForm',
  validate,
})(ShareMaterialCreateForm)

const mapStateToProps = state => ({
  universidade: state.universidade,
  turma: state.turma,
  shareMaterial: state.shareMaterial,
  credentials: state.authentication.credentials,
})

ShareMaterialCreateForm = connect(mapStateToProps)(ShareMaterialCreateForm)

export default ShareMaterialCreateForm
