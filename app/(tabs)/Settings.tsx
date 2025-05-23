import { Text, Button, Layout } from "@ui-kitten/components";
import { View } from "react-native";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useUserContext } from "@/contexts/UseContext";

export default function Settings() {
    const {toggleTheme}: any = useThemeContext();
    const { user, logOut }: any = useUserContext();

    const handleLogout = () => {
        logOut();
    }
    
        return (
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{gap: 10}}>
                    <Text category="h4">Welcome to the Settings Page!</Text>
                    {user && <Text category="h4">Account Number: {user.acc_id}</Text>}
                    <Button onPress={toggleTheme}>
                        Change Theme
                    </Button>
                    <Button onPress={handleLogout}>
                        Log Out
                    </Button>
                </View>
            </Layout>
        )
}