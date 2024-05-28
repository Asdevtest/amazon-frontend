import { Button, Checkbox, Select } from 'antd'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './report-modal.style'

import { ReportModalModel } from './report-modal.model'

interface ReportModalProps {
  product: IProduct
  onClose: () => void
}

export const ReportModal: FC<ReportModalProps> = observer(props => {
  const { product, onClose } = props

  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new ReportModalModel(product))

  const modalTitle = `${viewModel.editMode ? t(TranslationKey.Edit) : t(TranslationKey.New)} ${t(
    TranslationKey['report by the product'],
  )}`
  const launchTypePlaceholder = `＋ ${t(TranslationKey['Select launch type'])}`

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{modalTitle}</p>

      <div className={styles.flexRowContainer}>
        <Select
          allowClear
          showSearch
          placeholder={t(TranslationKey['Select ASIN'])}
          options={[]}
          className={styles.select}
        />

        <Select
          allowClear
          loading={viewModel.launchOptions.length === 0}
          placeholder={launchTypePlaceholder}
          options={viewModel.launchOptions}
          className={styles.select}
          value={viewModel.selectLaunchValue}
          onChange={viewModel.onSelectLaunch}
        />
      </div>

      <div className={styles.tableContainer}>
        <CustomDataGrid
          disableRowSelectionOnClick
          rows={viewModel.launches}
          rowCount={viewModel.launches.length}
          columns={viewModel.columnsModel}
          getRowHeight={() => 'auto'}
          columnHeaderHeight={35}
          getRowId={({ _id }: GridRowModel) => _id}
          slots={null}
          className={styles.dataGridRoot}
        />
      </div>

      <div className={styles.flexRowContainer}>
        <div className={styles.inputContainer}>
          <CustomInputNumber
            addonAfter="$"
            label="New price"
            placeholder="Enter"
            value={viewModel.newProductPrice}
            onChange={viewModel.onChangeNewProductPrice}
          />
        </div>

        <div className={styles.textareaContainer}>
          <CustomTextarea
            rows={3}
            label="Comment"
            placeholder="Enter"
            value={viewModel.description}
            onChange={viewModel.onChangeDescription}
          />
        </div>
      </div>

      <div className={cx(styles.flexRowContainer, styles.alignCenter)}>
        <Checkbox disabled className={styles.checkbox}>
          {t(TranslationKey['Add changes to the product'])}
        </Checkbox>

        <div className={styles.flexRowContainer}>
          <Button
            loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
            type="primary"
            onClick={viewModel.createListingReport}
          >
            {t(TranslationKey.Save)}
          </Button>
          <Button danger onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
})
