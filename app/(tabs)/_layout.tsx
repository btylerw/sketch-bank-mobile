import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useThemeContext } from '@/contexts/ThemeContext';
import * as eva from '@eva-design/eva';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { themeType }: any = useThemeContext();
  const [theme, setTheme] = useState(eva.light);

  useEffect(() => {
    setTheme(themeType === 'light' ? eva.light : eva.dark);
  }, [themeType]);

  return (
    <>
      <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarStyle: Platform.select({
                ios: {
                  // Use a transparent background on iOS to show the blur effect
                  position: 'absolute',
                },
                default: {},
              }),
            }}>
            <Tabs.Screen
              name="HomePage"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={28} color={color} />,
              }}
            />
            <Tabs.Screen
              name="Transactions"
              options={{
                title: 'Transactions',
                tabBarIcon: ({ color }) => <Ionicons name="paper-plane" size={28} color={color} />,
              }}
            />
            <Tabs.Screen
              name="Schedule"
              options={{
                title: 'Schedule',
                tabBarIcon: ({ color }) => <Ionicons name="paper-plane" size={28} color={color} />,
              }}
            />
            <Tabs.Screen
              name="Settings"
              options={{
                title: 'Settings',
                tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={28} color={color} />,
              }}
            />
            <Tabs.Screen
              name="explore"
              options={{
                href: null,
              }}
            />
          </Tabs>
    </>
  );
}
