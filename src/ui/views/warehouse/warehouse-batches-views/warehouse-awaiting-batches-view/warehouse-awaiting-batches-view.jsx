import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {AddOrEditBatchForm} from '@components/forms/add-or-edit-batch-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {Modal} from '@components/modal'
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {EditHSCodeModal} from '@components/modals/edit-hs-code-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {WarehouseAwaitingBatchesViewModel} from './warehouse-awaiting-batches-view.model'
import {styles} from './warehouse-awaiting-batches-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_BATCHES
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_AWAITING_BATCHES
@observer
export class WarehouseAwaitingBatchesViewRaw extends Component {
  viewModel = new WarehouseAwaitingBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      userInfo,
      warningInfoModalSettings,
      nameSearchValue,
      isNeedConfirmPriceBoxSelected,
      isInvalidTariffBoxSelected,
      showProgress,
      progressValue,
      volumeWeightCoefficient,
      boxesData,
      selectedBatches,
      curBatch,
      currentData,
      rowCount,
      showBatchInfoModal,
      onTriggerOpenModal,
      showConfirmModal,
      showAddOrEditBatchModal,
      showWarningInfoModal,
      showEditHSCodeModal,
      getCurrentData,
      sortModel,
      hsCodeData,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      isWarning,
      drawerOpen,
      curPage,
      rowsPerPage,
      onClickHsCode,
      onClickSaveHsCode,
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
      onSearchSubmit,
      onSubmitChangeBoxFields,
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
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['Awaiting send'])}>
            <MainContent>
              <div className={classNames.btnsWrapper}>
                <div className={classNames.leftBtnsWrapper}>
                  <Button
                    disabled={!selectedBatches.length || isInvalidTariffBoxSelected || isNeedConfirmPriceBoxSelected}
                    tooltipAttentionContent={
                      (isInvalidTariffBoxSelected &&
                        t(TranslationKey['Selected a batch contains a box with an invalid tariff'])) ||
                      (isNeedConfirmPriceBoxSelected &&
                        t(TranslationKey['Selected lot contains a box for which you need to confirm the price change']))
                    }
                    tooltipInfoContent={t(
                      TranslationKey['After confirmation it will be impossible to return the batch'],
                    )}
                    color="primary"
                    variant="contained"
                    className={classNames.batchBtn}
                    onClick={() => onTriggerOpenModal('showConfirmModal')}
                  >
                    {t(TranslationKey['Confirm send to batch'])}
                  </Button>

                  <Button
                    disabled={selectedBatches.length !== 1}
                    className={classNames.editBtn}
                    tooltipInfoContent={t(TranslationKey['Add/remove a box or files to a batch'])}
                    color="primary"
                    variant="contained"
                    onClick={() => onClickAddOrEditBatch({isAdding: false})}
                  >
                    {t(TranslationKey['Edit batch'])}
                  </Button>
                </div>
                <SearchInput
                  inputClasses={classNames.searchInput}
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by ASIN, Title'])}
                  onSubmit={onSearchSubmit}
                />

                <Button
                  success
                  tooltipInfoContent={t(TranslationKey['Open a form to create a new batch'])}
                  className={classNames.createBtn}
                  onClick={() => onClickAddOrEditBatch({isAdding: true})}
                >
                  {t(TranslationKey['Create a batch'])}
                </Button>
              </div>
              <div className={classNames.datagridWrapper}>
                <MemoDataGrid
                  checkboxSelection
                  pagination
                  useResizeContainer
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                    filterForm: classNames.filterForm,
                  }}
                  selectionModel={selectedBatches}
                  sortingMode="server"
                  paginationMode="server"
                  rowCount={rowCount}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
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
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showAddOrEditBatchModal} setOpenModal={() => onTriggerOpenModal('showAddOrEditBatchModal')}>
          <AddOrEditBatchForm
            progressValue={progressValue}
            showProgress={showProgress}
            volumeWeightCoefficient={volumeWeightCoefficient}
            batchToEdit={getCurrentData().find(batch => batch.id === selectedBatches.slice()[0])}
            boxesData={boxesData}
            onClose={() => onTriggerOpenModal('showAddOrEditBatchModal')}
            onSubmit={onSubmitAddOrEditBatch}
          />
        </Modal>

        <Modal openModal={showEditHSCodeModal} setOpenModal={() => onTriggerOpenModal('showEditHSCodeModal')}>
          <EditHSCodeModal
            hsCodeData={hsCodeData}
            onClickSaveHsCode={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showEditHSCodeModal')}
          />
        </Modal>

        <ConfirmationModal
          isWarning={isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey.Send) + '?'}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={onClickConfirmSendToBatchBtn}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />

        <BatchInfoModal
          volumeWeightCoefficient={volumeWeightCoefficient}
          openModal={showBatchInfoModal}
          setOpenModal={() => onTriggerOpenModal('showBatchInfoModal')}
          batch={curBatch}
          userInfo={userInfo}
          onSubmitChangeBoxFields={onSubmitChangeBoxFields}
          onClickHsCode={onClickHsCode}
        />

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningInfoModal}
          setOpenModal={() => onTriggerOpenModal('showWarningInfoModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningInfoModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const WarehouseAwaitingBatchesView = withStyles(WarehouseAwaitingBatchesViewRaw, styles)
