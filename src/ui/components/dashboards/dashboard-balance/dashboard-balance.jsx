import React from 'react'

import {Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {useClassNames} from '@components/dashboards/dashboard-balance/dashboard-balance.style'

import {getThousandsSeparatedString} from '@utils/get-thousands-separated-string'
import {toFixed, toFixedWithDollarSign, withDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export const DashboardBalance = ({user}) => {
  const classNames = useClassNames()
  return (
    <>
      <Typography paragraph variant="h6">
        {t(TranslationKey.Balance)}
      </Typography>
      <Typography className={classNames.balanceTitle}>
        {withDollarSign(getThousandsSeparatedString(toFixed(user.balance, 2), ' '))}
      </Typography>

      {user.balanceFreeze !== 0 && (
        <Typography className={classNames.balanceFreeze}>{`${toFixedWithDollarSign(
          user.balanceFreeze,
          2,
        )} -freeze`}</Typography>
      )}
    </>
  )
}
