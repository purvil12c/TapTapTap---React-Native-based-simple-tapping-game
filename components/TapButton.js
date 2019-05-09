import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

export default class TapButton extends React.Component {

  buttonTap(){
    if(this.props.id==this.props.tapButton){
      this.props.increaseScore();
    }
    else{
      this.props.increaseMiss();
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.buttonTap.bind(this)}>
        {
          this.props.id == this.props.tapButton &&
          <View style={[styles.tap_button, {backgroundColor: 'white'}]}>
          </View>
        }
        {
          this.props.id != this.props.tapButton &&
          <View style={[styles.tap_button, {backgroundColor: this.props.backgroundColor}]}>
          </View>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tap_button: {
    height: 40,
    width: 40,
    borderRadius: 100,
    margin: 10
  },
});
