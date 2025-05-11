import { Text, Button, Layout } from "@ui-kitten/components";
import { View } from "react-native";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function Settings() {
    const {toggleTheme}: any = useThemeContext();
    
        return (
            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{gap: 10}}>
                    <Text category="h4">Welcome to the Settings Page!</Text>
                    <Button onPress={toggleTheme}>
                        Change Theme
                    </Button>
                </View>
            </Layout>
        )
}