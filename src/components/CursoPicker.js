import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Picker } from 'react-native'
import { FormLabel } from 'react-native-elements'

import { Loading } from '../components'
import { fetchCursos } from '../utilities/fetchHelpers'
import { setCursoPickerSelected } from '../actions/CursoActions'
import { initialPickerItem } from '../reducers/CursoReducer'
import { isEmptyObject } from '../utilities/validationHelpers'

class CursoPicker extends Component {
  componentWillMount() {
    const { list, filteredList } = this.props
    if (filteredList) this.setSelected(filteredList)
    else this.setSelected(list)
  }

  setSelected(list) {
    const { dispatch, selected } = this.props
    const selectedIndex = !!selected ? list.findIndex(curso => curso.id === selected.id) : 0
    dispatch(setCursoPickerSelected(list[selectedIndex]))
  }

  render() {
    const {
      list,
      loading,
      dispatch,
      cursoPickerSelected,
      filter,
      disabled,
    } = this.props

    const cursos = [initialPickerItem, ...list]
    return (
      <View>
        <FormLabel>Curso</FormLabel>
        <View style={[styles.pickerContainer, disabled ? styles.pickerContainerDisabled : {}]}>
          <Picker
            style={[styles.picker, disabled ? styles.pickerDisabled : {}]}
            selectedValue={cursoPickerSelected}
            onValueChange={value => dispatch(setCursoPickerSelected(value))}
            prompt="Selecione uma curso..."
            enabled={!disabled}
          >
            {cursos.filter(filter).map(curso => (
              <Picker.Item
                key={`curso-${curso.id}`}
                label={curso.nome}
                value={curso}
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

CursoPicker.propTypes = {
  filter: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
}

CursoPicker.defaultProps = {
  filter: () => true
}

const mapStateToProps = state => ({
  loading: state.curso.loading,
  loaded: state.curso.loaded,
  list: state.curso.list,
  cursoPickerSelected: state.curso.pickerSelected,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(CursoPicker)
