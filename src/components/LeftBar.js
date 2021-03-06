import React, { Component } from 'react'
import { Menu, Icon, Responsive} from 'semantic-ui-react'
import Search from './Search'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'react-router-dom'

import '../index.css'

import 'tachyons'

class LeftBar extends Component {

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount() { }

  render() {

    return (
      <Responsive as={Menu} minWidth={700} className='flex inverted vertical left fixed' style={{ maxWidth: '25%' }}>
        <Menu.Item style={{display: 'flex'}} className='logo'>
          <Icon  name='spy' /> Bookface
        </Menu.Item>
        <Query query={USER_QUERY}>
          {({ loading, data }) => {
            if (loading) {
              return null;
            }
            let newList = []
            if (!loading) {
              newList = data.userQuery.map(user => user.name)
            }
            return (
              <Search
                items={newList}
                onChange={(selectedItem) => {
                  const target = data.userQuery.filter(user => user.name === selectedItem)
                  target && this.props.history.push(`/profile/${target[0].id}`)
                }}
                history={this.props.history}
                friendId={!loading && data.userQuery.id}
              />
            )
          }}
        </Query>
        <Menu.Item>
          
        </Menu.Item>
      </Responsive>
    )
  }
}

const USER_QUERY = gql`
query {
  userQuery {
    id
    name
  }
}`

export default (withRouter)(LeftBar)