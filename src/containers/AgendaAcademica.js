import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'
import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation'

import Router from '../Router'
import DrawerNavigationExample from '../../components/DrawerNavigationExample'

export class AgendaAcademica extends Component {
  render() {
    const { hasAuthenticated } = this.props
    console.log('hasAuthenticated', hasAuthenticated)
    return !hasAuthenticated ? (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('authentication')} />
      </NavigationProvider>
    ) : (
      <NavigationProvider router={Router}>
        <StatusBar barStyle="light-content" />
        <DrawerNavigationExample />
      </NavigationProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    hasAuthenticated: state.authentication.hasAuthenticated,
  }
}

export default connect(mapStateToProps)(AgendaAcademica)
