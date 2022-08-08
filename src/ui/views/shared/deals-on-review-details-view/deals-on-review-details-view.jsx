import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {DealDetailsCard} from '@components/cards/deal-details-card'
import {RequestProposalAcceptOrRejectResultForm} from '@components/forms/request-proposal-accept-or-reject-result-form'
import {RequestProposalResultToCorrectForm} from '@components/forms/request-proposal-result-to-correct-form'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {VacantDealsDetailsViewModel} from './deals-on-review-details-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_DEALS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_DEALS_ON_REVIEW

@observer
export class DealsOnReviewDetailsView extends Component {
  viewModel = new VacantDealsDetailsViewModel({history: this.props.history, location: this.props.location})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      drawerOpen,

      showConfirmModal,
      showRejectModal,
      showReworkModal,
      requestProposals,

      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onClickConfirmDealModal,
      onClickRejectDealModal,
      onClickConfirmDeal,
      onClickRejectDeal,
      onClickReworkDeal,
      onClickReworkDealModal,
    } = this.viewModel
    // const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['Vacant deals'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <DealDetailsCard
                item={requestProposals[0]}
                onClickConfirmDealModal={onClickConfirmDealModal}
                onClickRejectDealModal={onClickRejectDealModal}
                onClickReworkDealModal={onClickReworkDealModal}
              />
            </MainContent>
          </Appbar>

          <Modal openModal={showConfirmModal} setOpenModal={() => onTriggerOpenModal('showConfirmModal')}>
            <RequestProposalAcceptOrRejectResultForm
              title={t(TranslationKey['Confirm acceptance of the work result'])}
              rateLabel={t(TranslationKey['Rate the performer'])}
              reviewLabel={t(TranslationKey["Review of the performer's work"])}
              onSubmit={onClickConfirmDeal}
            />
          </Modal>

          <Modal openModal={showRejectModal} setOpenModal={() => onTriggerOpenModal('showRejectModal')}>
            <RequestProposalAcceptOrRejectResultForm
              isReject
              title={t(TranslationKey['Reject the deal'])}
              rateLabel={t(TranslationKey['Rate the performer'])}
              reviewLabel={t(TranslationKey['Reason for cancelling the deal'])}
              onSubmit={onClickRejectDeal}
            />
          </Modal>

          <Modal openModal={showReworkModal} setOpenModal={() => onTriggerOpenModal('showReworkModal')}>
            <RequestProposalResultToCorrectForm onPressSubmitForm={onClickReworkDeal} />
          </Modal>
        </Main>
      </React.Fragment>
    )
  }
}
