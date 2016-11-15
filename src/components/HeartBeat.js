import React, { PropTypes, Component } from 'react'
import { StyleSheet, View, Animated, Easing } from 'react-native'

class HeartBeat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pulse: new Animated.Value(1)
    };
  }

  componentDidMount() {
    this.startPulse();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.hasPulse && this.props.hasPulse) {
      this.startPulse();
    }
  }

  startPulse() {
    if (!this.props.hasPulse) {
      return;
    }

    Animated.sequence([
      Animated.timing(this.state.pulse, {
        toValue: this.props.growTo,
        duration: 300,
        delay: 400,
      }),
      Animated.timing(this.state.pulse, {
        toValue: 1,
        easing: Easing.easeOut,
        duration: 300,
      }),
      Animated.delay(300 * Math.random()),
    ]).start(this.startPulse.bind(this));
  }

  render() {
    let { pulse } = this.state;
    let animatedHeartStyles = {transform: [{scale: pulse}]}

    return (
      <Animated.View style={animatedHeartStyles}>
        {this.props.children}
      </Animated.View>
    )
  }
}

HeartBeat.defaultProps = {
  hasPulse: true,
  growTo: 1.3,
}

export default HeartBeat
