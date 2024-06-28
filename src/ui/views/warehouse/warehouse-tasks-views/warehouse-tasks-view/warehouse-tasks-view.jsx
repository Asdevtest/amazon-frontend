import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { ArrowRightIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { useStyles } from './warehouse-tasks-view.style'

import { WarehouseTasksViewModel } from './warehouse-tasks-view.model'

export const WarehouseTasksView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseTasksViewModel({ history }))

  return (
    <div>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Tasks'])}</p>

      <div className={styles.btnsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickVacantTask}>
          {t(TranslationKey['New tasks'])}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickMyTasks}>
          {t(TranslationKey['My tasks'])}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickCompletedTasks}>
          {t(TranslationKey['Completed tasks'])}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickCanceledTasks}>
          {t(TranslationKey['Canceled tasks'])}
        </Button>
      </div>
    </div>
  )
})
