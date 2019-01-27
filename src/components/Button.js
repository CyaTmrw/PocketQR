import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, Platform, TouchableNativeFeedback} from 'react-native';

export default class Button extends Component {
  render() {
  	if (Platform.OS === "ios"){
  		return (
			<TouchableHighlight onPress={this.props.click} underlayColor="#ffffff" activeOpacity={0.9}>
                <View style={[styles.button, {backgroundColor: this.props.color},
                    {height: this.props.height}, {borderColor: this.props.borderColor},
                    {borderWidth: this.props.borderWidth}
                ]}>
					<Text style={[styles.buttonText, {fontSize: this.props.fontSize}]}>{this.props.text}</Text>
				</View>
			</TouchableHighlight>
    	);
  	}
  	if (Platform.OS === "android") {
  		return(
  		<TouchableNativeFeedback onPress={this.props.click} background={TouchableNativeFeedback.SelectableBackground()}>
				<View style={[styles.button, {backgroundColor: this.props.color},
                    {height: this.props.height}, {borderColor: this.props.borderColor},
                    {borderWidth: this.props.borderWidth}
                ]}>
					<Text style={[styles.buttonText, {fontSize: this.props.fontSize}]}>{this.props.text}</Text>
				</View>
			</TouchableNativeFeedback>
  		);
  	}

  }
}


const styles = StyleSheet.create({
	button: {
		flexDirection: "row",
		alignSelf: "stretch",
		justifyContent: "center",
		borderRadius: 10
	},
	buttonText: {
		alignSelf: "center",
		color: "#ffffff"
	}
});
