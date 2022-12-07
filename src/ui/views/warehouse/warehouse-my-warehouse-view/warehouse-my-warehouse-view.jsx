/* eslint-disable no-undef */
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {BoxStatus} from '@constants/box-status'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {AddOrEditBatchForm} from '@components/forms/add-or-edit-batch-form'
import {AddOrEditHsCodeInBox} from '@components/forms/add-or-edit-hs-code-in-box-form'
import {BoxViewForm} from '@components/forms/box-view-form'
import {EditBoxStorekeeperForm} from '@components/forms/edit-box-storekeeper-form'
import {EditMultipleBoxesForm} from '@components/forms/edit-multiple-boxes-form'
import {MoveBoxToBatchForm} from '@components/forms/move-box-to-batch-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Navbar} from '@components/navbar'
import {EditBoxTasksModal} from '@components/screens/warehouse/edit-task-modal/edit-box-tasks-modal'
import {SearchInput} from '@components/search-input'

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
      destinationsFavourites,
      userInfo,
      rowCount,
      destinations,
      storekeepersData,
      modalEditSuccessMessage,

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
      showFullEditBoxModal,
      showSuccessInfoModal,
      showEditMultipleBoxesModal,
      showAddBatchModal,
      showBoxViewModal,
      showEditBoxModal,
      requestStatus,
      currentData,
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
      onSubmitAddBatch,
      onSubmitAddOrEditHsCode,
      onSubmitEditBox,
      onSearchSubmit,

      onEditBox,
      onClickSubmitEditBox,
      onSubmitChangeBoxFields,
      onClickSubmitEditMultipleBoxes,
      setDestinationsFavouritesItem,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params => params.row.isDraft && classNames.isDraftRow

    return (
      <React.Fragment>
        <Navbar activeCategory={activeCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawer} />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['My warehouse'])}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <Button disabled={!selectedBoxes.length} className={classNames.editBtn} onClick={onEditBox}>
                  {t(TranslationKey.Edit)}
                </Button>

                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item'])}
                  onSubmit={onSearchSubmit}
                />

                <div />
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
                  disableVirtualization
                  checkboxSelection
                  pagination
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                    filterForm: classNames.filterForm,
                  }}
                  isRowSelectable={params =>
                    params.row.isDraft === false &&
                    params.row.originalData.status !== BoxStatus.REQUESTED_SEND_TO_BATCH &&
                    params.row.originalData.status !== BoxStatus.IN_BATCH
                  }
                  getRowClassName={getRowClassName}
                  sortingMode="server"
                  paginationMode="server"
                  rowCount={rowCount}
                  selectionModel={selectedBoxes}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={currentData}
                  // rowHeight={225}
                  getRowHeight={() => 'auto'}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSelectionModelChange={onSelectionModel}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onFilterModelChange={onChangeFilterModel}
                  onStateChange={setDataGridState}
                  onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showBoxViewModal} setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}>
          <BoxViewForm
            userInfo={userInfo}
            box={curBox}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}
            onSubmitChangeFields={onSubmitChangeBoxFields}
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

        <Modal
          missClickModalOn
          openModal={showFullEditBoxModal}
          setOpenModal={() => onTriggerOpenModal('showFullEditBoxModal')}
        >
          <EditBoxStorekeeperForm
            destinations={destinations}
            storekeepers={storekeepersData}
            volumeWeightCoefficient={volumeWeightCoefficient}
            requestStatus={requestStatus}
            formItem={curBox}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onSubmit={onClickSubmitEditBox}
            onTriggerOpenModal={() => onTriggerOpenModal('showFullEditBoxModal')}
          />
        </Modal>

        <Modal
          missClickModalOn
          openModal={showEditMultipleBoxesModal}
          setOpenModal={() => onTriggerOpenModal('showEditMultipleBoxesModal')}
        >
          <EditMultipleBoxesForm
            destinations={destinations}
            storekeepers={storekeepersData}
            selectedBoxes={currentData.filter(el => selectedBoxes.includes(el._id)).map(box => box.originalData)}
            destinationsFavourites={destinationsFavourites}
            setDestinationsFavouritesItem={setDestinationsFavouritesItem}
            onSubmit={onClickSubmitEditMultipleBoxes}
            onCloseModal={() => onTriggerOpenModal('showEditMultipleBoxesModal')}
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

        <SuccessInfoModal
          openModal={showSuccessInfoModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessInfoModal')}
          title={modalEditSuccessMessage}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessInfoModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const WarehouseMyWarehouseView = withStyles(WarehouseMyWarehouseViewRaw, styles)
