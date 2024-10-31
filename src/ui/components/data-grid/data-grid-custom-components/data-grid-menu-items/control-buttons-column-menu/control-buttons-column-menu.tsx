import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './control-buttons-column-menu.style'

interface ControlButtonsColumnMenuProps {
  onClose: () => void
  onChangeFullFieldMenuItem: () => void
  onClickAccept: () => void
}

export const ControlButtonsColumnMenu: FC<ControlButtonsColumnMenuProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { onClose, onChangeFullFieldMenuItem, onClickAccept } = props

  return (
    <div className={styles.buttonsWrapper}>
      <CustomButton
        onClick={() => {
          onClose()
          onChangeFullFieldMenuItem()
          onClickAccept()
        }}
      >
        {t(TranslationKey.Accept)}
      </CustomButton>

      <CustomButton onClick={onClose}>{t(TranslationKey.Close)}</CustomButton>
    </div>
  )
})
