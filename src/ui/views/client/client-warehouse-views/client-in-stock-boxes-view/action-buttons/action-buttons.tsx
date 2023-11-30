/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

interface ActionButtonsProps {
  selectedRows: any[]
  selectedBoxes: any[]
  isHaveRequestSendToBatch: boolean
  onClickRequestToSendBatch: () => void
  onClickMergeBtn: () => void
  onClickSplitBtn: () => void
  onClickEditBtn: () => void
  onClickGroupingBtn: () => void
  isChoosenOnlySendToBatchBoxes: boolean
  onClickReturnBoxesToStockBtn: () => void
}

export const ActionButtons: FC<ActionButtonsProps> = memo(props => {
  const {
    selectedRows,
    selectedBoxes,
    isHaveRequestSendToBatch,
    onClickRequestToSendBatch,
    onClickMergeBtn,
    onClickSplitBtn,
    onClickEditBtn,
    onClickGroupingBtn,
    isChoosenOnlySendToBatchBoxes,
    onClickReturnBoxesToStockBtn,
  } = props

  const disable = selectedRows.some(row => row.status === BoxStatus.REQUESTED_SEND_TO_BATCH)

  return (
    <>
      <Button
        tooltipInfoContent={t(TranslationKey['Form for requesting the shipment of boxes in a batch'])}
        disabled={!selectedBoxes.length || disable}
        onClick={onClickRequestToSendBatch}
      >
        {t(TranslationKey['Send batch'])}
      </Button>

      <Button
        tooltipInfoContent={t(TranslationKey['Form for merging several boxes'])}
        disabled={selectedBoxes.length <= 1 || isHaveRequestSendToBatch}
        onClick={onClickMergeBtn}
      >
        {t(TranslationKey.Merge)}
      </Button>

      <Button
        disabled={selectedBoxes.length !== 1 || isHaveRequestSendToBatch}
        tooltipInfoContent={t(TranslationKey['Form for distributing to multiple boxes'])}
        onClick={onClickSplitBtn}
      >
        {t(TranslationKey.Redistribute)}
      </Button>
      <Button
        tooltipInfoContent={t(TranslationKey['Form for changing the box data'])}
        disabled={!selectedBoxes.length || isHaveRequestSendToBatch}
        onClick={onClickEditBtn}
      >
        {t(TranslationKey.Edit)}
      </Button>

      <Button disabled={!selectedBoxes.length || isHaveRequestSendToBatch} onClick={onClickGroupingBtn}>
        {t(TranslationKey.Grouping)}
      </Button>

      <Button disabled={!selectedBoxes.length || !isChoosenOnlySendToBatchBoxes} onClick={onClickReturnBoxesToStockBtn}>
        {t(TranslationKey['Return to stock'])}
      </Button>
    </>
  )
})
