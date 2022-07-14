/* eslint-disable no-unused-vars */
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
    <div className={classNames.balanceWrapper}>
      <Typography className={classNames.balanceTitle}>{toFixedWithDollarSign(user.balance, 2)}</Typography>
      {user.balanceFreeze !== 0 && (
        <Typography className={classNames.balanceFreeze}>{`${toFixedWithDollarSign(
          user.balanceFreeze,
          2,
        )} -freeze`}</Typography>
      )}
    </div>
  )
}
