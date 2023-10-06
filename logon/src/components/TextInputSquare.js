import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const TextInputSquare = ({
    value,
    onChangeText,
    placeholder,
    icon,
    type,
    keyboardType,
    border = '#000',
    errorMessage,
    textLength = 40,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <>
            <View
                style={[
                    styles.container,
                    {
                        borderColor: isFocused ? border : '#B3B3B3',
                    },
                ]}
            >
                {icon && (
                    <View style={styles.iconContainer}>
                        <Icon name={icon} size={20} color={isFocused ? border : 'gray'} />
                    </View>
                )}
                <TextInput
                    value={value}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    secureTextEntry={type ? true : false}
                    style={styles.input}
                    maxLength={textLength}
                />
            </View>
            {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        borderWidth: 2,
        paddingHorizontal: 10,
        marginVertical: 5
    },
    input: {
        flex: 1,
        fontSize: 19,
        color: '#3D3935',
        paddingVertical: 0,
    },
    iconContainer: {
        padding: 8,
    },
});

export default TextInputSquare;
