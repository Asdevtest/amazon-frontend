import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './presets-control-buttons.style'

interface PresetsControlButtonsProps {
  onClickResetPresets: () => void
  onClickSavePresets: () => void
}

export const PresetsControlButtons: FC<PresetsControlButtonsProps> = memo(
  ({ onClickResetPresets, onClickSavePresets }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.additionalButtonsWrapper}>
        <Button
          danger
          btnWrapperStyle={styles.buttonWrapper}
          className={styles.additionalButton}
          onClick={onClickResetPresets}
        >
          {t(TranslationKey['Reset Settings'])}
        </Button>

        <Button btnWrapperStyle={styles.buttonWrapper} className={styles.additionalButton} onClick={onClickSavePresets}>
          {t(TranslationKey.Save)}
        </Button>
      </div>
    )
  },
)
