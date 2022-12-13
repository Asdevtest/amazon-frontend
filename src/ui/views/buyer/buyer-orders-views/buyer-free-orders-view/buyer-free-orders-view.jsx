import {DataGrid} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {DataGridCustomToolbar} from '@components/data-grid-custom-toolbar/data-grid-custom-toolbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {TwoVerticalChoicesModal} from '@components/modals/two-vertical-choices-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {BuyerFreeOrdersViewModel} from './buyer-free-orders-view.model'
import {styles} from './buyer-free-orders-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_FREE_ORDERS

@observer
class BuyerFreeOrdersViewRaw extends Component {
  viewModel = new BuyerFreeOrdersViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      selectedRowIds,
      onPickupSomeItems,
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,
      drawerOpen,
      curPage,
      rowsPerPage,
      warningTitle,
      showWarningModal,
      showTwoVerticalChoicesModal,
      goToMyOrders,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,
      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
      onClickContinueWorkButton,
    } = this.viewModel
    const {classes: classNames} = this.props
    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />

        <Main>
          <Appbar title={t(TranslationKey['Free Orders'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.btnsWrapper}>
                <Button
                  color="primary"
                  variant="contained"
                  disabled={selectedRowIds.length === 0}
                  onClick={onPickupSomeItems}
                >
                  {t(TranslationKey['Take on the work of the selected'])}
                </Button>
              </div>
              <div className={classNames.dataGridWrapper}>
                <DataGrid
                  disableVirtualization
                  checkboxSelection
                  pagination
                  useResizeContainer
                  classes={{
                    root: classNames.root,
                    footerContainer: classNames.footerContainer,
                    footerCell: classNames.footerCell,
                    toolbarContainer: classNames.toolbarContainer,
                  }}
                  localeText={getLocalizationByLanguageTag()}
                  sortModel={sortModel}
                  filterModel={filterModel}
                  page={curPage}
                  pageSize={rowsPerPage}
                  rowsPerPageOptions={[15, 25, 50, 100]}
                  rows={getCurrentData()}
                  rowHeight={100}
                  components={{
                    Toolbar: DataGridCustomToolbar,
                  }}
                  density={densityModel}
                  columns={columnsModel}
                  loading={requestStatus === loadingStatuses.isLoading}
                  onSortModelChange={onChangeSortingModel}
                  onPageSizeChange={onChangeRowsPerPage}
                  onPageChange={onChangeCurPage}
                  onStateChange={setDataGridState}
                  onFilterModelChange={model => onChangeFilterModel(model)}
                  onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <TwoVerticalChoicesModal
          tooltipFirstButton={t(TranslationKey['Go to the order and open the "Edit order" window'])}
          tooltipSecondButton={t(TranslationKey['Stay in "Free Orders"'])}
          openModal={showTwoVerticalChoicesModal}
          setOpenModal={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
          title={t(TranslationKey['Order picked up'])}
          topBtnText={t(TranslationKey['Go to order'])}
          bottomBtnText={t(TranslationKey['Continue to work with free orders'])}
          onClickTopBtn={() => goToMyOrders()}
          onClickBottomBtn={onClickContinueWorkButton}
        />

        <WarningInfoModal
          openModal={showWarningModal}
          setOpenModal={() => onTriggerOpenModal('showWarningModal')}
          title={warningTitle}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showWarningModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const BuyerFreeOrdersView = withStyles(BuyerFreeOrdersViewRaw, styles)
