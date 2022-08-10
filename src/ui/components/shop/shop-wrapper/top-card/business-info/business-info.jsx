import React from 'react'

import {Box, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {CustomList} from '@components/custom-list'

import {formatDateDayMonthYear, formatDateDistanceFromNowStrict} from '@utils/date-time'

import {useClassNames} from './business-info.style'

export const BusinessInfo = observer(({data}) => {
  const classNames = useClassNames()

  return (
    <Box className={classNames.businessInfoWrapper}>
      <Typography className={classNames.businessInfoTitle}>{'Бизнес начат'}</Typography>

      <div>
        <Typography className={classNames.businessInfoDate}>
          {formatDateDayMonthYear(data.businessStartDate)}
        </Typography>
        <Typography className={classNames.businessInfoDateAgo}>
          {formatDateDistanceFromNowStrict(data.businessStartDate)}
        </Typography>
      </div>
      <div>
        <CustomList title="Активы, включенные в продажу" dataList={data?.shopAssets} />
      </div>
    </Box>
  )
})
