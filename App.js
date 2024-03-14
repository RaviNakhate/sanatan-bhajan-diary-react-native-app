import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from "./screen/search";
import Home from "./screen/home";
import Read from "./screen/read"


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator
        initialRouteName='home'
        screenOptions={{headerShown:false}} // Header Title
      >
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name="read" component={Read} />
        <Stack.Screen name="search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}