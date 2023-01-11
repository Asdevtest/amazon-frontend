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
      userInfo,
      warningInfoModalSettings,
      nameSearchValue,
      selectedBatches,
      volumeWeightCoefficient,
      showWarningInfoModal,
      curBatch,
      showBatchInfoModal,
      showConfirmModal,
      onTriggerOpenModal,

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

                <SearchInput
                  key={'client_batches_awaiting-batch_search_input'}
                  inputClasses={className.searchInput}
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by ASIN, Title'])}
                  onSubmit={onSearchSubmit}
                />

                <div />
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
