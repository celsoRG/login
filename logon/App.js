import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/apollo';
import {StripeProvider} from '@stripe/stripe-react-native';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StripeProvider publishableKey="pk_test_51MvTFtEznZs0YGMNlVjZP6pLL6Pm7m7sJURq0tbaeJm83hdFk5yYFs2Mc6p6aLbMymVa7hVeAKwFys1K0x3XTUEj00c6le5pVH">
        <AuthProvider>
          <StatusBar backgroundColor="#06bcee" />
          <Navigation />
        </AuthProvider>
      </StripeProvider>
    </ApolloProvider>
  );
};

export default App;
