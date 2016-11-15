import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native'
import { Button } from 'react-native-elements'
import Calendar from 'react-native-calendar'

import Router from '../Router'
import { authenticationLogin } from '../actions/AuthenticationAction'

class AuthenticationScreen extends Component {
  static route = {}

  _goToLogin = () => {
    this.props.navigator.push(Router.getRoute('loginForm'));
  }

  _goToSignupScreen = () => {
    this.props.navigator.push(Router.getRoute('signupForm'));
  }

  render() {
    const { dispatch } = this.props
    return (
      <View>
        <View style={styles.container}>
          <Image
            source={require('../../assets/background.jpg')}
            style={styles.backgroundImage}
          />
          <Image
            resizeMode='center'
            source={require('../../assets/logo-outline.png')}
            style={styles.logo}
          />

          <Button
            title="LOGIN"
            buttonStyle={styles.buttonLogin}
            color="#687077"
            raised
            onPress={this._goToLogin}
          />
          <Button
            title="CADASTRE-SE"
            buttonStyle={styles.buttonSignup}
            raised
            onPress={this._goToSignupScreen}
          />
        </View>
      </View>
    )
  }
}

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  backgroundImage: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    alignSelf: 'center',
    height: windowHeight,
  },
  logo: {
    width: windowWidth,
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: -50,
    zIndex: 1,
  },
  buttonLogin: {
    backgroundColor: '#FFF',
    width: 250,
    position: 'absolute',
    left: (windowWidth-280)/2,
    bottom: 120,
    zIndex: 2,
  },
  buttonSignup: {
    backgroundColor: '#0084FF',
    width: 250,
    position: 'absolute',
    left: (windowWidth-280)/2,
    bottom: 50,
    zIndex: 2,
  },
})

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(AuthenticationScreen)
