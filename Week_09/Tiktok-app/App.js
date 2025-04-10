import { Image, StatusBar } from "react-native";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import ShopScreen from "./Screens/ShopScreen";
import AddNewScreen from "./Screens/AddNewScreen";
import MessagesScreen from "./Screens/MessagesScreen";
import ProfileScreen from "./Screens/ProfileScreen";

export default function App() {
  const DarkTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#000",
      text: "#fff",
    },
  };
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#000"} />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconSource; 
            if (route.name === "Home") {
              iconSource = focused
                ? require("./assets/home-active.png")
                : require("./assets/home.png");
            } else if (route.name === "Shop") {
              iconSource = focused
                ? require("./assets/shop-active.png")
                : require("./assets/shop.png");
            } else if (route.name === "Add new") {
              iconSource = focused;
              return (
                <View style={styles.centerIcon}>
                  <Image
                    source={require("./assets/plus.png")}
                    style={{ width: 55, height: 55, resizeMode: "contain" }}
                  />
                </View>
              );
            } else if (route.name === "Message") {
              iconSource = focused
                ? require("./assets/conversation-active.png")
                : require("./assets/conversation.png");
            } else if (route.name === "Profile") {
              iconSource = focused
                ? require("./assets/profile-active.png")
                : require("./assets/profile.png");
            }
            return (
              <View style={styles.centerIcon}>
                <Image style={styles.mediumIcon} source={iconSource} />
              </View>
            );
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#111",
            borderTopWidth: 1,
            borderTopColor: "#222",
            height: 60,
            paddingBottom: 5,
            paddingTop: 10,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Add new"
          component={AddNewScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Message"
          component={MessagesScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  centerIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mediumIcon: {
    width: 40,
    heigh: 40,
    resizeMode: "contain",
    tintColor: "#fff",
  },
});
