import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing, Button, TouchableWithoutFeedback } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      someStuff: "Here we go!",
      isRotate: true,
      spinSpeed: 1.1,
      imageOfSteven: require('./imageFile/stevenUniverse.png'),
      dizzyCounter: 0,
      needlePosition: '-90deg'
    }
    const needleData = this.state.needlePosition;
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(
      this.RotateValueHolder,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => this.StartImageRotateFunction())
  }

  componentDidMount() {
    this.StartImageRotateFunction();
  }

  clickCat(e) {
    e.preventDefault();
    console.log(this.needleData);
    if( this.state.spinSpeed === 1.1 || this.state.spinSpeed === 0) {
      this.setState({
        spinSpeed: 1
      })
    } else if ( this.state.spinSpeed === 0.10000000000000014 ){
      this.setState({
        imageOfSteven: require('./imageFile/dizzySteven.png'),
        spinSpeed: 0,
        someStuff: "Ohhhh, i'm really dizzy now...",
        dizzyCounter: this.state.dizzyCounter + 1
      });
    } else {
      this.setState({
         someStuff: "WHEEEEEEEEEE",
         spinSpeed: this.state.spinSpeed - .1,
         // needlePosition: this.state.needlePosition + 15
      });
    }
    if ( this.state.dizzyCounter === 1) {
      this.setState({
        someStuff: "Please no more!!!!"
      })
    } else if( this.state.dizzyCounter === 2) {
      this.setState({
        someStuff: "Uuuurp... oh man... i don't feel great..."
      })
    };
  }

  resetClick(e) {
    this.setState({
      someStuff: "Here we go!",
      imageOfSteven: require('./imageFile/stevenUniverse.png'),
      dizzyCounter: 0,
      spinSpeed: 1.1
    });
    this.render();
  }


  render() {
    const rotateData = this.RotateValueHolder.interpolate({
      inputRange: [0,this.state.spinSpeed],
      outputRange: ["0 deg", "360 deg"]
    })

    return (
      <View style={styles.container1}>
        <View style={styles.container2}>
          <Text style={styles.header}>SPIN THE STEVEN!</Text>
          <TouchableWithoutFeedback onPress={(e) => this.clickCat(e)}>
            <Animated.Image style={styles.steven, { transform: [{ rotate: rotateData }] }} source={this.state.imageOfSteven}
            />
          </TouchableWithoutFeedback>
          <Text>{this.state.someStuff}</Text>
          <Text onPress={(e) => this.resetClick(e)}  style={styles.reset}>Start Over</Text>
        </View>
        <View style={styles.container3}>
          <Image source= {require('./imageFile/speedDial.png')} style={styles.dial} />
        </View>
        <View style={styles.container4}>
          <Image source= {require('./imageFile/speedNeedle.png')} style={ styles.needle } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    display: 'flex',
    flex: 3,
    backgroundColor: '#f4f142',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    overflow: 'visible',

  },
  container2: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container3: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  container4: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  reset: {
    display: 'flex',
    zIndex: 9,
  },
  dial: {
    display: 'flex',
    zIndex: 3,
    top: 50,
    overflow: 'visible',
  },
  needle: {
    display: 'flex',
    zIndex: 4,
    top: -160,
    overflow: 'visible',
    transform: [{rotate: '-90deg'}]
  }
});
