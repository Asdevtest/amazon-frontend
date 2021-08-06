import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {adminUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {exchangeInventoryColumns} from '@components/table-columns/admin/inventory-columns'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/adminAvatar.jpg'
import {AdminInventoryViewModel} from './admin-inventory-view.model'
import {styles} from './admin-inventory-view.style'

const textConsts = getLocalizedTexts(texts, 'en').adminInventoryView

@observer
export class AdminInventoryViewRaw extends Component {
  viewModel = new AdminInventoryViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getProducts()
  }

  render() {
    const {
      getCurrentData,
      requestStatus,
      drawerOpen,
      curPage,
      history,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onTriggerDrawer,
    } = this.viewModel

    const activeCategory = 2
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            history={history}
            curUserRole={UserRole.ADMIN}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={adminUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5" className={classNames.example}>
                {textConsts.mainTitle}
              </Typography>
              <DataGrid
                pagination
                useResizeContainer
                checkboxSelection
                page={curPage}
                pageSize={rowsPerPage}
                rowHeight={100}
                rowsPerPageOptions={[5, 10, 15, 20]}
                loading={requestStatus === loadingStatuses.isLoading}
                components={{
                  Toolbar: GridToolbar,
                }}
                filterModel={{
                  items: [{columnField: 'fba', operatorValue: '', value: ''}],
                }}
                columns={exchangeInventoryColumns()}
                rows={getCurrentData()}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection.selectionModel[0])
                }}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
              />
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const AdminInventoryView = withStyles(styles)(AdminInventoryViewRaw)
