import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { GetUser } from './utils/apiService';

import BlogPreviews from './screens/BlogPreviews';
import FullBlog from './screens/FullBlog';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthorPage from './screens/AuthorPage';

const Stack = createStackNavigator();


export default function App() {

  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let user = await GetUser();
      user ? setUser(true) : setUser(false);
    })();
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions= {({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#080080'
          },
          headerTintColor: '#bbb',
          headerRight: () => (user ? (
            <Button title="Login"
              titleStyle={{ color: '#080080' }}
              buttonStyle={{ backgroundColor: '#eee', marginRight: 15 }}
              onPress={() => navigation.navigate('Login')} />
            ) : (
            <Button title="Author Page"
              titleStyle={{ color: '#080080' }}
              buttonStyle={{ backgroundColor: '#eee', marginRight: 15 }}
              onPress={() => navigation.navigate('Author Page')} />
            )
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
        <Stack.Screen name="Author Page"
          component={AuthorPage}
          options={{ headerRight: () => (
            <Button title="Log Out"
              titleStyle={{ color: '#080080' }}
              buttonStyle={{ backgroundColor: '#eee', marginRight: 15 }}
              onPress={() => null} />                                     //need to change to a logout function
          )}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}