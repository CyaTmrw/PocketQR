import React, {Component} from "react";
import {Text, View} from "react-native";

export default class ErrorMessage extends Component{
  render(){
    if(this.props.message == null){
      return (<View></View>);
    }
    return(
      <View style={{backgroundColor: "#ff0000", height: 50, justifyContent: "center", padding: 10}}>
        <Text style={{fontSize: 20}}>{this.props.message}</Text>
      </View>
    );
  }
}
