import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
// import Counter from './components/Counter';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import ProductListScreen from "./Screens/ProductList";
import ProductDetailScreen from './Screens/ProductDetail';
const Stack = createStackNavigator();

export default function App() {
  return (
    // Activity 1
    // <Provider store={store}>
    //   <Counter />
    // </Provider>

    // Activity 2
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Product List">
          <Stack.Screen name="Product List" component={ProductListScreen} />
          <Stack.Screen name="Product Detail" component={ProductDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}


