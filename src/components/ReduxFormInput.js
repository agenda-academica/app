import React, { PropTypes, Component } from 'react'
import { View } from 'react-native'
import { FormLabel, FormInput } from 'react-native-elements'

class ReduxFormInput extends Component {
  componentDidMount(props) {
    const { update, input: { onChange, name }, touch } = this.props
    if (!!update && !!Object.keys(update).length) {
     touch(name)
     onChange(update[name])
    }
  }
  render() {
    const {
      input: { value, onChange, name },
      meta: { touched, dirty, error },
      touch,
      placeholder,
      label,
      keyboardType,
      ...rest,
    } = this.props

    return (
      <View>
        {!!label && (
          <FormLabel {...{ labelStyle: touched && !!error ? { color: 'red' } : {} }}>
            {`${label}${touched && !!error ? error : ''}`}
          </FormLabel>
        )}
        <FormInput
          {...rest}
          keyboardType={keyboardType || 'default'}
          onFocus={() => { touch(name) }}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder={placeholder}
          underlineColorAndroid={touched && !!error ? 'red' : '#ccc'}
        />
      </View>
    )
  }
}

export default ReduxFormInput
