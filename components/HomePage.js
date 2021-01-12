import React, { Component } from 'react';
import { View, Text,StatusBar } from "react-native";
import Constants from 'expo-constants';
import {orange,white } from '../utils/colors'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyDeckList from './MyDeckList'
import CreateDeck from './CreateDeck'
import { FontAwesome, Ionicons } from '@expo/vector-icons' ;
import { connect } from 'react-redux'
const Tab =Platform.OS === 'ios'
           ? createBottomTabNavigator() 
           :  createMaterialTopTabNavigator();

function HomePage() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          switch (route.name) {
            case 'Deck List':
              return <Ionicons name="ios-bookmarks" size={size} color={color} />;
            case 'Create Deck':
              return <FontAwesome name="plus-square" size={size} color={color} />;
           
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? orange : white,
        style: {
          backgroundColor: Platform.OS === 'ios' ? white : orange,
          shadowColor: 'rgba(0,0,0,0.24)',
          shadowOffset: { width: 0, height:5 },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      }}>        
  
        <Tab.Screen  name="Deck List" component={MyDeckList} />
        <Tab.Screen name="Create Deck" component={CreateDeck} />
      </Tab.Navigator>
    );
  }
  export default HomePage;