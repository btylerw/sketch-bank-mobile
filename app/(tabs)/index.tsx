import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import LoginScreen from '@/components/LoginScreen';


export default function HomeScreen() {
  return (
    //<IconRegistry icons={EvaIconsPack}>
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <SafeAreaView>
            <LoginScreen />
          </SafeAreaView>
        </Layout>
      </ApplicationProvider>
    </NavigationContainer>
    //</IconRegistry>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
