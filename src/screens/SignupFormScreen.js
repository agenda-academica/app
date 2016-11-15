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
import { SignupForm, Loading } from '../components'

export class SignupFormScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Cadastre-se',
      backgroundColor: '#005bb1',
      tintColor: '#fff',
    },
  }

  _goToLogin = () => {
    this.props.navigator.push(Router.getRoute('loginForm'))
  }

  render() {
    const { loading, loaded } = this.props
    return (
      <View style={styles.container}>
        <ScrollView style={styles.formScrollView}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Nova conta
            </Text>
            <Text style={styles.subtitle}>
              Para que você possa ter acesso a todo o conteúdo que a Agenda Acadêmica oferece,
              preencha o formulário abaixo com seus dados para criar uma nova conta.
            </Text>
          </View>

          <SignupForm successRedirect={this._goToLogin} />
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formScrollView: {
    padding: 20,
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

const mapStateToProps = state => {
  return {
    loading: state.signup.loading,
    loaded: state.signup.loaded,
  }
}

export default connect(mapStateToProps)(SignupFormScreen)
