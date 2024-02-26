import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './client-batches-view.style'

import { ClientBatchesViewModel } from './client-batches-view.model'

export const ClientBatchesViewRaw = props => {
  const [viewModel] = useState(() => new ClientBatchesViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <div>
        <div>
          <Typography className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</Typography>

          <div className={styles.btnsWrapper}>
            <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickAwaitingSend}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Awaiting send'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickSentBatches}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Sent boxes'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const ClientBatchesView = withStyles(observer(ClientBatchesViewRaw), styles)
