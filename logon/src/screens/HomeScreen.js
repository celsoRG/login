import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@apollo/client';
import {CUSTOMER} from '../apollo/queries';

const HomeScreen = ({navigation}) => {
  const {userInfo, isLoading, logout} = useContext(AuthContext);
  const {data, loading, error} = useQuery(CUSTOMER, {
    variables: {
      customerAccessToken: userInfo,
    },
  });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.welcome}>
            Welcome {data?.customer?.firstName}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Button title="Logout" color="red" onPress={logout} />

            <Button
              title="Payment"
              color="green"
              onPress={() => navigation.navigate('Payment')}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
