import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import ReactNative, {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { ShareMaterialCreateForm, Loading, ShareMaterialAttachmentsForm } from '../components'

class ShareMaterialsCreateScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Materiais',
    },
  }

  _goBack = () => this.props.navigator.pop()

  render() {
    const { shareMaterial: { loading } } = this.props
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} ref="scrollView">
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

          <ShareMaterialCreateForm next={this._goBack}>
            <View style={{ marginTop: 10 }}>
              <Text style={styles.title}>
                Anexos
              </Text>
              <ShareMaterialAttachmentsForm />
            </View>
          </ShareMaterialCreateForm>
          <KeyboardSpacer />
        </ScrollView>
        <Loading show={loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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

const mapStateToProps = state => ({
  shareMaterial: state.shareMaterial,
})

export default connect(mapStateToProps)(ShareMaterialsCreateScreen)
