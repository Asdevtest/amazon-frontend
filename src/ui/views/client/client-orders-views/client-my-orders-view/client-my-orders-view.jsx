import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './client-my-orders-view.style'

import { ClientMyOrdersViewModel } from './client-my-orders-view.model'

export const ClientMyOrdersView = observer(({ history }) => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new ClientMyOrdersViewModel({ history }), [])

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in My orders'])}</p>

      <div className={styles.btnsWrapper}>
        <CustomButton variant="outlined" onClick={viewModel.onClickOrders}>
          {t(TranslationKey.Orders)}
        </CustomButton>

        <CustomButton variant="outlined" onClick={viewModel.onClickPendingOrders}>
          {t(TranslationKey['Pending orders'])}
        </CustomButton>
      </div>
    </>
  )
})
