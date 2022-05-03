import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Box} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {AddOrEditShopForm} from '@components/forms/add-or-edit-shop-form'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ShopsViewModel} from './shops-view.model'
import {styles} from './shops-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientShopsView

@observer
class ShopsViewRaw extends Component {
  viewModel = new ShopsViewModel({
    history: this.props.history,
    onChangeTabIndex: this.props.onChangeTabIndex,
    tabsValues: this.props.tabsValues,
    onChangeCurShop: this.props.onChangeCurShop,
  })

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
    } = this.viewModel

    const {classes: className} = this.props

    return (
      <React.Fragment>
        <div>
          <Box className={this.props.classes.buttonBox}>
            <Button color="primary" onClick={() => onClickAddBtn()}>
              {textConsts.addShopBtn}
            </Button>
          </Box>

          <div className={className.dataGridWrapper}>
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
        </div>
      </React.Fragment>
    )
  }
}

export const ShopsView = withStyles(styles)(ShopsViewRaw)
