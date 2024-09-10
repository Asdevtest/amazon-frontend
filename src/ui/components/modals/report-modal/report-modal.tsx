import { observer } from 'mobx-react'
import { FC, useCallback, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './report-modal.style'

import { Buttons, Header } from './components'
import { ReportModalModel } from './report-modal.model'

interface ReportModalProps {
  onClose: () => void
  subView?: boolean
  reportId?: string
  defaultProduct?: IProduct
  onUpdateTableData?: () => void
}

export const ReportModal: FC<ReportModalProps> = observer(props => {
  const { onClose, subView, reportId, defaultProduct, onUpdateTableData } = props

  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ReportModalModel({ reportId, defaultProduct }))

  const handleSave = useCallback(async () => {
    viewModel.reportId ? await viewModel.updateListingReport() : await viewModel.createListingReport()
    onClose()
    onUpdateTableData?.()
  }, [])

  return (
    <div className={styles.wrapper}>
      <Header
        subView={subView}
        product={viewModel.product}
        asinOptions={viewModel.asinOptions}
        editMode={!!viewModel.reportId}
        launchOptions={viewModel.launchOptions}
        selectLaunchValue={viewModel.selectLaunchValue}
        requests={viewModel.requests}
        onRemoveRequest={viewModel.onRemoveRequest}
        onSelectLaunch={viewModel.onSelectLaunch}
        onSelectProduct={viewModel.onSelectProduct}
        onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
        onSearchAsinSelect={viewModel.onClickSubmitSearch}
        onPopupScroll={viewModel.onPopupScroll}
      />

      <CustomDataGrid
        disableRowSelectionOnClick
        rows={viewModel.launches}
        rowCount={viewModel.launches.length}
        columns={viewModel.columnsModel}
        getRowHeight={() => 'auto'}
        columnHeaderHeight={35}
        // getRowId={({ type }: GridRowModel) => type}
        getRowId={({ _id }: GridRowModel) => _id}
        slots={null}
        className={styles.dataGridRoot}
        loading={viewModel.requestTableStatus === loadingStatus.IS_LOADING}
        slotProps={{
          baseTooltip: {
            title: t(TranslationKey.Filter),
          },
        }}
      />

      <div className={styles.flexRowContainer}>
        <div className={styles.inputContainer}>
          <CustomInputNumber
            addonAfter="$"
            precision={2}
            label="New price"
            maxLength={10}
            value={viewModel.newProductPrice}
            onChange={viewModel.onChangeNewProductPrice}
          />
        </div>

        <div className={styles.textareaContainer}>
          <CustomTextarea
            required
            rows={3}
            maxLength={1024}
            label="Comment"
            value={viewModel.description}
            onChange={viewModel.onChangeDescription}
          />
        </div>
      </div>

      <Buttons disabledSaveButton={viewModel.disabledSaveButton} onSave={handleSave} onClose={onClose} />
    </div>
  )
})
