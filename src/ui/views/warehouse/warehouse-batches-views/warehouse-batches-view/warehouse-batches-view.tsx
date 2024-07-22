import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './warehouse-batches-view.style'

const paths = {
  awaitingBatches: '/warehouse/batches/awaiting-batches',
  sentBatches: '/warehouse/batches/sent-batches',
}

interface WarehouseBatchesViewProps {
  history: HistoryType
}

export const WarehouseBatchesView: FC<WarehouseBatchesViewProps> = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const handleClickAwaitingBatches = () => history?.push({ pathname: paths.awaitingBatches })
  const handleClickSentBatches = () => history?.push({ pathname: paths.sentBatches })

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</p>

      <CustomButton block type="primary" onClick={handleClickAwaitingBatches}>
        {t(TranslationKey['Awaiting send'])}
      </CustomButton>

      <CustomButton block type="primary" onClick={handleClickSentBatches}>
        {t(TranslationKey.Sent)}
      </CustomButton>
    </div>
  )
})
