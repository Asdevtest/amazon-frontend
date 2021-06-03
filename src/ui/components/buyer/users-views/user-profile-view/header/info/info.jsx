import React from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './info.style'

const textConsts = getLocalizedTexts(texts, 'ru').buyerUserHeaderInfo

export const Info = ({headerInfo}) => {
  const classNames = useClassNames()

  const InfoRow = ({label, value}) => (
    <Box className={classNames.infoRow}>
      <Typography className={(classNames.text, classNames.typoLabel)}>{label}</Typography>
      <Typography className={(classNames.text, classNames.typoValue)}>{value}</Typography>
    </Box>
  )

  return (
    <Paper elevation={0} className={classNames.paper}>
      <Typography className={classNames.title}>{textConsts.mainTitle}</Typography>

      <Divider orientation={'horizontal'} className={classNames.divider} />

      <InfoRow label={headerInfo.countInvestors.text} value={headerInfo.countInvestors.value} />
      <InfoRow label={headerInfo.foundGoods.text} value={headerInfo.foundGoods.value} />
      <InfoRow label={headerInfo.volumeTrans.text} value={headerInfo.volumeTrans.value} />
      <InfoRow label={headerInfo.earned.text} value={headerInfo.earned.value} />

      <Divider orientation={'horizontal'} className={classNames.divider} />
      <InfoRow label={headerInfo.addInSave.text} value={headerInfo.addInSave.value} />

      <Divider orientation={'horizontal'} className={classNames.divider} />
      <InfoRow label={headerInfo.inBlocked.text} value={headerInfo.inBlocked.value} />

      <Divider orientation={'horizontal'} className={classNames.divider} />
      <InfoRow label={headerInfo.youBlocked.text} value={headerInfo.youBlocked.value} />

      <Divider orientation={'horizontal'} className={classNames.divider} />
      <InfoRow label={headerInfo.createAc.text} value={headerInfo.createAc.value} />
    </Paper>
  )
}
