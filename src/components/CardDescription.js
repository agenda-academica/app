import React, { PropTypes, Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

class CardDescription extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#e3e3e3',
    borderStyle: 'solid',
  },
})

CardDescription.propTypes = {
  text: PropTypes.string.isRequired,
}

export default CardDescription
