import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { styles } from './admin-batches-view.style'

import { AdminBatchesViewModel } from './admin-batches-view.model'

export const AdminBatchesViewRaw = props => {
  const viewModel = useMemo(() => new AdminBatchesViewModel({ history: props.history }), [])
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</p>

      <div className={styles.btnsWrapper}>
        <CustomButton variant="outlined" onClick={viewModel.onClickAwaitingBatches}>
          {t(TranslationKey['Awaiting send'])}
        </CustomButton>

        <CustomButton variant="outlined" onClick={viewModel.onClickSentBatches}>
          {t(TranslationKey.Sent)}
        </CustomButton>
      </div>
    </>
  )
}

export const AdminBatchesView = withStyles(observer(AdminBatchesViewRaw), styles)
