import {DataGrid} from '@mui/x-data-grid'

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
import {Modal} from '@components/modal'
// import {TaskInfoModal} from '@components/modals/task-info-modal'
import {Navbar} from '@components/navbar'
import {EditTaskModal} from '@components/screens/warehouse/edit-task-modal'
import {SearchInput} from '@components/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {WarehouseCanceledTasksViewModel} from './warehouse-canceled-tasks-view.model'
import {styles} from './warehouse-canceled-tasks-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_TASKS
const activeSubCategory = navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_CANCELED_TASKS

@observer
export class WarehouseCanceledTasksViewRaw extends Component {
  viewModel = new WarehouseCanceledTasksViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      nameSearchValue,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      volumeWeightCoefficient,

      curOpenedTask,
      drawerOpen,
      curPage,
      rowsPerPage,
      history,
      showTaskInfoModal,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
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
          <Appbar
            title={t(TranslationKey['Canceled tasks'])}
            history={history}
            setDrawerOpen={onChangeTriggerDrawerOpen}
          >
            <MainContent>
              <div className={classNames.headerWrapper}>
                <SearchInput
                  value={nameSearchValue}
                  placeholder={t(TranslationKey['Search by ASIN, Order ID, Item'])}
                  onChange={onChangeNameSearchValue}
                />
              </div>

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
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                getRowHeight={() => 'auto'}
                // rowHeight={200}
                components={{
                  Toolbar: DataGridCustomToolbar,
                }}
                density={densityModel}
                columns={columnsModel}
                loading={requestStatus === loadingStatuses.isLoading}
                onSelectionModelChange={newSelection => {
                  onSelectionModel(newSelection[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
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
      </React.Fragment>
    )
  }
}

export const WarehouseCanceledTasksView = withStyles(WarehouseCanceledTasksViewRaw, styles)
