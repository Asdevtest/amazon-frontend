import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {AddOrEditBatchForm} from '@components/forms/add-or-edit-batch-form'
import {BoxViewForm} from '@components/forms/box-view-form'
import {MoveBoxToBatchForm} from '@components/forms/move-box-to-batch-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {WarehouseMyWarehouseViewModel} from './warehouse-my-warehouse-view.model'
import {styles} from './warehouse-my-warehouse-view.style'

const textConsts = getLocalizedTexts(texts, 'en').warehouseMyWarehouseView

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BOXES
@observer
export class WarehouseMyWarehouseViewRaw extends Component {
  viewModel = new WarehouseMyWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
      sourceBoxForBatch,
      boxesData,
      curBoxToMove,
      batches,
      curBox,
      volumeWeightCoefficient,
      showBoxMoveToBatchModal,
      showAddBatchModal,
      showBoxViewModal,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      drawerOpen,
      curPage,
      rowsPerPage,
      selectedBoxes,
      onTriggerDrawer,
      onChangeCurPage,
      onChangeRowsPerPage,

      onChangeFilterModel,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onTriggerOpenModal,

      setCurrentOpenedBox,
      onSubmitMoveBoxToBatch,
      onSubmitCreateBatch,

      onSubmitAddBatch,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params => params.getValue(params.id, 'isDraft') === true && classNames.isDraftRow

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
              <DataGrid
                pagination
                useResizeContainer
                classes={{
                  row: classNames.row,
                }}
                isRowSelectable={params => params.row.isDraft === false}
                getRowClassName={getRowClassName}
                selectionModel={selectedBoxes}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={150}
                components={{
                  Toolbar: GridToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onFilterModelChange={model => onChangeFilterModel(model)}
                onStateChange={setDataGridState}
                onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showBoxViewModal} setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}>
          <BoxViewForm
            box={curBox}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}
          />
        </Modal>

        <Modal openModal={showBoxMoveToBatchModal} setOpenModal={() => onTriggerOpenModal('showBoxMoveToBatchModal')}>
          <MoveBoxToBatchForm
            box={curBoxToMove}
            batches={batches}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxMoveToBatchModal')}
            onSubmit={onSubmitMoveBoxToBatch}
            onSubmitCreateBatch={onSubmitCreateBatch}
          />
        </Modal>

        <Modal openModal={showAddBatchModal} setOpenModal={() => onTriggerOpenModal('showAddBatchModal')}>
          <AddOrEditBatchForm
            volumeWeightCoefficient={volumeWeightCoefficient}
            sourceBox={sourceBoxForBatch}
            boxesData={boxesData}
            onClose={() => onTriggerOpenModal('showAddBatchModal')}
            onSubmit={onSubmitAddBatch}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export const WarehouseMyWarehouseView = withStyles(styles)(WarehouseMyWarehouseViewRaw)
