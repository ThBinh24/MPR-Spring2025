import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer></NavigationContainer>
  );
}

