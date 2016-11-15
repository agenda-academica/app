import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Asset, Components } from 'exponent'
import { DeviceEventEmitter } from 'react-native'
import { NavigationContext, NavigationProvider } from '@exponent/ex-navigation'

import registerForPushNotificationsAsync from './api/registerForPushNotificationsAsync'
import AgendaAcademica from './containers/AgendaAcademica';
import Store from './state/Store'
import Router from './Router';

const navigationContext = new NavigationContext({ router: Router, store: Store })

const assets = [
  require('../assets/beetle.jpg'),
  require('../assets/cat.gif'),
  require('../assets/colorful-windows.jpg'),
  require('../assets/paintbrush.jpg'),
  require('../assets/space.jpg'),
  require('../assets/sparkles.jpg'),
  require('../assets/background.jpg'),
  require('../assets/logo-circle.png'),
  require('../assets/logo-diamond.png'),
  require('../assets/logo-outline.png'),
  require('../assets/logo-outline-1.png'),
]
class App extends Component {
  state = {
    bootstrapped: false,
  }

  componentDidMount() {
    this._bootstrap()
  }

  _bootstrap = async () => {
    const { dispatch } = this.props
    const promises = assets.map(module => Asset.fromModule(module).downloadAsync())
    await Promise.all(promises)
    this.setState({
      bootstrapped: true,
    })
  }

  componentWillMount() {
    // Send our push token over to our backend so we can receive notifications
    registerForPushNotificationsAsync()

    // If we started the app from a push notification, handle it right away
    if (this.props.exp.notification) {
      this._handleNotification(this.props.exp.notification)
    }

    // Handle notifications that come in while the app is open
    this._notificationSubscription = DeviceEventEmitter.addListener(
      'Exponent.notification', this._handleNotification
    )
  }

  componentWillUnmount() {
    this._notificationSubscription.remove()
  }

  _handleNotification = (notification) => {
    console.log('App: _handleNotification [notification]', { notification })
  }

  render() {
    if (!this.state.bootstrapped) return <Components.AppLoading />
    return (
      <Provider store={Store}>
        <NavigationProvider context={navigationContext}>
          <AgendaAcademica />
        </NavigationProvider>
      </Provider>
    );
  }
}

export default App
