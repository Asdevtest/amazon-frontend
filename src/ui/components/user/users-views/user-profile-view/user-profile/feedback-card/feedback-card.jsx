import { cx } from '@emotion/css'
import { Paper, Typography } from '@mui/material'

import React from 'react'

import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useClassNames } from './feedback-card.style'

export const FeedbackCard = ({ isPositive, counter }) => {
  const { classes: classNames } = useClassNames()
  return (
    <Paper
      className={cx(classNames.paper, {
        [classNames.selected]: isPositive === true,
      })}
    >
      <div className={classNames.thumbContainer}>
        <Typography className={classNames.text}>
          {isPositive ? t(TranslationKey.Positives) : t(TranslationKey.Negative)}
        </Typography>

        <Typography
          className={cx(classNames.countTypo, {
            [classNames.selectedCount]: isPositive === true,
          })}
        >
          {isPositive ? '+' + counter : '-' + counter}
        </Typography>

        <ThumbUpAltOutlinedIcon
          className={cx(classNames.thumbUpAltOutlinedIcon, {
            [classNames.selectedThumbUpAlt]: isPositive === true,
          })}
        />
      </div>
    </Paper>
  )
}
