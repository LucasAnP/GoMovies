import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';

import { useTheme } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';

import { AppRoutes } from './app.routes';

export default function Routes() {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.gray[700] }}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <AppRoutes />
      </NavigationContainer>
    </View>
  );
}
