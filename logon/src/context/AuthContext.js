import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {LOGIN_MUTATION, SIGNUP_MUTATION} from '../apollo/mutations';
import {useMutation} from '@apollo/client';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [signup] = useMutation(SIGNUP_MUTATION);
  const [loginUser] = useMutation(LOGIN_MUTATION);

  const register = async (name, email, password) => {
    const res = await signup({
      variables: {
        input: {
          firstName: name,
          email: email,
          password: password,
        },
      },
    });
    console.log(res.data.customerCreate);
    if (res.data.customerCreate) {
      alert(`Customer ${res.data.customerCreate?.customer?.firstName} Created`);
    }
    if (res?.data?.customerCreate?.customerUserErrors.length > 0) {
      alert(` ${res.data.customerCreate?.customerUserErrors?.[0].message}`);
    }

    //   if (response.status === 200) {
    //     console.log('Se ha registrado exitosamente');
    //   } else {
    //     console.log('Ha ocurrido un error en la llamada');
    //   }
    // } catch (error) {
    //   console.error('Error en la solicitud', error);
    //   // Aquí puedes manejar los errores de la solicitud
    // }
  };

  const login = async (email, password) => {
    const res = await loginUser({
      variables: {
        input: {
          email: email,
          password: password,
        },
      },
    });
    setIsLoading(true);

    await AsyncStorage.setItem(
      'userInfo',
      res.data.customerAccessTokenCreate.customerAccessToken.accessToken,
    );
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Perform login logic

    // setIsLoading(false);
  };

  const logout = async navigation => {
    await AsyncStorage.removeItem('userInfo');
    // navigation.navigate('Login');
    setIsLoading(true);
    // Perform logout logic

    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      console.log('userInfo', userInfo);

      // if (userInfo) {
      //   setUserInfo(userInfo !== null ? userInfo : {});
      // }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
/* import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (name, email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        name,
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/login`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}; */
