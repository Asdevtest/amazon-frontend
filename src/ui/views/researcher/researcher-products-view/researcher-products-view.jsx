import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {Typography, Paper} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {ResearcherAddProductForm} from '@components/forms/reasearcher-add-product-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/researcherAvatar.jpg'
import {ResearcherProductsViewModel} from './researcher-products-view.model'
import {styles} from './researcher-products-view.style'

const textConsts = getLocalizedTexts(texts, 'en').researcherProductsView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_PRODUCTS

@observer
class ResearcherProductsViewRaw extends Component {
  viewModel = new ResearcherProductsViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
    this.viewModel.getDataGridState()
  }

  render() {
    const {
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
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.RESEARCHER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.RESEARCHER}
          >
            <MainContent>
              <Paper className={classNames.card}>
                <Typography variant="h6">{textConsts.cardMainTitle}</Typography>
                <div className={classNames.formWrapper}>
                  <ResearcherAddProductForm
                    formFields={formFields}
                    errorMsg={error}
                    chekedCode={chekedCode}
                    actionStatus={actionStatus}
                    onChangeFormFields={onChangeFormFields}
                    onClickCheckBtn={onClickCheckBtn}
                    onClickAddBtn={onClickAddBtn}
                  />
                </div>
              </Paper>
              <DataGrid
                pagination
                useResizeContainer
                classes={{
                  row: classNames.row,
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
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ResearcherProductsView = withStyles(styles)(ResearcherProductsViewRaw)
