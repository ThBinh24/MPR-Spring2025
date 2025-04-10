import "./global.css";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="🎬 Movies List">
        <Stack.Screen
          name="🎬 Movies List"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: "#111828" },
            headerTintColor: "#fff",
          }}
        />
        <Stack.Screen
          name="Movie Detail"
          component={DetailScreen}
          options={{
            headerStyle: { backgroundColor: "#111828" },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
