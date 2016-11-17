import React, { PropTypes, Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card as CardReactNativeElements } from 'react-native-elements'

import {
  CardListItem,
  CardHeading,
  CardButton,
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
          <CardButton iconName={buttonIconName} title={buttonText} onPress={buttonOnPress} />
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
  imageStyle: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  universidadeName: PropTypes.string,
  unidadeName: PropTypes.string,
  cursoName: PropTypes.string,
  turmaName: PropTypes.string,
  disciplinaName: PropTypes.string,
  listItem: PropTypes.array,
  disciplinaHour: PropTypes.string,
  buttonIconName: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonOnPress: PropTypes.func.isRequired,
  description: PropTypes.string,
}

export default Card
