import CheckIcon from '@mui/icons-material/Check'
import { Box, Paper, Typography } from '@mui/material'

import { humanFriendlyStategyStatus, mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './tested.style'

export const Tested = ({ user }) => {
  const { classes: styles } = useStyles()

  const CheckedStrategyRow = ({ label, icon }) => (
    <>
      <Box className={styles.checkedStrategyRow} mb={1}>
        {icon ? icon : <CheckIcon className={styles.acUnitIcon} />}
        <Typography className={styles.text}>{label}</Typography>
      </Box>
    </>
  )

  return (
    <Paper elevation={0} className={styles.paper}>
      <Typography className={styles.title}>{t(TranslationKey['Passed the strategy test'])}</Typography>

      {user.allowedStrategies.length ? (
        user.allowedStrategies?.map((strategy, i) => (
          <CheckedStrategyRow key={i} label={humanFriendlyStategyStatus(mapProductStrategyStatusEnum[strategy])} />
        ))
      ) : (
        <Typography className={styles.miss}>{t(TranslationKey['No passed strategies'])}</Typography>
      )}
    </Paper>
  )
}
