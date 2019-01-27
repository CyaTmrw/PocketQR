import React, {Component} from 'react';
import {Text, View, TextInput, ScrollView} from 'react-native';
import gql from "graphql-tag";
import jwtDecode from "jwt-decode";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import store from "../redux/store";
import graphql from "../services/graphql";
import authenticationStyles from "../styles/authentication";

export default class Register extends Component{
	constructor(){
		super();
		this.state = {email: "", name: "", password: "", error: null};
	}
	render(){

		return(
			<ScrollView contentContainerStyle={authenticationStyles.fullContainer}>
				<View style={authenticationStyles.inputBigContainer}>
					<TextInput style={authenticationStyles.input} keyboardType="email-address" placeholder="Email"
					onChangeText={(email) => this.setState({email})}
					autoCorrect={false} returnKeyType="next"></TextInput>
					<TextInput style={authenticationStyles.input} keyboardType="default" placeholder="Name"
					onChangeText={(name) => this.setState({name})}
					autoCorrect={false} returnKeyType="next"></TextInput>
					<TextInput style={authenticationStyles.input} placeholder="Password" secureTextEntry={true}
					onChangeText={(password) => this.setState({password})}
					autoCorrect={false} returnKeyType="done"></TextInput>
					<ErrorMessage message={this.state.error} />
				</View>
				<View style={authenticationStyles.buttonSmallContainer}>
					<Button click={() => this.register()} color="lightblue" text="Register" height={60} fontSize={24} />
				</View>
			</ScrollView>
		);
	}
	register(){
        let email = this.state.email;
        let name = this.state.name;
        let password = this.state.password;
        graphql.mutate({
            mutation: gql`
                mutation signup(
                    $email: String!
                    $name: String!
                    $password: String!
                ) {
                    signup
                    (
                        email: $email
                        name: $name
                        password: $password
                    )
                    {
                        token
                        user {
                            id
                        }
                    }
                }`,
            variables: {email, name, password}
        }).then(result => {
            let token = result.data.signup.token;
            let decoded = jwtDecode(token);
            store.dispatch({type: "SET_USER", payload: {token, id: decoded.userId}});
            this.props.navigation.goBack(null);
        });
	}
};
