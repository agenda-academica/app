import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from 'react-native'
import { MaterialIcons } from '@exponent/vector-icons'

import { setSelected, setShow } from '../actions/SimpleColorPickerActions'

export const colors = [
  ['#930FCE', '#498FC8', '#1B8D00'],
  ['#6700A8', '#2F65AC', '#115600'],
  ['#31005B', '#213E75', '#0A3709'],
  ['#2D0045', '#0F1D42', '#091A05'],

  ['#F6352C', '#DF6D0B', '#EEA600'],
  ['#CE1A0F', '#B75900', '#C99800'],
  ['#AA0000', '#9D3E00', '#AD7200'],
  ['#600000', '#5E1F00', '#7C4800']
]

class SimpleColorPicker extends Component {
  render() {
    const {
      dispatch,
      selected,
      simpleColorPicker: { selected: simpleColorPickerSelected, show },
    } = this.props
    const selectedStrategy = selected || simpleColorPickerSelected
    return show && (
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.heading}>Selecione uma cor...</Text>
          {
            colors.map((row, rowIndex) => (
              <View key={`color-picker-row-${rowIndex}`} style={styles.row}>
                {row.map((color, itemIndex) => (
                  <TouchableHighlight
                    key={`color-picker-color-${itemIndex}`}
                    onPress={() => {
                      dispatch(setSelected(color))
                      dispatch(setShow(false))
                    }}
                    style={styles.touchable}
                    underlayColor="white"
                  >
                    <View style={[styles.color, { backgroundColor: color }]}>
                      {
                        color === selectedStrategy && (
                          <MaterialIcons
                            name="check-circle"
                            color="white"
                            style={styles.checkIcon}
                          />
                        )
                      }
                    </View>
                  </TouchableHighlight>
                ))}
              </View>
            ))
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.7)',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 79,
    zIndex: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    width: 280,
    height: 440,
    borderRadius: 10,
    padding: 30,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchable: {
    width: 70,
    height: 40,
    borderRadius: 3,
  },
  color: {
    margin: 0,
    padding: 0,
    width: 70,
    height: 40,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 20,
    alignSelf: 'center',
  },
})

const mapStateToProps = state => ({
  simpleColorPicker: state.simpleColorPicker,
})

export default connect(mapStateToProps)(SimpleColorPicker)
