import React from "react";
import { ImageBackground, StyleSheet, View, Button } from "react-native";
import {
  createStackNavigator,
  createAppContainer,
} from "@react-navigation/native";

function LoginScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/fondoSalud.png")}
    >
      <View style={styles.loginButton}>
        <Button
          onPress={() => navigation.navigate("Ingresar")}
          color="black"
          title="INGRESAR"
        />
      </View>
      <View style={styles.loginButton1}>
        <Button
          color="black"
          title="REGISTRARSE"
          onPress={() => console.log("Button tapped")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  loginButton: {
    width: "50%",
    height: 100,
    position: "absolute",
    top: 660,
    left: 0,
  },
  loginButton1: {
    width: "50%",
    height: 100,
    position: "absolute",
    top: 660,
    right: 0,
  },
});

export default LoginScreen;
