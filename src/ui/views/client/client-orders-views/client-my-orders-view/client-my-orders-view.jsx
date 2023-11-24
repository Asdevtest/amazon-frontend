import { observer } from 'mobx-react'
import React, { useState } from 'react'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './client-my-orders-view.style'

import { ClientMyOrdersViewModel } from './client-my-orders-view.model'

export const ClientMyOrdersView = observer(props => {
  const [viewModel] = useState(() => new ClientMyOrdersViewModel({ history: props.history }))
  const { classes: styles } = useStyles()

  return (
    <div>
      <Typography className={styles.title}>{t(TranslationKey['Choose a section in My orders'])}</Typography>

      <div className={styles.btnsWrapper}>
        <Button className={styles.button} color="primary" variant="outlined" onClick={viewModel.onClickOrders}>
          <div className={styles.btnTextWrapper}>
            <Typography className={styles.btnText}>{t(TranslationKey.Orders)}</Typography>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button>

        <Button className={styles.button} color="primary" variant="outlined" onClick={viewModel.onClickPendingOrders}>
          <div className={styles.btnTextWrapper}>
            <Typography className={styles.btnText}>{t(TranslationKey['Pending orders'])}</Typography>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button>
      </div>
    </div>
  )
})
