import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { setContext } from 'apollo-link-context';

// import { RetryLink } from 'apollo-link-retry';
import { onError } from 'apollo-link-error';
import ApolloLinkTimeout from 'apollo-link-timeout';
import fetch from 'isomorphic-unfetch';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

// const retryLink = new RetryLink({
//   attempts: (count, operation, error) => !!error && operation.operationName !== 'specialCase',
//   delay: count => count * 1000 * Math.random(),
// });


const timeoutLink = new ApolloLinkTimeout(30000); // 10 second timeout
const httpLink = createHttpLink({
  uri: 'https://url/',
});

const timeoutHttpLink = timeoutLink.concat(httpLink);


const errorLink = onError(({
  response, operation, graphQLErrors, networkError,
}) => {
  console.log(response);
  console.log(operation);
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ));
  }

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

let link = errorLink.concat(timeoutHttpLink);
// const link = retryLink.concat(elink);


const clink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = ''; // localStorage.getItem('token');
  // console.log(token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
    },
  };
});

link = clink.concat(link);

const returnToken = () => {
  const token = localStorage.getItem('token');
  return `Bearer ${token}`;
};

let wsLink = null;
let wsClient = null;

if (process.browser) {
// const token = localStorage.getItem('token');


  wsClient = new SubscriptionClient('wss://url',
    {
      reconnect: true,
      // const newToken = returnToken();
      // console.log(newToken);
      connectionParams: () => ({
        headers: {

        },
      })
      ,
    });
  wsLink = new WebSocketLink(wsClient);


  link = split(
  // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    link,
  );
}

export const refreshSubscription = () => {
  // console.log(wsLink);
  // console.log(wsClient);
  // console.log(wsClient.connectionParams());
  // wsLink.SubscriptionClient.close(false, false);
  // wsLink.SubscriptionClient.connect();
  wsClient.close(false);
  wsClient.connectionParams();
};

function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}


export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
