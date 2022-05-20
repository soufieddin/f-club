import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import { navigationRef } from './app/navigation/rootNavigation';
import { useAuth, AuthProvider } from './app/firebase/auth';
import OfflineNotice from './app/components/OfflineNotice';
import AppNavigator from './app/navigation/AppNavigator';

import { LogBox } from 'react-native'
import ignoreWarnings from 'ignore-warnings';

ignoreWarnings('warn',['ViewPropTypes','[react-native-gesture-handler]'])

LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
    'NativeBase: The contrast ratio of',
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
])

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>

  )
}

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      { user ? ( <AppNavigator /> ) : ( <AuthNavigator />) }
      </NavigationContainer>
    </>
  );
}