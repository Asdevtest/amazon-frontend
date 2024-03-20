import { Box, Divider, Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixedWithDollarSign, withText } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './info.style'

export const Info = ({ headerInfoData }) => {
  const { classes: styles, cx } = useStyles()

  const InfoRow = ({ label, value }) => (
    <Box className={styles.infoRow}>
      <Typography className={cx(styles.text, styles.typoLabel)}>{label}</Typography>
      <Typography className={cx(styles.text, styles.typoValue)}>{value}</Typography>
    </Box>
  )

  return (
    <Paper elevation={0} className={styles.paper}>
      <Typography className={styles.title}>{t(TranslationKey.Info)}</Typography>

      <Divider orientation={'horizontal'} className={styles.divider} />

      <InfoRow label={t(TranslationKey['Number of investors'])} value={headerInfoData.investorsCount} />
      <InfoRow label={t(TranslationKey['The products found'])} value={headerInfoData.goodsFound} />
      <InfoRow
        label={t(TranslationKey['Volume of transactions'])}
        value={toFixedWithDollarSign(headerInfoData.transactionsVolume)}
      />
      <InfoRow label={t(TranslationKey.Earned)} value={toFixedWithDollarSign(headerInfoData.earnedAmount)} />

      <Divider orientation={'horizontal'} className={styles.divider} />
      <InfoRow
        label={t(TranslationKey['Added to favorites'])}
        value={withText(headerInfoData.addInSave, t(TranslationKey.investors))}
      />

      <Divider orientation={'horizontal'} className={styles.divider} />
      <InfoRow
        label={t(TranslationKey.Blocked)}
        value={withText(headerInfoData.inBlocked, t(TranslationKey.investors))}
      />

      <Divider orientation={'horizontal'} className={styles.divider} />
      <InfoRow
        label={t(TranslationKey['Blocked by'])}
        value={withText(headerInfoData.youBlocked, t(TranslationKey.investors))}
      />

      <Divider orientation={'horizontal'} className={[styles.divider, styles.mobileDivider]} />
      <InfoRow label={t(TranslationKey['Account created'])} value={headerInfoData.accountCreateAt} />
    </Paper>
  )
}
