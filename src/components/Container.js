import React from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';

const Container = props => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>{props.children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default Container;
