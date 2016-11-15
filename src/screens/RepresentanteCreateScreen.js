import React, { PropTypes, Component } from 'react'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { RepresentantesCreateForm } from '../components'

class RepresentanteCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Representantes',
    },
  }

  render() {
    return (
      <ScrollView style={styles.container} ref="scrollView">
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Cadastrar representantes
          </Text>
          <Text style={styles.subtitle}>
            Informe no formulário abaixo, os dados do representante a ser cadastrados. Se houver
            mais de um representante a ser cadastrado, utilize o botão de "+" para adicionar mais
            de um representante.
          </Text>
        </View>

        <RepresentantesCreateForm />
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

export default RepresentanteCreateScreen
