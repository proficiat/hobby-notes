import React, { useState, useEffect } from 'react'

import { ApolloProvider } from '@apollo/client'
import { cache, GET_IS_USER_LOGGED_IN } from 'cache'

import Spinner from 'components/Icons/Spinner'

import { persistCache } from 'apollo-cache-persist'

import SideBar from './components/SideBar'
import Header from './components/Header'
import Sounds from './pages/Sounds'

import { createApolloClient } from './client'

import { MainWrapper, PageContent } from './styles'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('login-token'))
  const [client, setClient] = useState(null)
  const [isLoadedCache, setIsLoadedCache] = useState(false)

  useEffect(() => {
    setClient(createApolloClient(token))
  }, [token])

  useEffect(() => {
    const loadCache = async () => {
      try {
        await persistCache({
          cache,
          storage: window.localStorage,
        })
      } catch (error) {
        console.error('Error restoring Apollo cache', error)
      }
      setIsLoadedCache(true)
    }
    cache.writeQuery({
      query: GET_IS_USER_LOGGED_IN,
      data: {
        isViewerInPower: false,
      },
    })
    loadCache()
  }, [])

  if (!isLoadedCache) {
    return <Spinner />
  }
  return (
    <ApolloProvider client={client}>
      <MainWrapper>
        <Header />
        <SideBar token={token} onSetToken={setToken} />
        <PageContent>
          <Sounds />
        </PageContent>
      </MainWrapper>
    </ApolloProvider>
  )
}

export default App
