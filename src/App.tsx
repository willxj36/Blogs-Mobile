import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BlogPreviews from './screens/BlogPreviews';
import FullBlog from './screens/FullBlog';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={BlogPreviews} />
        <Stack.Screen name="Full Blog" component={FullBlog} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}