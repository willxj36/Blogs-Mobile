import * as React from 'react';
import dayjs from 'dayjs';
import { Card, Text, Button } from 'react-native-elements';
import { Alert, StyleSheet } from 'react-native';

import { Blog } from '../utils/models';
import { useNavigation } from '@react-navigation/native';

interface IPreviewCardProps {
    blog: Blog
}

const BlogPreviewCard: React.FC<IPreviewCardProps> = ({ blog }) => {

    const navigation = useNavigation();

    let date = dayjs(blog._created).format('MMM DD, YYYY');

    return (
        <Card containerStyle={styles.card}>
            <Card.Title style={styles.title}>{blog.title}</Card.Title>
            <Card.Image style={styles.image} source={{ uri: 'https://tranquil-dusk-62236.herokuapp.com/space-stock.jpg' }} />
            <Card.Divider />
            <Text h4>{blog.author}</Text>
            <Text>{date}</Text>
            <Card.Divider />
            <Button onPress={() => navigation.navigate('Full Blog', {blogId: blog.id})} buttonStyle={{backgroundColor: '#080080'}} title="Read the Blog!" raised />
        </Card>
    )

}

const styles = StyleSheet.create({
    card: {
        width: 375,
        borderColor: '#080080',
        borderWidth: 3,
        borderRadius: 10
    },
    title: {
        fontSize: 30
    },
    image: {
        height: 220
    }
})

export default BlogPreviewCard;