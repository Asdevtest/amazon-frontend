/* eslint-disable no-unused-vars */
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {CreateOrEditProposalContent} from '@components/contents/create-or-edit-proposal-content'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {TwoVerticalChoicesModal} from '@components/modals/two-vertical-choices-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Button} from '@components/shared/buttons/button'

import {t} from '@utils/translations'

import {CreateOrEditProposalViewModel} from './create-or-edit-proposal-view.model'
import {styles} from './create-or-edit-proposal-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
@observer
export class CreateOrEditProposalViewRaw extends Component {
  viewModel = new CreateOrEditProposalViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      progressValue,
      showProgress,
      request,
      proposalToEdit,
      infoModalText,
      drawerOpen,
      showInfoModal,
      showResultModal,

      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onSubmitCreateProposal,
      onClickBackBtn,
      onClickOkInfoModal,
      onSubmitEditProposal,
      onClickResultModal,
      goToMyRequest,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={
            this.props.location.pathname.includes('my-proposals')
              ? navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS
              : navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS
          }
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar
            title={
              this.props.location.state?.proposalToEdit
                ? t(TranslationKey['Proposal Edition'])
                : t(TranslationKey['Proposal Creation'])
            }
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              {/* <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" className={classNames.backBtn} onClick={onClickBackBtn}>
                  {t(TranslationKey.Back)}
                </Button>
              </div> */}

              <CreateOrEditProposalContent
                progressValue={progressValue}
                showProgress={showProgress}
                request={request}
                proposalToEdit={proposalToEdit}
                onClickBackBtn={onClickBackBtn}
                onCreateSubmit={onSubmitCreateProposal}
                onEditSubmit={onSubmitEditProposal}
              />
            </MainContent>
          </Appbar>
        </Main>

        <TwoVerticalChoicesModal
          openModal={showResultModal}
          setOpenModal={() => {
            onTriggerOpenModal('showResultModal')
            onClickResultModal({goBack: true})
          }}
          title={infoModalText}
          // topBtnText={t(TranslationKey['To vacant requests'])}
          // bottomBtnText={t(TranslationKey['To the list of proposals'])}
          // onClickTopBtn={() => onClickResultModal({goBack: true})}
          // onClickBottomBtn={() => onClickResultModal({goBack: false})}

          topBtnText={t(TranslationKey['Go to request'])}
          bottomBtnText={t(TranslationKey['To vacant requests'])}
          thirdBtnText={t(TranslationKey['To the list of proposals'])}
          onClickTopBtn={() => goToMyRequest()}
          onClickBottomBtn={() => onClickResultModal({goBack: true})}
          onClickThirdBtn={() => onClickResultModal({goBack: false})}
        />

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={infoModalText}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={onClickOkInfoModal}
        />
      </React.Fragment>
    )
  }
}

export const CreateOrEditProposalView = withStyles(CreateOrEditProposalViewRaw, styles)
