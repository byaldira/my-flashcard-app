import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Platform } from 'react-native';
import { lightOrange, lightPurp,lightRed,white } from '../utils/colors';
import { handleInitialData } from '../actions'
import { connect } from 'react-redux'
import { FontAwesome, Ionicons } from '@expo/vector-icons' ;

class MyDeckList extends Component {
    state = {
        ready: false,
    }

    componentDidMount() {
        const { dispatch } = this.props

        dispatch(handleInitialData())
            .then(() => this.setState({ ready: true }))
    }

    renderItem = ({ item }) => {
        const { title, questions } = item

        return (
            <TouchableOpacity
                key={title}
                onPress={() => this.props.navigation.navigate('Deck', { deckId: title })}
                style={styles.deck}
            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.cardCount}>{questions.length} cards</Text>
               
            </TouchableOpacity>
        )
    }

    render() {
        const { decks } = this.props
        return (
            <View style={styles.container}>
                {decks !== null && this.state.ready ?
                    <FlatList
                        data={Object.values(decks)}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    : <Text>Loading</Text>
                }
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
    deck: {
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: Platform.OS === 'ios' ? 35 : 20,
        alignItems: 'flex-start',
        borderColor : white
    },
    title: {
        fontSize: 35,
        marginBottom: 7,
        color:white
    },
    cardCount: {
        fontSize: 17,
        color: lightPurp,
        color:white
    },
})

function mapStateToProps(decks) {
    return {
        decks: decks
            ? decks
            : null
    }
}

export default connect(mapStateToProps)(MyDeckList)