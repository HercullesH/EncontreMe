/**
 * @format
 */


import { AppRegistry } from 'react-native';
import React from 'react';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import theme from './src/core/theme'
import configureStore from './src/store/configureStore';

const store = configureStore()


const RNRedux = () => (
  <Provider store = { store }>
    <PaperProvider theme={ theme }>
        <App />
    </PaperProvider>
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);

