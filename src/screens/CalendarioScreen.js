import React, { PropTypes, Component } from 'react'
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

class CalendarioScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Calendário',
    },
  }

  state = {
    modalVisible: false,
    selectedDate: new Date(),
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setSelectedDate(date) {
    this.setState({ selectedDate: date })
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  render() {
    const date = new Date(this.state.selectedDate)
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
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
              <MaterialIcons
                name="event"
                style={{
                  fontSize: 80,
                  color: '#333'
                }}
              />
              <Text style={{ marginTop: 5, fontSize: 20, color: '#333' }}>
                {!date ? '' :
                          pad(date.getDate(), '00')
                  + '/' + pad(date.getMonth(), '00')
                  + '/' + pad(date.getFullYear(), '0000')
                }
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
              <ListItem
                title="Prova Intermediária"
                subtitle="19h00 às 21h00, USJT, Butantã, SI, 4MSIN"
                leftIcon={{ name: "circle", type: 'font-awesome', color: '#082106' }}
                onPress={() => { console.log('Press ItemList') }}
              />
              <ListItem
                title="Prova Intermediária"
                subtitle="21h00 às 22h45, USJT, Mooca, CCOMP, 2MCPN"
                leftIcon={{ name: "circle", type: 'font-awesome', color: '#0a450c' }}
                onPress={() => { console.log('Press ItemList') }}
              />
              <ListItem
                title="Prova Intermediária"
                subtitle="21h00 às 22h45, USJT, Mooca, CCOMP, 2MCPN"
                leftIcon={{ name: "circle", type: 'font-awesome', color: '#136400' }}
                onPress={() => { console.log('Press ItemList') }}
              />
              <ListItem
                title="Prova Intermediária"
                subtitle="21h00 às 22h45, USJT, Mooca, CCOMP, 2MCPN"
                leftIcon={{ name: "circle", type: 'font-awesome', color: '#239a00' }}
                onPress={() => { console.log('Press ItemList') }}
              />
            </List>

            <Text
              style={{
                fontSize: 20,
                color: '#333',
                marginLeft: 35,
                marginBottom: -10,
                marginTop: 15,
              }}
            >
              Eventos recorrentes
            </Text>
            <List containerStyle={{ borderBottomColor: "#fff", borderTopColor: '#f0f0f0' }}>
              <ListItem
                title="Prova Intermediária"
                subtitle="19h00 às 21h00, USJT, Butantã, SI, 4MSIN"
                leftIcon={{ name: "circle", type: 'font-awesome', color: '#b71608' }}
                onPress={() => { console.log('Press ItemList') }}
              />
              <ListItem
                title="Prova Intermediária"
                subtitle="21h00 às 22h45, USJT, Mooca, CCOMP, 2MCPN"
                leftIcon={{ name: "circle", type: 'font-awesome', color: '#ad5000' }}
                onPress={() => { console.log('Press ItemList') }}
              />
            </List>

            <Button
              title="Fechar"
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}
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
          monthNames={[
            'Janeiro', 'Fevereiro', 'Março', 'Abril',
            'Maio', 'Junho', 'Julho', 'Agosto',
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
          ]}
          prevButtonText={'◀'}
          nextButtonText={'▶️'}
          onDateSelect={date => {
            this.setModalVisible(!this.state.modalVisible)
            this.setSelectedDate(date)
          }}
          eventDates={['2016-10-11', '2016-10-04', '2016-10-19']}
          events={mockEvents}
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

export default CalendarioScreen
