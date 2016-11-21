import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'react-native-elements'
import { StyleSheet, View, Alert } from 'react-native'

import { ReduxFormInput, UniversidadePicker, TurmaPicker } from '../components'
import { initialPickerItem as initialTurmaPickerItem } from '../reducers/TurmaReducer'
import { save } from '../utilities/shareMaterialHelpers'

class ShareMaterialCreateForm extends Component {
  render() {
    const {
      invalid,
      children,
      universidade: { pickerSelected: universidadePickerSelected },
      turma: { pickerSelected: turmaPickerSelected },
      shareMaterial: { anexos },
    } = this.props

    return (
      <View style={styles.container}>
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
          label="Título de compartilhamento*"
          placeholder="Ex: Materiais de estudo para prova"
        />

        {React.cloneElement(children, this.props)}

        <Button
          backgroundColor='#005bb1'
          title='COMPARTILHAR'
          icon={{ name: 'share' }}
          disabled={invalid || !turmaPickerSelected || !turmaPickerSelected.id || !anexos.length}
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
})

ShareMaterialCreateForm = connect(mapStateToProps)(ShareMaterialCreateForm)

export default ShareMaterialCreateForm
