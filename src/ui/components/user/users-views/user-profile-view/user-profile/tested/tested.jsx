import CheckIcon from '@mui/icons-material/Check'
import { Box, Paper, Typography } from '@mui/material'

import { humanFriendlyStategyStatus, mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useClassNames } from './tested.style'

export const Tested = ({ user }) => {
  const { classes: classNames } = useClassNames()

  const CheckedStrategyRow = ({ label, icon }) => (
    <>
      <Box className={classNames.checkedStrategyRow} mb={1}>
        {icon ? icon : <CheckIcon className={classNames.acUnitIcon} />}
        <Typography className={classNames.text}>{label}</Typography>
      </Box>
    </>
  )

  return (
    <Paper elevation={0} className={classNames.paper}>
      <Typography className={classNames.title}>{t(TranslationKey['Passed the strategy test'])}</Typography>

      {user.allowedStrategies.length ? (
        user.allowedStrategies?.map((strategy, i) => (
          <CheckedStrategyRow key={i} label={humanFriendlyStategyStatus(mapProductStrategyStatusEnum[strategy])} />
        ))
      ) : (
        <Typography className={classNames.miss}>{t(TranslationKey['No passed strategies'])}</Typography>
      )}
    </Paper>
  )
}
