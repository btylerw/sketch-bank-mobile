import { Text, Button} from "@ui-kitten/components"
import { View } from "react-native"
import { useThemeContext } from "@/contexts/ThemeContext"

export default function HomePage() {
    const { toggleTheme } = useThemeContext();
    return (
        <View>
            <Text>Welcome to the Home Page!</Text>
            <Button onPress={toggleTheme}>
                Change Theme
            </Button>
        </View>
    )
};