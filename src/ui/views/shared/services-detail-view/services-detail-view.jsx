/* eslint-disable no-unused-vars */
import InboxIcon from '@mui/icons-material/Inbox'
import {Typography, Paper, Alert} from '@mui/material'

import React, {Component, createRef} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'
import {OwnerGeneralRequestInfo} from '@components/requests-and-request-proposals/owner-general-request-info'
import {CustomSearchRequestDetails} from '@components/requests-and-request-proposals/requests/requests-details/custom-request-details'

import {t} from '@utils/translations'

import {ServiceDetailsViewModel} from './services-detail-view.model'
import {styles} from './services-detail-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS
@observer
export class ServiceDetailsViewRaw extends Component {
  chatRef = createRef()
  viewModel = new ServiceDetailsViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      requestProposals,
      drawerOpen,
      onTriggerDrawerOpen,
      onClickPublishBtn,
      onClickEditBtn,
      onClickCancelBtn,
      onClickAbortBtn,
    } = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <Navbar
          drawerOpen={drawerOpen}
          activeCategory={navbarActiveCategory}
          activeSubCategory={navbarActiveSubCategory}
          setDrawerOpen={onTriggerDrawerOpen}
        />
        <Main>
          <Appbar title={t(TranslationKey['My request'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <OwnerGeneralRequestInfo
                requestProposals={requestProposals}
                onClickPublishBtn={onClickPublishBtn}
                onClickEditBtn={onClickEditBtn}
                onClickCancelBtn={onClickCancelBtn}
                onClickAbortBtn={onClickAbortBtn}
              />

              <div className={classNames.detailsWrapper}>
                <CustomSearchRequestDetails />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const ServiceDetailsView = withStyles(ServiceDetailsViewRaw, styles)
