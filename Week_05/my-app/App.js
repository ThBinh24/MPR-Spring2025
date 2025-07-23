import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/activity_01/HomeScreen";
import DetailScreen from "./Screens/activity_01/DetailScreen";
import ProductList from "./Screens/activity_02/ProductList";
import ProductDetail from "./Screens/activity_02/ProductDetail";
import ProductListScreen from "./Screens/Activity_03/ProductListScreen";
import ProductDetailScreen from "./Screens/Activity_03/ProductDetailScreen";
import ProductAddScreen from "./Screens/Activity_03/ProductAddScreen";

const Stack = createNativeStackNavigator();

export default function App() {  // Remove comment to see other activity
  return (
//     //                      <<activity 1>>
//     // <NavigationContainer>
//     //   <Stack.Navigator initialRouteName='Home'>
//     //     <Stack.Screen name='Home' component={HomeScreen}/>
//     //     <Stack.Screen name='Details' component={DetailScreen}/>
//     //   </Stack.Navigator>
//     // </NavigationContainer>

//     //                      <<activity 2>>
//     // <NavigationContainer>
//     //   <Stack.Navigator initialRouteName="Product List">
//     //     <Stack.Screen name="Product List" component={ProductList} />
//     //     <Stack.Screen name="Product Detail" component={ProductDetail} />
//     //   </Stack.Navigator>
//     // </NavigationContainer>
//     //

//     //                      <<activity 3>>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product List">
        <Stack.Screen name="Product List" component={ProductListScreen} />
        <Stack.Screen name="Product Detail" component={ProductDetailScreen} />
        <Stack.Screen name="Product Add" component={ProductAddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
