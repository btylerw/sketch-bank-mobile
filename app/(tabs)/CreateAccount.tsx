import React, { useState } from "react";
import { Text, Button, Layout, Input, Icon } from "@ui-kitten/components"
import { View, TouchableWithoutFeedback } from "react-native"
import { useRouter } from "expo-router";
import { useThemeContext } from "@/contexts/ThemeContext"
import axios from "axios";

export default function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);
    const [secureConfirmEntry, setSecureConfirmEntry] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const router = useRouter();
    const serverUrl = process.env.EXPO_PUBLIC_API_URL;

    const toggleSecurity = () => {
        setSecureEntry(!secureEntry);
    }
    const toggleConfirmSecurity = () => {
        setSecureConfirmEntry(!secureConfirmEntry);
    }

    const validateEmail = (value: string) => {
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailValid(emailRegex.test(value));
    };

    const confirmPasswordsMatch = (value: string) => {
        setConfirmPassword(value);
        setPasswordsMatch(value === password);
    }

    const handleCreateAccount = async () => {
        if (emailValid && passwordsMatch) {
            console.log(serverUrl);
            try {
                await axios.post(`${serverUrl}/users/signup`, {
                    username: username,
                    fname: fname,
                    lname: lname,
                    password: password,
                    email: email
                }).then(response => {
                    const params = {username: username, password: password};
                    console.log(response);
                    router.push('/HomePage');
                })
            } catch(err) {
                console.error(err);
            }
        }
    }

    const hidePassword = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecurity}>
            <Icon
                {...props}
                name={secureEntry ? 'eye-off' : 'eye'}
            />
        </TouchableWithoutFeedback>
    );
    const hideConfirmPassword = (props) => (
        <TouchableWithoutFeedback onPress={toggleConfirmSecurity}>
            <Icon
                {...props}
                name={secureConfirmEntry ? 'eye-off' : 'eye'}
            />
        </TouchableWithoutFeedback>
    );
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{gap: 10, width: '75%'}}>
                <Text style={{textAlign: 'center'}} category="h1">Create Account</Text>
                <Input
                    placeholder="Enter First Name"
                    value={fname}
                    onChangeText={newVal => setFname(newVal)}
                />
                <Input
                    placeholder="Enter Last Name"
                    value={lname}
                    onChangeText={newVal => setLname(newVal)}
                />
                <Input
                    placeholder="Enter E-Mail Address"
                    value={email}
                    onChangeText={validateEmail}
                    status={emailValid ? 'basic' : 'danger'}
                    caption={emailValid ? '' : 'Please enter a valid email address'}
                    autoCapitalize="none"
                />
                <Input
                    placeholder="Enter Username"
                    value={username}
                    onChangeText={newVal => setUsername(newVal)}
                />
                <Input
                    placeholder="Enter Password"
                    value={password}
                    accessoryRight={hidePassword}
                    secureTextEntry={secureEntry}
                    onChangeText={newVal => setPassword(newVal)}
                />
                <Input
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    accessoryRight={hideConfirmPassword}
                    secureTextEntry={secureConfirmEntry}
                    onChangeText={confirmPasswordsMatch}
                    status={passwordsMatch ? 'basic' : 'danger'}
                    caption={passwordsMatch ? '' : 'Passwords do not match'}
                />
                <Button onPress={handleCreateAccount}>
                    Create Account
                </Button>
            </View>
        </Layout>
    )
};