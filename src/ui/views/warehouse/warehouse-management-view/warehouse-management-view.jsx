import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {MainContent} from '@components/layout/main-content'
import {WarehouseManagement} from '@components/warehouse/warehouse-management'

import {WarehouseManagementViewModel} from './warehouse-management-view.model'

@observer
export class WarehouseManagementView extends Component {
  viewModel = new WarehouseManagementViewModel({
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
          <WarehouseManagement />
        </MainContent>
      </React.Fragment>
    )
  }
}
