import { gql, makeVar } from '@apollo/client'
import { ApolloCache, InMemoryCache } from '@apollo/client/cache';

export const headerSearchValueVar = makeVar('');

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        headerSearchValue: {
          read() {
            return headerSearchValueVar();
          }
        }
      }
    }
  }
});

export const IS_USER_LOGGED_IN =  gql`
      query IsUserLoggedIn {
        isViewerInPower @client
      }
    `
