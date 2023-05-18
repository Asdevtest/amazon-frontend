import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { WarehouseTasksViewModel } from './warehouse-tasks-view.model'
import { styles } from './warehouse-tasks-view.style'

export const WarehouseTasksViewRaw = props => {
  const [viewModel] = useState(() => new WarehouseTasksViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Tasks'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickVacantTask}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['New tasks'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickMyTasks}>
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['My tasks'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickCompletedTasks}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Completed tasks'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button
              className={classNames.button}
              color="primary"
              variant="outlined"
              onClick={viewModel.onClickCanceledTasks}
            >
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Canceled tasks'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const WarehouseTasksView = withStyles(observer(WarehouseTasksViewRaw), styles)
