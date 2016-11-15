import React, { PropTypes, Component } from 'react'
import { StyleSheet } from 'react-native'
import { FormLabel as FormLabelRNE } from 'react-native-elements'

class FormLabel extends Component {
  render() {
    const { children, errors, field, fieldName, rest } = this.props
    const showError = errors[fieldName] && field.touched && field.dirty
    const error = showError ? ` - ${errors[fieldName]}` : ''
    return (
      <FormLabelRNE
        {...rest}
        labelStyle={
          errors[fieldName] && field.touched && field.dirty ?
            styles.errorLabel :
            null
        }
      >
        {`${children}${error}`}
      </FormLabelRNE>
    )
  }
}

const styles = StyleSheet.create({
  errorLabel: {
    color: 'red',
  },
})

FormLabel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
  errors: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
}

export default FormLabel
