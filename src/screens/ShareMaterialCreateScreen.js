import React, { PropTypes, Component } from 'react'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { ShareMaterialCreateForm } from '../components'

class ShareMaterialCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Materiais',
    },
  }

  render() {
    return (
      <ScrollView style={styles.container} ref="scrollView">
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Compartilhar Material
          </Text>
          <Text style={styles.subtitle}>
            Informe no formulário abaixo, os dados do material a ser compartilhado. Se houver
            mais de um material a ser compartilhado, utilize o botão de "+" para adicionar mais
            de um material.
          </Text>
        </View>

        <ShareMaterialCreateForm />
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

export default ShareMaterialCreateScreen
