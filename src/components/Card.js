import React, { PropTypes, Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card as CardReactNativeElements } from 'react-native-elements'

import {
  CardListItem,
  CardHeading,
  CardButton,
  CardDoubleButton,
  CardDescription,
} from '../components'

class Card extends Component {
  render() {
    const {
      title,
      subtitle,
      image,
      imageStyle,
      disciplinaName,
      disciplinaHour,
      universidadeName,
      unidadeName,
      cursoName,
      turmaName,
      buttonIconName,
      buttonText,
      buttonOnPress,
      description,
      listItem,
      doubleButton,
      buttonLeft,
      buttonRight,
    } = this.props

    return (
      <View style={styles.container}>
        <CardReactNativeElements image={image} imageStyle={imageStyle}>
          {!!title && <CardHeading text={title} />}
          {!!subtitle && <CardHeading text={subtitle} />}
          {!!description && <CardDescription text={description} />}
          {!!listItem && listItem.map((item, index) => (
            <CardListItem key={`card-list-item-${index}`} iconName={item.icon} text={item.text} iconColor={item.color} />
          ))}
          {!!universidadeName && <CardListItem iconName="account-balance" text={universidadeName} />}
          {!!unidadeName && <CardListItem iconName="place" text={unidadeName} />}
          {!!cursoName && <CardListItem iconName="school" text={cursoName} />}
          {!!turmaName && <CardListItem iconName="insert-emoticon" text={turmaName} />}
          {!!disciplinaName && <CardListItem iconName="brush" text={disciplinaName} />}
          {!doubleButton && <CardButton iconName={buttonIconName} title={buttonText} onPress={buttonOnPress} />}
          {!!doubleButton && <CardDoubleButton {...{ buttonLeft, buttonRight }} />}
        </CardReactNativeElements>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
})

Card.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  buttonIconName: PropTypes.string,
  buttonText: PropTypes.string,
  buttonOnPress: PropTypes.func,
  imageStyle: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  universidadeName: PropTypes.string,
  unidadeName: PropTypes.string,
  cursoName: PropTypes.string,
  turmaName: PropTypes.string,
  disciplinaName: PropTypes.string,
  listItem: PropTypes.array,
  disciplinaHour: PropTypes.string,
  description: PropTypes.string,
  doubleButton: PropTypes.bool,
  buttonLeft: PropTypes.object,
  buttonRight: PropTypes.object,
}

export default Card
