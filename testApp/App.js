
import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing, Button, TouchableWithoutFeedback } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      someStuff: "Here we go!",
      isRotate: true,
      duration: 10000,
      image: './imageFile/stevenUniverse.png',
    }
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    this.state.animator = Animated.timing(
      this.RotateValueHolder,
      {
        toValue: 1,
        duration: this.state.duration,
        easing: Easing.linear
      }
    )
    this.state.animator.start(() => this.StartImageRotateFunction())
  }

  componentDidMount() {

  }

  clickCat(e) {
    e.preventDefault();

    if(this.state.running) {
      this.setState({
        someStuff: "WHEEEEEEEEEE",
        duration: this.state.duration/ 2

      })
      this.state.animator.duration = this.state.duration;
    } else {
      this.setState({
        running: true,
        duration: 5000
      })
      this.StartImageRotateFunction()
    }
  }

  render() {
    const rotateData = this.RotateValueHolder.interpolate({
      inputRange: [0,1],
      outputRange: ["0 deg", "360 deg"]
    })

    return (
        <View style={styles.container}>
          <Text style={styles.header}>SPIN THE STEVEN!</Text>
          <TouchableWithoutFeedback onPress={(e) => this.clickCat(e)}>
            <Animated.Image
               style={{ transform: [{ rotate: rotateData }] }}
               source={require('./imageFile/stevenUniverse.png')}
             />
         </TouchableWithoutFeedback>
           <Text style={styles.header} onPress={(e) => this.clickCat(e)}>{this.state.someStuff}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f142',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 50,
  }
});
