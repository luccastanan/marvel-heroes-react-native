import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Label} from '.';
import {RED} from '../constants/colors';

const Header = () => {
    return (
        <View style={{width: '100%'}}>
            <Label color={RED}>
                <Label color={RED} type={'bold'}>
                    BUSCA MARVEL
                </Label>{' '}
                REACT NATIVE
            </Label>
            <View style={styles.underline} />
        </View>
    );
};

const styles = StyleSheet.create({
    underline: {
        width: 53,
        height: 3,
        backgroundColor: RED,
    },
});

export default Header;
