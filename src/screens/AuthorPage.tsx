import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PostBlog from '../components/PostBlog';
import EditBlog from '../components/EditBlog';

const AuthorPage = () => {

    const Tab = createBottomTabNavigator();

    return (

        <Tab.Navigator initialRouteName="Post">
            <Tab.Screen name="Post" component={PostBlog} />
            <Tab.Screen name="Edit" component={EditBlog} />
        </Tab.Navigator>

    )

}

export default AuthorPage;