import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Picker } from 'react-native'
import { FormLabel } from 'react-native-elements'

import { Loading } from '../components'
import { fetchDisciplinas } from '../utilities/fetchHelpers'
import { setDisciplinaPickerSelected } from '../actions/DisciplinaActions'
import { initialPickerItem } from '../reducers/DisciplinaReducer'
import { isEmptyObject } from '../utilities/validationHelpers'

class DisciplinaPicker extends Component {
  componentWillMount() {
    const { list, filteredList } = this.props
    if (filteredList) this.setSelected(filteredList)
    else this.setSelected(list)
  }

  setSelected(list) {
    const { dispatch, selected } = this.props
    const selectedIndex = !!selected ? list.findIndex(disciplina => disciplina.id === selected.id) : 0
    dispatch(setDisciplinaPickerSelected(list[selectedIndex]))
  }

  render() {
    const {
      list,
      loading,
      dispatch,
      disciplinaPickerSelected,
      filter,
      selected,
      disabled,
    } = this.props

    const disciplinas = [initialPickerItem, ...list]
    return (
      <View>
        <FormLabel>Disciplina</FormLabel>
        <View style={[styles.pickerContainer, disabled ? styles.pickerContainerDisabled : {}]}>
          <Picker
            style={[styles.picker, disabled ? styles.pickerDisabled : {}]}
            selectedValue={disciplinaPickerSelected}
            onValueChange={value => dispatch(setDisciplinaPickerSelected(value))}
            prompt="Selecione uma disciplina..."
            enabled={!disabled}
          >
            {disciplinas.filter(filter).map(disciplina => (
              <Picker.Item
                key={`disciplina-${disciplina.id}`}
                label={disciplina.nome}
                value={disciplina}
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

DisciplinaPicker.propTypes = {
  filter: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
}

DisciplinaPicker.defaultProps = {
  filter: () => true
}

const mapStateToProps = state => ({
  loading: state.disciplina.loading,
  loaded: state.disciplina.loaded,
  list: state.disciplina.list,
  disciplinaPickerSelected: state.disciplina.pickerSelected,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(DisciplinaPicker)
