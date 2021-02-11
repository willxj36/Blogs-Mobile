import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { apiService } from '../utils/apiService';
import { LoggedIn, IContext } from './LoggedInProvider';

import {Blog} from '../utils/models';

const EditBlogs = () => {

    const [user, setUser] = useContext<IContext>(LoggedIn);

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
        <ScrollView>
            <View>
                <Text>Title</Text>
                <Input value={title} onChangeText={(value) => setTitle(value)} />
                <Text>Content</Text>
                <Input multiline value={content} onChangeText={(value) => setContent(value)} />
            </View>
            <View>
                <Button title="Submit Edits" onPress={handleEdit} />
            </View>
        </ScrollView>
    )

}

export default EditBlogs;