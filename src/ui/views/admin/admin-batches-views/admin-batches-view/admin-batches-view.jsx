import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { ArrowRightIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './admin-batches-view.style'

import { AdminBatchesViewModel } from './admin-batches-view.model'

export const AdminBatchesViewRaw = props => {
  const [viewModel] = useState(() => new AdminBatchesViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</p>

      <div className={styles.btnsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickAwaitingBatches}>
          {t(TranslationKey['Awaiting send'])}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickSentBatches}>
          {t(TranslationKey.Sent)}
        </Button>
      </div>
    </>
  )
}

export const AdminBatchesView = withStyles(observer(AdminBatchesViewRaw), styles)
