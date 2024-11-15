import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { SelectShopsForm } from '@components/forms/select-shops-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './supplier-view.style'

import { SupplierViewModel } from './supplier-view.model'

export const SupplierView = observer(() => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new SupplierViewModel(), [])
  const history = useHistory()

  return (
    <>
      <div className="viewWrapper">
        <div className={styles.header}>
          <CustomButton size="large" onClick={history.goBack}>
            {t(TranslationKey.Back)}
          </CustomButton>
          <CustomInputSearch allowClear enterButton size="large" placeholder="Search" />
        </div>

        <div></div>
      </div>

      <Modal openModal={viewModel.showSelectShopsModal} setOpenModal={viewModel.onToggleSelectShopsModal}>
        <SelectShopsForm
          title={t(TranslationKey['Link a store to a product'])}
          onSubmit={viewModel.onAddToInventory}
          onClose={viewModel.onToggleSelectShopsModal}
        />
      </Modal>
    </>
  )
})
