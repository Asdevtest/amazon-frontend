import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './presets-control-buttons.style'

interface PresetsControlButtonsProps {
  onClickResetPresets: () => void
  onClickSavePresets: () => void
}

export const PresetsControlButtons: FC<PresetsControlButtonsProps> = memo(
  ({ onClickResetPresets, onClickSavePresets }) => {
    const { classes: styles, cx } = useStyles()

    return (
      <div className={styles.additionalButtonsWrapper}>
        <button className={cx(styles.button, styles.danger)} onClick={onClickResetPresets}>
          {t(TranslationKey['Reset Settings'])}
        </button>

        <button className={cx(styles.button, styles.success)} onClick={onClickSavePresets}>
          {t(TranslationKey.Save)}
        </button>
      </div>
    )
  },
)
