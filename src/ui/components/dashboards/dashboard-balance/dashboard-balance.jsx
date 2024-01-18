import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { useStyles } from '@components/dashboards/dashboard-balance/dashboard-balance.style'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const DashboardBalance = ({ user, title }) => {
  const { classes: styles } = useStyles()
  return (
    <div>
      {title ? <Typography className={styles.title}>{title}</Typography> : null}
      <div className={styles.balanceWrapper}>
        <Typography className={styles.balanceTitle}>{toFixedWithDollarSign(user.balance, 2)}</Typography>
        {user.balanceFreeze !== 0 && (
          <Typography className={styles.balanceFreeze}>{`(${toFixedWithDollarSign(user.balanceFreeze, 2)} ${t(
            TranslationKey.freeze,
          )})`}</Typography>
        )}
      </div>
    </div>
  )
}
