import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { AUTH_DATA } from '@/graphql/local'
import gql from 'graphql-tag'
import jwt_decode from 'jwt-decode'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP || 'https://backendvet.sdi.inet.co.th/api/v1/graphql'

const NOT_LOGGED_IN_AUTH_DATA = {
  loggedIn: false,
  isAdmin: false,
  userIndex: null,
  userFullName: null
}

const typeDefs = gql`
  extend type query {
    auth: Auth!
  }

  type Auth {
    loggedIn: Boolean!,
    isAdmin: Boolean!,
    userIndex: Int,
    userFullName: String
  }
`

const cache = new InMemoryCache()
const jwt = getJWT()
const data = jwt? decodeJWT(jwt) : NOT_LOGGED_IN_AUTH_DATA
writeCacheData(cache, data)


const resolvers = {
  Mutation: {
    setAuth: (_, data, { cache }) => {
      cache.writeQuery({
        query: AUTH_DATA,
        data
      })
      return data
    }
  }
}

// Config
const defaultOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint,
  // You can use `wss` for secure connection (recommended in production)
  // Use `null` to disable subscriptions
  //wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || 'wss://backendvet.sdi.inet.co.th/api/v1/graphql',
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  // Enable Automatic Query persisting with Apollo Engine
  persisting: false,
  // Use websockets for everything (no HTTP)
  // You need to pass a `wsEndpoint` for this to work
  websocketsOnly: false,
  // Is being rendered on the server?
  ssr: false,

  // Override default apollo link
  // note: don't override httpLink here, specify httpLink options in the
  // httpLinkOptions property of defaultOptions.
  // link: myLink

  typeDefs,
  cache,
  resolvers

  // Override the way the Authorization header is set
  // getAuth: (tokenName) => ...

  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: {
  //   resolvers: {},
  //   defaults: {} 
  // },
}

const { apolloClient, wsClient } = createApolloClient({
  ...defaultOptions
})
apolloClient.wsClient = wsClient

// Create and export vue apollo provider
export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      fetchPolicy: 'cache-and-network',
    },
  },
  errorHandler (error) {
    // eslint-disable-next-line no-console
    console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
  },
})

// Manually call this when user log in
export async function onLogin (apolloClient, token, stayLoggedIn) {
  if (stayLoggedIn) {
    if (typeof localStorage !== 'undefined' && token) {
      localStorage.setItem(AUTH_TOKEN, token)
    }
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
  writeCacheData(apolloClient.cache, decodeJWT(token))
}

// Manually call this when user log out
export async function onLogout (apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
  writeCacheData(apolloClient.cache, NOT_LOGGED_IN_AUTH_DATA)
}

// Returns the jwt to use for apollo calls
export function getJWT () {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN)
  }
}

function decodeJWT (jwt) {
  const data = jwt_decode(jwt)
  return {
    loggedIn: true,
    isAdmin: data.account_type === 101,
    userIndex: data.index,
    userFullName: `${data.first_name} ${data.last_name}`
  }
}

function writeCacheData (cache, data) {
  cache.writeData({
    data: {
      auth: {
        __typename: 'Auth',
        ...data
      }
    }
  })
}