import { observer } from 'mobx-react'
import { FC, useCallback, useMemo } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { RestartIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IIdea } from '@typings/models/ideas/idea'
import { IProduct } from '@typings/models/products/product'
import { IRequest } from '@typings/models/requests/request'

import { useStyles } from './link-request-form.style'

import { LinkRequestModel } from './link-request-form.model'

export interface LinkRequestFormProps {
  onClose: () => void
  product?: IProduct
  idea?: IIdea
  onAddRequest?: (request?: IRequest) => void
  onUpdateData?: () => void
}

export const LinkRequestForm: FC<LinkRequestFormProps> = observer(props => {
  const { onClose, idea, product, onAddRequest, onUpdateData } = props

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new LinkRequestModel(product, idea), [])

  const handleSave = useCallback(() => {
    if (idea) {
      viewModel.onBindIdeaToRequest()
      onUpdateData?.()
    } else {
      onAddRequest?.(viewModel.selectedRequest)
    }

    onClose?.()
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <p className={styles.title}>{t(TranslationKey['Link requests'])}</p>

        <div className={styles.buttons}>
          <CustomButton type="primary" onClick={viewModel.onClickCreateRequest}>
            {t(TranslationKey['Create request'])}
          </CustomButton>
          <CustomButton
            shape="circle"
            icon={<RestartIcon />}
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
            onClick={() => viewModel.getCurrentData()}
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <CustomDataGrid
          rows={viewModel.currentData}
          rowCount={viewModel.rowCount}
          columns={viewModel.columnsModel}
          getRowHeight={() => 'auto'}
          getRowId={({ _id }: GridRowModel) => _id}
          slots={null}
          onRowSelectionModelChange={viewModel.onSelectionModel}
        />
      </div>

      <div className={styles.buttons}>
        <CustomButton type="primary" disabled={viewModel.selectedRows.length === 0} onClick={handleSave}>
          {t(TranslationKey['Link request'])}
        </CustomButton>
        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
      </div>
    </div>
  )
})
