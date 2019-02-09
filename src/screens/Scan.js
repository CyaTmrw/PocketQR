import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Linking, Alert,  NetInfo} from 'react-native';
import SendSMS from 'react-native-sms';
import gql from "graphql-tag";
import QRCodeScanner from 'react-native-qrcode-scanner';
import Button from "../components/Button";
import store from "../redux/store";
import graphql from "../services/graphql";
import styles from "../styles/main";

export default class Scan extends Component {

    render() {
        return (
            <View>
                <QRCodeScanner onRead={this.scanSuccess.bind(this)}/>
            </View>
        );
    }
    scanSuccess(event) {
        let data = JSON.parse(event.data);
        Alert.alert("Confirm Payment",  "You will be paying $"+data.amount + " for " + data.title,
        [{text: 'Cancel', style: 'cancel'},
        {text: 'Comfirm', onPress: () => this.pay(data.id, data.amount)}], {cancelable: false});
    }
    pay(paymentid, amount) {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected && parseFloat(store.getState().user.balance) > parseFloat(amount)) {
                graphql.mutate({
                   mutation: gql`
                    mutation transfer(
                        $paymentid: ID!
                        $userid: ID!
                    )
                    {
                       transfer(
                           paymentid: $paymentid
                           userid: $userid
                       )
                       {
                           id
                           email
                           balance
                       }
                   }`,
                   variables: {paymentid, userid: store.getState().user.id}
                }).then(result => {
                    let balance;
                    if(result.data.transfer[0].id == store.getState().user.id) {
                        balance = result.data.transfer[0].balance;
                    } else if (result.data.transfer[1].id == store.getState().user.id) {
                        balance = result.data.transfer[1].balance;
                    }
                    store.dispatch({type: "SET_USER", payload: {balance}});

                });
            }
            else {
                SendSMS.send({
		            body: paymentid + " " +store.getState().user.id,
		            recipients: ['6474902879'],
		            successTypes: ['sent', 'queued'],
		            allowAndroidSendWithoutReadPermission: true
	            }, (completed, cancelled, error) => {
                    if (completed) {
                        store.dispatch({type: "SET_USER", payload: {
                            balance: parseFloat(store.getState().user.balance)-parseFloat(amount)
                        }});
                    }
	            });
            }
       });
    }

}