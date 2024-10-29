import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { styles } from './client-batches-view.style'

import { ClientBatchesViewModel } from './client-batches-view.model'

export const ClientBatchesViewRaw = props => {
  const viewModel = useMemo(() => new ClientBatchesViewModel({ history: props.history }), [])
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</p>

      <div className={styles.btnsWrapper}>
        <CustomButton variant="outlined" onClick={viewModel.onClickAwaitingSend}>
          {t(TranslationKey['Awaiting send'])}
        </CustomButton>

        <CustomButton variant="outlined" onClick={viewModel.onClickSentBatches}>
          {t(TranslationKey['Sent boxes'])}
        </CustomButton>
      </div>
    </>
  )
}

export const ClientBatchesView = withStyles(observer(ClientBatchesViewRaw), styles)
