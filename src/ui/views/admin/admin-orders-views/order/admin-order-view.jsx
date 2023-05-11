import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {OrderContent} from '@components/contents/order-content'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content'
import {Button} from '@components/shared/buttons/button'
import {Modal} from '@components/shared/modal'

import {t} from '@utils/translations'

import {AdminOrderViewModel} from './admin-order-view.model'
import {styles} from './admin-order-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_ORDERS

@observer
export class AdminOrderViewRaw extends Component {
  viewModel = new AdminOrderViewModel({
    history: this.props.history,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {classes: classNames} = this.props
    const {
      orderBoxes,
      drawerOpen,
      order,
      history,
      showAddOrEditSupplierModal,
      yuanToDollarRate,
      volumeWeightCoefficient,
      selectedSupplier,
      storekeepers,

      onTriggerDrawerOpen,
      onTriggerAddOrEditSupplierModal,
      onChangeSelectedSupplier,
    } = this.viewModel
    const goBack = () => {
      history.goBack()
    }

    return (
      <React.Fragment>
        <Navbar activeCategory={navbarActiveCategory} drawerOpen={drawerOpen} setDrawerOpen={onTriggerDrawerOpen} />
        <Main>
          <Appbar
            title={t(TranslationKey.Order)}
            history={history}
            setDrawerOpen={onTriggerDrawerOpen}
            lastCrumbAdditionalText={` № ${order?.id}`}
          >
            <MainContent>
              <div className={classNames.backButtonWrapper}>
                <Button className={classNames.backButton} onClick={goBack}>
                  {t(TranslationKey.Back)}
                </Button>
              </div>
              {order ? (
                <OrderContent
                  selectedSupplier={selectedSupplier}
                  order={order}
                  boxes={orderBoxes}
                  history={history}
                  onChangeSelectedSupplier={onChangeSelectedSupplier}
                  onTriggerAddOrEditSupplierModal={onTriggerAddOrEditSupplierModal}
                />
              ) : null}
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showAddOrEditSupplierModal} setOpenModal={onTriggerAddOrEditSupplierModal}>
          <AddOrEditSupplierModalContent
            onlyRead
            product={order?.product}
            storekeepersData={storekeepers}
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            supplier={selectedSupplier}
            onTriggerShowModal={onTriggerAddOrEditSupplierModal}
          />
        </Modal>
      </React.Fragment>
    )
  }
}

export const AdminOrderView = withStyles(AdminOrderViewRaw, styles)
