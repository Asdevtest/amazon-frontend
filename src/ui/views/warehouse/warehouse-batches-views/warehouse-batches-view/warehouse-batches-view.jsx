import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseBatchesViewModel} from './warehouse-batches-view.model'
import {styles} from './warehouse-batches-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseWarehouseView

const activeCategory = navBarActiveCategory.NAVBAR_BATCHES
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BATCHES
@observer
export class WarehouseBatchesViewRaw extends Component {
  viewModel = new WarehouseBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      volumeWeightCoefficient,
      curBatch,
      showBatchInfoModal,
      onTriggerOpenModal,
      showConfirmModal,
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

              <DataGrid
                checkboxSelection
                pagination
                useResizeContainer
                classes={{
                  row: classNames.row,
                }}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={200}
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

export const WarehouseBatchesView = withStyles(styles)(WarehouseBatchesViewRaw)
