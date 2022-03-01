import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Navbar} from '@components/navbar'
import {PrivateLabelCard} from '@components/private-label-card'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {ClientExchangePrivateLabelViewModel} from './client-exchange-private-label-view.model'
import {styles} from './client-exchange-private-label-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangePrivateLabelView

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
          <Appbar setDrawerOpen={onTriggerDrawer} title={textConsts.appbarTitle}>
            <MainContent>
              <div className={classNames.mb5}>
                <div className={classNames.cardsWrapper}>
                  {productsVacant.length > 0 ? (
                    this.renderProductsVacant()
                  ) : (
                    <Typography className={classNames.noRows}>{'Нет предложений...'}</Typography>
                  )}
                </div>
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <ConfirmationModal
          openModal={showConfirmPayModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmPayModal')}
          title={textConsts.confirmTitle}
          message={`${textConsts.confirmMessage} (${
            productToPay && toFixedWithDollarSign(productToPay.priceForClient, 2)
          })`}
          successBtnText={textConsts.confirmBtn}
          cancelBtnText={textConsts.cancelBtn}
          onClickSuccessBtn={() => {
            onClickBuyProductBtn(productToPay)
          }}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmPayModal')}
        />

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={textConsts.successTitle}
          successBtnText={textConsts.successBtn}
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
        <PrivateLabelCard item={item} setProductToPay={setProductToPay} />
      </div>
    ))
  }
}

export const ClientExchangePrivateLabelView = withStyles(styles)(ClientExchangePrivateLabelViewRaw)
