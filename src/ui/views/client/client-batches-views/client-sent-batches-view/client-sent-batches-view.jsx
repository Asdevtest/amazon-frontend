import SearchIcon from '@mui/icons-material/Search'
import {InputAdornment} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DataGridCustomToolbar} from '@components/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Field} from '@components/field'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {MemoDataGrid} from '@components/memo-data-grid'
import {BatchInfoModal} from '@components/modals/batch-info-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
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
      userInfo,
      warningInfoModalSettings,
      nameSearchValue,
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
      showWarningInfoModal,

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
      onChangeNameSearchValue,
      onSubmitChangeBoxFields,
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
              <Field
                containerClasses={className.searchContainer}
                inputClasses={className.searchInput}
                value={nameSearchValue}
                placeholder={t(TranslationKey['Search by ASIN, Title'])}
                endAdornment={
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                }
                onChange={onChangeNameSearchValue}
              />

              <MemoDataGrid
                pagination
                useResizeContainer
                localeText={getLocalizationByLanguageTag()}
                classes={{
                  row: className.row,
                  root: className.root,
                  footerContainer: className.footerContainer,
                  footerCell: className.footerCell,
                  toolbarContainer: className.toolbarContainer,
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
          userInfo={userInfo}
          onSubmitChangeBoxFields={onSubmitChangeBoxFields}
        />

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
      </React.Fragment>
    )
  }
}

export const ClientSentBatchesView = withStyles(ClientSentBatchesViewRaw, styles)
