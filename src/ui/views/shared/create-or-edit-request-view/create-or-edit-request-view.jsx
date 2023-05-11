import React, {Component, createRef} from 'react'

import {observer} from 'mobx-react'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navigation/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {CreateOrEditRequestContent} from '@components/contents/create-or-edit-request-content'
import {Appbar} from '@components/layout/appbar'
import {Main} from '@components/layout/main'
import {MainContent} from '@components/layout/main-content'
import {Navbar} from '@components/layout/navbar'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {ConfirmationModal} from '@components/modals/confirmation-modal'

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
      confirmModalSettings,
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
      showConfirmModal,

      onClickChoosePerformer,
      onTriggerDrawerOpen,
      onSubmitCreateRequest,
      onSubmitEditRequest,
      onTriggerOpenModal,
      onClickThumbnail,
      setBigImagesOptions,
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
            setImageIndex={imgIndex => setBigImagesOptions(() => ({...bigImagesOptions, imgIndex}))}
          />

          <ConfirmationModal
            isWarning={confirmModalSettings.isWarning}
            openModal={showConfirmModal}
            setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
            title={t(TranslationKey.Attention)}
            message={confirmModalSettings.message}
            smallMessage={confirmModalSettings.smallMessage}
            successBtnText={t(TranslationKey.Yes)}
            cancelBtnText={t(TranslationKey.Cancel)}
            onClickSuccessBtn={confirmModalSettings.onSubmit}
            onClickCancelBtn={confirmModalSettings.onCancel}
          />
        </Main>
      </React.Fragment>
    )
  }
}
