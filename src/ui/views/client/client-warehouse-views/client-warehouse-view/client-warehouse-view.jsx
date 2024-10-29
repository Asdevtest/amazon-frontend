import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { styles } from './client-warehouse-view.style'

import { ClientWarehouseViewModel } from './client-warehouse-view.model'

export const ClientWarehouseViewRaw = props => {
  const viewModel = useMemo(() => new ClientWarehouseViewModel({ history: props.history }), [])
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Warehouse'])}</p>

      <div className={styles.btnsWrapper}>
        <CustomButton variant="outlined" onClick={viewModel.onClickInStock}>
          {t(TranslationKey['Boxes in stock'])}
        </CustomButton>

        <CustomButton variant="outlined" onClick={viewModel.onClickTasks}>
          {t(TranslationKey.Tasks)}
        </CustomButton>
      </div>
    </>
  )
}

export const ClientWarehouseView = withStyles(observer(ClientWarehouseViewRaw), styles)
