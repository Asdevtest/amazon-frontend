import { observer } from 'mobx-react'
import React, { useState } from 'react'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './warehouse-tasks-view.style'

import { WarehouseTasksViewModel } from './warehouse-tasks-view.model'

export const WarehouseTasksView = observer(({ history }) => {
  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new WarehouseTasksViewModel({ history }))

  return (
    <React.Fragment>
      <div>
        <div>
          <Typography className={styles.title}>{t(TranslationKey['Choose a section in Tasks'])}</Typography>

          <div className={styles.btnsWrapper}>
            <Button className={styles.button} color="primary" variant="outlined" onClick={viewModel.onClickVacantTask}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['New tasks'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={styles.button} color="primary" variant="outlined" onClick={viewModel.onClickMyTasks}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['My tasks'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button
              className={styles.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickCompletedTasks}
            >
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Completed tasks'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button
              className={styles.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickCanceledTasks}
            >
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey['Canceled tasks'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
})
