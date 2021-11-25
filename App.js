import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Button,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import Constants from "expo-constants";
import logo from "./assets/logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import uploadToAnonymousFilesAsync from "anonymous-files";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import VehicleService from "./services/vehicle.service";

//SplashScreen.preventAutoHideAsync();
//setTimeout(SplashScreen.hideAsync, 2000);

const baseURL = "https://apitestdjango.herokuapp.com/api/";
const statusBarHeight = Constants.statusBarHeight;

const GoHome = (props) => {
  return (
    <View>
      <Button title="Go Home" onPress={() => props.nav.navigate("Home")} />
    </View>
  );
};

const DeshabilitarBoton = (props) => {
  const [isDeshabilitado, setIsDeshabilitado] = useState(false);
  return (
    <SafeAreaView style={{ padding: 20, alignItems: "center" }}>
      <Button
        onPress={() => setIsDeshabilitado(!isDeshabilitado)}
        title={isDeshabilitado ? "Deshabilitar" : "Habilitar"}
      />
      <Text>{isDeshabilitado ? "Habilitado" : "Deshabilitado"}</Text>
    </SafeAreaView>
  );
};

const EntradaTexto = (props) => {
  const [text, setText] = useState("");
  return (
    <View style={{ padding: 10 }}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Input text"
        onChangeText={(text) => setText(text)}
        defaultValue={text}
      />
    </View>
  );
};

function VehicleScreen({ navigation }) {
  const [vehicles, setVehicles] = useState([]);
  // useEffect(() => {
  //   axios.get(baseURL + "vehiculos/").then((response) => {
  //     setVehicles(response.data);
  //   });
  // }, []);
  useEffect(() => {
    VehicleService.getAll().then((response) => {
      setVehicles(response.data);
    });
  }, []);
  if (vehicles == null) return <GoHome nav={navigation} />;
  else
    return (
      <View>
        <FlatList
          data={vehicles}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <View style={styles.vehiculos}>
              <Text>ID: {item.id}</Text>
              <Text>Fecha alta: {item.fecha_alta}</Text>
              <Text>Fecha baja: {item.fecha_baja}</Text>
              <Text>Color: {item.color}</Text>
              <Text>Identificacion: {item.identificacion}</Text>
              <Text>Kmts recorridos: {item.kms_recorridos_acumulados}</Text>
            </View>
          )}
        />
        {/* {vehicles.map((vehiculo) => (
          <Text>
            {vehiculo.identificacion} {vehiculo.color}
          </Text>
        ))} */}
        <GoHome nav={navigation} />
      </View>
    );
}

function HomeScreen({ navigation }) {
  const [paramText, setParamText] = useState("");
  const [headerTitle, setHeaderTitle] = useState("Home");
  return (
    <View style={styles.container}>
      <Text style={{ padding: 20 }}>Home screen</Text>
      <View style={(styles.row, { padding: 20 })}>
        <Text>Change header title: </Text>
        <TextInput
          placeholder="Home"
          onChangeText={(headerTitle) => setHeaderTitle(headerTitle)}
          defaultValue={headerTitle}
        />
        <Button
          title="Change"
          onPress={() => navigation.setOptions({ title: headerTitle })}
        />
      </View>
      <View style={styles.row}>
        <Text>Details param: </Text>
        <TextInput
          placeholder="Param"
          defaultValue={paramText}
          onChangeText={(paramText) => setParamText(paramText)}
        />
      </View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details", { text: paramText })}
      />
      <Button
        title="Go to Expo T."
        onPress={() => navigation.navigate("Expo")}
      />
      <Button
        title="Vehiculos"
        onPress={() => navigation.navigate("Vehiculos")}
      />
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  const { text } = route.params;
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>Param text: {JSON.stringify(text)}</Text>
      <GoHome nav={navigation} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Expo" component={TutorialExpo} />
        <Stack.Screen name="Vehiculos" component={VehicleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TutorialExpo({ navigation }) {
  const handlePress = () => console.log("click txt");

  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    if (Platform.OS === "web") {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image is available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    Sharing.shareAsync(selectedImage.remoteUri || selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <Text onPress={handlePress}>Hello Expo</Text>
        <Image source={logo} style={styles.logo} />
        <TouchableHighlight onPress={() => console.log("click img")}>
          <Image
            source={{
              width: 100,
              height: 200,
              uri: "https://picsum.photos/100/200",
            }}
          />
        </TouchableHighlight>
        <Text style={styles.instructions}>
          To share a photo, just press the button below!
        </Text>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
        <DeshabilitarBoton />
        <EntradaTexto />
        <StatusBar style="auto" />
        <GoHome nav={navigation} />
      </SafeAreaView>
    </ScrollView>
  );
}

export default App;

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
    backgroundColor: "blue",
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
});
