import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'

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
      <Button
        onClick={() => {
          onClose()
          onChangeFullFieldMenuItem()
          onClickAccept()
        }}
      >
        {t(TranslationKey.Accept)}
      </Button>

      <Button variant={ButtonVariant.OUTLINED} onClick={onClose}>
        {t(TranslationKey.Cancel)}
      </Button>
    </div>
  )
})
