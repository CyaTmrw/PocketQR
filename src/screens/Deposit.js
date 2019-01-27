import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Keyboard} from 'react-native';
import gql from "graphql-tag";
import Button from "../components/Button";
import store from "../redux/store";
import graphql from "../services/graphql";
import styles from "../styles/main";

export default class Deposit extends Component {
    constructor(props) {
        super(props);
        this.state = {amount: ""};
    }
    render() {
        return (
            <View>
                <TextInput value={this.props.amount} style={styles.textInput}
                placeholder="Deposit Amount" onChangeText={(amount) => this.setState({amount})}
                keyboardType="decimal-pad" />
                <View style={{padding: 20}}>
                    <Button click={() => this.deposit()} color="lightblue"
                    text="Deposit" height={60} fontSize={24} />
                </View>
            </View>
        );
    }
    deposit() {
        let amount = this.state.amount;
        graphql.mutate({
            mutation: gql`
                mutation deposit(
                    $amount: Float!
                ){
                    deposit(
                        amount: $amount
                    ){
                        balance
                    }
                }`,
            variables: {amount: parseFloat(amount)}
        }).then(result => {
            store.dispatch({type: "SET_USER", payload: {balance: result.data.deposit.balance}});
            this.props.navigation.goBack(null);
        });
    }

}