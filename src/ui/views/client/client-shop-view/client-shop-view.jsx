import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Box} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {AddOrEditShopForm} from '@components/forms/add-or-edit-shop-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/clientAvatar.jpg'
import {ClientShopsViewModel} from './client-shop-view.model'
import {styles} from './client-shop-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientShopsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_SHOPS

@observer
class ClientShopsViewRaw extends Component {
  viewModel = new ClientShopsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      showConfirmModal,
      showWarningModal,
      showAddOrEditShopModal,
      warningInfoModalSettings,
      selectedShop,

      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      rowsPerPage,
      curPage,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      onClickAddBtn,
      onTriggerOpenModal,
      onSubmitShopForm,
      onSubmitRemoveShop,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            setDrawerOpen={onChangeDrawerOpen}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <Box className={this.props.classes.buttonBox}>
                <Button color="primary" onClick={() => onClickAddBtn()}>
                  {textConsts.addShopBtn}
                </Button>
              </Box>

              <DataGrid
                pagination
                useResizeContainer
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={100}
                components={{
                  Toolbar: GridToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onFilterModelChange={model => onChangeFilterModel(model)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showAddOrEditShopModal} setOpenModal={() => onTriggerOpenModal('showAddOrEditShopModal')}>
          <AddOrEditShopForm
            shopToEdit={selectedShop}
            onCloseModal={() => onTriggerOpenModal('showAddOrEditShopModal')}
            onSubmit={onSubmitShopForm}
          />
        </Modal>

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningInfoModalSettings.title}
          btnText={textConsts.okBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={textConsts.confirmRemoveMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={onSubmitRemoveShop}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const ClientShopsView = withStyles(styles)(ClientShopsViewRaw)
