import { cx } from '@emotion/css'
import { useClassNames } from './progress-bar.styles'

import { FC } from 'react'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status'
import { progressBarSettings } from './progress-bar-settings'
import { observer } from 'mobx-react'

interface IdeaProgressBarProps {
  currentStatus: number
}
interface IProgressBarSettings {
  title: string
  statuses: Array<ideaStatus>
}

export const IdeaProgressBar: FC<IdeaProgressBarProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { currentStatus } = props

  const statusesToRender =
    currentStatus !== ideaStatusByKey[ideaStatus.REJECTED]
      ? progressBarSettings.filter(settingItem => !settingItem.statuses.includes(ideaStatus.REJECTED))
      : progressBarSettings.filter(
          settingItem =>
            settingItem.statuses.includes(ideaStatus.NEW) ||
            settingItem.statuses.includes(ideaStatus.ON_CHECK) ||
            settingItem.statuses.includes(ideaStatus.REJECTED),
        )

  const checkIsActiveBarSetting = (barSetting: IProgressBarSettings) =>
    barSetting?.statuses?.some(setting => ideaStatusByKey[setting] <= currentStatus) &&
    currentStatus !== ideaStatusByKey[ideaStatus.CLOSED]

  const checkIsLastActiveBarSetting = (barSetting: IProgressBarSettings) =>
    barSetting?.statuses?.some(setting => ideaStatusByKey[setting] === currentStatus)

  const checkIsRejectedStatus = (barSetting: IProgressBarSettings) =>
    barSetting?.statuses?.some(setting => ideaStatusByKey[setting] === ideaStatusByKey[ideaStatus.REJECTED])

  return (
    <div className={classNames.root}>
      {statusesToRender.map((settingItem, settingItemIndex) => (
        <div
          key={settingItemIndex}
          className={cx(classNames.settingItem, {
            [classNames.activeItem]: checkIsActiveBarSetting(settingItem),
            [classNames.lastActiveItem]: checkIsLastActiveBarSetting(settingItem),
            [classNames.withoutBorderRadius]: checkIsLastActiveBarSetting(settingItem) && settingItemIndex !== 0,
            [classNames.finalStatus]: currentStatus === ideaStatusByKey[ideaStatus.VERIFIED],
            [classNames.rejectedStatus]: checkIsRejectedStatus(settingItem),
          })}
        >
          <p
            className={cx(classNames.settingItemTitle, {
              [classNames.settingItemActiveTitle]: checkIsActiveBarSetting(settingItem),
            })}
          >
            {settingItem.title}
          </p>
        </div>
      ))}
    </div>
  )
})
