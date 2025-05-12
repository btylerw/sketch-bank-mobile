import { Text, Button, Layout } from "@ui-kitten/components"
import { View } from "react-native"
import { useUserContext } from "@/contexts/UseContext";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function HomePage() {
    const { loggedIn, user }: any = useUserContext();
    const router = useRouter();
    useEffect(() => {
        if (!loggedIn) {
            router.replace('/');
        }
    })
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{gap: 10}}>
                {user && <Text category="h4">Welcome {user.fname}!</Text>}
                {user && <Text category="h4">Account Balance: ${user.balance}</Text>}
            </View>
        </Layout>
    )
};