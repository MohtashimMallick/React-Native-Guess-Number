import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'

const GameOver = (props) => {
    return (
        <View style={styles.screen}>
            <Text>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={2000}
                    style={styles.image}
                    // source={{uri:"https://i.ytimg.com/vi/z0pPhTLvzu4/hqdefault.jpg"}}
                    source={require('../assets/success.jpg')}
                    resizeMode="cover"
                />
            </View>
            <Text>Number of rounds: {props.roundsNumber}</Text>
            <Text>Number was: {props.userNumber}</Text>
            <Button title="New Game" onPress={() => props.onRestart()} />
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        // width: 300,
        width: Dimensions.get("window").width * 0.7,
        height: Dimensions.get("window").width * 0.7,
        // height: 300,
        borderRadius:150,
        borderWidth:3,
        borderColor: 'black',
        overflow:'hidden',
        marginVertical:30
    }
})
export default GameOver;