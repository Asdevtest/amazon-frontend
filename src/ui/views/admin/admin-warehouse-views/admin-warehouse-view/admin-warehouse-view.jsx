import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { withStyles } from 'tss-react/mui'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { styles } from './admin-warehouse-view.style'

import { AdminWarehouseViewModel } from './admin-warehouse-view.model'

export const AdminWarehouseViewRaw = props => {
  const viewModel = useMemo(() => new AdminWarehouseViewModel({ history: props.history }), [])
  const { classes: styles } = props

  return (
    <>
      <p className={styles.title}>{t(TranslationKey['Choose a section in Warehouse'])}</p>

      <div className={styles.btnsWrapper}>
        <CustomButton onClick={viewModel.onClickTasks}>{t(TranslationKey.Tasks)}</CustomButton>

        <CustomButton onClick={viewModel.onClickBoxes}>{t(TranslationKey.Boxes)}</CustomButton>
      </div>
    </>
  )
}

export const AdminWarehouseView = withStyles(observer(AdminWarehouseViewRaw), styles)
