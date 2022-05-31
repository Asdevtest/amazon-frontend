import React, {Component} from 'react'

import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CreateOrEditProposalContent} from '@components/contents/create-or-edit-proposal-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Modal} from '@components/modal'
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
            title={t(TranslationKey['Proposal Creation'])}
            notificationCount={2}
            setDrawerOpen={onTriggerDrawerOpen}
          >
            <MainContent>
              <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" onClick={onClickBackBtn}>
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

        <Modal openModal={showResultModal} setOpenModal={() => onTriggerOpenModal('showResultModal')}>
          <div className={classNames.modalMessageWrapper}>
            <Typography variant="h5">{infoModalText}</Typography>

            <div className={classNames.resultButtonsWrapper}>
              <Button
                color="primary"
                variant="contained"
                className={classNames.button}
                onClick={() => onClickResultModal({goBack: true})}
              >
                {'К вакантным заявкам'}
              </Button>
              <Button
                color="primary"
                variant="text"
                className={classNames.button}
                onClick={() => onClickResultModal({goBack: false})}
              >
                {'К списку предложений'}
              </Button>
            </div>
          </div>
        </Modal>

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
