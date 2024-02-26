import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './admin-warehouse-view.style'

import { AdminWarehouseViewModel } from './admin-warehouse-view.model'

export const AdminWarehouseViewRaw = props => {
  const [viewModel] = useState(() => new AdminWarehouseViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <div>
        <div>
          <Typography className={styles.title}>{t(TranslationKey['Choose a section in Warehouse'])}</Typography>

          <div className={styles.btnsWrapper}>
            <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickTasks}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey.Tasks)}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>

            <Button className={styles.button} variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickBoxes}>
              <div className={styles.btnTextWrapper}>
                <Typography className={styles.btnText}>{t(TranslationKey.Boxes)}</Typography>
                <ArrowRightAltIcon color="primary" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export const AdminWarehouseView = withStyles(observer(AdminWarehouseViewRaw), styles)
