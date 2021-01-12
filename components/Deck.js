import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { lightPurp, purple, white,blue, black, gray, red,lightRed, orange,lightOrange } from '../utils/colors';
import { handleDeleteDeck } from '../actions';
import { handleInitialData } from '../actions'
import { CommonActions } from '@react-navigation/native';
class Deck extends Component {
    toAddCard = (title) => {
        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'AddCard',
                params: {
                    deckId: title,
                },
            })
        )
    }

    toStartQuiz = (title) => {

        this.props.navigation.dispatch(
            CommonActions.navigate({
                name: 'Quiz',
                params: {
                    deckId: title,
                },
            })
        )
       
    }

    deleteDeck = (deckId) => {
        const { dispatch, navigation } = this.props

        dispatch(handleDeleteDeck(deckId))
        this.setState({
            question: '',
            answer: '',
        })
        this.props.navigation.navigate('Deck List')
    }
    state = {
        opacity: new Animated.Value(1),
    }
    componentDidMount() {
        const { dispatch } = this.props
        const { opacity } = this.state
        
        dispatch(handleInitialData())

        Animated.sequence([
            Animated.timing(opacity, { duration: 200, toValue: 1.4, useNativeDriver: true }),
            Animated.spring(opacity, { toValue: 1, friction: 4, useNativeDriver: true })
        ]).start()
    }
    render() {
        const { navigation, route, deck } = this.props;
        const { deckId } = route.params;
        const { opacity } = this.state;

        if (deck === undefined || deck === null) {
            return (
                <View style={styles.container}>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Animated.Text style={[styles.title, { transform: [{ scale: opacity }] }]}>{deckId}</Animated.Text>
                    <Text style={styles.cardCount}> {deck.questions.length} cards</Text>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={() => this.toAddCard(deckId)}
                        style={Platform.OS === 'ios' ? [styles.iosBtn, styles.btnAddBackground] : [styles.androidBtn, styles.btnAddBackground]}
                    >
                        <Text style={[styles.btnText, { color: black }]}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.toStartQuiz(deckId)}
                        style={Platform.OS === 'ios' ? [styles.iosBtn, styles.btnStartBackground] : [styles.androidBtn, styles.btnStartBackground]}
                    >
                        <Text style={[styles.btnText, { color: white }]}>Start Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.deleteDeck(deckId)}
                    >
                        <Text style={styles.textButton}>
                            Delete Deck
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: lightRed,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        marginBottom: 7,
        color:white
    },
    cardCount: {
        fontSize: Platform.OS === 'ios' ? 20 : 17,
        color: gray,
        color:white
    },
    btnContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iosBtn: {
        padding: 10,
        borderRadius: 7,
        height: 65,
        width: 300,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20,
        justifyContent: 'center',
    },
    androidBtn: {
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 60,
        width: 300,
        borderRadius: 2,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 20,
        justifyContent: 'center',
    },
    btnAddBackground: {
        backgroundColor: orange,
        borderWidth: 1,
        borderColor: orange,
    },
    btnStartBackground: {
        backgroundColor: blue,
    },
    btnText: {
        textAlign: 'center',
        fontSize: 15,
    },
    textButton: {
        color: red,
        marginBottom: Platform.OS === 'ios' ? 80 : 60,
        fontSize: 20,
    }
})

function mapDispatchToProps(decks, { route, navigation }) {
    const { deckId } = route.params
    return {
        deckId,
        deck: decks
            ? decks[deckId]
            : null,
    }

}

export default connect(mapDispatchToProps)(Deck)
