import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  SlidingTabNavigation,
  SlidingTabNavigationItem,
} from '@exponent/ex-navigation';
import { MaterialIcons } from '@exponent/vector-icons';
import { Button, Card } from 'react-native-elements'

export default class SlidingTabNavigationExample extends Component {
  static route = {
    navigationBar: {
      title: 'Sliding Tab Navigation',
      ...SlidingTabNavigation.navigationBarStyles,
    },
  }

  _renderLabel = ({route}) => {
    let title;
    if (route.key === '0') title = 'D'
    else if (route.key === '1') title = 'S'
    else if (route.key === '2') title = 'T'
    else if (route.key === '3') title = 'Q'
    else if (route.key === '4') title = 'Q'
    else if (route.key === '5') title = 'S'
    else if (route.key === '6') title = 'S'

    return <Text style={styles.tabLabel}>{title.toUpperCase()}</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <SlidingTabNavigation
          id="tab-navigation"
          navigatorUID="tab-navigation"
          initialTab="0"
          renderLabel={this._renderLabel}
          barBackgroundColor="#0084FF"
          indicatorStyle={styles.tabIndicator}
        >
          <SlidingTabNavigationItem id="0">
            <Card image={require('../assets/paintbrush.jpg')}>
              <Text style={{ color: '#333', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                Inteligência Artificial
              </Text>
              <Text style={{ color: '#333', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
                19h20
              </Text>

              <View style={{ flexDirection:'row', marginTop: 10 }}>
                <MaterialIcons
                  style={{ color: '#666', marginHorizontal: 10 }}
                  name={'account-balance'}
                  size={18}
                />
                <Text style={{ fontSize: 12 }}>Universidade São Judas Tadeu</Text>
              </View>

              <View style={{ flexDirection:'row', marginTop: 10 }}>
                <MaterialIcons
                  style={{ color: '#666', marginHorizontal: 10 }}
                  name={'place'}
                  size={18}
                />
                <Text style={{ fontSize: 12 }}>Butantã</Text>
              </View>

              <View style={{ flexDirection:'row', marginTop: 10 }}>
                <MaterialIcons
                  style={{ color: '#666', marginHorizontal: 10 }}
                  name={'school'}
                  size={18}
                />
                <Text style={{ fontSize: 12 }}>Sistemas de Informação</Text>
              </View>

              <View style={{ flexDirection:'row', marginTop: 10 }}>
                <MaterialIcons
                  style={{ color: '#666', marginHorizontal: 10 }}
                  name={'insert-emoticon'}
                  size={18}
                />
                <Text style={{ fontSize: 12 }}>4MSIN</Text>
              </View>

              <View style={{ flexDirection:'row', marginTop: 10 }}>
                <MaterialIcons
                  style={{ color: '#666', marginHorizontal: 10 }}
                  name={'brush'}
                  size={18}
                />
                <Text style={{ fontSize: 12 }}>Inteligência Artificial</Text>
              </View>

              <Button
                small
                icon={{ name: 'remove-red-eye' }}
                backgroundColor='#03A9F4'
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  marginTop: 20
                }}
                title='VIEW NOW'
                onPress={() => {
                  console.log('Card onPress')
                }}
              />
            </Card>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="1">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="2">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="3">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="4">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="5">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
          <SlidingTabNavigationItem id="6">
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteMarks}>“</Text>
              <Text style={styles.quoteText}>The best thing about a boolean is even if you are wrong, you are only off by a bit.</Text>
              <Text style={styles.quoteAuthor}>Bryan</Text>
            </View>
          </SlidingTabNavigationItem>
        </SlidingTabNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  tabLabel: {
    margin: 8,
    fontSize: 13,
    color: '#fff',
  },

  tabIndicator: {
    backgroundColor: '#FFEB3B',
  },

  quoteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  quoteMarks: {
    alignSelf: 'flex-start',
    color: '#E91E63',
    fontSize: 36,
    left: -8,
    bottom: -42,
    marginTop: -64,
  },

  quoteText: {
    color: '#222',
    fontSize: 18,
    lineHeight: 27,
    textAlign: 'center',
    margin: 8,
  },

  quoteAuthor: {
    color: '#888',
    fontSize: 12,
    fontStyle: 'italic',
  },

  selectedTab: {
    backgroundColor: '#0084FF',
  },
});
