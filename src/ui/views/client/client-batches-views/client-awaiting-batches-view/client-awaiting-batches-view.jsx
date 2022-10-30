import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
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
      nameSearchValue,
      selectedBatches,
      volumeWeightCoefficient,
      curBatch,
      showBatchInfoModal,
      showConfirmModal,
      onTriggerOpenModal,

      getCurrentData,
      sortModel,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,

      drawerOpen,
      curPage,
      rowsPerPage,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      setCurrentOpenedBatch,
      onClickCancelSendToBatchBtn,

      onChangeNameSearchValue,
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
                  inputClasses={className.searchInput}
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by ASIN, Title'])}
                  onChange={onChangeNameSearchValue}
                />

                <div />
              </div>
              <div className={className.datagridWrapper}>
                <DataGrid
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
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  getRowHeight={() => 'auto'}
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
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <BatchInfoModal
          volumeWeightCoefficient={volumeWeightCoefficient}
          openModal={showBatchInfoModal}
          setOpenModal={() => onTriggerOpenModal('showBatchInfoModal')}
          batch={curBatch}
        />

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
      </React.Fragment>
    )
  }
}

export const ClientAwaitingBatchesView = withStyles(ClientAwaitingBatchesViewRaw, styles)
