import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { UserProvider } from '@/contexts/UseContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useUserContext } from '@/contexts/UseContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// AuthGate is used to render a login page and account creation page before rendering the rest of the app
function AuthGate() {
  const { loggedIn }: any = useUserContext();
  const [theme, setTheme] = useState(eva.light);
  const {themeType}: any = useThemeContext();

  useEffect(() => {
    setTheme(themeType === 'light' ? eva.light : eva.dark);
  }, [themeType]);
  
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          {!loggedIn ? (
            <>
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="CreateAccount" options={{ headerShown: false }}/>
            </>
          ) : (
            <Stack.Screen name="(tabs)" />
          )}
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ApplicationProvider>
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <ThemeProvider>
        <AuthGate/>
      </ThemeProvider>
    </UserProvider>
  );
}
