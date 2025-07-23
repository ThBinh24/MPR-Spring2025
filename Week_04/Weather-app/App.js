import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ImageBackground } from "react-native";

const db = {
  0: ["Clear sky", require("./assets/clear.png"), "#000"],
  1: ["Mainly clear", require("./assets/light-cloud.png"), "#000"],
  2: ["Partly cloudy", require("./assets/cloudy.jpg"), "#000"],
  3: ["Overcast", require("./assets/heavy-cloud.png"), "#000"],
  77: ["Snow grains", require("./assets/sleet.png"), "#ff6600"],
};
const getInterpretWeather = (code) => {
  if (db["" + code]) {
    return db["" + code][0];
  } else {
    return "Unknown";
  }
};

const getLocation = async (placeName) => {
  const geocodingURL =
    "https://geocoding-api.open-meteo.com/v1/search?name=" + placeName;
  let res = null;
  let json = null;
  try {
    res = await fetch(geocodingURL);
    json = await res.json();
  } catch (err) {
    throw Error("GeoCoding API problem: " + err.message);
  }
  if (json.results) {
    return {
      name: json.results[0].name + ", " + json.results[0].admin1,
      latitude: json.results[0].latitude,
      longitude: json.results[0].longitude,
    };
  } else {
    throw Error("Place not found!");
  }
};

const getWeather = async (location) => {
  const weatherURL =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    location.latitude +
    "&longitude=" +
    location.longitude +
    "&current_weather=true";
  let res = null;
  let json = null;
  try {
    res = await fetch(weatherURL);
    json = await res.json();
  } catch (err) {
    throw Error("Weather API problem: " + err.message);
  }
  return {
    temp: json.current_weather.temperature,
    weatherCode: json.current_weather.weathercode,
  };
};

export default App = () => {
  const [userInput, setUserInput] = useState("");
  const [data, setData] = useState({
    place: "City Name",
    weatherCode: 100,
    temp: 0,
  });

  const handleSearch = async () => {
    if (!userInput) {
      Alert.alert("Please enter a city name");
      return;
    }
    try {
      const location = await getLocation(userInput);
      const weather = await getWeather(location);
      setData({
        place: location.name,
        weatherCode: weather.weatherCode,
        temp: weather.temp,
      });
    } catch (err) {
      Alert.alert(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
      }}
      behavior="height"
    >
      <ImageBackground
        source={require("./assets/light-cloud.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <StatusBar barStyle="light-content" />
        <View style={{ paddingHorizontal: "15%" }}>
          <Text style={[styles.text, { fontSize: 36 }]}>{data.place}</Text>
          <Text style={[styles.text, { fontSize: 20 }]}>
            {getInterpretWeather(data.weatherCode)}
          </Text>
          <Text style={[styles.text, { fontSize: 36 }]}>{data.temp}°C</Text>
          <TextInput
            style={{
              marginTop: 20,
              padding: 10,
              borderRadius: 5,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderWidth: 1,
              borderColor: "#fff",
              color: "#000",
            }}
            placeholder="Search any"
            placeholderTextColor="#grey"
            value={userInput}
            onChangeText={setUserInput}
            onSubmitEditing={async () => {
              try {
                const location = await getLocation(userInput);
                const weather = await getWeather(location);

                setData({
                  place: location.name,
                  weatherCode: weather.weatherCode,
                  temp: weather.temp,
                });
              } catch (err) {
                Alert.alert(err.message);
              }
            }}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: "#333",
  },
  searchButton: {
    marginTop: 10,
    backgroundColor: "#E4BE9E",
    paddingVertical: 8,
    paddingHorizontal: 20, 
    borderRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});