import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { apiService } from '../utils/apiService';
import { LoggedIn, IContextAuth } from '../components/ContextProvider';

import {Blog} from '../utils/models';

import EditBlogCard from '../components/EditBlogCard';

const EditLanding = () => {

    const [user, setUser] = useContext<IContextAuth>(LoggedIn);

    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        (async () => {
            let url = 'https://tranquil-dusk-62236.herokuapp.com/api/blogs';
            let allBlogs: Blog[] = await apiService(url);
            let blogs: Blog[] = allBlogs.filter(blog => blog.authorid === user.userid)
            setBlogs(blogs);
        })();
    }, [user]);

    return(
        <ScrollView style={{ backgroundColor: 'black', flex: 1 }}>
            {blogs?.map(blog => (
                <EditBlogCard key={blog.id} blog={blog} />
            ))}
        </ScrollView>
    )

}

export default EditLanding;