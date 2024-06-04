import { Button, InputNumber, Select } from 'antd'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './launches-reports.style'

import { getSelectConfig } from './helpers/get-select-config'
import { LaunchesReportsModel } from './launches-reports.model'

interface LaunchesReportsProps {
  timeBeforeLaunchDeadline: number
}

export const LaunchesReports: FC<LaunchesReportsProps> = observer(({ timeBeforeLaunchDeadline }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new LaunchesReportsModel({ timeBeforeLaunchDeadline }))

  const selectAfter = (
    <Select
      value={viewModel.dateType}
      options={getSelectConfig()}
      className={styles.selectAfter}
      onChange={viewModel.handleChangeDateType}
    />
  )

  return (
    <div className={styles.wrapper}>
      <p>{t(TranslationKey['Launches reports'])}</p>

      <div className={styles.inputWrapper}>
        <p>{t(TranslationKey['Notify users of completed launches in'])}</p>

        <InputNumber
          controls={false}
          precision={0}
          addonAfter={selectAfter}
          value={viewModel.currentTimeBeforeLaunchDeadline}
          className={styles.input}
          onChange={viewModel.handleChangeDeadline}
        />
      </div>

      <Button type="primary" loading={viewModel.isLoading} onClick={viewModel.handleSaveDeadline}>
        {t(TranslationKey.Save)}
      </Button>
    </div>
  )
})
