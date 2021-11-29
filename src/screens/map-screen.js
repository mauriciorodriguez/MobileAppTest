import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { COLORS } from "@constants/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // ...Platform.select({
    //   android: {
    //     marginTop: statusBarHeight,
    //   },
    // }),
  },
  row: {
    //flex: 1,
    flexDirection: "row",
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: "#888",
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: COLORS.BLUE.DEEP_SKY_BLUE,
    padding: 20,
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  vehiculos: {
    margin: 10,
    padding: 10,
    backgroundColor: "grey",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default function MapScreen({ navigation }) {
  const [pin, setPin] = useState({ latitude: 37.78825, longitude: -122.4324 });
  return (
    <View style={styles.container}>
      <Text>Latitude: {pin.latitude}</Text>
      <Text>Longitude: {pin.longitude}</Text>
      <Text></Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
      >
        <Marker
          coordinate={pin}
          draggable={true}
          onDragStart={(e) =>
            console.log("Drag start", e.nativeEvent.coordinate)
          }
          onDragEnd={(e) =>
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
        >
          <Callout>
            <Text>I'm here</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}
