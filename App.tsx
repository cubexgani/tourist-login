// App.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from './src/types';
import LoginScreen from './src/screens/LoginScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import './src/locales/i18n'; // Import i18n configuration

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load saved language on app start
    const loadSavedLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
        } else {
          // Set default language to EN
          await i18n.changeLanguage('en');
          await AsyncStorage.setItem('selectedLanguage', 'en');
        }
      } catch (error) {
        console.error('Error loading saved language:', error);
        // Fallback to English
        await i18n.changeLanguage('en');
      }
    };

    loadSavedLanguage();
  }, [i18n]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="QRCode" component={QRCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;