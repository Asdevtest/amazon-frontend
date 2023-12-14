import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { UiTheme } from '@constants/theme/mui-theme.type'

import { SettingsModel } from '@models/settings-model'

import { useClassNames } from './circular-progress-with-label.style'

export const CircularProgressWithLabel = ({ value, title, wrapperClassName }) => {
  const { classes: classNames, cx } = useClassNames()
  const isDarkTheme = SettingsModel.uiTheme === UiTheme.dark

  return (
    <div
      className={cx(classNames.mainWrapper, {
        [wrapperClassName]: !!wrapperClassName,
      })}
    >
      <div className={cx(classNames.progressContainer, { [classNames.progressContainerDark]: isDarkTheme })}>
        {title ? (
          <Typography variant="h4" className={classNames.standartText}>
            {title}
          </Typography>
        ) : null}

        {value ? (
          <div className={classNames.progressWrapper}>
            <CircularProgress variant="determinate" value={value} size={85} />
            {title ? (
              <div className={classNames.subWrapper}>
                <Typography className={classNames.text}>{`${Math.round(value)}%`}</Typography>
              </div>
            ) : null}
          </div>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  )
}
