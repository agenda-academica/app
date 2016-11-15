import React, { PropTypes, Component } from 'react'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { UnidadesCreateForm } from '../components'

class UnidadesCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Unidades',
    },
  }

  render() {
    return (
      <ScrollView style={styles.container} ref="scrollView">
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Cadastrar unidade
          </Text>
          <Text style={styles.subtitle}>
            Informe no formulário abaixo, os dados da unidade a ser cadastrada.
          </Text>
        </View>

        <UnidadesCreateForm />
        <KeyboardSpacer />
      </ScrollView>
    );
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
})

export default UnidadesCreateScreen
