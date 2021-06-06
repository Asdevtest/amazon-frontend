import React from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'
import AcUnitIcon from '@material-ui/icons/AcUnit'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './tested.style'

const textConsts = getLocalizedTexts(texts, 'ru').buerUserHeaderTested

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
      <Typography className={classNames.title}>{textConsts.mainTitle}</Typography>
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <CheckedStrategyRow label={textConsts.flipping} />
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <CheckedStrategyRow label={textConsts.dropShiping} />
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <CheckedStrategyRow label={textConsts.usa} />
      <Divider orientation={'horizontal'} className={classNames.divider} />
      <CheckedStrategyRow label={textConsts.privateLabel} />
    </Paper>
  )
}
