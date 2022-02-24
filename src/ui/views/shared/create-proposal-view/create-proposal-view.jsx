import React, {Component} from 'react'

import {withStyles} from '@material-ui/styles'
import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {texts} from '@constants/texts'

import {Appbar} from '@components/appbar'
import {Button} from '@components/buttons/button'
import {CreateProposalContent} from '@components/contents/create-proposal-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {CreateProposalViewModel} from './create-proposal-view.model'
import {styles} from './requests-detail-custom-view.style'

const textConsts = getLocalizedTexts(texts, 'en').freelancerCreateProposalView

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 0
@observer
export class CreateProposalViewRaw extends Component {
  viewModel = new CreateProposalViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      request,
      infoModalText,
      drawerOpen,
      showInfoModal,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onSubmitCreateProposal,
      onClickBackBtn,
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
          <Appbar title={textConsts.appBarTitle} notificationCount={2} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.backBtnWrapper}>
                <Button variant="contained" color="primary" onClick={onClickBackBtn}>
                  {'Назад'}
                </Button>
              </div>

              <CreateProposalContent request={request} onSubmit={onSubmitCreateProposal} />
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={infoModalText}
          btnText={textConsts.closeBtn}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const CreateProposalView = withStyles(styles)(CreateProposalViewRaw)
