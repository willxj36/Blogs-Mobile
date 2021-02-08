import * as React from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

interface FullBlogProps {
    route: any
}

const FullBlog: React.FC<FullBlogProps> = ({ route }) => {

    const navigation = useNavigation();
    const { blogId } = route.params;

    return (
        <>
            <StatusBar style="auto" />
            <View style={styles.container}>
                <Text style={styles.text}>Single Blog Screen, {blogId}</Text>
                <Button title="Push Me" onPress={() => navigation.navigate('Home')} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 30
    }
});

export default FullBlog;