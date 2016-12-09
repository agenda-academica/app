import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Picker } from 'react-native'
import { FormLabel } from 'react-native-elements'

import { Loading } from '../components'
import { fetchUniversidades } from '../utilities/fetchHelpers'
import { setUniversidadePickerSelected } from '../actions/UniversidadeActions'
import { initialPickerItem } from '../reducers/UniversidadeReducer'
import { isEmptyObject } from '../utilities/validationHelpers'

class UniversidadePicker extends Component {
  componentWillMount() {
    const { list } = this.props
    this.setSelected(list)
  }

  setSelected(list) {
    const { dispatch, selected } = this.props
    const selectedIndex = !!selected ? list.findIndex(universidade => universidade.id === selected.id) : 0
    dispatch(setUniversidadePickerSelected(list[selectedIndex]))
  }

  render() {
    const {
      list,
      loading,
      dispatch,
      universidadePickerSelected,
      disabled,
    } = this.props

    const universidades = [initialPickerItem, ...list]
    return (
      <View>
        <FormLabel>Universidade</FormLabel>
        <View style={[styles.pickerContainer, disabled ? styles.pickerContainerDisabled : {}]}>
          <Picker
            style={[styles.picker, disabled ? styles.pickerDisabled : {}]}
            selectedValue={universidadePickerSelected}
            onValueChange={value => dispatch(setUniversidadePickerSelected(value))}
            prompt="Selecione uma universidade..."
            enabled={!disabled}
          >
            {universidades.map(universidade => (
              <Picker.Item
                key={`universidade-${universidade.id}`}
                label={universidade.abreviacao}
                value={universidade}
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

UniversidadePicker.propTypes = {
  selected: PropTypes.any,
}

const mapStateToProps = state => ({
  loading: state.universidade.loading,
  loaded: state.universidade.loaded,
  list: state.universidade.list,
  universidadePickerSelected: state.universidade.pickerSelected,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(UniversidadePicker)
