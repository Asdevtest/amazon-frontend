import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { MainContent } from '@components/layout/main-content'
import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { AdminWarehouseViewModel } from './admin-warehouse-view.model'
import { styles } from './admin-warehouse-view.style'

export const AdminWarehouseViewRaw = props => {
  const [viewModel] = useState(() => new AdminWarehouseViewModel({ history: props.history }))
  const { classes: classNames } = props

  return (
    <React.Fragment>
      <MainContent>
        <div>
          <Typography className={classNames.title}>{t(TranslationKey['Choose a section in Warehouse'])}</Typography>

          <div className={classNames.btnsWrapper}>
            <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickTasks}>
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey.Tasks)}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={classNames.button} color="primary" variant="outlined" onClick={viewModel.onClickBoxes}>
              <div className={classNames.btnTextWrapper}>
                <Typography className={classNames.btnText}>{t(TranslationKey.Boxes)}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            {/* <Button
                    className={classNames.button}
                    color="primary"
                    variant="outlined"
                    onClick={onClickDestinations}
                  >
                    <div className={classNames.btnTextWrapper}>
                      <Typography className={classNames.btnText}>{t(TranslationKey.Destinations)}</Typography>
                      <ArrowRightAltIcon color="primary" />
                    </div>
                  </Button> */}
          </div>
        </div>
      </MainContent>
    </React.Fragment>
  )
}

export const AdminWarehouseView = withStyles(observer(AdminWarehouseViewRaw), styles)
