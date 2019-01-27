import React, {Component} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {Provider} from "react-redux";
import Navigator from "./src/navigation/Navigator";
import store from "./src/redux/store";
import styles from "./src/styles/main";

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.fullContainer}>
                    <StatusBar hidden={false} />
                    <Navigator />
                </View>
            </Provider>

        );
    }
}