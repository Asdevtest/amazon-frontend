// import {DataGrid, GridToolbar} from '@mui/x-data-grid'
import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

// import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
// import {ProductStatus} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

// import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {ModeratorMyProductsViewModel} from './moderator-my-products-view.model'
import {styles} from './moderator-my-products-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_MY_PRODUCTS

// const attentionStatuses = [ProductStatus.BUYER_PICKED_PRODUCT, ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT]
@observer
export class ModeratorMyProductsViewRaw extends Component {
  viewModel = new ModeratorMyProductsViewModel({history: this.props.history})

  // componentDidMount() {
  //   this.viewModel.loadData()
  // }

  render() {
    const {
      // requestStatus,
      // getCurrentData,
      // sortModel,
      // filterModel,
      // densityModel,
      // columnsModel,

      drawerOpen,
      // curPage,
      // rowsPerPage,
      // onChangeCurPage,
      // onChangeRowsPerPage,
      onTriggerDrawerOpen,
      // onClickTableRow,

      // onSelectionModel,
      // setDataGridState,
      // onChangeSortingModel,
      // onChangeFilterModel,
    } = this.viewModel
    const {classes: classNames} = this.props

    // const getRowClassName = params =>
    //   attentionStatuses.includes(params.getValue(params.id, 'status')) && classNames.attentionRow

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar title={t(TranslationKey['My products'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <Typography className={classNames.inProcess}>{'В разработке...'}</Typography>
              {/* <DataGrid
                pagination
                useResizeContainer
                sx={{
                  border: 0,
                  boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
                  backgroundColor: theme.palette.background.general,
                }}
                localeText={getLocalizationByLanguageTag()}
                classes={{
                  row: classNames.row,
                }}
                getRowClassName={getRowClassName}
                sortModel={sortModel}
                filterModel={filterModel}
                page={curPage}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[15, 25, 50, 100]}
                rows={getCurrentData()}
                rowHeight={100}
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
              /> */}
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ModeratorMyProductsView = withStyles(ModeratorMyProductsViewRaw, styles)
