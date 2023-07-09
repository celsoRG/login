import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const apiUrl = 'https://drop-1547.myshopify.com/api/2023-07/graphql.json';
const storefrontToken = '9c09b6ab273df22e988198650059f8c6';

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
