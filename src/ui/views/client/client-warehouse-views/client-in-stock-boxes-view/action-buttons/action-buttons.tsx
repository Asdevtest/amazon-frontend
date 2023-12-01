/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { IStorekeeper } from '@typings/storekeeper'

import { useStyles } from './action-buttons.style'

interface ActionButtonsProps {
  selectedRows: any[]
  selectedBoxes: string[]
  storekeepersData: IStorekeeper[]
  isHaveRequestSendToBatch: boolean
  isChoosenOnlySendToBatchBoxes: boolean
  onClickRequestToSendBatch: () => void
  onClickMergeBtn: () => void
  onClickSplitBtn: () => void
  onClickEditBtn: () => void
  onClickGroupingBtn: () => void
  onClickReturnBoxesToStockBtn: () => void
  onClickCurrentTariffsBtn: () => void
}

export const ActionButtons: FC<ActionButtonsProps> = memo(props => {
  const { classes: styles } = useStyles()
  const {
    selectedRows,
    selectedBoxes,
    storekeepersData,
    isHaveRequestSendToBatch,
    isChoosenOnlySendToBatchBoxes,
    onClickEditBtn,
    onClickMergeBtn,
    onClickSplitBtn,
    onClickGroupingBtn,
    onClickCurrentTariffsBtn,
    onClickRequestToSendBatch,
    onClickReturnBoxesToStockBtn,
  } = props

  const disable = selectedRows.some(row => row.status === BoxStatus.REQUESTED_SEND_TO_BATCH)

  return (
    <div className={styles.btnsWrapper}>
      <div className={styles.leftBtnsWrapper}>
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

        <Button
          disabled={!selectedBoxes.length || !isChoosenOnlySendToBatchBoxes}
          onClick={onClickReturnBoxesToStockBtn}
        >
          {t(TranslationKey['Return to stock'])}
        </Button>
      </div>

      <Button disabled={!storekeepersData} onClick={() => onClickCurrentTariffsBtn()}>
        {t(TranslationKey['Current tariffs'])}
      </Button>
    </div>
  )
})
