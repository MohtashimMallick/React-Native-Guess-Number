import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import GameOver from './screens/GameOver';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import AppLoading from "expo-app-loading"
import * as Font from 'expo-font'

const fetchFonts = () => {

}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(err) => console.log(err)} />
  }

  const configureNewHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }
  const gameOverHandler = (numofround) => {
    setGuessRounds(numofround)
  }
  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOver roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewHandler} />
  }
  return (
    <View style={styles.screen}>
      <Header title="Gusse a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
