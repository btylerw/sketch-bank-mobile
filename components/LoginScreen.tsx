import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import { Text, Input, Icon, IconElement, Button } from "@ui-kitten/components";

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);

    const toggleSecurity = () => {
        setSecureEntry(!secureEntry);
    }

    const hidePassword = (props) => (
        <Icon
            {...props}
            name={secureEntry ? 'eye-off' : 'eye'}
            onPress={toggleSecurity}
        />
    );
    
    return (
        <View>
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
            <Button>
                Log In
            </Button>
        </View>
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