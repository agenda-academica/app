import React, { PropTypes, Component } from 'react'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { CursosCreateForm } from '../components'

class CursosCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Cursos',
    },
  }

  render() {
    return (
      <ScrollView style={styles.container} ref="scrollView">
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Cadastrar curso
          </Text>
          <Text style={styles.subtitle}>
            Informe no formulário abaixo, os dados do curso a ser cadastrado.
          </Text>
        </View>

        <CursosCreateForm />
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

export default CursosCreateScreen
