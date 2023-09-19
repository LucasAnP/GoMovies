import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from '@routes/app.routes';
import theme from '@theme/index';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

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
