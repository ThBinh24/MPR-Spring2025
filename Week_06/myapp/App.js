import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const stack = createNativeStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>Home Page</Text>
    </View>
  );
}

export default function App() {
  return (
    <></>
  );
}

const styles = StyleSheet.create({
  container: {},
});
