/* eslint-disable no-unused-vars */
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {navBarActiveCategory, navBarActiveSubCategory} from '@constants/navbar-active-category'
import {TranslationKey} from '@constants/translations/translation-key'

import {Appbar} from '@components/appbar'
import {CreateOrEditServiceContent} from '@components/contents/create-or-edit-services-content/create-or-edit-services-content'
import {Main} from '@components/main'
import {MainContent} from '@components/main-content'
import {Navbar} from '@components/navbar'

import {t} from '@utils/translations'

import {CreateOrEditServicesViewModel} from './create-or-edit-services-view.model'
import {styles} from './create-or-edit-services-view.style'

const navbarActiveCategory = navBarActiveCategory.NAVBAR_REQUESTS
const navbarActiveSubCategory = navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS
@observer
export class CreateOrEditServicesViewRaw extends Component {
  viewModel = new CreateOrEditServicesViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  render() {
    const {drawerOpen, requestToEdit, pathname, onTriggerDrawerOpen, onClickCreateBtn, onClickBackBtn, onClickEditBtn} =
      this.viewModel

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
          <Appbar title={t(TranslationKey['Create service'])} setDrawerOpen={onTriggerDrawerOpen}>
            <MainContent>
              <div className={classNames.root}>
                <CreateOrEditServiceContent
                  pathname={pathname}
                  data={requestToEdit}
                  onClickCreateBtn={onClickCreateBtn}
                  onClickEditBtn={onClickEditBtn}
                  onClickBackBtn={onClickBackBtn}
                />
              </div>
            </MainContent>
          </Appbar>
        </Main>
      </React.Fragment>
    )
  }
}

export const CreateOrEditServicesView = withStyles(CreateOrEditServicesViewRaw, styles)
