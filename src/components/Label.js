import React from 'react';
import {Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const Label = props => {
    function buildStyle() {
        return [
            getFont(),
            {
                color: props.color,
                fontSize: props.size,
            },
            props.style,
        ];
    }

    function getFont() {
        switch (props.type) {
            case 'bold':
                return styles.bold;
            case 'light':
                return styles.light;
            default:
                return styles.regular;
        }
    }

    return <Text style={buildStyle()}>{props.children}</Text>;
};

const styles = StyleSheet.create({
    regular: {
        fontFamily: 'Roboto-Regular',
    },
    bold: {
        fontFamily: 'Roboto-Black',
    },
    light: {
        fontFamily: 'Roboto-Light',
    },
});

Label.propTypes = {
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    type: PropTypes.oneOf(['bold', 'light', 'regular']),
    size: PropTypes.number,
    color: PropTypes.string,
};

Label.defaultProps = {
    style: {},
    type: 'regular',
    size: 16,
    color: 'black',
};

export default Label;
