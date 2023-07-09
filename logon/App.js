import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import {ApolloProvider} from '@apollo/client';
import {client} from './src/apollo/apollo';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <StatusBar backgroundColor="#06bcee" />
        <Navigation />
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
