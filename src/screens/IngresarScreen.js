import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ColorPropType,
} from "react-native";

function IngresarScreen({ props, navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/fondoIngreso.png")}
    >
      <View style={styles.container}>
        <Text>INGRESE SU MAIL Y SU CONTRASEÑA</Text>
        <View>
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
          <View style={styles.aceptarButton}>
            <Button
              color="black"
              title="ACEPTAR"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "teal",
    margin: 10,
    padding: 10,
  },
  ingresarButton: {
    width: "50%",
    height: 100,
    left: 0,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: 200,
  },
});

export default IngresarScreen;
