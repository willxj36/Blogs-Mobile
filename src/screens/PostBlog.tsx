import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { apiService } from '../utils/apiService';
import { LoggedIn, IContext } from '../components/LoggedInProvider';

const PostBlog = () => {

    const [user, setUser] = useContext<IContext>(LoggedIn);

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [tags, setTags] = useState<string>('');

    useEffect(() => {
        (async () => {
            let url = 'https://tranquil-dusk-62236.herokuapp.com/api/tags';
            let tags = await apiService(url);
            setTags(tags);
        })();
    }, []);

    const handlePost = async () => {
        try{
            let url = 'https://tranquil-dusk-62236.herokuapp.com/api/blogs';
            await apiService(url, 'POST', {
                title,
                content,
                authorid: user.userid,
                tags
            })
        } catch(e) {
            console.log(e);
            alert('Something went wrong, please try again');
        }
    }

    if(user.role === 'guest') {
        return(
            <View>
                <Text>Welcome to your Author Page! An admin will need to approve your account before you can post new blogs, but please explore our site in the meantime!</Text>
            </View>
        )
    } else {
        return(
            <ScrollView>
                <View>
                    <Text>Title</Text>
                    <Input value={title} onChangeText={(value) => setTitle(value)} />
                    <Text>Content</Text>
                    <Input multiline value={content} onChangeText={(value) => setContent(value)} />
                </View>
                <View>
                    <Button title="Post your blog!" onPress={handlePost} />
                </View>
            </ScrollView>
        )
    }

}

export default PostBlog;