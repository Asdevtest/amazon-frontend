import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Select } from '@components/shared/selects/select'

import { t } from '@utils/translations'

import { useStyles } from './report-modal.style'

import { ReportModalModel } from './report-modal.model'

interface ReportModalProps {}

export const ReportModal: FC<ReportModalProps> = memo(props => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ReportModalModel())

  const modalTitle = `${viewModel.editMode ? t(TranslationKey.Edit) : t(TranslationKey.New)} ${t(
    TranslationKey['report by the product'],
  )}`

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{modalTitle}</p>

      <div>
        <Select items={[]} onChangeSelectedItem={() => console.log('test')} />
      </div>

      <div></div>

      <div></div>
    </div>
  )
})
