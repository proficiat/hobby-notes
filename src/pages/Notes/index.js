import React, { PureComponent } from 'react'

import get from 'lodash/get'

import { gql } from '@apollo/client'

import { Query } from '@apollo/client/react/components';

class Notes extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const query = gql`
      {
        hello
      }
    `
    return (
      <Query query={query}>
        {({ data, error }) => <div>{get(data, 'hello')}</div>}
      </Query>
    )
  }
}

export default Notes
