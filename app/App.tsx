import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import { AppRoutes } from '@routes/app.routes';
import theme from '@theme/index';

import { store } from './src/redux/store';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="transparent" translucent />
          <AppRoutes />
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
}
