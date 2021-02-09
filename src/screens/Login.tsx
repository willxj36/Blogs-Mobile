import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { apiService } from '../utils/apiService';

const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [working, setWorking] = useState<boolean>(false);

    const url = 'https://tranquil-dusk-62236.herokuapp.com/auth/login'
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            setWorking(true);
            let res = await apiService(url, 'POST', {
                email,
                password
            });
            if(res) {
                //successful login logic here
                alert('Login successful!')
            } else {
                alert("Info entered doesn't match our records, please try again!");
                setWorking(false);
            }
        } catch (e) {
            console.log(e);
            alert('Something went wrong, please try again');
            setWorking(false);
        }
    }

    return(
        <View style={{ flex: 1, backgroundColor: '#000', padding: 15 }}>
            <View style={styles.formView}>
                <Text style={styles.formLabel}>Email</Text>
                <Input
                    onChangeText={(value) => setEmail(value)}
                    value={email} 
                    style={styles.input}>
                </Input>
                <Text style={styles.formLabel}>Password</Text>
                <Input
                    onChangeText={(value) => setPassword(value)} 
                    value={password} 
                    secureTextEntry 
                    style={styles.input}>
                </Input>
            </View>
            <View style={{ flex: 1 }}>
                <Button
                    disabled={working}
                    onPress={handleLogin} 
                    titleStyle={styles.buttonTitle} 
                    buttonStyle={styles.button} 
                    title='Log In' />
                <Button 
                    onPress={() => navigation.navigate('Register')}
                    titleStyle={styles.buttonTitle} 
                    buttonStyle={styles.button} 
                    type='outline' title='New? Register an Account!' />
            </View>
        </View>
    );
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
        maxHeight: 300
    },
    formLabel: {
        color: 'white',
        fontSize: 20,
        marginLeft: 15,
        marginBottom: 10
    },
    input: {
        backgroundColor: '#eee',
        borderRadius: 5,
        padding: 10
    },
    button: {
        marginVertical: 15
    },
    buttonTitle: {
        fontSize: 20
    }
})

export default Login;