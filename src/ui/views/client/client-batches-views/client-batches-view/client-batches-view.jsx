import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { ArrowRightIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './client-batches-view.style'

import { ClientBatchesViewModel } from './client-batches-view.model'

export const ClientBatchesViewRaw = props => {
  const [viewModel] = useState(() => new ClientBatchesViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</p>

      <div className={styles.btnsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickAwaitingSend}>
          {t(TranslationKey['Awaiting send'])}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickSentBatches}>
          {t(TranslationKey['Sent boxes'])}
        </Button>
      </div>
    </>
  )
}

export const ClientBatchesView = withStyles(observer(ClientBatchesViewRaw), styles)
