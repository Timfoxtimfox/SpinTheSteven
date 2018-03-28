
import React from 'react';
import { StyleSheet, Text, View, Image, Animated, Easing, Button, TouchableWithoutFeedback } from 'react-native';

export default class App extends React.Component {
  constructor(){
    super()
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      someStuff: "Here we go!",
      isRotate: true,
      spinSpeed: 1,
      image: './imageFile/stevenUniverse.png'
    }
  }

  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);

    Animated.timing(
      this.RotateValueHolder,
      {
        toValue: 1,
        duration: 2800,
        easing: Easing.linear
      }
    ).start(() => this.StartImageRotateFunction())
  }

  componentDidMount() {

  }

  clickCat(e) {
    e.preventDefault();
    if( this.state.spinSpeed === 1) {
      this.StartImageRotateFunction();
      this.setState({
        spinSpeed: 1.1
      })
    } else {
      this.setState({
         someStuff: "WHEEEEEEEEEE",
         spinSpeed: this.state.spinSpeed / 2
      })
    }
  }

  render() {
    const rotateData = this.RotateValueHolder.interpolate({
      inputRange: [0,this.state.spinSpeed],
      outputRange: ["0 deg", "360 deg"]
    })

    return (
        <View style={styles.container}>
          <Text style={styles.header}>SPIN THE STEVEN!</Text>
          <TouchableWithout`Feedback onPress={(e) => this.clickCat(e)}>
            <Animated.Image
               style={{ transform: [{ rotate: rotateData }] }}
               source={require('./imageFile/stevenUniverse.png')}
             />
         </TouchableWithoutFeedback>
           <Text onPress={(e) => this.clickCat(e)}>{this.state.someStuff}</Text>
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
});
