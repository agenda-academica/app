import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Icon,
} from 'react-native'
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation'
import { MaterialIcons } from '@exponent/vector-icons'
import ActionButton from 'react-native-action-button'

import Router from '../Router'
import { Card, EmptyList, Loading } from '../components'
import { fetchShareMaterials } from '../utilities/fetchHelpers'

class ShareMaterialsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Materiais Compartilhados',
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }

  componentWillMount() {
    const { shareMaterial: { loaded }, dispatch, credentials } = this.props
    if (!loaded) fetchShareMaterials({ dispatch, credentials })
  }

  render() {
    const { dispatch, shareMaterial: { loading, list } } = this.props
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>Lista de materiais compartilhados</Text>
            <Text style={styles.subtitle}>
              Visualize os materiais já compartilhados com as turmas. Aqui você pode compartilhar
              novos materiais com as turmas e, até mesmo reenviá-los se necessário.
            </Text>
          </View>
          {!list.length ? (
            <EmptyList
              icon="insert-emoticon"
              message="Não há nenhuma turma cadastrada"
              buttonText="Comece cadastrando por aqui"
              buttonPress={this._goToScreen('turmasCreate')}
            />
          ) : list.map(material => (
            <Card
              key={`share-material-list-card-${material.id}`}
              image={{
                uri:
                  material.universidade.logo ||
                  `https://placeholdit.imgix.net/~text?txtsize=180&txt=${material.universidade.abreviacao.toUpperCase()}&w=640&h=300&txttrack=0`
              }}
              imageStyle={{}}
              listItem={[{
                icon: 'attach-file',
                text: `${material.anexos.length} anexo${material.anexos.length !== 1 ? 's' : ''}`,
                color: '#AA0000',
              }]}
              universidadeName={material.universidade.nome}
              unidadeName={material.unidade.nome}
              cursoName={material.curso.nome}
              turmaName={material.turma.nome}
              doubleButton
              buttonLeft={{
                iconName: 'remove-red-eye',
                title: 'VISUALIZAR',
                onPress: () => {
                  this.props.navigator.push(Router.getRoute('shareMaterialsCreate'), material)
                }
              }}
              buttonRight={{
                iconName: 'send',
                title: 'REENVIAR',
                onPress: () => console.log('REENVIAR EMAIL COM MATERIAIS')
              }}
            />
          ))}
        </ScrollView>

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor='#9b59b6'
            title="Compartilhar novo material"
            onPress={this._goToScreen('turmasCreate')}
          >
            <MaterialIcons name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
        <Loading show={loading} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    color: '#aaa',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  tabIndicator: {
    backgroundColor: '#FFEB3B',
  },
})

const mapStateToProps = state => ({
  shareMaterial: state.shareMaterial,
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(ShareMaterialsScreen)
