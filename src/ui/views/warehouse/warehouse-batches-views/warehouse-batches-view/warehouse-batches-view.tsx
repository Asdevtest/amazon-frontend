import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './warehouse-batches-view.style'

interface WarehouseBatchesViewProps {
  history: HistoryType
}

export const WarehouseBatchesView: FC<WarehouseBatchesViewProps> = memo(({ history }) => {
  const { classes: styles } = useStyles()

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</p>
      <div className={styles.buttons}>
        <CustomButton block type="primary" onClick={() => history?.push('/warehouse/batches/awaiting-batches')}>
          {t(TranslationKey['Awaiting send'])}
        </CustomButton>

        <CustomButton block type="primary" onClick={() => history?.push('/warehouse/batches/sent-batches')}>
          {t(TranslationKey.Sent)}
        </CustomButton>
      </div>
    </>
  )
})
