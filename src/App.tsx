import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

import BlogPreviews from './screens/BlogPreviews';
import FullBlog from './screens/FullBlog';
import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions= {({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#080080'
          },
          headerTintColor: '#bbb',
          headerRight: () => (
            <Button title="Login"
            titleStyle={{ color: '#080080' }}
            buttonStyle={{ backgroundColor: '#eee', marginRight: 15 }}
            onPress={() => navigation.navigate('Login')} />
          )
        })}>
        <Stack.Screen name="Home" 
          component={BlogPreviews}
          options={{ title: "Bloggy Blogger Blogs" }} />
        <Stack.Screen name="Full Blog" component={FullBlog} />
        <Stack.Screen name="Login" 
          component={Login}
          options={{ headerRight: () => null}} />
        <Stack.Screen name="Register" 
          component={Register}
          options={{ headerRight: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}