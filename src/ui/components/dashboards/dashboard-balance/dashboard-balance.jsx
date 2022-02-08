import React from 'react'

import {Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {useClassNames} from '@components/dashboards/dashboard-balance/dashboard-balance.style'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getThousandsSeparatedString} from '@utils/get-thousands-separated-string'
import {toFixed, withDollarSign} from '@utils/text'

const textConsts = getLocalizedTexts(texts, 'en').dashboardBalance

export const DashboardBalance = ({balance}) => {
  const classNames = useClassNames()
  return (
    <>
      <Typography paragraph variant="h6">
        {textConsts.balance}
      </Typography>
      <Typography className={classNames.balanceTitle}>
        {withDollarSign(getThousandsSeparatedString(toFixed(balance, 2), ' '))}
      </Typography>
    </>
  )
}
