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
            mais de um material a ser compartilhado, utilize o mesmo botão para adicionar mais
            materiais.
          </Text>
          <Text style={styles.subtitle}>
            Os materiais adicionados podem ser visualizados em forma de lista, logo abaixo deste
            texto. Se quiser remover algum item, é só clicar no ícone de "-".
          </Text>
          <Text style={styles.subtitle}>
            Os representantes da turma selecionada receberão um email com o link do material
            compartilhado.
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
    marginBottom: 8,
  },
})

export default ShareMaterialCreateScreen
