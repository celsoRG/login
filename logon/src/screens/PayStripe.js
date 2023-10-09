import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TextInputSquare from '../components/TextInputSquare';
import axios from 'axios';
import {useStripe, CardField} from '@stripe/stripe-react-native';

const PayStripe = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const stripeAPIURL = 'https://api.stripe.com/v1/payment_intents';
  const handleCheck = async () => {
    try {
      if (!name) {
        Alert.alert('Name is required');
        return;
      }

      // Check if the amount is empty or not a number
      if (!amount || isNaN(parseFloat(amount))) {
        Alert.alert('Amount must be a valid number');
        return;
      }
      const response = await axios.post(
        stripeAPIURL,
        {
          amount: amount,
          currency: 'mxn',
          automatic_payment_methods: {enabled: true},
        },
        {
          headers: {
            Authorization: `Bearer ${'sk_test_51MvTFtEznZs0YGMNy5cgHDAU3clGt6YmfZLIumVbj5iAGTfGqcNzPibABkPsMoPv0faXthQPb5w8qVdolQLUeCAW00Hzr7GNg3'}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      const {error: paymentSheetError} = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        paymentIntentClientSecret: response.data.client_secret,
        defaultBillingDetails: {
          name: name,
        },
      });
      if (paymentSheetError) {
        Alert.alert('Something went wrong', paymentSheetError.message);
        return;
      }
      const {error: paymentError} = await presentPaymentSheet();
      console.log(paymentError);
      if (paymentError) {
        Alert.alert(`Error code: ${paymentError.code}`, paymentError.message);
        return;
      }
    } catch (error) {
      Alert.alert('something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <TextInputSquare
        border="#CD5C08"
        placeholder={' Cardholder Name'}
        value={name}
        onChangeText={txt => {
          setName(txt);
        }}
        // errorMessage={text1Error ? 'Enter name' : ''}
      />
      <TextInputSquare
        border="#CD5C08"
        placeholder="Enter Amount "
        value={amount}
        onChangeText={txt => {
          setAmount(txt);
        }}
        // errorMessage={text2Error ? 'Enter card number' : ''}
      />
      {/* <TextInputSquare
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
      /> */}

      {/* <Button btnLabel={'pay now'} btnOnPress={handleCheck} /> */}

      <Button title="Pay niw" onPress={handleCheck} />
    </View>
  );
};

export default PayStripe;
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
