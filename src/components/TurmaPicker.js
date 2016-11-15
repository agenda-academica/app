import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Picker } from 'react-native'
import { FormLabel } from 'react-native-elements'

import { Loading } from '../components'
import { fetchTurmas } from '../utilities/fetchHelpers'
import { setTurmaPickerSelected } from '../actions/TurmaActions'
import { initialPickerItem } from '../reducers/TurmaReducer'
import { isEmptyObject } from '../utilities/validationHelpers'

class TurmaPicker extends Component {
  componentWillMount() {
    const { loaded, dispatch, credentials, selected } = this.props
    let callback
    if (!isEmptyObject(selected)) callback = list => this.setSelected(list)

    if (!loaded) fetchTurmas({ dispatch, credentials, callback })
    else this.setSelected(this.props.list)
  }

  setSelected(list) {
    const { dispatch, selected } = this.props
    const selectedIndex = list.findIndex(turma => turma.id === selected.id)
    dispatch(setTurmaPickerSelected(list[selectedIndex]))
  }

  render() {
    const {
      list,
      loading,
      dispatch,
      turmaPickerSelected,
      filter,
      selected,
    } = this.props

    const turmas = [initialPickerItem, ...list]
    return (
      <View>
        <FormLabel>Turma</FormLabel>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={turmaPickerSelected}
            onValueChange={value => dispatch(setTurmaPickerSelected(value))}
            prompt="Selecione uma turma..."
          >
            {turmas.filter(filter).map(turma => (
              <Picker.Item
                key={`turma-${turma.id}`}
                label={turma.nome}
                value={turma}
              />
            ))}
          </Picker>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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

TurmaPicker.propTypes = {
  filter: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
}

TurmaPicker.defaultProps = {
  filter: () => true
}

const mapStateToProps = state => ({
  loading: state.turma.loading,
  loaded: state.turma.loaded,
  list: state.turma.list,
  turmaPickerSelected: state.turma.pickerSelected,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(TurmaPicker)
