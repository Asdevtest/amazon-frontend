import { useEffect, useState } from 'react'

import { CreateOrEditServiceContent } from '@components/contents/create-or-edit-services-content/create-or-edit-services-content'

import { useStyles } from './create-or-edit-services-view.style'

import { CreateOrEditServicesViewModel } from './create-or-edit-services-view.model'

export const CreateOrEditServicesView = ({ history, location }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new CreateOrEditServicesViewModel({ history, location }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className={styles.root}>
      <CreateOrEditServiceContent
        pathname={viewModel.pathname}
        userInfo={viewModel.userInfo}
        data={viewModel.requestToEdit}
        onClickCreateBtn={viewModel.onClickCreateBtn}
        onClickEditBtn={viewModel.onClickEditBtn}
        onClickBackBtn={viewModel.onClickBackBtn}
      />
    </div>
  )
}
