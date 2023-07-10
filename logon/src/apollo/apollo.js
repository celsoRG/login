import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
const shop = 'pequenoigloo';
const apiVersion = '2023-07';
const apiUrl = `https://${shop}.myshopify.com/api/${apiVersion}/graphql.json`;
// const apiUrl = 'https://drop-1547.myshopify.com/api/2023-07/graphql.json';
// const storefrontToken = '9c09b6ab273df22e988198650059f8c6';
const storefrontToken = '5c360ca2e68de42122ed8bf2c10f262f';

// Create an HTTP link to the Shopify Storefront API
const httpLink = createHttpLink({
  uri: apiUrl,
});

// Set the headers for the API requests
const authLink = setContext((_, {headers}) => ({
  headers: {
    ...headers,
    'X-Shopify-Storefront-Access-Token': storefrontToken,
  },
}));

// Create the Apollo Client instance
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
