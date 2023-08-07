/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { CreateOrEditServiceContent } from '@components/contents/create-or-edit-services-content/create-or-edit-services-content'

import { CreateOrEditServicesViewModel } from './create-or-edit-services-view.model'
import { styles } from './create-or-edit-services-view.style'

export const CreateOrEditServicesViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new CreateOrEditServicesViewModel({
        history: props.history,
        location: props.location,
      }),
  )
  const { classes: classNames } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <React.Fragment>
      <div>
        <div className={classNames.root}>
          <CreateOrEditServiceContent
            pathname={viewModel.pathname}
            userInfo={viewModel.userInfo}
            data={viewModel.requestToEdit}
            onClickCreateBtn={viewModel.onClickCreateBtn}
            onClickEditBtn={viewModel.onClickEditBtn}
            onClickBackBtn={viewModel.onClickBackBtn}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

export const CreateOrEditServicesView = withStyles(observer(CreateOrEditServicesViewRaw), styles)
