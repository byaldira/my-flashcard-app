import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import { blue , purple, white, black, gray, lightOrange, orange ,lightRed} from '../utils/colors';
import { handleSaveDeckTitle } from '../actions';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

class CreateDeck extends Component {
    state = {
        data: '',
    }

    handleTextChange = (data) => {
        this.setState({
            data
        })
    }

    handleSubmit = () => {
        const { data } = this.state
        const { dispatch } = this.props
        dispatch(handleSaveDeckTitle(data))
            .then(() => this.setState({ data: '' }))
        this.toHome();
    }
    toHome = () => {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'Deck',
                params: {
                    deckId: this.state.data,
                },
            })
        )
        this.props.navigation.dispatch(
            CommonActions.goBack({
                key: 'Deck List',
            }))
    }
    render() {
        const { data } = this.state
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}
            >
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    value={data}
                    style={styles.data}
                    onChangeText={this.handleTextChange}
                    placeholder='Deck Title'
                />
             <Text style={styles.infoText}>Please fill deck name to create new one </Text>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
                        onPress={this.handleSubmit}
                        disabled={data === '' }
                    >
                        <Text style={Platform.OS === 'ios' ? styles.iosBtnText : styles.androidBtnText}>Create Deck</Text>
                    </TouchableOpacity>
                   
                </View>

            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightRed,
    },
    title: {
        fontSize: Platform.OS === 'ios' ? 50 : 40,
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 30,
        fontSize:12
    },
    data: {
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderColor: purple,
        borderRadius: 4,
        margin: 30,
        backgroundColor: white,
        alignItems: 'center'
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        borderRadius: 7,
        height: 65,
        width: 300,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 80,
        justifyContent: 'center',
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 60,
        borderRadius: 8,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        color: white,
        textAlign: 'center',
        fontSize: 15,
    },
    androidBtnText: {
        color: white,
        textAlign: 'center',
        fontSize: 15,
    },
    iosBtnText: {
        color: black,
        textAlign: 'center',
        fontSize: 18,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 15,
        paddingLeft: 10,
        paddingRight: 10,
    }
})

export default connect()(CreateDeck)