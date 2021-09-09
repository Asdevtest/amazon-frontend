import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {clientUsername} from '@constants/mocks'
import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {ConfirmationModal} from '@components/modals/confirmation-modal'
import {SuccessInfoModal} from '@components/modals/success-info-modal'
import {Navbar} from '@components/navbar'
import {PrivateLabelCard} from '@components/private-label-card'

import {calcProductPrice} from '@utils/calculation'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import avatar from '../../assets/clientAvatar.jpg'
import {ClientExchangePrivateLabelViewModel} from './client-exchange-private-label-view.model'
import {styles} from './client-exchange-private-label-view.style'

const textConsts = getLocalizedTexts(texts, 'en').clientExchangePrivateLabelView

const navbarActiveCategory = 1
const navbarActiveSubCategory = 1

@observer
export class ClientExchangePrivateLabelViewRaw extends Component {
  viewModel = new ClientExchangePrivateLabelViewModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
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
          curUserRole={UserRole.CLIENT}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          handlerTriggerDrawer={onTriggerDrawer}
        />
        <Main>
          <Appbar
            avatarSrc={avatar}
            handlerTriggerDrawer={onTriggerDrawer}
            title={textConsts.appbarTitle}
            username={clientUsername}
            curUserRole={UserRole.CLIENT}
          >
            <MainContent>
              <div className={classNames.mb5}>
                <Typography paragraph variant="h6">
                  {textConsts.mainTitle}
                </Typography>
                <div className={classNames.cardsWrapper}>{this.renderProductsVacant()}</div>
              </div>
            </MainContent>
          </Appbar>
        </Main>

        <ConfirmationModal
          openModal={showConfirmPayModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmPayModal')}
          title={textConsts.confirmTitle}
          message={`${textConsts.confirmMessage} (${
            productToPay && toFixedWithDollarSign(calcProductPrice(productToPay))
          })`}
          successBtnText={textConsts.confirmBtn}
          cancelBtnText={textConsts.cancelBtn}
          onClickSuccessBtn={() => {
            onClickBuyProductBtn(productToPay)
            onTriggerOpenModal('showConfirmPayModal')
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
    const {productsVacant, onClickBuyProductBtn, setProductToPay, onTriggerOpenModal} = this.viewModel

    return productsVacant.map((item, index) => (
      <div key={`product_${item._id}_${index}`} className={classNames.cardWrapper}>
        <PrivateLabelCard
          item={item}
          setProductToPay={setProductToPay}
          onClickBuyProductBtn={onClickBuyProductBtn}
          onTriggerOpenModal={onTriggerOpenModal}
        />
      </div>
    ))
  }
}

export const ClientExchangePrivateLabelView = withStyles(styles)(ClientExchangePrivateLabelViewRaw)
