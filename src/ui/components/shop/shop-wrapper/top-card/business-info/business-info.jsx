import React from 'react'

import {Box, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {CustomList} from '@components/custom-list'

import {formatDateDayMonthYear, formatDateDistanceFromNowStrict} from '@utils/date-time'
import {t} from '@utils/translations'

import {useClassNames} from './business-info.style'

export const BusinessInfo = observer(({data}) => {
  const classNames = useClassNames()

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
