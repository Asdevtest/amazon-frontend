import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {Modal} from '@components/shared/modal'
import {EditTaskModal} from '@components/warehouse/edit-task-modal'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminWarehouseTasksViewModel} from './admin-warehouse-tasks-view.model'
import {styles} from './admin-warehouse-tasks-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = 0

@observer
export class AdminWarehouseTasksViewRaw extends Component {
  viewModel = new AdminWarehouseTasksViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      curOpenedTask,
      showTaskInfoModal,
      onTriggerOpenModal,
      volumeWeightCoefficient,

      densityModel,
      columnsModel,

      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      drawerOpen,
      rowsPerPage,
      history,
      curPage,
      onChangeDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      changeColumnsModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey.Tasks)} history={history} setDrawerOpen={onChangeDrawerOpen}>
            <MainContent>
              <MemoDataGrid
                pagination
                useResizeContainer
                localeText={getLocalizationByLanguageTag()}
                classes={{
                  row: classNames.row,
                  root: classNames.root,
                  footerContainer: classNames.footerContainer,
                  footerCell: classNames.footerCell,
                  toolbarContainer: classNames.toolbarContainer,
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
                  ColumnMenuIcon: FilterAltOutlinedIcon,
                }}
                componentsProps={{
                  toolbar: {
                    columsBtnSettings: {columnsModel, changeColumnsModel},
                  },
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

  renderAdminBtns = params => (
    <React.Fragment>
      <Button variant="contained" onClick={() => this.viewModel.setCurrentOpenedTask(params.row)}>
        {t(TranslationKey['View more'])}
      </Button>
    </React.Fragment>
  )
}

export const AdminWarehouseTasksView = withStyles(AdminWarehouseTasksViewRaw, styles)
