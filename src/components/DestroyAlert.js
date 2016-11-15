import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { MaterialIcons } from '@exponent/vector-icons'
import { withNavigation } from '@exponent/ex-navigation';
import { Alert } from 'react-native'

@withNavigation
class DestroyAlert extends Component {
  _goBack = () => {
    if (this.props.navigator.getCurrentIndex() > 0) {
      this.props.navigator.pop()
    }
  }

  render() {
    const { title, message, yesOnPress, dispatch, credentials } = this.props

    return (
      <MaterialIcons
        name="delete"
        style={{
          fontSize: 30,
          marginTop: 13,
          marginRight: 15,
          color: 'white',
        }}
        onPress={() => {
          Alert.alert(title, message,
            [
              { text: 'Não' },
              { text: 'Sim', onPress: () => yesOnPress({ dispatch, credentials, redir: this._goBack }) },
            ]
          )
        }}
      />
    )
  }
}

DestroyAlert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  yesOnPress: PropTypes.func,
  noOnPress: PropTypes.func,
}

const mapStateToProps = state => ({
  credentials: state.authentication.credentials,
})

export default connect(mapStateToProps)(DestroyAlert)
