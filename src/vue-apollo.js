import Vue from 'vue'
import VueApollo from 'vue-apollo'
import gql from 'graphql-tag'
import jwt_decode from 'jwt-decode'
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { AUTH_DATA } from '@/graphql/local'
import { JWT_REFRESH } from '@/graphql/login'

// Install the vue plugin
Vue.use(VueApollo)

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token'

// Http endpoint
/*/
const httpEndpoint = 'https://ec2-54-169-84-184.ap-southeast-1.compute.amazonaws.com:16888/api/graphql'
/*/
const httpEndpoint = 'http://localhost:16888/api/graphql'
//*/

const NOT_LOGGED_IN_AUTH_DATA = {
  logged_in: false,
  is_admin: false,
  index: null,
  name: null
}

const typeDefs = gql`
  extend type query {
    auth: Auth!
  }

  type Auth {
    logged_in: Boolean!,
    is_admin: Boolean!,
    index: Int,
    name: String
  }
`
let JWT_REFRESH_TIMER;

const resolvers = {
  Mutation: {
    set_auth: (_, data, { cache }) => {
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

  cache: new InMemoryCache(),

  typeDefs,
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
    console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
  },
})

export function get_jwt () {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(AUTH_TOKEN)
  }
}

function set_jwt (jwt) {
  if (typeof localStorage !== 'undefined' && jwt) {
    localStorage.setItem(AUTH_TOKEN, jwt)
  }
  write_auth_data_to_cache(
    apolloProvider.defaultClient.cache,
    get_auth_data_from_jwt(jwt)
  )
}

function remove_jwt () {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN)
  }
  write_auth_data_to_cache(apolloProvider.defaultClient.cache, NOT_LOGGED_IN_AUTH_DATA)
}

async function refresh_jwt (old_jwt) {
  try {
    const res = await apolloProvider.defaultClient.mutate({
      mutation: JWT_REFRESH,
      variables: { jwt: old_jwt }
    })
    console.log(res)
    // Replace old jwt with new jwt
    if (res.data.refresh_token.statuscode == 200) {
      console.log('jwt successfully refreshed')
      console.log(res.data.refresh_token.result.jwt)
      set_jwt(res.data.refresh_token.result.jwt)
    } else {
      console.log('jwt refresh error')
    }
  } catch (err) {
    console.log(err)
  }
}

async function jwt_refresh_if_expires_soon () {
  console.log('Checking jwt expiry...')
  
  const jwt = get_jwt()

  // no jwt in localstorage
  if (!jwt) {
    console.log('No jwt in localstorage')
    return
  }

  const { exp } = jwt_decode(jwt)
  const jwt_exp = (new Date((exp*1000))).getTime()
  const now = (new Date()).getTime()
  const until_exp = jwt_exp - now
  
  // jwt has expired
  if (until_exp <= 0) {
    console.log('jwt has expired, removing from localstorage...')
    remove_jwt()
    
  // jwt expires in < 2 hours
  // 2 hours = 7,200,000 ms
  } else if (until_exp < 7200000) {
    console.log('jwt will expire in < 2 hours, refreshing...')
    refresh_jwt(jwt)

  // jwt expires in > 2 hours, no need to refresh
  } else {
    console.log('jwt does not need to be refreshed')
  }
}

// Manually call this when user log in
export async function on_login (apolloClient, jwt, stay_logged_in) {
  try {
    await apolloClient.resetStore()
  } catch (e) {
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
  
  set_jwt(jwt)
  init_jwt_refresh_timer()

  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
}
  
  // Manually call this when user log out
export async function on_logout (apolloClient) {
  try {
    await apolloClient.resetStore()
  } catch (e) {
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
  
  remove_jwt()
  // Cancel checking of jwt expiry at intervals
  if (JWT_REFRESH_TIMER) {
    clearInterval(JWT_REFRESH_TIMER)
  }

  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
}

function get_auth_data_from_jwt (jwt) {
  const {
    index,
    account_type,
    name
  } = jwt_decode(jwt)
  
  return {
    logged_in: true,
    is_admin: account_type === 101,
    index,
    name
  }
}

function write_auth_data_to_cache (cache, data) {
  cache.writeData({
    data: {
      auth: {
        __typename: 'Auth',
        ...data
      }
    }
  })
}

// Set system to check the expiry of jwt at 1 hour intervals
function init_jwt_refresh_timer () {
  JWT_REFRESH_TIMER = setInterval(
    function () { jwt_refresh_if_expires_soon() },
    3600000 // 3,600,000 ms = 1 hour
  )
}

function init_auth () {
  const jwt = get_jwt()
  if (jwt) {
    set_jwt(jwt)
    jwt_refresh_if_expires_soon()
    init_jwt_refresh_timer()
  } else {
    remove_jwt()
  }
}

init_auth()