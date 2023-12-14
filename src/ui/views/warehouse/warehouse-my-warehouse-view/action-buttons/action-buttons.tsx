import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

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
      <Button
        tooltipInfoContent={t(TranslationKey['Form for changing the box data'])}
        disabled={!selectedBoxes.length}
        className={styles.editBtn}
        onClick={onEditBox}
      >
        {t(TranslationKey.Edit)}
      </Button>

      <Button
        tooltipInfoContent={t(TranslationKey['Form for merging several boxes'])}
        disabled={selectedBoxes.length <= 1}
        onClick={onClickMergeBtn}
      >
        {t(TranslationKey.Merge)}
      </Button>

      <Button
        disabled={selectedBoxes.length !== 1}
        tooltipInfoContent={t(TranslationKey['Form for distributing to multiple boxes'])}
        onClick={onClickSplitBtn}
      >
        {t(TranslationKey.Redistribute)}
      </Button>

      <Button disabled={!selectedBoxes.length} onClick={onClickGroupingBtn}>
        {t(TranslationKey.Grouping)}
      </Button>
    </div>
  )
})
