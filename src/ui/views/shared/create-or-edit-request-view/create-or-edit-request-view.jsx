import React, {Component, createRef} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {CreateOrEditRequestContent} from '@components/contents/create-or-edit-request-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {CreateOrEditRequestViewModel} from './create-or-edit-request-view.model'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS
@observer
export class CreateOrEditRequestView extends Component {
  mainContentRef = createRef()
  viewModel = new CreateOrEditRequestViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      progressValue,
      showProgress,
      requestToEdit,
      drawerOpen,
      announcements,
      choosenAnnouncements,
      showImageModal,
      bigImagesOptions,
      permissionsData,
      platformSettingsData,

      onClickChoosePerformer,
      onTriggerDrawerOpen,
      onSubmitCreateRequest,
      onSubmitEditRequest,
      onTriggerOpenModal,
      onClickThumbnail,
    } = this.viewModel

    console.log('this.mainContentRef', this.mainContentRef)

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
            <MainContent ref={this.mainContentRef}>
              <CreateOrEditRequestContent
                mainContentRef={this.mainContentRef}
                choosenAnnouncements={choosenAnnouncements}
                permissionsData={permissionsData}
                announcements={announcements}
                platformSettingsData={platformSettingsData}
                progressValue={progressValue}
                showProgress={showProgress}
                requestToEdit={requestToEdit}
                history={this.props.history}
                onCreateSubmit={onSubmitCreateRequest}
                onEditSubmit={onSubmitEditRequest}
                onClickChoosePerformer={onClickChoosePerformer}
                onClickThumbnail={onClickThumbnail}
              />
            </MainContent>
          </Appbar>

          <BigImagesModal
            openModal={showImageModal}
            setOpenModal={() => onTriggerOpenModal('showImageModal')}
            images={bigImagesOptions.images}
            imgIndex={bigImagesOptions.imgIndex}
          />
        </Main>
      </React.Fragment>
    )
  }
}
