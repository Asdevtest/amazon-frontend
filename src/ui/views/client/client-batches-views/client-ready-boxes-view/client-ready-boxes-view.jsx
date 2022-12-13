import {cx} from '@emotion/css'
import {DataGrid} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientReadyBoxesViewModel} from './client-ready-boxes-view.model'
import {styles} from './client-ready-boxes-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_BATCHES
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BOXES_READY_TO_BATCH
@observer
export class ClientReadyBoxesViewRaw extends Component {
  viewModel = new ClientReadyBoxesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      clientDestinations,
      curDestination,
      userInfo,
      warningInfoModalSettings,
      showWarningInfoModal,
      nameSearchValue,
      showConfirmModal,
      showBoxViewModal,
      curBox,
      volumeWeightCoefficient,
      currentStorekeeper,
      storekeepersData,

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
      setDataGridState,
      onChangeSortingModel,
      onSelectionModel,

      onClickStorekeeperBtn,
      onTriggerOpenModal,
      setCurrentOpenedBox,

      returnBoxesToStock,
      onChangeNameSearchValue,
      onSubmitChangeBoxFields,
      onClickDestinationBtn,
    } = this.viewModel

    const {classes: classNames} = this.props

    const getRowClassName = params => params.row.isDraft && classNames.isDraftRow

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey['Boxes ready to send'])}>
            <MainContent>
              <div className={classNames.boxesFiltersWrapper}>
                {storekeepersData.slice().map(storekeeper => (
                  <Button
                    key={storekeeper._id}
                    disabled={currentStorekeeper?._id === storekeeper._id}
                    className={cx(classNames.button, {
                      [classNames.selectedBoxesBtn]: currentStorekeeper?._id === storekeeper._id,
                    })}
                    variant="text"
                    color="primary"
                    onClick={() => onClickStorekeeperBtn(storekeeper)}
                  >
                    {storekeeper.name}
                  </Button>
                ))}

                <Button
                  disabled={!currentStorekeeper?._id}
                  className={cx(classNames.button, {[classNames.selectedBoxesBtn]: !currentStorekeeper?._id})}
                  variant="text"
                  color="primary"
                  onClick={onClickStorekeeperBtn}
                >
                  {t(TranslationKey['All warehouses'])}
                </Button>
              </div>

              <div className={classNames.boxesFiltersWrapper}>
                {clientDestinations
                  .slice()
                  .sort((a, b) => a.name?.localeCompare(b.name))
                  .map(destination =>
                    destination.boxesCount !== 0 ? (
                      <Button
                        key={destination._id}
                        disabled={curDestination?._id === destination._id}
                        className={cx(classNames.button, {
                          [classNames.selectedBoxesBtn]: curDestination?._id === destination._id,
                        })}
                        variant="text"
                        onClick={() => onClickDestinationBtn(destination)}
                      >
                        {destination.name}
                      </Button>
                    ) : null,
                  )}

                <Button
                  disabled={!curDestination?._id}
                  tooltipInfoContent={t(TranslationKey['Filter for sorting boxes by prep centers'])}
                  className={cx(classNames.button, {[classNames.selectedBoxesBtn]: !curDestination?._id})}
                  variant="text"
                  onClick={onClickDestinationBtn}
                >
                  {'All destinations'}
                </Button>
              </div>

              {/* <WithSearchSelect
                selectedItemName={
                  (!curDestination?._id && t(TranslationKey['All destinations'])) ||
                  (curDestination && curDestination.name)
                }
                data={clientDestinations.filter(shop => curDestination?.id !== shop._id)}
                searchFields={['name']}
                favourites={destinationsFavourites}
                firstItems={
                  <>
                    {!!curDestination?._id && (
                      <Button className={classNames.button} variant="text" onClick={onClickDestinationBtn}>
                        {t(TranslationKey['All destinations'])}
                      </Button>
                    )}
                  </>
                }
                onClickSelect={destination => onClickDestinationBtn(destination)}
                onClickSetDestinationFavourite={setDestinationsFavouritesItem}
              /> */}

              <div className={classNames.btnsWrapper}>
                <Button
                  disabled={!selectedBoxes.length}
                  tooltipInfoContent={t(
                    TranslationKey['Removes the box for further addition to the batch, returns to My Warehouse'],
                  )}
                  color="primary"
                  className={classNames.returnButton}
                  variant="contained"
                  onClick={() => onTriggerOpenModal('showConfirmModal')}
                >
                  {t(TranslationKey['Return to stock'])}
                </Button>

                <SearchInput
                  inputClasses={classNames.searchInput}
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                  onChange={onChangeNameSearchValue}
                />

                <div />
              </div>
              <div className={classNames.datagridWrapper}>
                <DataGrid
                  pagination
                  useResizeContainer
                  checkboxSelection
                  localeText={getLocalizationByLanguageTag()}
                  classes={{
                    row: classNames.row,
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
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
                  // rowHeight={150}
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
            userInfo={userInfo}
            box={curBox}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}
            onSubmitChangeFields={onSubmitChangeBoxFields}
          />
        </Modal>

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

        <ConfirmationModal
          isWarning
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={t(TranslationKey['Are you sure you want to return the boxes to the warehouse?'])}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={returnBoxesToStock}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      </React.Fragment>
    )
  }
}

export const ClientReadyBoxesView = withStyles(ClientReadyBoxesViewRaw, styles)
