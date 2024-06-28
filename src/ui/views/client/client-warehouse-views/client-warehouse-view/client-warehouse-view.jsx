import { observer } from 'mobx-react'
import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

import { styles } from './client-warehouse-view.style'

import { ClientWarehouseViewModel } from './client-warehouse-view.model'

export const ClientWarehouseViewRaw = props => {
  const [viewModel] = useState(() => new ClientWarehouseViewModel({ history: props.history }))
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Warehouse'])}</p>

      <div className={styles.btnsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickInStock}>
          {t(TranslationKey['Boxes in stock'])}
        </Button>

        <Button variant={ButtonVariant.OUTLINED} onClick={viewModel.onClickTasks}>
          {t(TranslationKey.Tasks)}
        </Button>
      </div>
    </>
  )
}

export const ClientWarehouseView = withStyles(observer(ClientWarehouseViewRaw), styles)
