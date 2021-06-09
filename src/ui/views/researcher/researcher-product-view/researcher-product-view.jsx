import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {texts} from '@constants/texts'
import {userRole} from '@constants/user-roles'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'
import {AddOrEditSupplierModalContent} from '@components/product/add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'
import {ProductWrapper} from '@components/product/product-wrapper'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import avatar from './assets/clientAvatar.jpg'
import {ResearcherProductViewModel} from './researcher-product-view.model'

const textConsts = getLocalizedTexts(texts, 'en').buyerProductView

const CHIP_LIST = [
  {key: 0, label: 'Поиск поставщика', color: 'rgb(0, 123, 255)', colorHover: '#1269ec'},
  {key: 1, label: 'Поставщик найден', color: 'rgb(15, 169, 20)', colorHover: '#009a07'},
  {key: 2, label: 'Поставщик не найден', color: '#ff9800', colorHover: '#f57c00'},
  {key: 3, label: 'Цена выше МЗЦ', color: 'rgb(210, 35, 35)', colorHover: '#c51a1c'},
]

const navbarActiveCategory = 4

@observer
export class ResearcherProductView extends Component {
  viewModel = new ResearcherProductViewModel({history: this.props.history, location: this.props.location})

  render() {
    const {
      drawerOpen,
      activeChip,
      product,
      actionStatus,
      selectedSupplier,
      showAddOrEditSupplierModal,
      onTriggerAddOrEditSupplierModal,
      onClickSaveSupplierBtn,
      onChangeProductFields,
      onClickSupplierButtons,
      onChangeSelectedSupplier,
      onChangeDrawerOpen,
      onChangeActiveChip,
      onClickParseAmazonBtn,
      onClickParseSellCenteralBtn,
    } = this.viewModel
    return (
      <React.Fragment>
        <Navbar
          curUserRole={userRole.RESEARCHER}
          activeCategory={navbarActiveCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onChangeDrawerOpen}
          user={textConsts.appUser}
        />
        <Main>
          <Appbar
            title={textConsts.appBarTitle}
            notificationCount={2}
            avatarSrc={avatar}
            user={textConsts.appUser}
            username={textConsts.appBarUsername}
            setDrawerOpen={onChangeDrawerOpen}
          >
            <MainContent>
              {product ? (
                <ProductWrapper
                  chipList={CHIP_LIST}
                  activeChip={activeChip}
                  setActiveChip={onChangeActiveChip}
                  product={product}
                  selectedSupplier={selectedSupplier}
                  handleSupplierButtons={onClickSupplierButtons}
                  actionStatus={actionStatus}
                  onClickSupplier={onChangeSelectedSupplier}
                  onChangeField={onChangeProductFields}
                  onClickParseAmazonBtn={onClickParseAmazonBtn}
                  onClickParseSellCenteralBtn={onClickParseSellCenteralBtn}
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
      </React.Fragment>
    )
  }
}
