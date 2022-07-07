import React from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'
import AcUnitIcon from '@material-ui/icons/AcUnit'

import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {useClassNames} from './tested.style'

export const Tested = ({user}) => {
  const classNames = useClassNames()

  const CheckedStrategyRow = ({label, icon}) => (
    <>
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <Box className={classNames.checkedStrategyRow} mb={1}>
        {icon ? icon : <AcUnitIcon className={classNames.acUnitIcon} />}
        <Typography className={classNames.text}>{label}</Typography>
      </Box>
    </>
  )

  return (
    <Paper elevation={0} className={classNames.paper}>
      <Typography className={classNames.title}>{t(TranslationKey['Passed the strategy test'])}</Typography>

      {user.allowedStrategies.length ? (
        user.allowedStrategies?.map((strategy, i) => (
          <CheckedStrategyRow key={i} label={mapProductStrategyStatusEnum[strategy]} />
        ))
      ) : (
        <Typography>{t(TranslationKey['No passed strategies'])}</Typography>
      )}
    </Paper>
  )
}
