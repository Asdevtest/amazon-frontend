import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {WarehouseManagement} from '@components/warehouse-management'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseManagementViewModel} from './warehouse-management-view.model'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseManagementView

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_MANAGEMENT

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
    const {drawerOpen, onTriggerDrawerOpen, history} = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            history={history}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <WarehouseManagement />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}
