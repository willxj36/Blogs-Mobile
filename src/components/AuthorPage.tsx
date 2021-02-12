import * as React from 'react';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostBlog from '../screens/PostBlog';
import EditLanding from '../screens/EditLanding';

import { LoggedIn, IContextAuth } from './ContextProvider';

const AuthorPage = () => {

    const [user] = useContext<IContextAuth>(LoggedIn);

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator 
            initialRouteName="Post"
            tabBarOptions = {{
                activeBackgroundColor: '#080080',
                activeTintColor: 'white',
                inactiveBackgroundColor: '#bbb',
                inactiveTintColor: 'black',
                labelStyle: { fontSize: 20, marginBottom: 10 },
                keyboardHidesTabBar: true
            }}
        >
            <Tab.Screen name={user.role !== 'guest' ? "Post" : "Welcome!"} component={PostBlog} />
            {user.role !== 'guest' ? <Tab.Screen name="Edit" component={EditLanding} /> : null }
        </Tab.Navigator>

    )

}

export default AuthorPage;