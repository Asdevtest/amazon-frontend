import { observer } from 'mobx-react'
import { useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { HistoryType } from '@typings/types/history'

import { useStyles } from './warehouse-tasks-view.style'

import { WarehouseTasksViewModel } from './warehouse-tasks-view.model'

export const WarehouseTasksView = observer(({ history }: { history: HistoryType }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new WarehouseTasksViewModel(history), [])

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Tasks'])}</p>
      <div className={styles.flexColumn}>
        <CustomButton type="primary" size="large" onClick={viewModel.onClickVacantTask}>
          {t(TranslationKey['New tasks'])}
        </CustomButton>
        <CustomButton type="primary" size="large" onClick={viewModel.onClickMyTasks}>
          {t(TranslationKey['My tasks'])}
        </CustomButton>
        <CustomButton type="primary" size="large" onClick={viewModel.onClickCompletedTasks}>
          {t(TranslationKey['Completed tasks'])}
        </CustomButton>
        <CustomButton type="primary" size="large" onClick={viewModel.onClickCanceledTasks}>
          {t(TranslationKey['Canceled tasks'])}
        </CustomButton>
      </div>
    </>
  )
})
