import React, { Component } from 'react';
import { View, Text,StatusBar } from "react-native";
import Constants from 'expo-constants';

class MyStatusBar extends React.Component{

    componentDidMount(){
        //console.log('asdasd')
    }

    render(){
        const backgroundColor = this.props.backgroundColor;
        
        return(
            // <View>
            //     <Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
            // </View>
            
            <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
                <StatusBar translucent backgroundColor={backgroundColor}  />
            </View>
        )
    }

}

export default MyStatusBar;
  