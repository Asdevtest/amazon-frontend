import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { ShopSelect } from '@components/shared/selects/shop-select/shop-select'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './select-shops-form.style'

export interface SelectShopsModalProps {
  onSubmit: (id: string | null) => void
  onClose: () => void
  title?: string
  message?: string
}

export const SelectShopsForm: FC<SelectShopsModalProps> = observer(props => {
  const { onSubmit, onClose, title, message } = props

  const { classes: styles } = useStyles()
  const [selectedShopId, setSelectedShopId] = useState('')

  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>

      <ShopSelect onChange={setSelectedShopId} />

      {message ? <Text copyable={false} text={message || ''} /> : null}

      <div className={styles.buttons}>
        <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
        <CustomButton type="primary" onClick={() => onSubmit(selectedShopId)}>
          {t(TranslationKey.Save)}
        </CustomButton>
      </div>
    </div>
  )
})
