import { Text, Button, Layout } from "@ui-kitten/components"
import { View } from "react-native"
import { useThemeContext } from "@/contexts/ThemeContext"

export default function HomePage() {
    const { toggleTheme } = useThemeContext();
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View>
                <Text>Welcome to the Home Page!</Text>
                <Button onPress={toggleTheme}>
                    Change Theme
                </Button>
            </View>
        </Layout>
    )
};