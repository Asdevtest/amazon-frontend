import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { IIdea } from '@typings/models/ideas/idea'
import { ISpec } from '@typings/shared/spec'

import { useStyles } from './bind-idea-to-request-form.style'

import { bindIdeaToRequestColumns } from './bind-idea-to-request-columns/bind-idea-to-request-columns'

interface IRequest {
  _id: string
  xid: number
  spec: ISpec
  title: string
  status: string
}

interface BindIdeaToRequestFormProps {
  requests: IRequest[]
  onClickBindButton: (selectedRequests: string[], idea?: IIdea) => void
  idea?: IIdea
}

export const BindIdeaToRequestForm: FC<BindIdeaToRequestFormProps> = memo(({ requests, onClickBindButton, idea }) => {
  const { classes: styles } = useStyles()

  const [selectedRequests, setSelectedRequests] = useState([])

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Link requests'])}</p>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          checkboxSelection
          disableColumnMenu
          disableRowSelectionOnClick
          rows={requests}
          rowCount={requests.length}
          columns={bindIdeaToRequestColumns}
          getRowHeight={() => 'auto'}
          sx={{
            '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
          }}
          onRowSelectionModelChange={setSelectedRequests}
        />
      </div>

      <div className={styles.buttonWrapper}>
        <Button disabled={!selectedRequests.length} onClick={() => onClickBindButton(selectedRequests, idea)}>
          {t(TranslationKey['Link request'])}
        </Button>
      </div>
    </div>
  )
})
