import { TranslationKey } from '@constants/translations/translation-key'

import { useStyles } from '@components/dashboards/dashboard-balance/dashboard-balance.style'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const DashboardBalance = ({ user, isNotCurrentUser = false }) => {
  const { classes: styles } = useStyles()

  return (
    <div>
      <p className={styles.title}>
        {isNotCurrentUser ? t(TranslationKey["Users's balance"]) : t(TranslationKey['My balance'])}
      </p>

      <div className={styles.balanceWrapper}>
        <p className={styles.balanceTitle}>{toFixedWithDollarSign(user?.balance, 2)}</p>

        {user.balanceFreeze !== 0 && (
          <p className={styles.balanceFreeze}>{`(${toFixedWithDollarSign(user?.balanceFreeze, 2)} ${t(
            TranslationKey.freeze,
          )})`}</p>
        )}
      </div>
    </div>
  )
}
