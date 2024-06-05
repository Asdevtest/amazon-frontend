import { observer } from 'mobx-react'
import { FC, useCallback, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomTextarea } from '@components/shared/custom-textarea'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './report-modal.style'

import { Buttons, Header } from './components'
import { ReportModalModel } from './report-modal.model'

interface ReportModalProps {
  product: IProduct
  onClose: () => void
  reportId?: string
  onUpdateTableData?: () => void
}

export const ReportModal: FC<ReportModalProps> = observer(props => {
  const { product, onClose, reportId, onUpdateTableData } = props

  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new ReportModalModel({ product, reportId }))

  const handleSave = useCallback(() => {
    reportId ? viewModel.updateListingReport() : viewModel.createListingReport()
    onClose()
    onUpdateTableData?.()
  }, [])

  return (
    <div className={styles.wrapper}>
      <Header
        product={product}
        editMode={!!reportId}
        launchOptions={viewModel.launchOptions}
        selectLaunchValue={viewModel.selectLaunchValue}
        requests={viewModel.requests}
        onRemoveRequest={viewModel.onRemoveRequest}
        onSelectLaunch={viewModel.onSelectLaunch}
      />

      <div className={styles.tableContainer}>
        <CustomDataGrid
          disableRowSelectionOnClick
          rows={viewModel.launches}
          rowCount={viewModel.launches.length}
          columns={viewModel.columnsModel}
          getRowHeight={() => 'auto'}
          columnHeaderHeight={35}
          getRowId={({ type }: GridRowModel) => type}
          slots={null}
          className={styles.dataGridRoot}
          loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
        />
      </div>

      <div className={styles.flexRowContainer}>
        <div className={styles.inputContainer}>
          <CustomInputNumber
            addonAfter="$"
            precision={2}
            label="New price"
            placeholder="Enter"
            maxLength={10}
            value={viewModel.newProductPrice}
            onChange={viewModel.onChangeNewProductPrice}
          />
        </div>

        <div className={styles.textareaContainer}>
          <CustomTextarea
            rows={3}
            maxLength={1024}
            label="Comment"
            placeholder="Enter"
            value={viewModel.description}
            onChange={viewModel.onChangeDescription}
          />
        </div>
      </div>

      <Buttons
        disabledSaveButton={viewModel.disabledSaveButton}
        requestStatus={viewModel.requestStatus}
        onSave={handleSave}
        onClose={onClose}
      />
    </div>
  )
})
