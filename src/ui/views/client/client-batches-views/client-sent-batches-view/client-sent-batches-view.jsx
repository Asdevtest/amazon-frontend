import {cx} from '@emotion/css'
import DeleteIcon from '@mui/icons-material/Delete'
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

import {ClientSentBatchesViewModel} from './client-sent-batches-view.model'
import {styles} from './client-sent-batches-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_BATCHES
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BATCHES

@observer
class ClientSentBatchesViewRaw extends Component {
  viewModel = new ClientSentBatchesViewModel({history: this.props.history})

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
      volumeWeightCoefficient,
      curBatch,
      showBatchInfoModal,
      onTriggerOpenModal,

      getCurrentData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      showWarningInfoModal,

      rowCount,
      drawerOpen,
      curPage,
      rowsPerPage,
      showEditHSCodeModal,
      hsCodeData,
      selectedBatches,
      isArchive,
      showConfirmModal,
      confirmModalSettings,
      onClickTriggerArchOrResetProducts,
      onClickSaveHsCode,
      onClickHsCode,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      setCurrentOpenedBatch,
      onSearchSubmit,
      onSubmitChangeBoxFields,
      onTriggerArchive,

      onClickStorekeeperBtn,
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
          <Appbar title={t(TranslationKey['Sent boxes'])} setDrawerOpen={onTriggerDrawer}>
            <MainContent>
              <div className={className.btnsWrapper}>
                <Button
                  // tooltipInfoContent={t(TranslationKey['Deleted product archive'])}
                  variant="outlined"
                  className={className.openArchiveBtn}
                  onClick={onTriggerArchive}
                >
                  {isArchive ? t(TranslationKey['Back to actual batches']) : t(TranslationKey['Open archive'])}
                </Button>

                <SearchInput
                  key={'client_batches_awaiting-batch_search_input'}
                  inputClasses={className.searchInput}
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
                  onSubmit={onSearchSubmit}
                />

                <div className={className.simpleBtnsWrapper}>
                  <Button
                    // tooltipInfoContent={t(
                    //   TranslationKey['Delete the selected product (the product is moved to the archive)'],
                    // )}
                    disabled={!selectedBatches.length}
                    variant="outlined"
                    className={className.archiveAddBtn}
                    sx={{
                      '&.Mui-disabled': {
                        background: 'none',
                      },
                    }}
                    onClick={onClickTriggerArchOrResetProducts}
                  >
                    {isArchive ? (
                      t(TranslationKey['Relocate from archive'])
                    ) : (
                      <>
                        {t(TranslationKey['Move to archive'])}
                        <DeleteIcon className={className.archiveIcon} />
                      </>
                    )}
                  </Button>
                </div>
              </div>

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
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={onSelectionModel}
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
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          isWarning={confirmModalSettings.isWarning}
          title={confirmModalSettings.confirmTitle}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
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

export const ClientSentBatchesView = withStyles(ClientSentBatchesViewRaw, styles)
