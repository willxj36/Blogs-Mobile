import * as React from 'react';
import { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { IContextBlog, BlogChange } from '../components/ContextProvider';
import { Blog } from '../utils/models';
import { apiService } from '../utils/apiService';

interface EditBlogCardProps {
    blog: Blog
}

const EditBlogCard: React.FC<EditBlogCardProps> = ({ blog }) => {

    const [changes , setChanges] = useContext<IContextBlog>(BlogChange);

    const navigation = useNavigation();

    const date = dayjs(`${blog._created}`).format('MMM DD, YYYY');

    const handleDelete = async () => {
        try {
            let url = `https://tranquil-dusk-62236.herokuapp.com/api/blogs/${blog.id}`;
            let response = await apiService(url, 'DELETE');
            response.message ? alert(response.message) : alert('Failed to delete blog, please try again');
            setChanges(changes => changes + 1);
            navigation.navigate('Home');
        } catch(e) {
            console.log(e);
            alert('An error occurred, please try again');
        }
    }

    return(
        <Card containerStyle={styles.card}>
            <View>
                <Text style={styles.title}>{blog.title}</Text>
                <Text>{date}</Text>
            </View>
            <View style={styles.buttonView}>
                <Button onPress={() => navigation.navigate('Edit Blog', {blogId: blog.id})} buttonStyle={styles.editButton} title="Edit" />
                <Button onPress={handleDelete} buttonStyle={styles.deleteButton} title="Delete" />
            </View>
        </Card>
    )

}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'space-between',
        width: 375,
        borderColor: '#080080',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: '#eee'
    },
    title: {
        fontSize: 30
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    editButton: {
        backgroundColor: '#080080',
        paddingHorizontal: 20,
    },
    deleteButton: {
        backgroundColor: '#99231f',
        paddingHorizontal: 20
    }
})

export default EditBlogCard;