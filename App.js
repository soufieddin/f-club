// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import AuthNavigator from './app/navigation/AuthNavigator';
import { navigationRef } from './app/navigation/rootNavigation';
import { AuthProvider } from './app/firebase/auth';

import OfflineNotice from './app/components/OfflineNotice';


export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>

  )
}

function AppContent() {

  // Notifications.setNotificationHandler({

  //   handleNotification: async () => {
  //     return {
  //       shouldPlaySound: true,
  //       shouldShowAlert: true,
  //       shouldSetBadge: true,
  //     }
  //   }
  // })

  return (
    <>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AuthNavigator />
      </NavigationContainer>
    </>
  );
}


