import {Paper} from '@mui/material'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {ResearcherAddProductForm} from '@components/forms/reasearcher-add-product-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ResearcherProductsViewModel} from './researcher-products-view.model'
import {styles} from './researcher-products-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_PRODUCTS

@observer
class ResearcherProductsViewRaw extends Component {
  viewModel = new ResearcherProductsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      user,
      warningInfoModalSettings,
      showWarningInfoModal,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      drawerOpen,
      rowsPerPage,
      curPage,
      formFields,
      error,
      reasonError,
      actionStatus,
      chekedCode,
      onClickCheckBtn,
      onClickAddBtn,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onChangeFormFields,
      onClickTableRow,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onTriggerOpenModal,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey['My products'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <Paper className={classNames.card}>
                <div className={classNames.formWrapper}>
                  <ResearcherAddProductForm
                    user={user}
                    formFields={formFields}
                    errorMsg={error}
                    reasonErrorMsg={reasonError}
                    chekedCode={chekedCode}
                    actionStatus={actionStatus}
                    onChangeFormFields={onChangeFormFields}
                    onClickCheckBtn={onClickCheckBtn}
                    onClickAddBtn={onClickAddBtn}
                  />
                </div>
              </Paper>
              <div className={classNames.tableWrapper}>
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
                  }}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={60}
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
                  onRowDoubleClick={e => onClickTableRow(e.row)}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          isWarning={warningInfoModalSettings.isWarning}
          openModal={showWarningInfoModal}
          setOpenModal={() => onTriggerOpenModal('showWarningInfoModal')}
          title={warningInfoModalSettings.title}
          btnText={t(TranslationKey.Close)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningInfoModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const ResearcherProductsView = withStyles(ResearcherProductsViewRaw, styles)
