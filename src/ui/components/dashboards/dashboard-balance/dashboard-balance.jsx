/* eslint-disable no-unused-vars */
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { useClassNames } from '@components/dashboards/dashboard-balance/dashboard-balance.style'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const DashboardBalance = ({ user, title }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div>
      {title ? <Typography className={classNames.title}>{title}</Typography> : null}
      <div className={classNames.balanceWrapper}>
        <Typography className={classNames.balanceTitle}>{toFixedWithDollarSign(user.balance, 2)}</Typography>
        {user.balanceFreeze !== 0 && (
          <Typography className={classNames.balanceFreeze}>{`(${toFixedWithDollarSign(user.balanceFreeze, 2)} ${t(
            TranslationKey.freeze,
          )})`}</Typography>
        )}
      </div>
    </div>
  )
}
