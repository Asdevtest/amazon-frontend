import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ClientAwaitingBatchesViewModel} from './client-awaiting-batches-view.model'
import {styles} from './client-awaiting-batches-view.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientAwaitingBatchesView

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
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawer}>
            <MainContent>
              <div className={className.btnsWrapper}>
                <Button
                  disabled={!selectedBatches.length}
                  color="primary"
                  variant="contained"
                  onClick={() => onTriggerOpenModal('showConfirmModal')}
                >
                  {textConsts.cancelSendBatchBtn}
                </Button>
              </div>

              <DataGrid
                pagination
                useResizeContainer
                checkboxSelection
                classes={{
                  row: className.row,
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
          title={textConsts.confirmTitle}
          message={textConsts.confirmMessage}
          successBtnText={textConsts.yesBtn}
          cancelBtnText={textConsts.noBtn}
          onClickSuccessBtn={onClickCancelSendToBatchBtn}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const ClientAwaitingBatchesView = withStyles(styles)(ClientAwaitingBatchesViewRaw)
