import {Box} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {AddOrEditShopForm} from '@components/forms/add-or-edit-shop-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ShopsViewModel} from './shops-view.model'
import {styles} from './shops-view.style'

@observer
class ShopsViewRaw extends Component {
  viewModel = new ShopsViewModel({
    history: this.props.history,

    onChangeTabIndex: this.props.onChangeTabIndex,
    tabsValues: this.props.tabsValues,
    onChangeCurShop: this.props.onChangeCurShop,
    openModal: this.props.openModal,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectionModel,
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

      rowsPerPage,
      curPage,
      onChangeCurPage,
      onChangeRowsPerPage,

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      onClickAddBtn,
      onTriggerOpenModal,
      onSubmitShopForm,
      onSubmitRemoveShop,
      onSelectionModel,
      updateShops,
    } = this.viewModel

    const {classes: className} = this.props

    return (
      <React.Fragment>
        <div>
          <Box className={className.buttonBox}>
            <Button tooltipInfoContent={t(TranslationKey['Open the window to add a store'])} onClick={onClickAddBtn}>
              {t(TranslationKey['Add shop'])}
            </Button>

            <Button disabled={!selectionModel.length} onClick={updateShops}>
              {t(TranslationKey.Update)}
            </Button>
          </Box>

          <div className={className.datagridWrapper}>
            <DataGrid
              pagination
              useResizeContainer
              checkboxSelection
              classes={{
                root: className.root,
                footerContainer: className.footerContainer,
                footerCell: className.footerCell,
                toolbarContainer: className.toolbarContainer,
              }}
              localeText={getLocalizationByLanguageTag()}
              sortModel={sortModel}
              filterModel={filterModel}
              page={curPage}
              pageSize={rowsPerPage}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={getCurrentData()}
              // rowHeight={100}
              getRowHeight={() => 'auto'}
              components={{
                Toolbar: DataGridCustomToolbar,
              }}
              density={densityModel}
              columns={columnsModel}
              loading={requestStatus === loadingStatuses.isLoading}
              selectionModel={selectionModel}
              onSelectionModelChange={onSelectionModel}
              onSortModelChange={onChangeSortingModel}
              onPageSizeChange={onChangeRowsPerPage}
              onPageChange={onChangeCurPage}
              onStateChange={setDataGridState}
              onFilterModelChange={onChangeFilterModel}
            />
          </div>

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
            btnText={t(TranslationKey.Ok)}
            onClickBtn={() => {
              onTriggerOpenModal('showWarningModal')
            }}
          />

          <ConfirmationModal
            isWarning
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={t(TranslationKey.Attention)}
            message={t(TranslationKey['Are you sure you want to delete the store?'])}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.No)}
            onClickSuccessBtn={onSubmitRemoveShop}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
          />
        </div>
      </React.Fragment>
    )
  }
}

export const ShopsView = withStyles(ShopsViewRaw, styles)
