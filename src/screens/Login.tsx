import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { apiService, SetAccessToken } from '../utils/apiService';

import { LoggedIn, IContext } from '../components/LoggedInProvider';

const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [working, setWorking] = useState<boolean>(false);

    const [user , setUser] = useContext<IContext>(LoggedIn);
    
    const url = 'https://tranquil-dusk-62236.herokuapp.com/auth/login'
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            setWorking(true);
            let result: {token: string, role: string, userid: number} = await apiService(url, 'POST', {
                email,
                password
            });
            if(result) {
                setUser({userid: result.userid, role: result.role});
                await SetAccessToken(result.token, {userid: result.userid, role: result.role});
                alert('Login successful!');
                setWorking(false);
                navigation.navigate('Home');
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
                    disabled={working}
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