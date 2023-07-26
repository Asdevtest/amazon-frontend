import { observer } from 'mobx-react'
import { useClassNames } from './bind-idea-to-request-form.styles'
import { FC } from 'react'
import { t } from '@utils/translations'
import { TranslationKey } from '@constants/translations/translation-key'
import { MemoDataGrid } from '@components/shared/memo-data-grid'

interface BindIdeaToRequestFormProps {
  requests: {
    _id: string
    humanFriendlyId: number
    typeTask: number
    title: string
    status: string
  }
}

export const BindIdeaToRequestForm: FC<BindIdeaToRequestFormProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { requests } = props

  return (
    <div className={classNames.root}>
      <p> {t(TranslationKey['Link requests'])}</p>

      <div className={classNames.tableWrapper}>
        {/* <MemoDataGrid
          hideFooter
          rows={
            curStorekeeper.tariffLogistics?.length
              ? supplierWeightBasedApproximateCalculationsDataConverter(
                  curStorekeeper.tariffLogistics,
                  product,
                  supplier,
                  volumeWeightCoefficient,
                )
              : []
          }
          columns={SupplierWeightBasedApproximateCalculationsFormColumns(destinationData)}
          getRowHeight={() => 'auto'}
        /> */}
      </div>
    </div>
  )
})
