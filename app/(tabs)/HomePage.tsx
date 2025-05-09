import { Text, Button, Layout } from "@ui-kitten/components"
import { View } from "react-native"
import { useThemeContext } from "@/contexts/ThemeContext"
import { useUserContext } from "@/contexts/UseContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function HomePage() {
    const { toggleTheme } = useThemeContext();
    const { loggedIn, logOut, user } = useUserContext();
    const router = useRouter();
    console.log(user);
    useEffect(() => {
        if (!loggedIn) {
            router.replace('/');
        }
    })
    const handleLogout = () => {
        logOut();
    }
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{gap: 10}}>
                {user && <Text category="h1">Welcome {user.username}!</Text>}
                <Button onPress={toggleTheme}>
                    Change Theme
                </Button>
                <Button onPress={handleLogout}>
                    Log Out
                </Button>
            </View>
        </Layout>
    )
};