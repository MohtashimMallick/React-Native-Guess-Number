import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'
import Card from '../components/Card'
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors'

const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setComfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(false);


    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setEnteredValue("");
        setComfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid number!', 'Number has to be a number between 1 and 99', [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
        };
        setComfirmed(true);
        setEnteredValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
            <Text>You Selected</Text>
            <NumberContainer >{selectedNumber}</NumberContainer>
            <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} />
        </Card>
    }
    return (
        <ScrollView >
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>The Game Screen</Text>
                        <Card style={styles.inputContainer}>
                            <Text>Select a Number</Text>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                keyboradType="number-pad"
                                autoCapitalize="none"
                                autoCorrect={false}
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}><Button color={Colors.accent} title="Reset" onPress={resetInputHandler} /></View>
                                <View style={styles.button}><Button color={Colors.primary} title="Confirm" onPress={confirmInputHandler} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: "80%",
        maxWidth: "95%",
        minWidth: 300,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    button: {
        // width: 100
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"
    }
});

export default StartGameScreen;