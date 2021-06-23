import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {adminUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {exchangeProductsColumns} from '@components/table-columns/admin/exchange-columns'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/adminAvatar.jpg'
import {AdminExchangeViewModel} from './admin-exchange-views.model'
import {styles} from './admin-exchange-views.style'

const textConsts = getLocalizedTexts(texts, 'en').adminProductsWaitingView
const activeCategory = 1

@observer
class AdminExchangeViewsRaw extends Component {
  viewModel = new AdminExchangeViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      getCurrentData,
      activeSubCategory,
      drawerOpen,
      curPage,
      rowsPerPage,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onChangeSubCategory,
      onTriggerDrawer,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          curUserRole={UserRole.ADMIN}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
          onChangeSubCategory={onChangeSubCategory}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={adminUsername}
          >
            <MainContent>
              <Typography paragraph variant="h5" className={classNames.example}>
                {textConsts.mainTitle}
              </Typography>

              <DataGrid
                autoHeight
                pagination
                checkboxSelection
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[5, 10, 20]}
                rowHeight={100}
                rows={getCurrentData()}
                components={{
                  Toolbar: GridToolbar,
                }}
                filterModel={{
                  items: [{columnField: 'warehouse', operatorValue: '', value: ''}],
                }}
                columns={exchangeProductsColumns({activeSubCategory})}
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

export const AdminExchangeViews = withStyles(styles)(AdminExchangeViewsRaw)
