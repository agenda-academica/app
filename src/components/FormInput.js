import React, { PropTypes, Component } from 'react'
import { FormInput as FormInputRNE } from 'react-native-elements'

class FormInput extends Component {
  render() {
    const { ref, onFocus } = this.props
    return (
      <FormInputRNE
        ref={ref}
        onFocus={() => {
          this.setState({
            form: {
              ...form,
              nome: { ...nome, touched: true }
            }
          })
        }}
        onChangeText={value => {
          this.setState({
            form: {
              ...form,
              nome: { ...nome, value, dirty: true }
            }
          })
        }}
      />
    )
  }
}
