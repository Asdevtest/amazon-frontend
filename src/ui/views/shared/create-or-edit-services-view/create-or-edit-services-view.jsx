/* eslint-disable no-unused-vars */
import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {CreateOrEditServiceContent} from '@components/contents/create-or-edit-services-content/create-or-edit-services-content'
import {MainContent} from '@components/layout/main-content'

import {CreateOrEditServicesViewModel} from './create-or-edit-services-view.model'
import {styles} from './create-or-edit-services-view.style'

@observer
export class CreateOrEditServicesViewRaw extends Component {
  viewModel = new CreateOrEditServicesViewModel({
    history: this.props.history,
    location: this.props.location,
  })

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {requestToEdit, pathname, userInfo, onClickCreateBtn, onClickBackBtn, onClickEditBtn} = this.viewModel

    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div className={classNames.root}>
            <CreateOrEditServiceContent
              pathname={pathname}
              userInfo={userInfo}
              data={requestToEdit}
              onClickCreateBtn={onClickCreateBtn}
              onClickEditBtn={onClickEditBtn}
              onClickBackBtn={onClickBackBtn}
            />
          </div>
        </MainContent>
      </React.Fragment>
    )
  }
}

export const CreateOrEditServicesView = withStyles(CreateOrEditServicesViewRaw, styles)
