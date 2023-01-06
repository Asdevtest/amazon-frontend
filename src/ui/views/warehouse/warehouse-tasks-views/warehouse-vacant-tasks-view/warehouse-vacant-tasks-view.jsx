import {Alert, Button} from '@mui/material'

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
import {TwoVerticalChoicesModal} from '@components/modals/two-vertical-choices-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {WarehouseVacantViewModel} from './warehouse-vacant-tasks-view.model'
import {styles} from './warehouse-vacant-tasks-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TASKS
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_VAC_TASKS

@observer
export class WarehouseVacantTasksViewRaw extends Component {
  viewModel = new WarehouseVacantViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectedTasks,
      showAcceptMessage,
      acceptMessage,
      nameSearchValue,
      volumeWeightCoefficient,
      curOpenedTask,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      showTwoVerticalChoicesModal,
      showTaskInfoModal,

      drawerOpen,
      curPage,
      rowsPerPage,

      goToMyTasks,
      onClickPickupManyTasksBtn,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      setCurrentOpenedTask,

      onChangeNameSearchValue,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['New tasks'])} setDrawerOpen={onChangeTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.headerWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={!selectedTasks.length}
                  className={classNames.pickupOrdersButton}
                  onClick={() => {
                    onClickPickupManyTasksBtn()
                  }}
                >
                  {t(TranslationKey['Take on the work of the selected'])}
                </Button>

                <SearchInput
                  value={nameSearchValue}
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by ASIN, Order ID, Item, Track number'])}
                  onChange={onChangeNameSearchValue}
                />
                <div />
              </div>

              <MemoDataGrid
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
                  filterForm: classNames.filterForm,
                }}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                getRowHeight={() => 'auto'}
                components={{
                  Toolbar: DataGridCustomToolbar,
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
                onRowDoubleClick={params => setCurrentOpenedTask(params.row.originalData)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showTaskInfoModal} setOpenModal={() => onTriggerOpenModal('showTaskInfoModal')}>
          <EditTaskModal
            readOnly
            volumeWeightCoefficient={volumeWeightCoefficient}
            task={curOpenedTask}
            onClickOpenCloseModal={() => onTriggerOpenModal('showTaskInfoModal')}
          />
        </Modal>

        <TwoVerticalChoicesModal
          openModal={showTwoVerticalChoicesModal}
          setOpenModal={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
          title={t(TranslationKey['Task picked up'])}
          topBtnText={t(TranslationKey['Go to task'])}
          bottomBtnText={t(TranslationKey['Continue to work with new tasks'])}
          onClickTopBtn={() => goToMyTasks()}
          onClickBottomBtn={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
        />

        {acceptMessage && showAcceptMessage ? (
          <div className={classNames.acceptMessageWrapper}>
            <Alert elevation={5} severity="success">
              {acceptMessage}
            </Alert>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

export const WarehouseVacantTasksView = withStyles(WarehouseVacantTasksViewRaw, styles)
