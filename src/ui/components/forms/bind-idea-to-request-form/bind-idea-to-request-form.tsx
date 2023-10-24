import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useClassNames } from './bind-idea-to-request-form.styles'

import { bindIdeaToRequestColumns } from './bind-idea-to-request-columns/bind-idea-to-request-columns'

interface BindIdeaToRequestFormProps {
  requests: {
    _id: string
    humanFriendlyId: number
    typeTask: number
    title: string
    status: string
  }
  onClickBindButton: (selectedRequests: Array<string>) => void
}

export const BindIdeaToRequestForm: FC<BindIdeaToRequestFormProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { requests, onClickBindButton } = props
  const [selectedRequests, setSelectedRequests] = useState([])

  return (
    <div className={classNames.root}>
      <p className={classNames.title}>{t(TranslationKey['Link requests'])}</p>

      <div className={classNames.tableWrapper}>
        <MemoDataGrid
          checkboxSelection
          localeText={getLocalizationByLanguageTag()}
          rows={requests}
          columns={bindIdeaToRequestColumns()}
          getRowHeight={() => 'auto'}
          onRowSelectionModelChange={setSelectedRequests}
        />
      </div>

      <div className={classNames.buttonWrapper}>
        <Button disabled={!selectedRequests.length} onClick={() => onClickBindButton(selectedRequests)}>
          {t(TranslationKey['Link request'])}
        </Button>
      </div>
    </div>
  )
})
