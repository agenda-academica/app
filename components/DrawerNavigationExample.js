import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@exponent/ex-navigation';
import { MaterialIcons } from '@exponent/vector-icons';

import Router from '../src/Router'
import * as placeholdit from '../src/constants/placeholdit'

class DrawerNavigationExample extends Component {
  _renderHeader = () => {
    const { user } = this.props
    console.log('user', user)
    return (
      <View style={styles.menuHeader}>
        <Image
          resizeMode="cover"
          style={styles.menuHeaderBackground}
          source={{ uri: user.avatar || placeholdit.card(':)') }}
        />
        <View style={styles.menuHeaderOverlay} />

        <Text style={styles.menuHeaderText}>
          {user.first_name} {user.last_name}
        </Text>
      </View>
    )
  }

  _renderTitle = (text: string, isSelected: bool) => {
    return (
      <Text style={[styles.buttonTitleText, isSelected ? styles.selectedText : null]}>
        {text}
      </Text>
    );
  };

  _renderIcon = (name: string, isSelected: bool) => {
    let extraStyle = {marginTop: 2};
    if (name === 'md-alert') {
      extraStyle = {...extraStyle, marginLeft: -3};
    }
    return (
      <MaterialIcons
        style={[styles.icon, isSelected ? styles.selectedText : null, extraStyle]}
        name={name}
        size={24}
      />
    );
  };

  _renderNavigationItem({ id, title, icon, route }) {
    return (
      <DrawerNavigationItem
        id={id}
        selectedStyle={styles.selectedItemStyle}
        renderTitle={isSelected => this._renderTitle(title, isSelected)}
        renderIcon={isSelected => this._renderIcon(icon, isSelected)}
      >
        <StackNavigation
          id="root"
          defaultRouteConfig={{
            navigationBar: {
              backgroundColor: '#0084FF',
              tintColor: '#fff',
            }
          }}
          initialRoute={Router.getRoute(route)}
        />
      </DrawerNavigationItem>
    )
  }

  render() {
    return (
      <DrawerNavigation
        renderHeader={this._renderHeader}
        drawerWidth={300}
        initialItem="home"
      >
        {this._renderNavigationItem({
          id: 'user',
          title: 'Minha Conta',
          icon: 'account-circle',
          route: 'myAccountForm'
        })}
        {this._renderNavigationItem({
          id: 'home',
          title: 'Home',
          icon: 'home',
          route: 'home'
        })}
        {this._renderNavigationItem({
          id: 'eventos',
          title: 'Eventos',
          icon: 'event',
          route: 'eventos'
        })}
        {this._renderNavigationItem({
          id: 'calendario',
          title: 'Calendário',
          icon: 'event-note',
          route: 'calendario'
        })}
        {this._renderNavigationItem({
          id: 'universidades',
          title: 'Universidades',
          icon: 'account-balance',
          route: 'universidades'
        })}
        {this._renderNavigationItem({
          id: 'unidades',
          title: 'Unidades',
          icon: 'place',
          route: 'unidades'
        })}
        {this._renderNavigationItem({
          id: 'cursos',
          title: 'Cursos',
          icon: 'school',
          route: 'cursos'
        })}
        {this._renderNavigationItem({
          id: 'turmas',
          title: 'Turmas',
          icon: 'insert-emoticon',
          route: 'turmas'
        })}
        {this._renderNavigationItem({
          id: 'share',
          title: 'Compartilhar Material',
          icon: 'share',
          route: 'shareMaterials'
        })}
        {this._renderNavigationItem({
          id: 'sobre',
          title: 'Sobre',
          icon: 'info-outline',
          route: 'sobre'
        })}
      </DrawerNavigation>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 180,
    width: null,
    resizeMode: 'cover',
  },
  buttonTitleText: {
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  icon: {
    color: '#999',
  },
  selectedText: {
    color: '#0084FF',
  },
  selectedItemStyle: {
    backgroundColor: "#E8E8E8",
  },

  menuHeader: {
    height: 150,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 50,
  },
  menuHeaderBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  menuHeaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menuHeaderText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'transparent',
  },
  menuNavigationBar: {
    backgroundColor: '#0084FF',
    tintColor: '#fff',
  }
});

const mapStateToProps = state => ({
  user: state.authentication.user,
})

export default connect(mapStateToProps)(DrawerNavigationExample)
