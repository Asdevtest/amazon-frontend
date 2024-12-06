import { observer } from 'mobx-react'
import { FC, useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomSelect } from '@components/shared/custom-select'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './select-shops-form.style'

import { SelectShopFormModel } from './select-shops-form.model'

export interface SelectShopsModalProps {
  onSubmit: (id: string) => void
  onClose: () => void
  title?: string
  message?: string
}

export const SelectShopsForm: FC<SelectShopsModalProps> = observer(props => {
  const { onSubmit, onClose, title, message } = props

  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new SelectShopFormModel(), [])
  const [selectedShopId, setSelectedShopId] = useState('')

  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>

      <CustomSelect
        showSearch
        label="Select a store"
        placeholder="Select"
        filterOption={false}
        style={{ width: '300px' }}
        defaultActiveFirstOption={false}
        options={viewModel.items}
        optionRender={({ label }) => <Text copyable={false} text={String(label)} rows={1} />}
        onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
        onSearch={viewModel.onClickSubmitSearch}
        onPopupScroll={viewModel.onScroll}
        onSelect={id => setSelectedShopId(id)}
      />

      {message ? <Text copyable={false} text={message || ''} /> : null}

      <div className={styles.buttons}>
        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
        <CustomButton type="primary" disabled={!selectedShopId} onClick={() => onSubmit(selectedShopId)}>
          {t(TranslationKey.Save)}
        </CustomButton>
      </div>
    </div>
  )
})
