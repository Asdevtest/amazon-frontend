/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo, useEffect, useState } from 'react'

import Tooltip from '@mui/material/Tooltip'

import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status'

import { minsToTime } from '@utils/text'

import { useStyles } from './progress-bar.style'

import { progressBarSettings } from './progress-bar-settings'

interface IdeaProgressBarProps {
  currentStatus: number
  ideaData?: any
  showStatusDuration?: boolean
}
interface IProgressBarSettings {
  title: () => string
  statuses: Array<ideaStatus>
  intervalName: string
}

export const IdeaProgressBar: FC<IdeaProgressBarProps> = memo(props => {
  const { showStatusDuration, currentStatus, ideaData } = props

  const { classes: styles, cx } = useStyles()

  const getInterval = (settingItem: IProgressBarSettings) =>
    settingItem?.intervalName === 'intervalStatusSearchFoundNotFound'
      ? (Number(ideaData?.intervalStatusSupplierFound) || 0) +
        (Number(ideaData?.intervalStatusSupplierNotFound) || 0) +
        (Number(ideaData?.intervalStatusSupplierSearch) || 0)
      : ideaData?.[settingItem?.intervalName] || 0

  const getStatusesToRender = () => {
    if (currentStatus === ideaStatusByKey[ideaStatus.REJECTED]) {
      return progressBarSettings.filter(
        settingItem =>
          settingItem.statuses.includes(ideaStatus.NEW) ||
          (getInterval(settingItem) && !settingItem.statuses.includes(ideaStatus.CLOSED)) ||
          settingItem.statuses.includes(ideaStatus.REJECTED),
      )
    } else if (currentStatus === ideaStatusByKey[ideaStatus.CLOSED]) {
      return progressBarSettings.filter(
        settingItem =>
          settingItem.statuses.includes(ideaStatus.NEW) ||
          (getInterval(settingItem) && !settingItem.statuses.includes(ideaStatus.REJECTED)) ||
          settingItem.statuses.includes(ideaStatus.CLOSED),
      )
    } else {
      return progressBarSettings.filter(
        settingItem =>
          !settingItem.statuses.includes(ideaStatus.REJECTED) && !settingItem.statuses.includes(ideaStatus.CLOSED),
      )
    }
  }

  const [statusesToRender, setStatusesToRender] = useState(getStatusesToRender())

  useEffect(() => {
    setStatusesToRender(getStatusesToRender())
  }, [currentStatus, ideaData])

  const checkIsActiveBarSetting = (barSetting: IProgressBarSettings) =>
    barSetting?.statuses?.some(setting => ideaStatusByKey[setting] <= currentStatus)

  const checkIsLastActiveBarSetting = (barSetting: IProgressBarSettings) =>
    barSetting?.statuses?.some(setting => ideaStatusByKey[setting] === currentStatus)

  const checkIsRejectedOrClosedStatus = (barSetting: IProgressBarSettings) =>
    barSetting?.statuses?.some(
      setting =>
        ideaStatusByKey[setting] === ideaStatusByKey[ideaStatus.REJECTED] ||
        ideaStatusByKey[setting] === ideaStatusByKey[ideaStatus.CLOSED],
    )

  return (
    <div className={styles.root}>
      {!!statusesToRender?.length &&
        statusesToRender.map((settingItem, settingItemIndex) => {
          const textContent = (
            <p
              className={cx(styles.settingItemTitle, {
                [styles.settingItemActiveTitle]: checkIsActiveBarSetting(settingItem),
              })}
            >
              {settingItem?.title()}
            </p>
          )

          const tooltipContent = showStatusDuration && getInterval(settingItem) / 60

          return (
            <div
              key={settingItemIndex}
              className={cx(styles.settingItem, {
                [styles.activeItem]: checkIsActiveBarSetting(settingItem),
                [styles.lastActiveItem]: checkIsLastActiveBarSetting(settingItem),
                [styles.withoutBorderRadius]: checkIsLastActiveBarSetting(settingItem) && settingItemIndex !== 0,
                [styles.withoutBorderRadiusRight]: checkIsLastActiveBarSetting(settingItem) && settingItemIndex === 0,
                [styles.finalStatus]: currentStatus === ideaStatusByKey[ideaStatus.VERIFIED],
                [styles.rejectedStatus]: checkIsRejectedOrClosedStatus(settingItem),
              })}
            >
              {tooltipContent ? (
                <Tooltip title={minsToTime(tooltipContent)}>{textContent}</Tooltip>
              ) : (
                <>{textContent}</>
              )}
            </div>
          )
        })}
    </div>
  )
})
