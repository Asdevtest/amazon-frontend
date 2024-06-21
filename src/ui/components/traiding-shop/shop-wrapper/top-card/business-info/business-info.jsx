import { observer } from 'mobx-react'

import { Box, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomList } from '@components/shared/custom-list'

import { formatDateDayMonthYear, formatDateDistanceFromNowStrict } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './business-info.style'

export const BusinessInfo = observer(({ data }) => {
  const { classes: styles } = useStyles()

  return (
    <Box className={styles.businessInfoWrapper}>
      <Typography className={styles.businessInfoTitle}>{t(TranslationKey['Business Started'])}</Typography>

      <div>
        <Typography className={styles.businessInfoDate}>{formatDateDayMonthYear(data.businessStartDate)}</Typography>
        <Typography className={styles.businessInfoDateAgo}>
          {formatDateDistanceFromNowStrict(data.businessStartDate)}
        </Typography>
      </div>
      <div>
        <CustomList title={t(TranslationKey['Assets included in the sale'])} dataList={data?.shopAssets} />
      </div>
    </Box>
  )
})
