import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { FormLabel, Button, CheckBox } from 'react-native-elements'
import { StyleSheet, View, TimePickerAndroid, Picker } from 'react-native'
import { FontAwesome } from '@exponent/vector-icons'

import {
  ReduxFormInput,
  UniversidadePicker,
  UnidadePicker,
  CursoPicker,
  TurmaPicker,
} from '../components'
import { pad } from '../utilities/stringHelpers'
import { isEmptyObject } from '../utilities/validationHelpers'
import { initialPickerItem as initialUniversidadePickerItem } from '../reducers/UniversidadeReducer'
import { initialPickerItem as initialUnidadePickerItem } from '../reducers/UnidadeReducer'
import { initialPickerItem as initialCursoPickerItem } from '../reducers/CursoReducer'
import { initialPickerItem as initialTurmaPickerItem } from '../reducers/TurmaReducer'
import { setHoraInicio, setHoraFim, setDiaSemana, setNotifyAt } from '../actions/DisciplinaActions'
import { save } from '../utilities/disciplinaHelpers'
import { weekdays, notifications } from '../constants/shared'
import { dateFormat } from '../utilities/dateHelpers'

class DisciplinasCreateForm extends Component {
  render() {
    const {
      handleSubmit,
      invalid,
      dispatch,
      next,
      universidade: { pickerSelected: universidadePickerSelected },
      unidade: { pickerSelected: unidadePickerSelected },
      curso: { pickerSelected: cursoPickerSelected },
      turma: { pickerSelected: turmaPickerSelected },
      disciplina: { update, horaInicio, horaFim, diaSemana, notifyAt },
    } = this.props

    let selectedUniversidade = initialUniversidadePickerItem
    if (!isEmptyObject(update)) selectedUniversidade = update.universidade

    let selectedUnidade = initialUnidadePickerItem
    if (!isEmptyObject(update)) selectedUnidade = update.unidade

    let selectedCurso = initialCursoPickerItem
    if (!isEmptyObject(update)) selectedCurso = update.curso

    let selectedTurma = initialTurmaPickerItem
    if (!isEmptyObject(update)) selectedTurma = update.turma

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
        <TurmaPicker
          selected={selectedTurma}
          disabled={!cursoPickerSelected || !cursoPickerSelected.id}
          filter={
            turma => (
              cursoPickerSelected instanceof Object &&
              turma instanceof Object && turma.curso instanceof Object &&
              turma.curso.id === cursoPickerSelected.id
            ) || !turma.id
          }
        />
        <Field
          {...this.props}
          name="abreviacao"
          component={ReduxFormInput}
          label="Abreviação*"
          placeholder="Ex: LOGPROG"
        />
        <Field
          {...this.props}
          name="nome"
          component={ReduxFormInput}
          label="Nome*"
          placeholder="Ex: Lógica de Programação"
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <FormLabel>Hora início</FormLabel>
            <Button
              onPress={() => {
                TimePickerAndroid.open({
                  hour: horaInicio.getHours(),
                  minute: horaInicio.getMinutes(),
                  is24Hour: true,
                }).then(data => {
                  const { action, minute, hour } = data
                  if (action === TimePickerAndroid.timeSetAction) {
                    dispatch(setHoraInicio(new Date(0, 0, 0, hour, minute)))
                  }
                })
              }}
              title={dateFormat.hhmm(horaInicio, 'h')}
              small
              buttonStyle={styles.buttonPicker}
            />
          </View>
          <View style={{ flex: 2 }}>
            <FormLabel>Hora fim</FormLabel>
            <Button
              onPress={() => {
                TimePickerAndroid.open({
                  hour: horaFim.getHours(),
                  minute: horaFim.getMinutes(),
                  is24Hour: true,
                }).then(data => {
                  const { action, minute, hour } = data
                  if (action === TimePickerAndroid.timeSetAction) {
                    dispatch(setHoraFim(new Date(0, 0, 0, hour, minute)))
                  }
                })
              }}
              title={dateFormat.hhmm(horaFim, 'h')}
              small
              buttonStyle={styles.buttonPicker}
            />
          </View>
        </View>
        <FormLabel>Dia da semana</FormLabel>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={diaSemana}
            onValueChange={value => dispatch(setDiaSemana(value))}
            prompt="Selecione um dia da semana..."
          >
            {weekdays.map(dia => (
              <Picker.Item
                key={`dia-semana-${dia.value}`}
                label={dia.label}
                value={dia.value}
              />
            ))}
          </Picker>
        </View>
        <FormLabel>Notificar antecipadamente em:</FormLabel>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={notifyAt}
            onValueChange={value => dispatch(setNotifyAt(value))}
            prompt="Selecione um período..."
          >
            {notifications.map(notify => (
              <Picker.Item
                key={`notify-at-${notify.value}`}
                label={notify.label}
                value={notify.value}
              />
            ))}
          </Picker>
        </View>
        <Button
          backgroundColor='#005bb1'
          title='CONTINUAR'
          disabled={
            invalid ||
            !horaInicio || !horaFim || typeof diaSemana === 'undefined' ||
            !turmaPickerSelected.id
          }
          buttonStyle={styles.submitButton}
          onPress={
            handleSubmit(fields => {
              const values = {
                ...fields,
                turma_id: turmaPickerSelected.id,
                hora_inicio: dateFormat.hhmm(horaInicio, ':'),
                hora_fim: dateFormat.hhmm(horaFim, ':'),
                dia_semana: diaSemana,
                notify_at: notifyAt,
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
  buttonPicker: {
    marginTop: 5,
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

  return errors
}

DisciplinasCreateForm = reduxForm({ form: 'disciplinasCreateForm', validate })(DisciplinasCreateForm)

const mapStateToProps = state => ({
  initialValues: state.disciplina.update,
  universidade: state.universidade,
  unidade: state.unidade,
  curso: state.curso,
  turma: state.turma,
  disciplina: state.disciplina,
  credentials: state.authentication.credentials,
})

DisciplinasCreateForm = connect(mapStateToProps)(DisciplinasCreateForm)

export default DisciplinasCreateForm
