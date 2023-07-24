import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { styles } from './client-warehouse-view.style'

import { ClientWarehouseViewModel } from './client-warehouse-view.model'

export const ClientWarehouseViewRaw = props => {
  const [viewModel] = useState(() => new ClientWarehouseViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Warehouse'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickInStock}>
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey['Boxes in stock'])}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickTasks}>
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey.Tasks)}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const ClientWarehouseView = withStyles(observer(ClientWarehouseViewRaw), styles)
