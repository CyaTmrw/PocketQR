import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage} from 'react-native';
import {connect} from "react-redux";
import gql from "graphql-tag";
import Button from "../components/Button";
import store from "../redux/store";
import graphql from "../services/graphql";
import styles from "../styles/main";

class Home extends Component {
  render() {
        let Authentication;
        let Account;
        if (this.props.token == null) {
            Authentication = (
                <View>
                    <Button click={() => this.props.navigation.navigate("RegisterScreen")} color="lightblue"
                    text="Register" height={60} fontSize={24} />
                    <View style={{padding: 10}}></View>
                    <Button click={() => this.props.navigation.navigate("LoginScreen")} color="lightgrey"
                    text="Login" height={60} fontSize={24} />
                </View>
            )
            Account = null;
        } else {
            Account = (
                <View>
                    <View style={{padding: 20}}>
                        <Button click={() => this.props.navigation.navigate("ScanScreen")} color="lightblue"
                        text="Scan" height={60} fontSize={24} />
                    </View>
                    <View style={{padding: 20}}>
                        <Button click={() => this.logout()} color="lightblue"
                        text="Log Out" height={60} fontSize={24} />
                    </View>
                </View>
            );
            Authentication = null;

        }

        return (
            <View style={styles.screenContainer}>
                {Authentication}
                {Account}
            </View>
        );
    }
    componentDidMount() {
        AsyncStorage.getItem("user", (err, result) => {
            if (result != null) store.dispatch({type: "SET_USER", payload: JSON.parse(result)});
        });
    }
    logout() {
        AsyncStorage.removeItem("user", (err) => {
            store.dispatch({type: "SET_USER", payload: {token: null}});
        });
    }
}

export default connect((state) => state.user)(Home);