import React, { Component, PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@exponent/vector-icons'

class EmptyList extends Component {
  render() {
    const { icon, message, buttonText, buttonPress } = this.props
    return (
      <View style={styles.container}>
        <MaterialIcons name={icon} style={styles.icon} />
        <Text>{message}</Text>
        <Button
          title={buttonText}
          backgroundColor="#005bb1"
          buttonStyle={styles.button}
          onPress={buttonPress}
        />
      </View>
    )
  }
}

EmptyList.propTypes = {
  icon: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 200,
    alignSelf: 'center',
    color: '#ccc',
    marginTop: 20,
  },
  button: {
    marginTop: 15,
  },
})

export default EmptyList
