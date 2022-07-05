import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {TwoVerticalChoicesModal} from '@components/modals/two-vertical-choices-modal'
import {Navbar} from '@components/navbar'

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
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      showTwoVerticalChoicesModal,

      drawerOpen,
      curPage,
      rowsPerPage,

      goToMyTasks,
      onChangeTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
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
              <DataGrid
                pagination
                useResizeContainer
                sx={{
                  border: 0,
                  boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                  backgroundColor: '#fff',
                }}
                localeText={getLocalizationByLanguageTag()}
                classes={{
                  row: classNames.row,
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
                  onSelectionModel(newSelection[0])
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onFilterModelChange={model => onChangeFilterModel(model)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <TwoVerticalChoicesModal
          openModal={showTwoVerticalChoicesModal}
          setOpenModal={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
          title={t(TranslationKey['Task picked up'])}
          topBtnText={t(TranslationKey['Go to task'])}
          bottomBtnText={t(TranslationKey['Continue to work with new tasks'])}
          onClickTopBtn={() => goToMyTasks()}
          onClickBottomBtn={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
        />
      </React.Fragment>
    )
  }
}

export const WarehouseVacantTasksView = withStyles(styles)(WarehouseVacantTasksViewRaw)
