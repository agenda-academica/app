import React, { PropTypes, Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

class CardDoubleButton extends Component {
  render() {
    const { buttonLeft, buttonRight } = this.props

    return (
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <Button
          small
          icon={{ name: buttonLeft.iconName }}
          backgroundColor='#03A9F4'
          buttonStyle={styles.button}
          title={buttonLeft.title}
          onPress={buttonLeft.onPress}
        />
        <Button
          small
          icon={{ name: buttonRight.iconName }}
          backgroundColor='#03A9F4'
          buttonStyle={styles.button}
          title={buttonRight.title}
          onPress={buttonRight.onPress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: 20,
  }
})

CardDoubleButton.propTypes = {
  buttonLeft: PropTypes.shape({
    iconName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }).isRequired,
  buttonRight: PropTypes.shape({
    iconName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }).isRequired,
}

export default CardDoubleButton
