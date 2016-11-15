import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Router from '../Router'
import { LoginForm, Loading } from '../components'

export class LoginFormScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Login',
      backgroundColor: '#005bb1',
      tintColor: '#fff',
    },
  }

  _goToHome = () => {
    this.props.navigator.push(Router.getRoute('home'))
    this.props.navigation.performAction(({ tabs, stacks }) => {
      const { currentNavigatorUID } = this.props.navigation.navigationState;
      // Reset route stack if scene is not on initial <TabNavigationItem> route
      // In my case I used an id of "main" in my <TabNavigation>
      if (this.props.navigation.navigationState.currentNavigatorUID !== 'main') {
        stacks(currentNavigatorUID).popToTop(currentNavigatorUID);
      }
    });
  }

  render() {
    const { loading, loaded } = this.props
    return (
      <View>
        <ScrollView style={styles.container} ref="scrollView">
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Efetue seu login
            </Text>
            <Text style={styles.subtitle}>
              Para acessar suas informações de agenda acadêmica, insira no formulário abaixo
              seus dados de autenticação.
            </Text>
          </View>

          <LoginForm successRedirect={this._goToHome} />
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    marginBottom: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    color: '#aaa',
  },
})

const mapStateToProps = state => ({
  loading: state.authentication.loading,
  loaded: state.authentication.loaded,
})

export default connect(mapStateToProps)(LoginFormScreen)
