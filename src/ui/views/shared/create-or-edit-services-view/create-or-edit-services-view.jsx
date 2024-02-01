import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import { CreateOrEditServiceContent } from '@components/contents/create-or-edit-services-content/create-or-edit-services-content'

import { useStyles } from './create-or-edit-services-view.style'

import { CreateOrEditServicesViewModel } from './create-or-edit-services-view.model'

export const CreateOrEditServicesView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new CreateOrEditServicesViewModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <div className={styles.root}>
      <CreateOrEditServiceContent
        pathname={history.location.pathname}
        data={viewModel.requestToEdit}
        specs={viewModel.specs}
        onClickCreateBtn={viewModel.onClickCreateBtn}
        onClickEditBtn={viewModel.onClickEditBtn}
        onClickBackBtn={viewModel.onClickBackBtn}
      />
    </div>
  )
})
