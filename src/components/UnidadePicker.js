import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Picker } from 'react-native'
import { FormLabel } from 'react-native-elements'

import { Loading } from '../components'
import { fetchUnidades } from '../utilities/fetchHelpers'
import { setUnidadePickerSelected } from '../actions/UnidadeActions'
import { initialPickerItem } from '../reducers/UnidadeReducer'
import { isEmptyObject } from '../utilities/validationHelpers'

class UnidadePicker extends Component {
  componentWillMount() {
    const { list, filteredList } = this.props
    if (filteredList) this.setSelected(filteredList)
    else this.setSelected(list)
  }

  setSelected(list) {
    const { dispatch, selected } = this.props
    const selectedIndex = !!selected ? list.findIndex(unidade => unidade.id === selected.id) : 0
    dispatch(setUnidadePickerSelected(list[selectedIndex]))
  }

  render() {
    const {
      list,
      loading,
      dispatch,
      unidadePickerSelected,
      filter,
      filteredList,
      disabled,
    } = this.props

    let unidades = [initialPickerItem, ...list]

    return (
      <View>
        <FormLabel>Unidade</FormLabel>
        <View style={[styles.pickerContainer, disabled ? styles.pickerContainerDisabled : {}]}>
          <Picker
            style={[styles.picker, disabled ? styles.pickerDisabled : {}]}
            selectedValue={unidadePickerSelected}
            onValueChange={value => dispatch(setUnidadePickerSelected(value))}
            prompt="Selecione uma unidade..."
            enabled={!disabled}
          >
            {unidades.filter(filter).map(unidade => (
              <Picker.Item
                key={`unidade-${unidade.id}`}
                label={unidade.nome}
                value={unidade}
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

UnidadePicker.propTypes = {
  filter: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
}

UnidadePicker.defaultProps = {
  filter: () => true
}

const mapStateToProps = state => ({
  loading: state.unidade.loading,
  loaded: state.unidade.loaded,
  list: state.unidade.list,
  unidadePickerSelected: state.unidade.pickerSelected,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(UnidadePicker)
