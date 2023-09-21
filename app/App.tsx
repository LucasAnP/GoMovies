import { Provider } from 'react-redux';

import { ThemeProvider } from 'styled-components/native';

import theme from '@theme/index';
import Routes from '@routes/index';

import { store } from './src/redux/store';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ThemeProvider>
  );
}
