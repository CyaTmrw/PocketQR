import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from "react-navigation";
import Home from "../screens/Home";
import Payment from "../screens/Payment";
import Scan from "../screens/Scan";
import Register from "../screens/Register";
import Login from "../screens/Login";

const stackOptions = {
    initialRouteName: "HomeScreen"
};

const tabOptions = {
    initialRouteName: "HomeView",
    tabBarOptions: {
        labelStyle: {
            fontSize: 24,
        }
    }
};

const HomeStack = createStackNavigator({
    HomeScreen: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            title: "Home",
            headerTitleStyle: {fontSize: 30}
        })
    },
    RegisterScreen: {
        screen: Register,
        navigationOptions: ({navigation}) => ({
            title: "Register",
            headerTitleStyle: {fontSize: 30}
        })
    },
    LoginScreen: {
        screen: Login,
        navigationOptions: ({navigation}) => ({
            title: "Login",
            headerTitleStyle: {fontSize: 30}
        })
    },
    ScanScreen: {
        screen: Scan,
        navigationOptions: ({navigation}) => ({
            title: "Scan",
            headerTitleStyle: {fontSize: 30}
        })
    }
}, stackOptions);

const AppNavigator = createBottomTabNavigator({
    HomeView: {
        screen: HomeStack,
        navigationOptions: ({navigation}) => ({title: "Home"})
    },
    PaymentScreen: {
        screen: Payment,
        navigationOptions: ({navigation}) => ({title: "Payment"})
    },
}, tabOptions);



export default createAppContainer(AppNavigator);