import * as React from 'react';
import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostBlog from '../screens/PostBlog';
import EditLanding from '../screens/EditLanding';

import { LoggedIn } from '../components/LoggedInProvider';

const AuthorPage = () => {

    const [user] = useContext(LoggedIn);

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator initialRouteName="Post">
            <Tab.Screen name="Post" component={PostBlog} />
            {user?.role !== 'guest' ? <Tab.Screen name="Edit" component={EditLanding} /> : null }
        </Tab.Navigator>

    )

}

export default AuthorPage;