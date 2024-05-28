import { Button, Checkbox, Input, Select } from 'antd'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomInputNumber } from '@components/shared/custom-input-number'

import { t } from '@utils/translations'

import { useStyles } from './report-modal.style'

import { ReportModalModel } from './report-modal.model'

const { TextArea } = Input

interface ReportModalProps {
  productId: string
  onClose: () => void
}

export const ReportModal: FC<ReportModalProps> = observer(props => {
  const { productId, onClose } = props

  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new ReportModalModel(productId))

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
          rows={viewModel.launches}
          rowCount={viewModel.launches.length}
          columns={viewModel.columnsModel}
          getRowHeight={() => 'auto'}
          columnHeaderHeight={32}
          getRowId={({ _id }: GridRowModel) => _id}
          slots={null}
          className={styles.dataGridRoot}
        />
      </div>

      <div className={styles.flexRowContainer}>
        <div className={cx(styles.fieldContainer, styles.inputContainer)}>
          <p className={styles.label}>{t(TranslationKey['New price'])}</p>
          <CustomInputNumber
            addonAfter="$"
            controls={false}
            placeholder={t(TranslationKey.Enter)}
            value={viewModel.newProductPrice}
            onChange={viewModel.onChangeNewProductPrice}
          />
        </div>

        <div className={cx(styles.fieldContainer, styles.textareaContainer)}>
          <p className={styles.label}>{t(TranslationKey.Comment)}</p>
          <TextArea
            rows={3}
            placeholder={t(TranslationKey.Enter)}
            style={{ resize: 'none' }}
            value={viewModel.description}
            onChange={viewModel.onChangeDescription}
          />
        </div>
      </div>

      <div className={cx(styles.flexRowContainer, styles.alignCenter)}>
        <Checkbox className={styles.checkbox}>{t(TranslationKey['Add changes to the product'])}</Checkbox>

        <div className={styles.flexRowContainer}>
          <Button type="primary">{t(TranslationKey.Save)}</Button>
          <Button danger onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
})
