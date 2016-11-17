import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ScrollView,
} from 'react-native'
import { Button, List, ListItem } from 'react-native-elements'
import Calendar from 'react-native-calendar'
import { MaterialIcons } from '@exponent/vector-icons'
import ActionButton from 'react-native-action-button'

import Router from '../Router'
import mockEvents from './_mock-events'
import { pad } from '../utilities/stringHelpers'
import { setModalVisible, setSelectedDate } from '../actions/CalendarioActions'
import { fetchEventos } from '../utilities/fetchHelpers'
import { Loading } from '../components'
import { dateFormat } from '../utilities/dateHelpers'

class CalendarioScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Calendário',
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  componentWillMount() {
    const { evento: { loaded }, dispatch, credentials } = this.props
    if (!loaded) fetchEventos({ dispatch, credentials })
  }

  render() {
    const {
      dispatch,
      calendario: { modalVisible, selectedDate },
      evento: { loading, loaded, list: eventList }
    } = this.props

    const events = eventList.map(event => ({
      date: event.data_inicio,
      eventIndicator: { backgroundColor: event.cor },
    }))
    const eventDates = eventList.map(event => event.data_inicio)

    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => dispatch(setModalVisible(false))}
        >
         <ScrollView style={{ paddingHorizontal: 20, backgroundColor: 'rgba(0,0,0,.6)' }}>
          <View style={{ paddingBottom: 20, paddingTop: 20, backgroundColor: 'white' }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#f0f0f0',
                borderStyle: 'solid',
                marginBottom: 25,
              }}
            >
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 30,
                  paddingBottom: 20,
                  color: '#333',
                  fontWeight: 'bold',
                }}
              >
                EVENTOS
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <MaterialIcons name="event" style={{ fontSize: 80, color: '#333' }} />
              <Text style={{ marginTop: 5, fontSize: 20, color: '#333' }}>
                {!selectedDate ? '' : dateFormat.ddmmyyyy(selectedDate, '/')}
              </Text>
            </View>

            <Text
              style={{
                fontSize: 20,
                color: '#333',
                marginLeft: 35,
                marginBottom: -10,
                marginTop: 15,
              }}
            >
              Eventos pontuais
            </Text>
            <List
              containerStyle={{
                borderBottomColor: "#fff",
                borderTopColor: '#f0f0f0',
                marginBottom: 30
              }}
            >
              {
                eventList
                  .filter(event => event.data_inicio === dateFormat.yyyymmdd(selectedDate, '-'))
                  .map(event => (
                    <ListItem
                      key={`point-event-${event.id}`}
                      title={event.titulo}
                      subtitle={
                        dateFormat.hhmm(new Date(event.hora_inicio), 'h')
                        +' às '+ dateFormat.hhmm(new Date(event.hora_fim), 'h')
                        +', '+ event.universidade.abreviacao
                        +', '+ event.unidade.nome
                        +', '+ event.curso.abreviacao
                        +', '+ event.turma.nome
                      }
                      leftIcon={{ name: "circle", type: 'font-awesome', color: event.cor }}
                      onPress={() => {
                        dispatch(setModalVisible(false))
                        this.props.navigator.push(Router.getRoute('eventoForm', event))
                      }}
                    />
                  ))
              }
            </List>

            <Button
              title="Fechar"
              onPress={() => { dispatch(setModalVisible(!modalVisible)) }}
              backgroundColor="#005bb1"
              color="white"
              buttonStyle={{ marginTop: 50 }}
            />
          </View>
         </ScrollView>
        </Modal>

        <Calendar
          scrollEnabled={true}
          showControls={true}
          titleFormat={'MMMM YYYY'}
          dayHeadings={['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']}
          monthNames={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']}
          prevButtonText={'◀'}
          nextButtonText={'▶️'}
          onDateSelect={selected => {
            const date = new Date(selected)
            if (eventList.some(event => event.data_inicio === dateFormat.yyyymmdd(date, '-'))) {
              dispatch(setModalVisible(!modalVisible))
              dispatch(setSelectedDate(date))
            }
          }}
          eventDates={eventDates}
          events={events}
          customStyle={{
            day: { fontSize: 15, textAlign: 'center', borderColor: '#fff' },
            calendarContainer: { backgroundColor: '#fff' },
            weekRow: { height: 65, borderColor: '#fff' },
            title: { fontSize: 22 },
            calendarControls: { marginVertical: 15 },
            calendarHeading: { borderColor: '#fff' },
            selectedDayCircle: { backgroundColor: '#bbb' },
            currentDayText: { color: '#000', fontWeight: 'bold', fontSize: 22 },
            currentDayCircle: { backgroundColor: '#ccc' },
          }}
          weekStart={0}
        />
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Adicionar evento"
            onPress={this._goToScreen('eventoForm')}
          >
            <MaterialIcons name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <Loading show={loading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
})

const mapStateToProps = state => ({
  calendario: state.calendario,
  evento: state.evento,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(CalendarioScreen)
