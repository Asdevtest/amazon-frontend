import { cx } from '@emotion/css'
import { useClassNames } from './progress-bar.styles'

const progressBarSettings = [
  {
    title: 'title 1',
    active: true,
  },
  {
    title: 'titl222222e 2',
    active: true,
    lastActiveItem: true,
  },
  {
    title: 'title 333333333333',
    active: false,
  },
]

export const IdeaProgressBar = () => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      {progressBarSettings.map((settingItem, settingItemIndex) => (
        <div
          key={settingItemIndex}
          className={cx(classNames.settingItem, {
            [classNames.activeItem]: settingItem.active,
            [classNames.lastActiveItem]: settingItem.lastActiveItem,
          })}
        >
          <p className={cx(classNames.settingItemTitle, { [classNames.settingItemActiveTitle]: settingItem.active })}>
            {settingItem.title}
          </p>
        </div>
      ))}
    </div>
  )
}
