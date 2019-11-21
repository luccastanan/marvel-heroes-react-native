import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import Routes from './Routes';
import {RED} from './src/constants/colors';
import store from './src/store';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: RED,
        accent: 'yellow',
    },
};

const App = () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={theme}>
                <Routes />
            </PaperProvider>
        </StoreProvider>
    );
};

export default App;
