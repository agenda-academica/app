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
import { ReduxFormInput } from './'
import { API_URL } from '../constants/api'
import { applicationJSON } from '../utilities/requestHelpers'
import { pad } from '../utilities/stringHelpers'
import {
  requestUniversidadeCreate,
  successUniversidadeCreate,
  failureUniversidadeCreate,

  requestUniversidadeUpdate,
  successUniversidadeUpdate,
  failureUniversidadeUpdate,
} from '../actions/UniversidadeActions'
import {
  attachToDisciplina,
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
} from '../actions/EventoActions'

class EventoForm extends Component {
  _save({ values, logo }) {
    const { update } = this.props
    if (!update) this._create({ values, logo })
    else this._update({ values, logo })
  }

  _create({ values, logo }) {
    const { dispatch, credentials, successRedirect } = this.props

    const method = 'POST'
    const headers = { ...applicationJSON, ...credentials }
    const universidade = { ...values, logo }
    const body = JSON.stringify({ universidade })

    return fetch(`${API_URL}/universidades`, { method, headers, body })
      .then(res => res.json().then(data => {
        dispatch(uploadImage(undefined))
        if (data.errors && data.errors.length)
          dispatch(failureUniversidadeCreate(data.errors[0]))
        else {
          dispatch(successUniversidadeCreate(data))
          successRedirect()
        }
      }))
      .catch(error => dispatch(failureUniversidadeCreate(error)))
  }

  _update({ values, logo }) {
    const { update, dispatch, credentials, successRedirect } = this.props

    const method = 'PUT'
    const headers = { ...applicationJSON, ...credentials }
    const universidade = { ...values, logo }
    const body = JSON.stringify({ universidade })

    return fetch(`${API_URL}/universidades/${update.id}`, { method, headers, body })
      .then(res => res.json().then(data => {
        dispatch(uploadImage(undefined))
        if (data.errors && data.errors.length)
          dispatch(failureUniversidadeUpdate(data.errors[0]))
        else {
          dispatch(successUniversidadeUpdate(data))
          successRedirect()
        }
      }))
      .catch(error => dispatch(failureUniversidadeUpdate(error)))
  }

  showPicker = async (ref, dispatch, options) => {
    console.log('this.state', this.state)
    console.log('this.props', this.props)
    try {
      const { action, year, month, day } = await DatePickerAndroid.open(options)
      console.log('action, year, month, day', action, year, month, day)
      console.log('ref', ref)
      console.log('dispatch', dispatch)
      if (!action === DatePickerAndroid.dismissedAction) {
        var date = new Date(year, month, day);
        if (ref === 'inicio') dispatch(setDataInicio(date))
        else if (ref === 'fim') dispatch(setDataFim(date))
      }
      // if (action === DatePickerAndroid.dismissedAction) {
      //   newState[stateKey + 'Text'] = 'dismissed';
      // } else {
      //   var date = new Date(year, month, day);
      //   newState[stateKey + 'Text'] = date.toLocaleDateString();
      //   newState[stateKey + 'Date'] = date;
      // }
      // this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
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
      imageUpload,
      credentials,
      successRedirect,
      evento: {
        attach,
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

    const imageUploadUri = !!imageUpload && imageUpload.uri
    const imagePlaceholder = 'https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150'
      + '&w=150&h=150'

    console.log('this.state', this.state)

    return (
      <View style={styles.container}>
        <FormLabel>Vincular a uma disciplina</FormLabel>
        <Switch
          onValueChange={value => dispatch(attachToDisciplina(value))}
          style={{ marginBottom: 10, marginTop: -25 }}
          value={attach}
        />
        {
          !attach ? null : (
            <View>
              <FormLabel>Universidade</FormLabel>
              <View style={styles.pickerContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={universidade}
                  onValueChange={value => dispatch(setUniversidade(value))}
                  enabled={true}
                  prompt="Selecione uma universidade..."
                >
                  <Picker.Item label="hello" value="key1" />
                  <Picker.Item label="world" value={{ id: 1, foo: 'bar' }} />
                  <Picker.Item label="hello" value="key3" />
                  <Picker.Item label="world" value="key4" />
                </Picker>
              </View>
              <FormLabel>Unidade</FormLabel>
              <View style={[styles.pickerContainer, !!universidade ? {} : styles.pickerContainerDisabled]}>
                <Picker
                  style={[styles.picker, !!universidade ? {} : styles.pickerDisabled]}
                  selectedValue={unidade}
                  onValueChange={value => dispatch(setUnidade(value))}
                  enabled={!!universidade}
                  prompt="Selecione uma unidade..."
                >
                  <Picker.Item label="hello" value="key0" />
                  <Picker.Item label="world" value="key1" />
                </Picker>
              </View>
              <FormLabel>Curso</FormLabel>
              <View style={[styles.pickerContainer, !!unidade ? {} : styles.pickerContainerDisabled]}>
                <Picker
                  style={[styles.picker, !!unidade ? {} : styles.pickerDisabled]}
                  selectedValue={curso}
                  onValueChange={value => dispatch(setCurso(value))}
                  enabled={!!unidade}
                  prompt="Selecione um curso..."
                >
                  <Picker.Item label="hello" value="key0" />
                  <Picker.Item label="world" value="key1" />
                </Picker>
              </View>
              <FormLabel>Turma</FormLabel>
              <View style={[styles.pickerContainer, !!curso ? {} : styles.pickerContainerDisabled]}>
                <Picker
                  style={[styles.picker, !!curso ? {} : styles.pickerDisabled]}
                  selectedValue={turma}
                  onValueChange={value => dispatch(setTurma(value))}
                  enabled={!!curso}
                  prompt="Selecione uma turma..."
                >
                  <Picker.Item label="hello" value="key0" />
                  <Picker.Item label="world" value="key1" />
                </Picker>
              </View>
              <FormLabel>Disciplina</FormLabel>
              <View style={[styles.pickerContainer, !!turma ? {} : styles.pickerContainerDisabled]}>
                <Picker
                  style={[styles.picker, !!turma ? {} : styles.pickerDisabled]}
                  selectedValue={disciplina}
                  onValueChange={value => dispatch(setDisciplina(value))}
                  enabled={!!turma}
                  prompt="Selecione uma disciplina..."
                >
                  <Picker.Item label="hello" value="key0" />
                  <Picker.Item label="world" value="key1" />
                </Picker>
              </View>
            </View>
          )
        }
        <FormLabel>Tipo de evento</FormLabel>
        <ButtonGroup
          onPress={value => dispatch(setType(value))}
          selectedIndex={eventoType}
          buttons={['Prova', 'Trabalho', 'Outros']}
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
            <FontAwesome
              name="circle"
              color="#ad5000"
              style={{
                fontSize: 30,
              }}
            />
          </View>
          <View style={{ flex: 9 }}>
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
                DatePickerAndroid.open({ date: dataInicio }).then(data => {
                  const { action, year, month, day } = data
                  if (action === DatePickerAndroid.dateSetAction) {
                    dispatch(setDataInicio(new Date(year, month, day)))
                  }
                })
              }}
              title={
                pad(dataInicio.getDate(), '00') +'/'+
                pad(dataInicio.getMonth(), '00') +'/'+
                dataInicio.getFullYear()
              }
              small
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
              title={
                pad(dataFim.getDate(), '00') +'/'+
                pad(dataFim.getMonth(), '00') +'/'+
                dataFim.getFullYear()
              }
              small
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
            <Picker.Item label="5 minutos" value="key0" />
            <Picker.Item label="15 minutos" value="key1" />
            <Picker.Item label="30 minutos" value="key2" />
            <Picker.Item label="45 minutos" value="key3" />
            <Picker.Item label="1 hora" value="key4" />
            <Picker.Item label="2 horas" value="key5" />
            <Picker.Item label="3 horas" value="key6" />
          </Picker>
        </View>
        <Button
          backgroundColor='#005bb1'
          title='CONTINUAR'
          disabled={invalid}
          buttonStyle={styles.submitButton}
          onPress={handleSubmit(values => {
            if (!imageUploadUri) {
              // this._save({ values, logo: imageUploadUri })
              console.log('[EventoForm]: dont update image')
            }
            else {
              console.log('[EventoForm]: update image')
              const imageExt = imageUploadUri.match(/\.(.*)$/)[1]
              const file = {
                uri: imageUpload.uri,
                name: `${md5(new Date())}.${imageExt}`,
                type: `image/${imageExt}`,
              }
              const options = {
                keyPrefix: 'uploads/',
                bucket: 'agenda-academica',
                region: 'sa-east-1',
                accessKey: 'AKIAJQ6LDL2L4TA5BJSA',
                secretKey: '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',
                successActionStatus: 201
              }

              dispatch(requestUniversidadeCreate())
              return RNS3.put(file, options).then(resImage => {
                if (resImage.status !== 201) throw new Error('Failed to upload image to S3')
                this._save({ values, logo: resImage.body.postResponse.location })
              })
            }
          })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 50
  },
  logoFieldContainer: {
    flexDirection: 'row',
    flex: 1,
    height: 150,
    marginHorizontal: 20,
    marginTop: 10,
  },
  logoImage: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRightContentContainer: {
    flex: 2,
    paddingLeft: 10,
  },
  logoDisclaimerText: {
    color: '#ccc',
    marginBottom: 10,
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
  buttonPicker: {
    marginTop: 5,
  },
})

EventoForm.propTypes = {
  successRedirect: PropTypes.func.isRequired,
}

const validate = values => {
  const errors = {}
  if (!values.nome)
    errors.nome = ' - Obrigatório'

  if (!values.abreviacao)
    errors.abreviacao = ' - Obrigatório'

  return errors
}

EventoForm = reduxForm({ form: 'eventoForm', validate })(EventoForm)

const mapStateToProps = state => ({
  initialValues: state.universidades || { nome: null },
  imageUpload: state.upload.image,
  credentials: state.authentication.credentials,
  evento: state.evento,
})

EventoForm = connect(mapStateToProps)(EventoForm)

export default EventoForm
