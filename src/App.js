import React, { Component } from "react"

import ApolloClient from "apollo-boost"

import { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { useQuery } from '@apollo/react-hooks';

import logo from "./logo.svg"
import "./App.css"

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

// Replace the previous LambdaDemo with the code below:
const LambdaDemo = () => {
    const { loading, error, data } = useQuery(gql`
        {
          hello
        }
      `);

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`
    return (
        <div>{data.hello}</div>
    );
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <ApolloProvider client={client}>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <LambdaDemo />
            </header>
          </ApolloProvider>
      </div>
    )
  }
}

export default App
