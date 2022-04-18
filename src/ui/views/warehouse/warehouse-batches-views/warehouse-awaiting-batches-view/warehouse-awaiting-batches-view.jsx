import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button/success-button'
import {AddOrEditBatchForm} from '@components/forms/add-or-edit-batch-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseAwaitingBatchesViewModel} from './warehouse-awaiting-batches-view.model'
import {styles} from './warehouse-awaiting-batches-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseAwaitingBatchesView

const activeCategory = navBarActiveCategory.NAVBAR_BATCHES
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_AWAITING_BATCHES
@observer
export class WarehouseAwaitingBatchesViewRaw extends Component {
  viewModel = new WarehouseAwaitingBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      volumeWeightCoefficient,
      boxesData,
      selectedBatches,
      curBatch,
      showBatchInfoModal,
      onTriggerOpenModal,
      showConfirmModal,
      showAddOrEditBatchModal,
      getCurrentData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      isWarning,
      drawerOpen,
      curPage,
      rowsPerPage,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,

      onClickConfirmSendToBatchBtn,
      onChangeFilterModel,

      onClickAddOrEditBatch,
      onSubmitAddOrEditBatch,
      setCurrentOpenedBatch,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={textConsts.appbarTitle}>
            <MainContent>
              <div className={classNames.btnsWrapper}>
                <div className={classNames.leftBtnsWrapper}>
                  <Button
                    disabled={!selectedBatches.length}
                    color="primary"
                    variant="contained"
                    onClick={() => onTriggerOpenModal('showConfirmModal')}
                  >
                    {textConsts.confirmSendBatchBtn}
                  </Button>

                  <Button
                    disabled={selectedBatches.length !== 1}
                    color="primary"
                    variant="contained"
                    onClick={() => onClickAddOrEditBatch({isAdding: false})}
                  >
                    {textConsts.editBtn}
                  </Button>
                </div>

                <SuccessButton className={classNames.addBtn} onClick={() => onClickAddOrEditBatch({isAdding: true})}>
                  {textConsts.addBtn}
                </SuccessButton>
              </div>

              <DataGrid
                checkboxSelection
                pagination
                useResizeContainer
                classes={{
                  row: classNames.row,
                }}
                selectionModel={selectedBatches}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={230}
                components={{
                  Toolbar: GridToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection)
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onFilterModelChange={model => onChangeFilterModel(model)}
                onRowDoubleClick={e => setCurrentOpenedBatch(e.row.originalData)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showAddOrEditBatchModal} setOpenModal={() => onTriggerOpenModal('showAddOrEditBatchModal')}>
          <AddOrEditBatchForm
            volumeWeightCoefficient={volumeWeightCoefficient}
            batchToEdit={getCurrentData().find(batch => batch.id === selectedBatches[0])}
            boxesData={boxesData}
            onClose={() => onTriggerOpenModal('showAddOrEditBatchModal')}
            onSubmit={onSubmitAddOrEditBatch}
          />
        </Modal>

        <ConfirmationModal
          isWarning={isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={textConsts.confirmTitle}
          message={textConsts.confirmMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={onClickConfirmSendToBatchBtn}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        <BatchInfoModal
          volumeWeightCoefficient={volumeWeightCoefficient}
          openModal={showBatchInfoModal}
          setOpenModal={() => onTriggerOpenModal('showBatchInfoModal')}
          batch={curBatch}
        />
      </React.Fragment>
    )
  }
}

export const WarehouseAwaitingBatchesView = withStyles(styles)(WarehouseAwaitingBatchesViewRaw)
