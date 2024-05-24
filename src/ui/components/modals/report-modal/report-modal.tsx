import { FC, memo, useState } from 'react'
import { Button, Checkbox, Input } from 'rsuite'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSelectPicker } from '@components/shared/selects/custom-select-picker/custom-select-picker'

import { t } from '@utils/translations'

import { useStyles } from './report-modal.style'

import { ReportModalModel } from './report-modal.model'

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
  const launchTypePlaceholder = `+ ${t(TranslationKey['Select launch type'])}`

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{modalTitle}</p>

      <div className={styles.flexRowContainer}>
        <CustomSelectPicker data={[]} placeholder={t(TranslationKey['Select ASIN'])} />

        <CustomSelectPicker data={[]} placeholder={launchTypePlaceholder} />
      </div>

      <div className={styles.tableContainer}>
        <CustomDataGrid
          rows={[]}
          columns={[]}
          getRowHeight={() => 'auto'}
          columnHeaderHeight={40}
          getRowId={({ _id }: GridRowModel) => _id}
          slotProps={{
            baseTooltip: {
              title: t(TranslationKey.Filter),
            },
          }}
        />
      </div>

      <div className={styles.flexRowContainer}>
        <div className={cx(styles.fieldContainer, styles.inputContainer)}>
          <p className={styles.label}>{t(TranslationKey['New price'])}</p>
          <Input placeholder={t(TranslationKey['New price'])} />
        </div>

        <div className={cx(styles.fieldContainer, styles.textareaContainer)}>
          <p className={styles.label}>{t(TranslationKey.Comment)}</p>
          <Input as="textarea" rows={3} placeholder={t(TranslationKey.Comment)} style={{ resize: 'none' }} />
        </div>
      </div>

      <div className={cx(styles.flexRowContainer, styles.alignCenter)}>
        <Checkbox className={styles.checkbox}>{t(TranslationKey['Add changes to the product'])}</Checkbox>

        <div className={styles.flexRowContainer}>
          <Button appearance="primary" color="green">
            {t(TranslationKey.Save)}
          </Button>
          <Button appearance="ghost" color="red" onClick={onClose}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </div>
  )
})
