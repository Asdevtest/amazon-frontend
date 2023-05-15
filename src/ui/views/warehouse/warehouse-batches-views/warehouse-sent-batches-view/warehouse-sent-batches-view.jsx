import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
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

import {WarehouseSentBatchesViewModel} from './warehouse-sent-batches-view.model'
import {styles} from './warehouse-sent-batches-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_BATCHES
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BATCHES
@observer
export class WarehouseSentBatchesViewRaw extends Component {
  viewModel = new WarehouseSentBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      userInfo,
      warningInfoModalSettings,
      nameSearchValue,
      volumeWeightCoefficient,
      curBatch,
      showBatchInfoModal,
      onTriggerOpenModal,
      showConfirmModal,
      sortModel,
      rowCount,
      currentData,
      filterModel,
      requestStatus,
      densityModel,
      columnsModel,
      isWarning,
      drawerOpen,
      curPage,
      rowsPerPage,
      showEditHSCodeModal,
      hsCodeData,
      onClickSaveHsCode,
      onClickHsCode,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,
      showWarningInfoModal,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,

      onClickConfirmSendToBatchBtn,
      onChangeFilterModel,

      setCurrentOpenedBatch,
      onSearchSubmit,
      onSubmitChangeBoxFields,
      changeColumnsModel,
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
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Sent)}>
            <MainContent>
              {/* <div className={classNames.btnsWrapper}>
                <Button
                  disableElevation
                  disabled
                  color="primary"
                  variant="contained"
                  onClick={() => onTriggerOpenModal('showConfirmModal')}
                >
                  {'Сancel sending'}
                </Button>
              </div> */}

              <div className={classNames.headerWrapper}>
                <SearchInput
                  inputClasses={classNames.searchInput}
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by ASIN, Title, Batch ID, Order ID'])}
                  onSubmit={onSearchSubmit}
                />
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
          message={t(TranslationKey.Send) + '*'}
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

export const WarehouseSentBatchesView = withStyles(WarehouseSentBatchesViewRaw, styles)
