import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, Input, Icon, IconElement, Button, Layout } from "@ui-kitten/components";


export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);
    const router = useRouter();

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
              <Button onPress={() => router.push('/HomePage')}>
                  Log In
              </Button>
              <TouchableOpacity onPress={() => router.push('/CreateAccount')}>
                <Text style={{color: 'blue', textAlign: 'center'}}>
                    Create Account
                </Text>
              </TouchableOpacity>
          </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    captionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    captionIcon: {
      width: 10,
      height: 10,
      marginRight: 5,
    },
    captionText: {
      fontSize: 12,
      fontWeight: '400',
      fontFamily: 'opensans-regular',
      color: '#8F9BB3',
    },
  });