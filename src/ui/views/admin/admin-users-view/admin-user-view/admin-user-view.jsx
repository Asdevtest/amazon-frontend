import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {MainContent} from '@components/layout/main-content'
import {UserInfoAndEdit} from '@components/user/user-info-and-edit'

import {AdminUserViewModel} from './admin-user-view.model'

@observer
export class AdminUserView extends Component {
  viewModel = new AdminUserViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {user} = this.viewModel

    return (
      <React.Fragment>
        <MainContent>
          <UserInfoAndEdit user={user} />
        </MainContent>
      </React.Fragment>
    )
  }
}
