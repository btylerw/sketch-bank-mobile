import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, Input, Icon, IconElement, Button, Layout } from "@ui-kitten/components";
import { useUserContext } from "@/contexts/UseContext";


export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);
    const router = useRouter();
    const { loginAttempt, loggedIn } = useUserContext();

    useEffect(() => {
        if (loggedIn) {
            router.push('/HomePage');
        }
    }, [loggedIn]);

    const toggleSecurity = () => {
        setSecureEntry(!secureEntry);
    }

    const hidePassword = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecurity}>
            <Icon
                {...props}
                name={secureEntry ? 'eye-off' : 'eye'}
            />
        </TouchableWithoutFeedback>
    );

    const handleLogin = () => {
        const params = { username: username, password: password };
        setUsername('');
        setPassword('');
        loginAttempt(params);
    }
    
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{gap: 10}}>
              <Text category='h1'>
                  Welcome to Sketch Bank!
              </Text>
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
              <Button onPress={handleLogin}>
                  Log In
              </Button>
              <TouchableOpacity onPress={() => router.push('/CreateAccount')}>
                <Text style={{color: '#4488ff', textAlign: 'center'}}>
                    Create Account
                </Text>
              </TouchableOpacity>
          </View>
        </Layout>
    );
}