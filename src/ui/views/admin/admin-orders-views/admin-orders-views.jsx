import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {DataGrid, GridToolbar} from '@material-ui/data-grid'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {SetBarcodeModal} from '@components/modals/set-barcode-modal'
import {Navbar} from '@components/navbar'
import {adminOrdersViewColumns} from '@components/table-columns/admin/orders-columns'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/adminAvatar.jpg'
import {AdminOrdersAllViewModel} from './admin-orders-views.model'
import {styles} from './admin-orders-views.style'

const textConsts = getLocalizedTexts(texts, 'ru').adminOrdersView

const navbarActiveCategory = 3

@observer
class AdminOrdersViewsRaw extends Component {
  viewModel = new AdminOrdersAllViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.getOrdersByStatus(this.viewModel.activeSubCategory)
  }

  render() {
    const {
      requestStatus,
      getCurrentData,
      drawerOpen,
      modalBarcode,
      rowsPerPage,
      history,
      curPage,
      activeSubCategory,
      onTriggerBarcodeModal,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      onChangeSubCategory,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.ADMIN}
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
          onChangeSubCategory={onChangeSubCategory}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            curUserRole={UserRole.ADMIN}
            history={history}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              <Typography variant="h6">{textConsts.mainTitle}</Typography>
              <div className={classNames.tableWrapper}>
                <DataGrid
                  autoHeight
                  pagination
                  checkboxSelection
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[5, 10, 20]}
                  rows={getCurrentData()}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  filterModel={{
                    items: [{columnField: 'warehouse', operatorValue: '', value: ''}],
                  }}
                  columns={adminOrdersViewColumns()}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={newSelection => {
                    onSelectionModel(newSelection.selectionModel[0])
                  }}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                />
                <div className={classNames.buttonsWrapper}>{this.renderButtons}</div>
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={modalBarcode} setOpenModal={onTriggerBarcodeModal}>
          <SetBarcodeModal onCloseModal={onTriggerBarcodeModal} />
        </Modal>
      </React.Fragment>
    )
  }

  renderButtons = (
    <div className={this.props.classes.buttonWrapper}>
      <Button color="secondary">{textConsts.ordersBtn}</Button>
    </div>
  )
}

export const AdminOrdersViews = withStyles(styles)(AdminOrdersViewsRaw)
