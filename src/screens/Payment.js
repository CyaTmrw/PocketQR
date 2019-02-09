import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, SafeAreaView, Keyboard} from 'react-native';
import gql from "graphql-tag";
import {connect} from "react-redux";
import RNQRCode from 'react-native-qrcode';
import Button from "../components/Button";
import store from "../redux/store";
import graphql from "../services/graphql";
import styles from "../styles/main";

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {amount: "", title: "", paymentID: ""};
    }
    render() {
        let AmountInput;
        let QRCode;
        let Authentication;

        if ((this.state.paymentID == "" || this.state.title == "") && this.props.token != null) {
            AmountInput = (
                <View>
                    <TextInput value={this.props.title} style={styles.textInput} autoFocus={true}
                    placeholder="Name" onChangeText={(title) => this.setState({title})} autoCorrect={false}/>
                    <TextInput value={this.props.amount} style={styles.textInput}
                    placeholder="Money Amount To Charge" onChangeText={(amount) => this.setState({amount})}
                    keyboardType="decimal-pad" />
                    <View style={{padding: 20}}>
                        <Button click={() => this.submit()} color="lightblue"
                        text="Submit" height={60} fontSize={24} />
                    </View>

                    <View style={{padding: 20}}>
                        <Button click={() => this.cancel()} color="lightgray"
                        text="Cancel" height={60} fontSize={24} />
                    </View>
                </View>
            );
            QRCode = null;
            Authentication = null;
        } else if ((this.state.paymentID != "" || this.state.title != "") && this.props.token != null) {
            QRCode = (
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <RNQRCode value={
                            JSON.stringify({
                                domain: "pocketqr.xyz",
                                id: this.state.paymentID,
                                amount: this.state.amount,
                                title: this.state.title
                            })
                        }
                        size={300} bgColor='black' fgColor='white'/>
                    </View>
                    <View style={{padding: 20}}>
                        <Button click={() => this.cancel()} color="red"
                        text="Cancel" height={60} fontSize={24} />
                    </View>
                </View>
            );
            AmountInput = null;
            Authentication = null;
        } else if (this.props.token == null) {
            Authentication = (
                <View style={{padding: 20}}>
                    <Button click={() => this.props.navigation.navigate("HomeScreen")} color="lightblue"
                    text="Authentication" height={60} fontSize={24} />
                </View>
            );
            AmountInput = null;
            QRCode = null;
        }
        return (
            <SafeAreaView style={styles.screenContainer}>
                {AmountInput}
                {QRCode}
                {Authentication}
            </SafeAreaView>
        );
    }
    submit() {
        let title = this.state.title;
        let amount = this.state.amount;

        graphql.mutate({
            mutation: gql`
                mutation createPayment(
                    $amount: Float!
                    $title: String!
                ) {
                    createPayment(
                        price: $amount
                        title: $title
                    ) {
                        id
                        price
                        title
                    }
                }`,
            variables: {amount: parseFloat(amount), title}
        }).then(result => {
            this.setState({paymentID: result.data.createPayment.id});
            Keyboard.dismiss();
        });
    }
    cancel() {
        this.setState({amount: "", paymentID: ""});
        Keyboard.dismiss();
    }
}

export default connect((state) => state.user)(Payment);