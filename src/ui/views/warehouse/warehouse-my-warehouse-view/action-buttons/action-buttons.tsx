import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './action-buttons.style'

interface ActionButtonsProps {
  selectedBoxes: string[]
  onEditBox: () => void
  onClickMergeBtn: () => void
  onClickSplitBtn: () => void
  onClickGroupingBtn: () => void
}

export const ActionButtons: FC<ActionButtonsProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { selectedBoxes, onEditBox, onClickMergeBtn, onClickSplitBtn, onClickGroupingBtn } = props

  return (
    <div className={styles.leftBtnsWrapper}>
      <CustomButton
        type="primary"
        size="large"
        title={t(TranslationKey['Form for changing the box data'])}
        disabled={!selectedBoxes?.length}
        onClick={onEditBox}
      >
        {t(TranslationKey.Edit)}
      </CustomButton>

      <CustomButton
        type="primary"
        size="large"
        title={t(TranslationKey['Form for merging several boxes'])}
        disabled={selectedBoxes.length <= 1}
        onClick={onClickMergeBtn}
      >
        {t(TranslationKey.Merge)}
      </CustomButton>

      <CustomButton
        type="primary"
        size="large"
        title={t(TranslationKey['Form for distributing to multiple boxes'])}
        disabled={selectedBoxes.length !== 1}
        onClick={onClickSplitBtn}
      >
        {t(TranslationKey.Redistribute)}
      </CustomButton>

      <CustomButton type="primary" size="large" disabled={!selectedBoxes?.length} onClick={onClickGroupingBtn}>
        {t(TranslationKey.Grouping)}
      </CustomButton>
    </div>
  )
})
