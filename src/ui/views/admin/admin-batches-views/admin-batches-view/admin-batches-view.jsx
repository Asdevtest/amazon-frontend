import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './admin-batches-view.style'

import { AdminBatchesViewModel } from './admin-batches-view.model'

export const AdminBatchesViewRaw = props => {
  const [viewModel] = useState(() => new AdminBatchesViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <div>
        <div>
          <Typography className={styles.title}>{t(TranslationKey['Choose a section in Batches'])}</Typography>

          <div className={styles.btnsWrapper}>
            <Button
              className={styles.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickAwaitingBatches}
            >
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Awaiting send'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={styles.button} color="primary" variant="outlined" onClick={viewModel.onClickSentBatches}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey.Sent)}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const AdminBatchesView = withStyles(observer(AdminBatchesViewRaw), styles)
