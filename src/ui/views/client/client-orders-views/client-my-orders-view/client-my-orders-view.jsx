import { observer } from 'mobx-react'
import { useState } from 'react'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './client-my-orders-view.style'

import { ClientMyOrdersViewModel } from './client-my-orders-view.model'

export const ClientMyOrdersView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientMyOrdersViewModel({ history }))

  return (
    <div>
      <Typography className={styles.title}>{t(TranslationKey['Choose a section in My orders'])}</Typography>

      <div className={styles.btnsWrapper}>
        <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickOrders}>
          <div className={styles.btnTextWrapper}>
            <Typography className={styles.btnText}>{t(TranslationKey.Orders)}</Typography>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button>

        <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickPendingOrders}>
          <div className={styles.btnTextWrapper}>
            <Typography className={styles.btnText}>{t(TranslationKey['Pending orders'])}</Typography>
            <ArrowRightAltIcon color="primary" />
          </div>
        </Button>
      </div>
    </div>
  )
})
