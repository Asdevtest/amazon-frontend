import React from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'
import AcUnitIcon from '@material-ui/icons/AcUnit'

import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {useClassNames} from './tested.style'

export const Tested = () => {
  const classNames = useClassNames()

  const CheckedStrategyRow = ({label, icon}) => (
    <Box className={classNames.checkedStrategyRow} mb={1}>
      {icon ? icon : <AcUnitIcon className={classNames.acUnitIcon} />}
      <Typography className={classNames.text}>{label}</Typography>
    </Box>
  )

  return (
    <Paper elevation={0} className={classNames.paper}>
      <Typography className={classNames.title}>{t(TranslationKey['Passed the strategy test'])}</Typography>
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <CheckedStrategyRow label={t(TranslationKey.Flipping)} />
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <CheckedStrategyRow label={t(TranslationKey['Dropshipping from eBay'])} />
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <CheckedStrategyRow label={t(TranslationKey['Wholesale USA'])} />
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <CheckedStrategyRow label={'Private Label'} />
    </Paper>
  )
}
