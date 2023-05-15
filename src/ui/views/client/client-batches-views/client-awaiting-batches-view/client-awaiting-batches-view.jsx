import {cx} from '@emotion/css'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

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

import {ClientAwaitingBatchesViewModel} from './client-awaiting-batches-view.model'
import {styles} from './client-awaiting-batches-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_BATCHES
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BOXES_AWAITING_BATCH

@observer
class ClientAwaitingBatchesViewRaw extends Component {
  viewModel = new ClientAwaitingBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      storekeepersData,
      currentStorekeeper,

      userInfo,
      warningInfoModalSettings,
      nameSearchValue,
      selectedBatches,
      volumeWeightCoefficient,
      showWarningInfoModal,
      curBatch,
      showBatchInfoModal,
      showConfirmModal,
      showAddOrEditBatchModal,
      onTriggerOpenModal,

      progressValue,
      showProgress,
      boxesData,

      rowCount,
      currentData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,

      drawerOpen,
      curPage,
      rowsPerPage,
      showEditHSCodeModal,
      hsCodeData,
      onClickSaveHsCode,
      onClickHsCode,
      onSearchSubmit,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      setCurrentOpenedBatch,
      onClickCancelSendToBatchBtn,

      onSubmitChangeBoxFields,

      onClickStorekeeperBtn,
      onClickAddOrEditBatch,
      onSubmitAddOrEditBatch,

      changeColumnsModel,
    } = this.viewModel
    const {classes: className} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />

        <Main>
          <Appbar title={t(TranslationKey['Awaiting send'])} setDrawerOpen={onTriggerDrawer}>
            <MainContent>
              <div className={className.btnsWrapper}>
                <div className={className.btnsSubWrapper}>
                  <Button
                    disabled={!selectedBatches.length}
                    tooltipInfoContent={t(
                      TranslationKey['Returns all boxes from the selected batch to the "Boxes ready to send" section'],
                    )}
                    className={className.cancelBtn}
                    color="primary"
                    variant="contained"
                    onClick={() => onTriggerOpenModal('showConfirmModal')}
                  >
                    {t(TranslationKey['Cancel Send'])}
                  </Button>

                  <div className={className.boxesFiltersWrapper}>
                    {storekeepersData
                      .slice()
                      .sort((a, b) => a.name?.localeCompare(b.name))
                      .map(storekeeper =>
                        storekeeper.boxesCount !== 0 ? (
                          <Button
                            key={storekeeper._id}
                            disabled={currentStorekeeper?._id === storekeeper._id}
                            className={cx(className.storekeeperButton, {
                              [className.selectedBoxesBtn]: currentStorekeeper?._id === storekeeper._id,
                            })}
                            variant="text"
                            onClick={() => onClickStorekeeperBtn(storekeeper)}
                          >
                            {storekeeper.name}
                          </Button>
                        ) : null,
                      )}

                    <Button
                      disabled={!currentStorekeeper?._id}
                      className={cx(className.storekeeperButton, {
                        [className.selectedBoxesBtn]: !currentStorekeeper?._id,
                      })}
                      variant="text"
                      onClick={onClickStorekeeperBtn}
                    >
                      {t(TranslationKey['All warehouses'])}
                    </Button>
                  </div>
                </div>

                <div className={className.rightSideWrapper}>
                  <SearchInput
                    key={'client_batches_awaiting-batch_search_input'}
                    inputClasses={className.searchInput}
                    value={nameSearchValue}
                    placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
                    onSubmit={onSearchSubmit}
                  />

                  <div className={className.rightSideButtonsWrapper}>
                    <Button
                      disabled={selectedBatches.length !== 1}
                      variant="contained"
                      className={className.rightSideButton}
                      onClick={() => onClickAddOrEditBatch({isAdding: false})}
                    >
                      {t(TranslationKey['Edit batch'])}
                    </Button>
                    <Button
                      success
                      className={className.rightSideButton}
                      variant="contained"
                      onClick={() => onClickAddOrEditBatch({isAdding: true})}
                    >
                      {t(TranslationKey['Create a batch'])}
                    </Button>
                  </div>
                </div>
              </div>
              <div className={className.datagridWrapper}>
                <MemoDataGrid
                  pagination
                  useResizeContainer
                  checkboxSelection
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: className.row,
                    root: className.root,
                    footerContainer: className.footerContainer,
                    footerCell: className.footerCell,
                    toolbarContainer: className.toolbarContainer,
                  }}
                  sortingMode="server"
                  paginationMode="server"
                  rowCount={rowCount}
                  sortModel={sortModel}
                  selectionModel={selectedBatches}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  componentsProps={{
                    toolbar: {
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
                  }}
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
            batchToEdit={currentData.find(batch => batch.id === selectedBatches.slice()[0])}
            boxesData={boxesData}
            onClose={() => onTriggerOpenModal('showAddOrEditBatchModal')}
            onSubmit={onSubmitAddOrEditBatch}
          />
        </Modal>

        <BatchInfoModal
          volumeWeightCoefficient={volumeWeightCoefficient}
          openModal={showBatchInfoModal}
          setOpenModal={() => onTriggerOpenModal('showBatchInfoModal')}
          batch={curBatch}
          userInfo={userInfo}
          onSubmitChangeBoxFields={onSubmitChangeBoxFields}
          onClickHsCode={onClickHsCode}
        />

        <Modal openModal={showEditHSCodeModal} setOpenModal={() => onTriggerOpenModal('showEditHSCodeModal')}>
          <EditHSCodeModal
            hsCodeData={hsCodeData}
            onClickSaveHsCode={onClickSaveHsCode}
            onCloseModal={() => onTriggerOpenModal('showEditHSCodeModal')}
          />
        </Modal>

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to cancel the send?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={onClickCancelSendToBatchBtn}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
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

export const ClientAwaitingBatchesView = withStyles(ClientAwaitingBatchesViewRaw, styles)
