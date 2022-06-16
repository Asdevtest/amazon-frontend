import {DataGrid, GridToolbar} from '@mui/x-data-grid'

import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {DELIVERY_OPTIONS} from '@constants/delivery-options'
import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveCategory} from '@constants/navbar-active-category'
import {BUYER_FREE_ORDERS_MODAL_HEAD_CELLS} from '@constants/table-head-cells'
import {TranslationKey} from '@constants/translations/translation-key'
import {warehouses} from '@constants/warehouses'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {TwoVerticalChoicesModal} from '@components/modals/two-vertical-choices-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'
import {EditOrderModal} from '@components/screens/buyer/orders-view/edit-order-modal'

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
      requestStatus,
      getCurrentData,
      sortModel,
      filterModel,
      densityModel,
      columnsModel,

      ordersVacant,
      drawerOpen,
      selectedOrder,
      curPage,
      rowsPerPage,
      warningTitle,
      showOrderModal,
      showWarningModal,
      showTwoVerticalChoicesModal,
      onTriggerShowBarcodeModal,
      goToMyOrders,
      onTriggerShowOrderModal,
      onTriggerDrawerOpen,
      onChangeCurPage,
      onChangeRowsPerPage,
      onTriggerOpenModal,

      onSelectionModel,
      setDataGridState,
      onChangeSortingModel,
      onChangeFilterModel,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />

        <Main>
          <Appbar title={t(TranslationKey['Free Orders'])} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <DataGrid
                pagination
                useResizeContainer
                localeText={getLocalizationByLanguageTag()}
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
                onFilterModelChange={model => onChangeFilterModel(model)}
              />
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showOrderModal} setOpenModal={onTriggerShowOrderModal}>
          {ordersVacant[selectedOrder] ? (
            <EditOrderModal
              order={ordersVacant[selectedOrder]}
              setModal={onTriggerShowOrderModal}
              setModalBarcode={onTriggerShowBarcodeModal}
              modalHeadCells={BUYER_FREE_ORDERS_MODAL_HEAD_CELLS}
              warehouses={warehouses}
              deliveryList={DELIVERY_OPTIONS}
            />
          ) : undefined}
        </Modal>

        <TwoVerticalChoicesModal
          openModal={showTwoVerticalChoicesModal}
          setOpenModal={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
          title={t(TranslationKey['Order picked up'])}
          topBtnText={t(TranslationKey['Continue with the order'])}
          bottomBtnText={t(TranslationKey['Continue to work with vacant orders'])}
          onClickTopBtn={() => goToMyOrders()}
          onClickBottomBtn={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
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

export const BuyerFreeOrdersView = withStyles(styles)(BuyerFreeOrdersViewRaw)
