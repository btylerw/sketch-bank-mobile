import { Text, Button, Layout } from "@ui-kitten/components"
import { View } from "react-native"
import { useUserContext } from "@/contexts/UseContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function HomePage() {
    const { loggedIn, logOut, user }: any = useUserContext();
    const router = useRouter();
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
                <Button onPress={handleLogout}>
                    Log Out
                </Button>
            </View>
        </Layout>
    )
};