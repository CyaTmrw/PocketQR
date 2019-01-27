import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import gql from "graphql-tag";
import Button from "../components/Button";
import store from "../redux/store";
import graphql from "../services/graphql";
import styles from "../styles/main";

export default class Withdraw extends Component {
    constructor(props) {
        super(props);
        this.state = {amount: ""};
    }
    render() {
        return (
            <View>
                <TextInput value={this.props.amount} style={styles.textInput}
                placeholder="Withdraw Amount" onChangeText={(amount) => this.setState({amount})}
                keyboardType="decimal-pad" />
                <View style={{padding: 20}}>
                    <Button click={() => this.withdraw()} color="lightblue"
                    text="Withdraw" height={60} fontSize={24} />
                </View>
            </View>
        );
    }
    withdraw() {
        let amount = this.state.amount;
        if (parseFloat(store.getState().user.balance) > parseFloat(amount)) {
            graphql.mutate({
                mutation: gql`
                    mutation withdraw(
                        $amount: Float!
                    ){
                        withdraw(
                            amount: $amount
                        ){
                            balance
                        }
                    }`,
                variables: {amount: parseFloat(amount)}
            }).then(result => {
                store.dispatch({type: "SET_USER", payload: {balance: result.data.withdraw.balance}});
                this.props.navigation.goBack(null);
            });
        }
    }
}