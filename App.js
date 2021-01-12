import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { white, orange,red ,green,purple , corred} from './utils/colors';
import { StyleSheet, Text, View,Platform } from 'react-native';
import { createStore } from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyStatusBar from './components/MyStatusBar'
import HomePage from './components/HomePage'
import MyDeckList from './components/MyDeckList'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import Result from './components/Result'
import AddCard from './components/AddCard'
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Stack = createStackNavigator();

export default class App extends React.Component {

  render(){
    return (
      <Provider store={createStore(reducer,middleware)}>
         <View style={{flex: 1}}>
            <MyStatusBar backgroundColor={purple} barStyle="light-content" />
      
            <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                                name="Welcome To Flash Card Game" 
                                component={HomePage} 
                                options={{
                                  headerTintColor: white,
                                  headerStyle: { backgroundColor: corred },
                                }}
                                />
                    <Stack.Screen
                              name="Deck List"
                              component={MyDeckList}
                              options={{
                                headerTintColor: white,
                                headerStyle: { backgroundColor: corred },
                              }}
                            />
                    <Stack.Screen
                          name="Deck"
                          component={Deck}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: corred },
                          }}
                        />
                        <Stack.Screen
                          name="Quiz"
                          component={Quiz}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: corred },
                          }}
                        />
                         <Stack.Screen
                          name="Result"
                          component={Result}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: corred },
                          }}
                        />
                          <Stack.Screen
                          name="AddCard"
                          component={AddCard}
                          options={{
                            headerTintColor: white,
                            headerStyle: { backgroundColor: corred },
                          }}
                        />
                </Stack.Navigator>
            </NavigationContainer> 
         </View>
      </Provider>
    )
  }
}