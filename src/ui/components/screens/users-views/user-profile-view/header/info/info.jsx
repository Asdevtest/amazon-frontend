import React from 'react'

import {Box, Divider, Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, withText} from '@utils/text'

import {useClassNames} from './info.style'

const textConsts = getLocalizedTexts(texts, 'ru').buyerUserHeaderInfo

export const Info = ({headerInfoData}) => {
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

      <InfoRow label={textConsts.investorsCount} value={headerInfoData.investorsCount} />
      <InfoRow label={textConsts.goodsFound} value={headerInfoData.goodsFound} />
      <InfoRow label={textConsts.transactionsVolume} value={toFixedWithDollarSign(headerInfoData.transactionsVolume)} />
      <InfoRow label={textConsts.earnedAmount} value={toFixedWithDollarSign(headerInfoData.earnedAmount)} />

      <Divider orientation={'horizontal'} className={classNames.divider} />
      <InfoRow label={textConsts.addInSave} value={withText(headerInfoData.addInSave, textConsts.investors)} />

      <Divider orientation={'horizontal'} className={classNames.divider} />
      <InfoRow label={textConsts.inBlocked} value={withText(headerInfoData.inBlocked, textConsts.investors)} />

      <Divider orientation={'horizontal'} className={classNames.divider} />
      <InfoRow label={textConsts.youBlocked} value={withText(headerInfoData.youBlocked, textConsts.investors)} />

      <Divider orientation={'horizontal'} className={classNames.divider} />
      <InfoRow label={textConsts.accountCreateAt} value={headerInfoData.accountCreateAt} />
    </Paper>
  )
}
