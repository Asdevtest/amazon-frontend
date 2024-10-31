import { observer } from 'mobx-react'

import { Box } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomList } from '@components/shared/custom-list'

import { formatDateDayMonthYear, formatDateDistanceFromNowStrict } from '@utils/date-time'
import { t } from '@utils/translations'

import { useStyles } from './business-info.style'

export const BusinessInfo = observer(({ data }) => {
  const { classes: styles } = useStyles()

  return (
    <Box className={styles.businessInfoWrapper}>
      <p className={styles.businessInfoTitle}>{t(TranslationKey['Business Started'])}</p>

      <div>
        <p className={styles.businessInfoDate}>{formatDateDayMonthYear(data.businessStartDate)}</p>
        <p className={styles.businessInfoDateAgo}>{formatDateDistanceFromNowStrict(data.businessStartDate)}</p>
      </div>
      <div>
        <CustomList title={t(TranslationKey['Assets included in the sale'])} dataList={data?.shopAssets} />
      </div>
    </Box>
  )
})
