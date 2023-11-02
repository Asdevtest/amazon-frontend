import { observer } from 'mobx-react'
import React from 'react'

import { Box, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomList } from '@components/shared/custom-list'

import { formatDateDayMonthYear, formatDateDistanceFromNowStrict } from '@utils/date-time'
import { t } from '@utils/translations'

import { useClassNames } from './business-info.style'

export const BusinessInfo = observer(({ data }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Box className={classNames.businessInfoWrapper}>
      <Typography className={classNames.businessInfoTitle}>{t(TranslationKey['Business Started'])}</Typography>

      <div>
        <Typography className={classNames.businessInfoDate}>
          {formatDateDayMonthYear(data.businessStartDate)}
        </Typography>
        <Typography className={classNames.businessInfoDateAgo}>
          {formatDateDistanceFromNowStrict(data.businessStartDate)}
        </Typography>
      </div>
      <div>
        <CustomList title={t(TranslationKey['Assets included in the sale'])} dataList={data?.shopAssets} />
      </div>
    </Box>
  )
})
