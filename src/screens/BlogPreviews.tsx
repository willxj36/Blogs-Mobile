import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { Blog } from '../utils/models';
import { apiService } from '../utils/apiService';

import BlogPreviewCard from '../components/BlogPreviewCard';

const BlogPreviews = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);

    const url = 'https://tranquil-dusk-62236.herokuapp.com/api/blogs';

    useEffect(() => {
        (async () => {
            let blogs = await apiService(url);
            setBlogs(blogs);
        })();
    }, []);

    return (
        <>
            <StatusBar style="light" />
            <ScrollView style={styles.container}>
                {blogs.map(blog => (
                    <BlogPreviewCard key={blog.id} blog={blog} />
                ))}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    text: {
        color: '#fff',
        fontSize: 30
    }
});

export default BlogPreviews;