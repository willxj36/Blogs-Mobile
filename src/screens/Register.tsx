import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { apiService, SetAccessToken } from '../utils/apiService';
import { LoggedIn } from '../components/LoggedInProvider';

const Register = () => {

    const [user, setUser] = useContext(LoggedIn);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>('');
    const [working, setWorking] = useState<boolean>(false);

    const url = 'https://tranquil-dusk-62236.herokuapp.com/auth/register';
    const navigation = useNavigation();

    const handleRegister = async () => {
        setWorking(true);
        if(password === confirmPass) {
            try {
                let result: {token: string, role: string, userid: number} = await apiService(url, 'POST', {
                    name,
                    email,
                    password
                });
                if(result) {
                    setUser({userid: result.userid, role: result.role});
                    await SetAccessToken(result.token, {userid: result.userid, role: result.role});
                    alert('User registered successfully!');
                    setWorking(false);
                    navigation.navigate('Author Page');
                } else {
                    throw Error;
                }
            } catch (e) {
                console.log(e);
                alert('Something went wrong, please try again');
                setWorking(false);
            }
        } else {
            alert('Password fields do not match, please verify your password and try again');
            setWorking(false);
        }
    }

    return(
        <ScrollView style={{ flex: 1, backgroundColor: '#000', padding: 15 }}>
            <View style={styles.formView}>
                <Text style={styles.formLabel}>Name</Text>
                <Input
                    onChangeText={(value) => setName(value)}
                    value={name} 
                    style={styles.input}>
                </Input>
                <Text style={styles.formLabel}>Email</Text>
                <Input
                    onChangeText={(value) => setEmail(value)}
                    value={email} 
                    style={styles.input}>
                </Input>
                <Text style={styles.formLabel}>New password</Text>
                <Input
                    onChangeText={(value) => setPassword(value)} 
                    value={password} 
                    secureTextEntry 
                    style={styles.input}>
                </Input>
                <Text style={styles.formLabel}>Confirm password</Text>
                <Input
                    onChangeText={(value) => setConfirmPass(value)} 
                    value={confirmPass} 
                    secureTextEntry 
                    style={styles.input}>
                </Input>
            </View>
            <View style={{ flex: 1 }}>
                <Button
                    disabled={working}
                    onPress={handleRegister} 
                    titleStyle={styles.buttonTitle} 
                    buttonStyle={styles.button} 
                    title='Register!' />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    formView: {
        flex: 3,
        backgroundColor: '#080080',
        padding: 25,
        marginBottom: 15,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 400
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

export default Register;