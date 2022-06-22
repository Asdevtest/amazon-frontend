import React, {Component} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {CreateOrEditRequestContent} from '@components/contents/create-or-edit-request-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {CreateOrEditRequestViewModel} from './create-or-edit-request-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = 1
@observer
export class CreateOrEditRequestView extends Component {
  viewModel = new CreateOrEditRequestViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {
      progressValue,
      showProgress,
      requestToEdit,
      infoModalText,
      drawerOpen,
      showInfoModal,
      onTriggerDrawerOpen,
      onTriggerOpenModal,
      onSubmitCreateRequest,
      onSubmitEditRequest,
      onClickOkInfoModal,
    } = this.viewModel

    return (
      <React.Fragment>
        <Navbar
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          drawerOpen={drawerOpen}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['Create a request'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <CreateOrEditRequestContent
                progressValue={progressValue}
                showProgress={showProgress}
                requestToEdit={requestToEdit}
                history={this.props.history}
                onCreateSubmit={onSubmitCreateRequest}
                onEditSubmit={onSubmitEditRequest}
              />
            </MainContent>
          </Appbar>
        </Main>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={infoModalText}
          btnText={t(TranslationKey.Close)}
          onClickBtn={onClickOkInfoModal}
        />
      </React.Fragment>
    )
  }
}
