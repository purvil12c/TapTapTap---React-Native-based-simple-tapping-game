import React from 'react';
import { Button, TouchableHighlight, StyleSheet, Text, View } from 'react-native';
import TapButton from './components/TapButton';

const maxMisses = 3;
const tapButtonsCount = 36;

const colors = ['#f12711', '#f5af19', '#659999', '#dd3e54', '#6be585', '#8360c3', '#2ebf91', '#009FFF', '#ec2F4B', '#a8ff78', '#78ffd6'];

export default class App extends React.Component {

  state = {
    score: 0,
    tapButton: 0,
    misses: 0,
    gamePlaying: false,
    interval: ''
  }

  constructor(props){
    super(props);
  }

  increaseScore(){
    if(this.state.gamePlaying==true){
      let score = this.state.score + 1;
      this.setState({score: score});
    }
  }

  increaseMiss(){
    if(this.state.gamePlaying==true){
      let misses = this.state.misses + 1;
      this.setState({misses: misses});
      if(misses>=3){
        this.gameOver();
      }
    }
  }

  gameOver(){
    clearInterval(this.state.interval);
    this.setState({
      gamePlaying: false,
      score: 0,
      misses: 0
    })
  }

  startGame(){
    let interval = setInterval(()=>{
      this.setState({tapButton: (Math.floor((Math.random() * tapButtonsCount)))})
    }, 1000)

    this.setState({
      gamePlaying: true,
      score: 0,
      misses: 0,
      interval: interval
    });
  }

  createTaps = () => {
      let table = []
      let count = 0
      for (let i = 1; i <= 6; i++) {
        let children = []
        for (let j = 1; j <= 6; j++) {
          children.push(<TapButton increaseMiss={this.increaseMiss.bind(this)} increaseScore={this.increaseScore.bind(this)} key={count} id={count} tapButton={this.state.tapButton} backgroundColor={colors[Math.floor(Math.random()*colors.length)]}/>)
          count += 1;
        }
        table.push(<View key={i} style={styles.row}>{children}</View>)
      }
      return table;
  }


  render() {
    return (
        <View style={styles.container}>
          <View>
            {
              this.createTaps()
            }
          </View>
          <View>
            {
              !this.state.gamePlaying &&
              <Button onPress={this.startGame.bind(this)} title="Start Game"></Button>
            }
          </View>
          <Text style={styles.score_text}>Score: {this.state.score}</Text>
          <Text style={styles.score_text}>Misses Left: {3 - this.state.misses}</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  },
  row: {
    flexDirection: 'row',
    margin: 10,
  },
  score_text: {
    fontSize: 40,

  }
});
