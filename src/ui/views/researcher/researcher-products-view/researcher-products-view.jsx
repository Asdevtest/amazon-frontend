import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import {Paper} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {ResearcherAddProductForm} from '@components/forms/reasearcher-add-product-form'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

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
      // onClickCheckBtn,
      // onClickAddBtn,
      changeColumnsModel,
      onClickCheckAndAddProductBtn,
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
                    onClickCheckAndAddProductBtn={onClickCheckAndAddProductBtn}
                  />
                </div>
              </Paper>
              <div className={classNames.tableWrapper}>
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
                  rowHeight={60}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                    ColumnMenuIcon: FilterAltOutlinedIcon,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  componentsProps={{
                    toolbar: {
                      columsBtnSettings: {columnsModel, changeColumnsModel},
                    },
                  }}
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
