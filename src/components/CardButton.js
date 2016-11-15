import React, { PropTypes, Component } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

class CardButton extends Component {
  render() {
    const { iconName, title, onPress } = this.props

    return (
      <Button
        small
        icon={{ name: iconName }}
        backgroundColor='#03A9F4'
        buttonStyle={styles.button}
        title={title}
        onPress={onPress}
      />
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    marginHorizontal: 0,
    marginBottom: 0,
    marginTop: 20,
  }
})

CardButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default CardButton
