import { MdOutlineThumbUpAlt } from 'react-icons/md'

import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './feedback-card.style'

export const FeedbackCard = ({ isPositive, counter }) => {
  const { classes: styles, cx } = useStyles()
  return (
    <Paper
      className={cx(styles.paper, {
        [styles.selected]: isPositive === true,
      })}
    >
      <div className={styles.thumbContainer}>
        <Typography className={styles.text}>
          {isPositive ? t(TranslationKey.Positives) : t(TranslationKey.Negative)}
        </Typography>

        <Typography
          className={cx(styles.countTypo, {
            [styles.selectedCount]: isPositive === true,
          })}
        >
          {isPositive ? '+' + counter : '-' + counter}
        </Typography>

        <MdOutlineThumbUpAlt
          size={24}
          className={cx(styles.thumbUpAltOutlinedIcon, {
            [styles.selectedThumbUpAlt]: isPositive === true,
          })}
        />
      </div>
    </Paper>
  )
}
