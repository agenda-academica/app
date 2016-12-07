import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Exponent from 'exponent'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { FormLabel, FormInput, Button, ButtonGroup, List, ListItem } from 'react-native-elements'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Picker,
  Switch,
  DatePickerAndroid,
  TimePickerAndroid,
} from 'react-native'
import { FontAwesome } from '@exponent/vector-icons'
import { RNS3 } from 'react-native-aws3'
import md5 from 'md5'

import { uploadImage } from '../actions/UploadAction'
import {
  ReduxFormInput,
  UniversidadePicker,
  UnidadePicker,
  CursoPicker,
  TurmaPicker,
  DisciplinaPicker,
} from '../components'
import { API_URL } from '../constants/api'
import { applicationJSON } from '../utilities/requestHelpers'
import { pad } from '../utilities/stringHelpers'
import { isEmptyObject } from '../utilities/validationHelpers'
import { notifications } from '../constants/shared'
import { dateFormat } from '../utilities/dateHelpers'
import {
  requestUniversidadeCreate,
  successUniversidadeCreate,
  failureUniversidadeCreate,

  requestUniversidadeUpdate,
  successUniversidadeUpdate,
  failureUniversidadeUpdate,
} from '../actions/UniversidadeActions'
import { setShow as setShowSimpleColorPicker } from '../actions/SimpleColorPickerActions'
import { initialPickerItem as initialUniversidadePickerItem } from '../reducers/UniversidadeReducer'
import { initialPickerItem as initialUnidadePickerItem } from '../reducers/UnidadeReducer'
import { initialPickerItem as initialCursoPickerItem } from '../reducers/CursoReducer'
import { initialPickerItem as initialTurmaPickerItem } from '../reducers/TurmaReducer'
import { initialPickerItem as initialDisciplinaPickerItem } from '../reducers/DisciplinaReducer'
import {
  setUniversidade,
  setUnidade,
  setCurso,
  setTurma,
  setDisciplina,
  setType,
  setDataInicio,
  setDataFim,
  setHoraInicio,
  setHoraFim,
  setNotifyPeriod,
  eventoTypes,
} from '../actions/EventoActions'
import { save } from '../utilities/eventoHelpers'

class EventoForm extends Component {
  showPicker = async (ref, dispatch, options) => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open(options)
      if (action === DatePickerAndroid.dateSetAction) {
        const date = new Date(year, month, day)
        if (ref === 'inicio') dispatch(setDataInicio(date))
        else if (ref === 'fim') dispatch(setDataFim(date))
      }
    } catch ({code, message}) {
      console.warn(`Error [EventoForm] '${ref}' button:`, message)
    }
  };

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
      simpleColorPicker: { selected: color },
      universidade: { pickerSelected: universidadePickerSelected },
      unidade: { pickerSelected: unidadePickerSelected },
      curso: { pickerSelected: cursoPickerSelected },
      turma: { pickerSelected: turmaPickerSelected },
      disciplina: { pickerSelected: disciplinaPickerSelected },
      evento: {
        universidade,
        unidade,
        curso,
        turma,
        disciplina,
        eventoType,
        dataInicio,
        dataFim,
        horaInicio,
        horaFim,
        notifyPeriod,
      },
    } = this.props
    const { update } = this.props

    let selectedUniversidade = initialUniversidadePickerItem
    if (!isEmptyObject(update)) selectedUniversidade = update.universidade

    let selectedUnidade = initialUnidadePickerItem
    if (!isEmptyObject(update)) selectedUnidade = update.unidade

    let selectedCurso = initialCursoPickerItem
    if (!isEmptyObject(update)) selectedCurso = update.curso

    let selectedTurma = initialTurmaPickerItem
    if (!isEmptyObject(update)) selectedTurma = update.turma

    let selectedDisciplina = initialDisciplinaPickerItem
    if (!isEmptyObject(update)) selectedDisciplina = update.disciplina

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
        <DisciplinaPicker
          selected={selectedDisciplina}
          disabled={!turmaPickerSelected || !turmaPickerSelected.id}
          filter={
            disciplina => (
              turmaPickerSelected instanceof Object &&
              disciplina instanceof Object && disciplina.turma instanceof Object &&
              disciplina.turma.id === turmaPickerSelected.id
            ) || !disciplina.id
          }
        />
        <FormLabel>Tipo de evento</FormLabel>
        <ButtonGroup
          onPress={value => dispatch(setType(value))}
          selectedIndex={eventoType}
          buttons={eventoTypes}
        />
        <FormLabel>Cor</FormLabel>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 15,
            marginTop: 5,
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <FontAwesome name="circle" color={color} style={{ fontSize: 30 }} />
          </View>
          <View style={{ flex: 9 }}>
            <Button
              onPress={() => dispatch(setShowSimpleColorPicker(true))}
              title="Selecionar cor..."
              small
              buttonStyle={styles.buttonPicker}
            />
          </View>
        </View>
        <Field
          {...this.props}
          name="titulo"
          component={ReduxFormInput}
          label="Título*"
          placeholder="Ex: Palestra sobre crowdfunding"
        />
        <Field
          {...this.props}
          name="descricao"
          component={ReduxFormInput}
          label="Descrição*"
          placeholder="Ex: Sustentabilidade de atividade turística"
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <FormLabel>Data início</FormLabel>
            <Button
              onPress={() => {
                DatePickerAndroid.open({ date: dataInicio, minDate: dataInicio }).then(data => {
                  const { action, year, month, day } = data
                  if (action === DatePickerAndroid.dateSetAction) {
                    dispatch(setDataInicio(new Date(year, month, day)))
                  }
                })
              }}
              small
              title={dateFormat.ddmmyyyy(dataInicio, '/')}
              buttonStyle={styles.buttonPicker}
            />
          </View>
          <View style={{ flex: 2 }}>
            <FormLabel>Data fim</FormLabel>
            <Button
              onPress={() => {
                DatePickerAndroid.open({ date: dataFim, minDate: dataInicio }).then(data => {
                  const { action, year, month, day } = data
                  if (action === DatePickerAndroid.dateSetAction) {
                    dispatch(setDataFim(new Date(year, month, day)))
                  }
                })
              }}
              small
              title={dateFormat.ddmmyyyy(dataFim, '/')}
              buttonStyle={styles.buttonPicker}
            />
          </View>
        </View>

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
              title={`${pad(horaInicio.getHours(), '00')}h${pad(horaInicio.getMinutes(), '00')}`}
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
              title={`${pad(horaFim.getHours(), '00')}h${pad(horaFim.getMinutes(), '00')}`}
              small
              buttonStyle={styles.buttonPicker}
            />
          </View>
        </View>
        <FormLabel>Notificar antecipadamente em</FormLabel>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={notifyPeriod}
            onValueChange={value => dispatch(setNotifyPeriod(value))}
            prompt="Selecione um período..."
            itemStyle={{ backgroundColor: 'white' }}
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
          disabled={invalid || (!disciplinaPickerSelected || !disciplinaPickerSelected.id)}
          buttonStyle={styles.submitButton}
          onPress={
            handleSubmit(fields => {
              const values = {
                ...fields,
                disciplina_id: disciplinaPickerSelected.id,
                tipo: eventoTypes[eventoType],
                cor: color,
                data_inicio: dateFormat.yyyymmdd(dataInicio, '-'),
                data_fim: dateFormat.yyyymmdd(dataFim, '-'),
                hora_inicio: dateFormat.hhmm(horaInicio, ':'),
                hora_fim: dateFormat.hhmm(horaFim, ':'),
                notify_at: notifyPeriod,
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
})

EventoForm.propTypes = {
  next: PropTypes.func.isRequired,
}

const validate = values => {
  const errors = {}
  if (!values.titulo)
    errors.titulo = ' - Obrigatório'

  if (!values.descricao)
    errors.descricao = ' - Obrigatório'

  return errors
}

EventoForm = reduxForm({ form: 'eventoForm', validate })(EventoForm)

const mapStateToProps = state => ({
  initialValues: state.universidades || {},
  credentials: state.authentication.credentials,
  universidade: state.universidade,
  unidade: state.unidade,
  curso: state.curso,
  turma: state.turma,
  disciplina: state.disciplina,
  evento: state.evento,
  simpleColorPicker: state.simpleColorPicker,
})

EventoForm = connect(mapStateToProps)(EventoForm)

export default EventoForm
