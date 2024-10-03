import { FaCheck } from 'react-icons/fa6'

import { Box } from '@mui/material'

import { humanFriendlyStategyStatus, productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './tested.style'

export const Tested = ({ user }) => {
  const { classes: styles } = useStyles()

  const CheckedStrategyRow = ({ label, icon }) => (
    <>
      <Box className={styles.checkedStrategyRow} mb={1}>
        {icon ? icon : <FaCheck className={styles.acUnitIcon} />}
        <p className={styles.text}>{label}</p>
      </Box>
    </>
  )

  return (
    <div elevation={0} className={styles.paper}>
      <p className={styles.title}>{t(TranslationKey['Passed the strategy test'])}</p>

      {user.allowedStrategies.length ? (
        user.allowedStrategies?.map((strategy, i) => (
          <CheckedStrategyRow key={i} label={humanFriendlyStategyStatus(productStrategyStatusesEnum[strategy])} />
        ))
      ) : (
        <p className={styles.miss}>{t(TranslationKey['No passed strategies'])}</p>
      )}
    </div>
  )
}
