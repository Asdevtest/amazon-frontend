import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {MemoDataGrid} from '@components/shared/memo-data-grid'
import {Modal} from '@components/shared/modal'
import {SearchInput} from '@components/shared/search-input'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {AdminWarehouseBoxesViewModel} from './admin-warehouse-boxes-view.model'
import {styles} from './admin-warehouse-boxes-view.style'

const activeCategory = navBarActiveCategory.NAVBAR_WAREHOUSE
const activeSubCategory = 1

@observer
export class AdminWarehouseBoxesViewRaw extends Component {
  viewModel = new AdminWarehouseBoxesViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      currentData,
      curBox,
      volumeWeightCoefficient,
      showBoxViewModal,
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

      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,

      onTriggerOpenModal,
      setCurrentOpenedBox,
      onSearchSubmit,
      changeColumnsModel,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={t(TranslationKey.Boxes)}>
            <MainContent>
              <div className={classNames.topHeaderBtnsWrapper}>
                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
                  onSubmit={onSearchSubmit}
                />
              </div>
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
                rows={currentData}
                density={densityModel}
                columns={columnsModel}
                rowHeight={130}
                loading={requestStatus === loadingStatuses.isLoading}
                components={{
                  Toolbar: DataGridCustomToolbar,
                  ColumnMenuIcon: FilterAltOutlinedIcon,
                }}
                componentsProps={{
                  toolbar: {
                    columsBtnSettings: {columnsModel, changeColumnsModel},
                  },
                }}
                onSortModelChange={onChangeSortingModel}
                onPageSizeChange={onChangeRowsPerPage}
                onPageChange={onChangeCurPage}
                onStateChange={setDataGridState}
                onFilterModelChange={model => onChangeFilterModel(model)}
                onRowDoubleClick={e => setCurrentOpenedBox(e.row.originalData)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showBoxViewModal} setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}>
          <BoxViewForm
            box={curBox}
            volumeWeightCoefficient={volumeWeightCoefficient}
            setOpenModal={() => onTriggerOpenModal('showBoxViewModal')}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export const AdminWarehouseBoxesView = withStyles(AdminWarehouseBoxesViewRaw, styles)
