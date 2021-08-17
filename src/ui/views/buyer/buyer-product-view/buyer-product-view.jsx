import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {UserRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from '../assets/buyerAvatar.jpg'
import {BuyerProductViewModel} from './buyer-product-view.model'
import {styles} from './buyer-product-view.style'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductView

@observer
class BuyerProductViewRaw extends Component {
  viewModel = new BuyerProductViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      product,
      drawerOpen,
      suppliers,
      history,
      selectedSupplier,
      showAddOrEditSupplierModal,
      formFieldsValidationErrors,
      showNoSuplierErrorModal,
      onTriggerDrawerOpen,
      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onChangeProductFields,
      handleProductActionButtons,
      onClickSetProductStatusBtn,
      onTriggerAddOrEditSupplierModal,
      onClickSaveSupplierBtn,
      onTriggerOpenModal,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          curUserRole={UserRole.BUYER}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            history={history}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onTriggerDrawerOpen}
            curUserRole={UserRole.BUYER}
          >
            <MainContent>
              {product ? (
                <ProductWrapper
                  curUserRole={UserRole.BUYER}
                  product={product}
                  suppliers={suppliers}
                  selectedSupplier={selectedSupplier}
                  formFieldsValidationErrors={formFieldsValidationErrors}
                  handleSupplierButtons={onClickSupplierButtons}
                  handleProductActionButtons={handleProductActionButtons}
                  onClickSupplier={onChangeSelectedSupplier}
                  onClickSetProductStatusBtn={onClickSetProductStatusBtn}
                  onChangeField={onChangeProductFields}
                />
              ) : undefined}
            </MainContent>
          </Appbar>
        </Main>
        <Modal openModal={showAddOrEditSupplierModal} setOpenModal={onTriggerAddOrEditSupplierModal}>
          <AddOrEditSupplierModalContent
            title={textConsts.modalAddTitle}
            supplier={selectedSupplier}
            onClickSaveBtn={onClickSaveSupplierBtn}
            onTriggerShowModal={onTriggerAddOrEditSupplierModal}
          />
        </Modal>

        <Modal openModal={showNoSuplierErrorModal} setOpenModal={() => onTriggerOpenModal('showNoSuplierErrorModal')}>
          <div className={classNames.modalMessageWrapper}>
            <Typography paragraph variant="h5">
              {textConsts.showNoSuplierErrorTitle}
            </Typography>

            <Button
              disableElevation
              variant="contained"
              onClick={() => {
                onTriggerOpenModal('showNoSuplierErrorModal')
              }}
            >
              {textConsts.errorBtn}
            </Button>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}

export const BuyerProductView = withStyles(styles)(BuyerProductViewRaw)
