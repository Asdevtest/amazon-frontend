import React from 'react'

import {Paper, Typography} from '@material-ui/core'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {t} from '@utils/translations'

import {useClassNames} from './feedback-card.style'

export const FeedbackCard = ({isPositive, counter}) => {
  const classNames = useClassNames()
  return (
    <Paper
      className={clsx(classNames.paper, {
        [classNames.selected]: isPositive === true,
      })}
    >
      <div className={classNames.thumbContainer}>
        <Typography className={classNames.text}>
          {isPositive ? t(TranslationKey.Positives) : t(TranslationKey.Negative)}
        </Typography>

        <Typography
          className={clsx(classNames.countTypo, {
            [classNames.selectedCount]: isPositive === true,
          })}
        >
          {isPositive ? '+' + counter : '-' + counter}
        </Typography>

        <ThumbUpAltOutlinedIcon
          className={clsx(classNames.thumbUpAltOutlinedIcon, {
            [classNames.selectedThumbUpAlt]: isPositive === true,
          })}
        />
      </div>
    </Paper>
  )
}
