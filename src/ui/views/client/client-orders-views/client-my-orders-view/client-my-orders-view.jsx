import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { ArrowRightIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './client-my-orders-view.style'

import { ClientMyOrdersViewModel } from './client-my-orders-view.model'

export const ClientMyOrdersView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new ClientMyOrdersViewModel({ history }))

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in My orders'])}</p>

      <div className={styles.btnsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickOrders}>
          {t(TranslationKey.Orders)}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickPendingOrders}>
          {t(TranslationKey['Pending orders'])}
        </Button>
      </div>
    </>
  )
})
