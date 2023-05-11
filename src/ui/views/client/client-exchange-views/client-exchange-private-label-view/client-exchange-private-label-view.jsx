import {Typography} from '@mui/material'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {SelectShopsModal} from '@components/modals/select-shops-modal'
// import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {PrivateLabelCard} from '@components/private-label-card'
import {Modal} from '@components/shared/modal'

import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {ClientExchangePrivateLabelViewModel} from './client-exchange-private-label-view.model'
import {styles} from './client-exchange-private-label-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_EXCHANGE
const navbarActiveSubCategory = 1

@observer
export class ClientExchangePrivateLabelViewRaw extends Component {
  viewModel = new ClientExchangePrivateLabelViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      productsVacant,
      drawerOpen,
      productToPay,
      shopsData,
      showConfirmPayModal,
      showSuccessModal,
      onTriggerDrawer,
      onTriggerOpenModal,
      onClickBuyProductBtn,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawer}
        />
        <Main>
          <Appbar setDrawerOpen={onTriggerDrawer} title={'Private Label'}>
            <MainContent>
              <div className={classNames.mb5}>
                <div className={classNames.cardsWrapper}>
                  {productsVacant.length > 0 ? (
                    this.renderProductsVacant()
                  ) : (
                    <Typography className={classNames.noRows}>{t(TranslationKey['No suggestions'])}</Typography>
                  )}
                </div>
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <Modal openModal={showConfirmPayModal} setOpenModal={() => onTriggerOpenModal('showConfirmPayModal')}>
          <SelectShopsModal
            title={t(TranslationKey['You buy a product card, are you sure?'])}
            message={`${t(TranslationKey['You will be charged'])} (${
              productToPay && toFixedWithDollarSign(productToPay.priceForClient, 2)
            })`}
            shops={shopsData}
            product={productToPay}
            onClickSuccessBtn={onClickBuyProductBtn}
            onClickCancelBtn={() => onTriggerOpenModal('showConfirmPayModal')}
          />
        </Modal>

        {/* <ConfirmationModal
          openModal={showConfirmPayModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmPayModal')}
          title={t(TranslationKey['You buy a product card, are you sure?'])}
          message={`${t(TranslationKey['You will be charged'])} (${
            productToPay && toFixedWithDollarSign(productToPay.priceForClient, 2)
          })`}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.Cancel)}
          onClickSuccessBtn={() => {
            onClickBuyProductBtn(productToPay)
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmPayModal')}
        /> */}

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={t(TranslationKey['Product paid'])}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={() => {
            onTriggerOpenModal('showSuccessModal')
          }}
        />
      </React.Fragment>
    )
  }

  renderProductsVacant = () => {
    const {classes: classNames} = this.props
    const {productsVacant, setProductToPay} = this.viewModel

    return productsVacant.map((item, index) => (
      <div key={`product_${item._id}_${index}`} className={classNames.cardWrapper}>
        <PrivateLabelCard item={item} index={index} setProductToPay={setProductToPay} />
      </div>
    ))
  }
}

export const ClientExchangePrivateLabelView = withStyles(ClientExchangePrivateLabelViewRaw, styles)
