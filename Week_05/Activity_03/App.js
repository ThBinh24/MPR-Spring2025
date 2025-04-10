import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "./Screens/ProductList";
import ProductDetailScreen from "./Screens/ProductDetail";
import ProductAddScreen from "./Screens/ProductAdd";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Product List">
        <Stack.Screen name="Product List" component={ProductListScreen} />
        <Stack.Screen name="Product Detail" component={ProductDetailScreen} />
        <Stack.Screen name="Product Add" component={ProductAddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
