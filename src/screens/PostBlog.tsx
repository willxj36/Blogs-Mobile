import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { apiService } from '../utils/apiService';
import { LoggedIn, IContextAuth, BlogChange, IContextBlog } from '../components/ContextProvider';

import { Tag } from '../utils/models';
import { useNavigation } from '@react-navigation/native';

const PostBlog = () => {

    const [, setChanges] = useContext<IContextBlog>(BlogChange);
    const [user] = useContext<IContextAuth>(LoggedIn);

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [allTags, setAllTags] = useState<string[]>([]); //all tags currently in database
    const [typedTag, setTypedTag] = useState<string>(''); //tag currently being typed in the text box
    const [modifyTag, setModifyTag] = useState<boolean>(false); //will toggle a message informing user their tag will be changed before submission
    const [modifiedTag, setModifiedTag] = useState<string>(''); //sets the tag to be submitted after modification steps
    const [tags, setTags] = useState<string[]>([]); //tags to be sent to DB attached to the post

    useEffect(() => {
        (async () => {
            let url = 'https://tranquil-dusk-62236.herokuapp.com/api/tags';
            let allTags: Tag[] = await apiService(url);
            let tagNames = allTags.map(tag => tag.name);
            setAllTags(tagNames);
        })();
    }, []);

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

    const navigation = useNavigation();

    const handlePost = async () => {
        try{
            tags.forEach(async (tag) => { //function checks if each tag entered already exists in the database. If not, it adds it; if it does, it continues on in the function
                let exists = allTags.some(allTag => allTag === tag);
                if(!exists) {
                    let url = 'https://tranquil-dusk-62236.herokuapp.com/api/tags';
                    await apiService(url, 'POST', {name: tag});
                }
            })
            let url = 'https://tranquil-dusk-62236.herokuapp.com/api/blogs';
            let response = await apiService(url, 'POST', {
                title,
                content,
                authorid: user.userid,
                tags,
                role: user.role
            })
            alert('Blog added successfully!');
            setChanges(changes => changes + 1);
            navigation.navigate('Full Blog', {blogId: response.insertId});
        } catch(e) {
            console.log(e);
            alert('Something went wrong, please try again');
        }
    }

    const handleTags = () => {
        setTags(tags => [...tags, modifiedTag]); //adds typed tag with any necessary modifications and clears box to accept another
        setTypedTag('');
    }

    if(user.role === 'guest') {
        return(
            <View style={{ backgroundColor: 'black', flex: 1, padding: 15 }}>
                <View style={styles.formView}>
                    <Text style={styles.welcome}>Welcome to your Author Page! An admin will need to approve your account before you can post new blogs, but please explore our site in the meantime!</Text>
                </View>
            </View>
        )
    } else {
        return(
            <ScrollView style={{ backgroundColor: 'black', flex: 1, padding: 15 }}>
                <View style={styles.formView}>
                    <Text style={styles.formLabel}>Title</Text>
                    <Input style={styles.input} value={title} onChangeText={(value) => setTitle(value)} />
                    <Text style={styles.formLabel}>Content</Text>
                    <Input style={styles.input} multiline value={content} onChangeText={(value) => setContent(value)} />
                    <Text style={styles.formLabel}>Tags</Text>
                    <Input style={styles.input} value={typedTag} onChangeText={(value) => setTypedTag(value)} />

                    { modifyTag ? <Text style={{ color: 'white', marginVertical: 10}}>Tag will be submitted as: {modifiedTag}</Text> : null }

                    <Button onPress={handleTags} title="Add Tag"/>
                    <Text style={{ color: 'white', marginVertical: 10}}>{tags.map(tag => `${tag}, `)}</Text>

                    { tags.length > 0 ? <Button title="Clear Tags" onPress={() => setTags([])} /> : null }

                </View>
                <View style={{ flex: 1 }}>
                    <Button title="Post your blog!" onPress={handlePost} />
                </View>
            </ScrollView>
        )
    }

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
    welcome: {
        color: '#eee',
        fontSize: 25,
        marginTop: 100
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

export default PostBlog;