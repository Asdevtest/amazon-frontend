import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {MainContent} from '@components/layout/main-content'
import {UserPermissions} from '@components/user/user-permissions/user-permissions'

import {AdminUserPermissionsViewModel} from './admin-user-permissions-view.model'

@observer
export class AdminUserPermissionsView extends Component {
  viewModel = new AdminUserPermissionsViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    return (
      <React.Fragment>
        <MainContent>
          <UserPermissions />
        </MainContent>
      </React.Fragment>
    )
  }
}
