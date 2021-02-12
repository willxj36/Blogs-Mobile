import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { apiService } from '../utils/apiService';
import { LoggedIn, IContextAuth, BlogChange, IContextBlog } from '../components/ContextProvider';
import { Blog, Tag } from '../utils/models';

interface EditBlogProps {
    route: any
}

const EditBlog: React.FC<EditBlogProps> = ({ route }) => {

    const navigation = useNavigation();

    const [user] = useContext<IContextAuth>(LoggedIn);
    const [, setChanges] = useContext<IContextBlog>(BlogChange);

    const { blogId } = route.params;

    const [blog, setBlog] = useState<Blog>();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>();
    const [allTags, setAllTags] = useState<string[]>([]); //all tags currently in DB
    const [typedTag, setTypedTag] = useState<string>(''); //currently typed tag
    const [modifyTag, setModifyTag] = useState<boolean>(false); //will toggle a message informing user their tag will be changed before submission
    const [modifiedTag, setModifiedTag] = useState<string>(''); //sets the tag to be submitted after modification steps
    const [tags, setTags] = useState<string[]>([]); //tags to be submitted with/attached to the post

    useEffect(() => { //set current blog and fetch all tags in DB to be checked against later
        (async () => {
            let url = `https://tranquil-dusk-62236.herokuapp.com/api/blogs/${blogId}`
            let blog = await apiService(url);
            setBlog(blog);

            let urlTags = 'https://tranquil-dusk-62236.herokuapp.com/api/tags';
            let allTags: Tag[] = await apiService(urlTags);
            let tagNames = allTags.map(tag => tag.name);
            setAllTags(tagNames);
        })();
    }, [blogId]);

    useEffect(() => {
        if(typedTag.includes(' ') || (/[^a-z0-9]/g).test(typedTag)) { //sets the modifytag state to true and modifies the typed input to be of acceptable format
            setModifyTag(true);
            let noChars = typedTag.replace(/[^a-z0-9]/gi, '');
            let newTag = noChars.replace(' ', '').toLowerCase();
            setModifiedTag(newTag);
        } else if (typedTag.length === 0) {
            setModifyTag(false)
        }
    }, [typedTag]);

    useEffect(() => { //this useEffect sets state to the respective info to be edited
        if(blog) {
            if(blog.authorid !== user.userid) {
                alert("You shouldn't be here! You can only edit your own blogs!");
                navigation.navigate('Author Page');
            }
            setTitle(blog.title);
            setContent(blog.content);
            blog.tag.forEach((tag: string) => setTags(tags => [...tags, tag]));
        }
    }, [blog]);

    const handleTags = () => {
        setTags(tags => [...tags, modifiedTag]); //adds typed tag to tag list and clears box to accept another
        setTypedTag('');
    }
    
    
    const handleEdit = async () => {
        try{
            tags.forEach(async (tag) => { //function checks if each tag entered already exists in the database. If not, it adds it; if it does, it continues on in the function
                let exists = allTags.some(allTag => allTag === tag);
                if(!exists) {
                    let url = 'https://tranquil-dusk-62236.herokuapp.com/api/tags';
                    await apiService(url, 'POST', {name: tag});
                }
            })
            let url = `https://tranquil-dusk-62236.herokuapp.com/api/blogs/${blogId}`;
            await apiService(url, 'PUT', {
                title,
                content,
                tags,
                role: user.role, //these last 3 identifying features have to be sent over only to verify permission to perform the action
                userid: user.userid,
                authorid: blog?.authorid
            })
            alert('Blog updated successfully!');
            setChanges(changes => changes + 1);
            setTimeout(() => {
                navigation.navigate('Full Blog', {blogId});
            }, 1000);
        } catch(e) {
            console.log(e);
            alert('Something went wrong, please try again');
        }
    }

    return (
        <ScrollView style={{ backgroundColor: 'black', flex: 1, padding: 15 }}>
            <View style={styles.formView}>
                <Text style={styles.formLabel}>Title</Text>
                <Input style={styles.input} value={title} onChangeText={(value) => setTitle(value)} />
                <Text style={styles.formLabel}>Content</Text>
                <Input style={styles.input} multiline value={content} onChangeText={(value) => setContent(value)} />
                <Text style={styles.formLabel}>Tags</Text>
                <Input style={styles.input} value={typedTag} onChangeText={(value) => setTypedTag(value)} />

                { modifyTag ? <Text style={{ color: 'white', marginVertical: 10}}>Tag will be submitted as: {modifiedTag}</Text> : null }

                <Button onPress={handleTags} title="Add Tag" />
                <Text style={{ color: 'white', marginVertical: 10 }}>{tags?.map(tag => `${tag}, `)}</Text>

                {tags.length > 0 ? <Button title="Clear Tags" onPress={() => setTags([])} /> : null}

            </View>
            <View style={{ flex: 1 }}>
                <Button title="Submit Changes" onPress={handleEdit} />
            </View>
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    formView: {
        flex: 1,
        backgroundColor: '#080080',
        padding: 25,
        marginBottom: 15,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 200,
    },
    formLabel: {
        flex: 1,
        color: 'white',
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10
    },
    input: {
        flex: 1,
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 10,
    },
    button: {
        marginVertical: 15
    },
    buttonTitle: {
        fontSize: 20
    }
})

export default EditBlog;