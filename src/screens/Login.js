import React, { Component } from 'react';
import {ScrollView, TextInput, Text, View} from 'react-native';
import gql from "graphql-tag";
import jwtDecode from "jwt-decode";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import store from "../redux/store";
import graphql from "../services/graphql";
import authenticationStyles from "../styles/authentication";

export default class Login extends Component {
    constructor(){
        super();
        this.state = {email: "", password: "", error: null};
    }
    render() {
        return (
            <ScrollView contentContainerStyle={authenticationStyles.fullContainer}>
    			<View style={authenticationStyles.inputBigContainer}>
    				<TextInput style={authenticationStyles.input} keyboardType="email-address" placeholder="Email"
    				onChangeText={(email) => this.setState({email})}
    				autoCorrect={false} returnKeyType="next"></TextInput>
    				<TextInput style={authenticationStyles.input} placeholder="Password" secureTextEntry={true}
    				onChangeText={(password) => this.setState({password})}
    				autoCorrect={false} returnKeyType="done"></TextInput>
    				<ErrorMessage message={this.state.error} />
    			</View>
    			<View style={authenticationStyles.buttonSmallContainer}>
    				<Button click={() => this.login()} color="lightblue" text="Login" height={60} fontSize={24} />
    			</View>
    		</ScrollView>
        );
    }

    login() {
        let email = this.state.email;
        let password = this.state.password;
        graphql.mutate({
            mutation: gql`
                mutation login(
                    $email: String!
                    $password: String!
                ) {
                    login(
                        email: $email
                        password: $password
                    )
                    {
                        token
                        user {
                            id
                        }
                    }
                }`,
            variables: {email, password}
        }).then(result => {
            let token = result.data.login.token;
            let decoded = jwtDecode(token);
            store.dispatch({type: "SET_USER", payload: {token, id: decoded.userId}});
            this.props.navigation.goBack(null);
        });
    }

}
