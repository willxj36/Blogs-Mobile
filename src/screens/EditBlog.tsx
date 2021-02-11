import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { apiService } from '../utils/apiService';
import { LoggedIn } from '../components/LoggedInProvider';
import { Blog } from '../utils/models';

interface EditBlogProps {
    route: any
}

const EditBlog: React.FC<EditBlogProps> = ({ route }) => {

    const navigation = useNavigation();

    const [user] = useContext(LoggedIn);

    const { blogId } = route.params;

    const [blog, setBlog] = useState<Blog>();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();

    useEffect(() => {
        (async () => {
            let url = `https://tranquil-dusk-62236.herokuapp.com/api/blogs/${blogId}`
            let blog = await apiService(url);
            setBlog(blog);
        })();
    }, [blogId]);

    useEffect(() => {
        if(blog?.authorid !== user.userid) {
            alert("You shouldn't be here! You can only edit your own blogs!");
            navigation.navigate('Author Page');
        }
        setTitle(blog?.title);
        setContent(blog?.content);
    }, [blog]);

    const handleEdit = () => {

    }

    return (
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

export default EditBlog;