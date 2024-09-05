import { observer } from 'mobx-react'
import { useState } from 'react'

import { CreateOrEditServiceContent } from '@components/contents/create-or-edit-services-content/create-or-edit-services-content'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './create-or-edit-services-view.style'

import { CreateOrEditServicesViewModel } from './create-or-edit-services-view.model'

export const CreateOrEditServicesView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new CreateOrEditServicesViewModel(history))

  return (
    <div className={styles.root}>
      <CreateOrEditServiceContent
        // @ts-ignore
        pathname={history.location.pathname}
        data={viewModel.requestToEdit}
        specs={viewModel.userInfo?.allowedSpec}
        onClickCreateBtn={viewModel.onClickCreateBtn}
        onClickEditBtn={viewModel.onClickEditBtn}
        onClickBackBtn={viewModel.onClickBackBtn}
      />
    </div>
  )
})
