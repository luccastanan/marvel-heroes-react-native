import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from './src/screens/HomeScreen';
import { Header } from './src/components'

const navigation = createStackNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: <Header/>,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                shadowOffset: {
                    height: 0
                },
                shadowRadius: 0
            },
            headerTitleContainerStyle: {
                left: 18,
                right: 18
            },
        }
    }
});

export default createAppContainer(navigation)