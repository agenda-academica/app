import React, { Component, PropTypes } from 'react'
import { Text, StyleSheet } from 'react-native'

class CardHeading extends Component {
  render() {
    const { text } = this.props
    return (
      <Text style={styles.text}>{text}</Text>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

CardHeading.propTypes = {
  text: PropTypes.string.isRequired,
}

export default CardHeading
