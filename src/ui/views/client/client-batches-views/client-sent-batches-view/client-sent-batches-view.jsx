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
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ClientSentBatchesViewModel} from './client-sent-batches-view.model'
import {styles} from './client-sent-batches-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_BATCHES
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BATCHES

@observer
class ClientSentBatchesViewRaw extends Component {
  viewModel = new ClientSentBatchesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      volumeWeightCoefficient,
      curBatch,
      showBatchInfoModal,
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
          <Appbar title={t(TranslationKey['Sent boxes'])} setDrawerOpen={onTriggerDrawer}>
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
      </React.Fragment>
    )
  }
}

export const ClientSentBatchesView = withStyles(styles)(ClientSentBatchesViewRaw)
