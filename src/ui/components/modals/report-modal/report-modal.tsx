import { Button, Checkbox, Input, Select } from 'antd'
import { FC, memo, useState } from 'react'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'

import { t } from '@utils/translations'

import { useStyles } from './report-modal.style'

import { ReportModalModel } from './report-modal.model'

const { TextArea } = Input

interface ReportModalProps {
  onClose: () => void
}

export const ReportModal: FC<ReportModalProps> = memo(props => {
  const { onClose } = props

  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new ReportModalModel())

  const modalTitle = `${viewModel.editMode ? t(TranslationKey.Edit) : t(TranslationKey.New)} ${t(
    TranslationKey['report by the product'],
  )}`
  const launchTypePlaceholder = `＋ ${t(TranslationKey['Select launch type'])}`

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{modalTitle}</p>

      <div className={styles.flexRowContainer}>
        <Select
          showSearch
          placeholder={t(TranslationKey['Select ASIN'])}
          optionFilterProp="children"
          filterOption={filterOption}
          options={[]}
          className={styles.select}
        />

        <Select
          placeholder={launchTypePlaceholder}
          optionFilterProp="children"
          filterOption={filterOption}
          options={[]}
          className={styles.select}
        />
      </div>

      <div className={styles.tableContainer}>
        <CustomDataGrid
          rows={viewModel.currentData}
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
          <Input placeholder={t(TranslationKey.Enter)} />
        </div>

        <div className={cx(styles.fieldContainer, styles.textareaContainer)}>
          <p className={styles.label}>{t(TranslationKey.Comment)}</p>
          <TextArea rows={3} placeholder={t(TranslationKey.Enter)} style={{ resize: 'none' }} />
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
