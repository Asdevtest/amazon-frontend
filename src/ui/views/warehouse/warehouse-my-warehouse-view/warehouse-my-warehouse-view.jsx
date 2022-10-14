import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Field} from '@components/field/field'
import {AddOrEditBatchForm} from '@components/forms/add-or-edit-batch-form'
import {AddOrEditHsCodeInBox} from '@components/forms/add-or-edit-hs-code-in-box-form'
import {BoxViewForm} from '@components/forms/box-view-form'
import {MoveBoxToBatchForm} from '@components/forms/move-box-to-batch-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {EditBoxTasksModal} from '@components/screens/warehouse/edit-task-modal/edit-box-tasks-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {WarehouseMyWarehouseViewModel} from './warehouse-my-warehouse-view.model'
import {styles} from './warehouse-my-warehouse-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
@observer
export class WarehouseMyWarehouseViewRaw extends Component {
  viewModel = new WarehouseMyWarehouseViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      nameSearchValue,
      showProgress,
      progressValue,
      sourceBoxForBatch,
      boxesData,
      curBoxToMove,
      batches,
      curBox,
      volumeWeightCoefficient,
      showBoxMoveToBatchModal,
      showAddOrEditHsCodeInBox,
      showAddBatchModal,
      showBoxViewModal,
      showEditBoxModal,
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
      onTriggerShowEditBoxModal,
      setCurrentOpenedBox,
      onSubmitMoveBoxToBatch,
      onSubmitCreateBatch,
      onChangeNameSearchValue,
      onSubmitAddBatch,
      onSubmitAddOrEditHsCode,
      onSubmitEditBox,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params => params.getValue(params.id, 'isDraft') === true && classNames.isDraftRow

    return (
      <React.Fragment>
        <Navbar activeCategory={activeCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['My warehouse'])}>
            <MainContent>
              <Field
                containerClasses={classNames.searchContainer}
                inputClasses={classNames.searchInput}
                value={nameSearchValue}
                placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                endAdornment={
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                }
                onChange={onChangeNameSearchValue}
              />
              <div className={classNames.datagridWrapper}>
                <DataGrid
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
                  isRowSelectable={params => params.row.isDraft === false}
                  getRowClassName={getRowClassName}
                  selectionModel={selectedBoxes}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  // rowHeight={225}
                  getRowHeight={() => 'auto'}
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
              </div>
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
            progressValue={progressValue}
            showProgress={showProgress}
            volumeWeightCoefficient={volumeWeightCoefficient}
            sourceBox={sourceBoxForBatch}
            boxesData={boxesData}
            onClose={() => onTriggerOpenModal('showAddBatchModal')}
            onSubmit={onSubmitAddBatch}
          />
        </Modal>

        <Modal openModal={showAddOrEditHsCodeInBox} setOpenModal={() => onTriggerOpenModal('showAddOrEditHsCodeInBox')}>
          <AddOrEditHsCodeInBox
            box={curBox}
            setOpenModal={() => onTriggerOpenModal('showAddOrEditHsCodeInBox')}
            onSubmit={onSubmitAddOrEditHsCode}
          />
        </Modal>
        <Modal openModal={showEditBoxModal} setOpenModal={onTriggerShowEditBoxModal}>
          <EditBoxTasksModal
            // primarySizeSuitableCheckbox
            isInStorekeeperWarehouse
            volumeWeightCoefficient={volumeWeightCoefficient}
            setEditModal={onTriggerShowEditBoxModal}
            box={curBox}
            storekeeperWarehouseSubmit={onSubmitEditBox}
            // newBoxes={newBoxes}
            // setNewBoxes={setNewBoxes}
            // operationType={taskType}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export const WarehouseMyWarehouseView = withStyles(WarehouseMyWarehouseViewRaw, styles)
