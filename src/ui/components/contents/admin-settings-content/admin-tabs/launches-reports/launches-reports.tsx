import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputNumber } from '@components/shared/custom-input-number'

import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { useStyles } from './launches-reports.style'

import { LaunchesReportsModel } from './launches-reports.model'

interface LaunchesReportsProps {
  timeBeforeLaunchDeadline: number
}

export const LaunchesReports: FC<LaunchesReportsProps> = observer(({ timeBeforeLaunchDeadline }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new LaunchesReportsModel(timeBeforeLaunchDeadline))

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t(TranslationKey['Launches reports'])}</p>

      <CustomInputNumber
        isRow
        precision={0}
        label={'Notify users of completed launches in'}
        addonAfter={t(TranslationKey.days)}
        value={viewModel.currentTimeBeforeLaunchDeadline}
        className={styles.input}
        labelClassName={styles.label}
        onChange={viewModel.onChangeDeadline}
      />

      <CustomButton type="primary" loading={viewModel.isLoading} onClick={throttle(viewModel.onSaveDeadline)}>
        {t(TranslationKey.Save)}
      </CustomButton>
    </div>
  )
})
