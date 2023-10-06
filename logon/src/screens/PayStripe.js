import React, { useState } from 'react';
import {Button, View, Text, StyleSheet, TextInput, TouchableOpacity, 



import TextInputSquare from '../components/TextInputSquare';



const PayStripe = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');
    const [text4, setText4] = useState('');
    const [text1Error, setText1Error] = useState(false);
    const [text2Error, setText2Error] = useState(false);
    const [text3Error, setText3Error] = useState(false);
    const [text4Error, setText4Error] = useState(false);

    const handleCheck = () => {
        console.log('test 1');
        if (text1 === '') {
            setText1Error(true);
        }
        if (text2 === '') {
            setText2Error(true);
        }
        if (text3 === '') {
            setText3Error(true);
        }
        if (text4 === '') {
            setText4Error(true);
        }


        if (text1 !== '' && text2 !== '' && text3 !== '' && text4 !== '') {

            console.log('OK');
        }
    };


   








    return (
        <View style={styles.container}>
            <TextInputSquare
                border="#CD5C08"
                placeholder={' Cardholder Name'}
                value={text1}
                onChangeText={txt => {
                    setText1(txt);
                    setText1Error(false);
                }}
                errorMessage={text1Error ? 'Enter name' : ''}
            />
            <TextInputSquare
                border="#CD5C08"
                placeholder="Card Number "
                value={text2}
                onChangeText={txt => {
                    setText2(txt);
                    setText2Error(false);
                }}
                errorMessage={text2Error ? 'Enter card number' : ''}
            />
            <TextInputSquare
                border="#CD5C08"
                placeholder="Expiration Date"
                value={text3}
                onChangeText={txt => {
                    setText3(txt);
                    setText3Error(false);
                }}
                errorMessage={text3Error ? 'Enter date' : ''}
            />
            <TextInputSquare
                border="#CD5C08"
                placeholder="CVC (Card Verification Code)"
                value={text4}
                onChangeText={txt => {
                    setText4(txt);
                    setText4Error(false);
                }}
                errorMessage={text4Error ? 'Enter CVC' : ''}
            />

            <CustomButton btnLabel={'pay now'}
                btnOnPress={handleCheck}
            />

<Button
          title="Pay niw"
          onPress={handleCheck}
        />


        </View>



    );
};

export default PayStripe;
const styles = StyleSheet.create({
    container: {

        padding: 10,
    },

});




