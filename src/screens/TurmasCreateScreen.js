import React, { PropTypes, Component } from 'react'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { TurmasCreateForm } from '../components'

class TurmasCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Turmas',
    },
  }

  render() {
    return (
      <ScrollView style={styles.container} ref="scrollView">
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Cadastrar turma
          </Text>
          <Text style={styles.subtitle}>
            Informe no formulário abaixo, os dados da turma a ser cadastrada.
          </Text>
        </View>

        <TurmasCreateForm />
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
})

export default TurmasCreateScreen
