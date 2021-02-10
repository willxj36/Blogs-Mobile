import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { GetUser, apiService } from './utils/apiService';
import { UserFront } from './utils/models';

import BlogPreviews from './screens/BlogPreviews';
import FullBlog from './screens/FullBlog';
import Login from './screens/Login';
import Register from './screens/Register';
import AuthorPage from './screens/AuthorPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState<UserFront>();

  useEffect(() => {
    (async () => {
      let user = await GetUser();
      setUser(user);
    })();
  }, [AsyncStorage]);

  const logout = async (navigation: any) => {
    try {
      let url = `https://tranquil-dusk-62236.herokuapp.com/auth/logout/${user?.userid}`;
      let res = await apiService(url);
      if(res.status === 200) {
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        alert('Logged out successfully!');
        navigation.navigate('Home');
      } else {
        throw new Error("Couldn't log user out. Please try again.");
      }
    } catch (e) {
      console.log(e);
      alert('Something went wrong, please try again');
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
        screenOptions= {({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#080080'
          },
          headerTintColor: '#bbb',
          headerRight: () => (user ? (
            <Button title="Author Page"
              titleStyle={{ color: '#080080' }}
              buttonStyle={{ backgroundColor: '#eee', marginRight: 15 }}
              onPress={() => navigation.navigate('Author Page')} />
            ) : (
            <Button title="Login"
              titleStyle={{ color: '#080080' }}
              buttonStyle={{ backgroundColor: '#eee', marginRight: 15 }}
              onPress={() => navigation.navigate('Login')} />
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
          options={({ navigation }) => ({ headerRight: () => (
            <Button title="Log Out"
              titleStyle={{ color: '#080080' }}
              buttonStyle={{ backgroundColor: '#eee', marginRight: 15 }}
              onPress={() => {logout(navigation)}} />
          )})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}