import React, { PropTypes, Component } from 'react'
import { ActivityIndicator, StyleSheet, View, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

class Loading extends Component {
  render() {
    const { show, animating, backgroundColor, spinnerColor } = this.props
    return !show ? null : (
      <View style={[styles.container, { backgroundColor }]}>
        <ActivityIndicator
          animating={show}
          size={windowWidth/6}
          color={spinnerColor}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    zIndex: 10,
    left: 0,
    top: 0,
    position: 'absolute',
    width: windowWidth,
    height: windowHeight-79,
  },
})

Loading.propTypes = {
  show: PropTypes.bool,
  animating: PropTypes.bool,
  backgroundColor: PropTypes.string,
  spinnerColor: PropTypes.string,
}

Loading.defaultProps = {
  animating: true,
  backgroundColor: 'rgba(0,0,0,.7)',
  spinnerColor: '#FFF',
}

export default Loading
