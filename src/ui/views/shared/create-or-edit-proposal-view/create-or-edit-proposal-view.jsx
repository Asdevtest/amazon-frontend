import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CreateOrEditProposalContent} from '@components/contents/create-or-edit-proposal-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {TwoVerticalChoicesModal} from '@components/modals/two-vertical-choices-modal'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {CreateOrEditProposalViewModel} from './create-or-edit-proposal-view.model'
import {styles} from './create-or-edit-proposal-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 0
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
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
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
              <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" className={classNames.backBtn} onClick={onClickBackBtn}>
                  {t(TranslationKey.Back)}
                </Button>
              </div>

              <CreateOrEditProposalContent
                progressValue={progressValue}
                showProgress={showProgress}
                request={request}
                proposalToEdit={proposalToEdit}
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
          topBtnText={'К вакантным заявкам'}
          bottomBtnText={'К списку предложений'}
          onClickTopBtn={() => onClickResultModal({goBack: true})}
          onClickBottomBtn={() => onClickResultModal({goBack: false})}
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

export const CreateOrEditProposalView = withStyles(styles)(CreateOrEditProposalViewRaw)
