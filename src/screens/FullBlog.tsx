import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

import { Blog } from '../utils/models';
import { apiService } from '../utils/apiService';

interface FullBlogProps {
    route: any
}

const FullBlog: React.FC<FullBlogProps> = ({ route }) => {

    const navigation = useNavigation();
    const { blogId } = route.params;

    const [blog, setBlog] = useState<Blog>();

    const url = `https://tranquil-dusk-62236.herokuapp.com/api/blogs/${blogId}`

    useEffect(() => {
        (async () => {
            let blog = await apiService(url);
            setBlog(blog);
            navigation.setOptions({ title: `${blog?.title}` });
        })();
    }, [blogId])

    let date = dayjs(`${blog?._created}`).format('MMM DD, YYYY');

    return (
        <>
            <StatusBar style="light" />
            <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
                <Image style={{ width: 350, height: 250, marginTop: 20 }} source={{ uri: 'https://tranquil-dusk-62236.herokuapp.com/space-stock.jpg' }} />
                <Text style={styles.titleText}>{blog?.title}</Text>
                <Text style={styles.subtitleText}>By {blog?.author}</Text>
                <Text style={styles.subtitleText}>{date}</Text>
                <View style={{ backgroundColor: '#080080', paddingHorizontal: 180, paddingVertical: 2, marginVertical: 20 }} />
                <Text style={styles.bodyText}>{blog?.content}</Text>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    titleText: {
        color: '#fff',
        fontSize: 40,
        marginVertical: 20,
        textAlign: 'center'
    },
    subtitleText: {
        color: '#bbb',
        fontSize: 25,
        marginBottom: 10
    },
    bodyText: {
        color: '#fff',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginHorizontal: 15,
        marginBottom: 15
    }
});

export default FullBlog;