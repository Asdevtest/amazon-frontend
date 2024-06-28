import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { ArrowRightIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { styles } from './warehouse-batches-view.style'

import { WarehouseBatchesViewModel } from './warehouse-batches-view.model'

export const WarehouseBatchesViewRaw = props => {
  const [viewModel] = useState(() => new WarehouseBatchesViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</p>

      <div className={styles.btnsWrapper}>
        <Button styleType={ButtonStyle.SUCCESS} onClick={viewModel.onClickAwaitingBatches}>
          {t(TranslationKey['Awaiting send'])}
        </Button>

        <Button styleType={ButtonStyle.SUCCESS} onClick={viewModel.onClickSentBatches}>
          {t(TranslationKey.Sent)}
        </Button>
      </div>
    </>
  )
}

export const WarehouseBatchesView = withStyles(observer(WarehouseBatchesViewRaw), styles)
