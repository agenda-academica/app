import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { MaterialIcons } from '@exponent/vector-icons'

export default class CardListItem extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    fontSize: PropTypes.number,
  }

  render() {
    const { text, iconName, iconSize, fontSize } = this.props
    const defaultIconSize = 18

    return (
      <View style={styles.container}>
        <MaterialIcons
          style={styles.icon}
          name={iconName}
          size={iconSize || defaultIconSize}
        />
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    marginTop: 10,
  },
  icon: {
    color: '#666',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 12,
  },
})
