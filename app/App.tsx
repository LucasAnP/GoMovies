import { NavigationContainer } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { AppRoutes } from '@routes/app.routes';
import theme from '@theme/index';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
