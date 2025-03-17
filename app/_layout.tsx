import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import 'react-native-reanimated';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'lex': require('../assets/fonts/Lexend-Regular.ttf'),
    'lex-bold': require('../assets/fonts/Lexend-Bold.ttf'),
    'lex-light': require('../assets/fonts/Lexend-Light.ttf'),
    'lex-medium': require('../assets/fonts/Lexend-Medium.ttf'),
    'lex-semi': require('../assets/fonts/Lexend-SemiBold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          title: 'Login or Sign up',
          headerTitleStyle: {
            fontFamily: 'lex-semi'
          },
          presentation: 'modal',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} >
              <Ionicons name='close-outline' size={28} />
            </TouchableOpacity>
          )
        }} />
      <Stack.Screen
        name="listing/[id]"
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} >
              <Ionicons name='close-outline' size={28} />
            </TouchableOpacity>
          )
        }}
      />
    </Stack>
  );
}
