/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'

import { useStyles } from './action-buttons.style'

interface ActionButtonsProps {
  selectedRows: string[]
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
  onClickWarehouseOrderButton: () => void
}

export const ActionButtons: FC<ActionButtonsProps> = memo(props => {
  const { classes: styles } = useStyles()
  const {
    selectedRows,
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
    onClickWarehouseOrderButton,
  } = props

  return (
    <div className={styles.btnsWrapper}>
      <div className={styles.leftBtnsWrapper}>
        <CustomButton
          type="primary"
          size="large"
          title={t(TranslationKey['Form for requesting the shipment of boxes in a batch'])}
          disabled={!selectedRows?.length || isHaveRequestSendToBatch}
          onClick={onClickRequestToSendBatch}
        >
          {t(TranslationKey['Send batch'])}
        </CustomButton>

        <CustomButton
          type="primary"
          size="large"
          title={t(TranslationKey['Form for merging several boxes'])}
          disabled={selectedRows?.length <= 1 || isHaveRequestSendToBatch}
          onClick={onClickMergeBtn}
        >
          {t(TranslationKey.Merge)}
        </CustomButton>

        <CustomButton
          type="primary"
          size="large"
          title={t(TranslationKey['Form for distributing to multiple boxes'])}
          disabled={selectedRows?.length !== 1 || isHaveRequestSendToBatch}
          onClick={onClickSplitBtn}
        >
          {t(TranslationKey.Redistribute)}
        </CustomButton>
        <CustomButton
          type="primary"
          size="large"
          title={t(TranslationKey['Form for changing the box data'])}
          disabled={!selectedRows?.length || isHaveRequestSendToBatch}
          onClick={onClickEditBtn}
        >
          {t(TranslationKey.Edit)}
        </CustomButton>

        <CustomButton
          type="primary"
          size="large"
          disabled={!selectedRows?.length || isHaveRequestSendToBatch}
          onClick={onClickGroupingBtn}
        >
          {t(TranslationKey.Grouping)}
        </CustomButton>

        <CustomButton
          type="primary"
          size="large"
          disabled={!selectedRows?.length || !isChoosenOnlySendToBatchBoxes}
          onClick={onClickReturnBoxesToStockBtn}
        >
          {t(TranslationKey['Return to stock'])}
        </CustomButton>

        <CustomButton
          type="primary"
          size="large"
          disabled={selectedRows?.length !== 1}
          onClick={onClickWarehouseOrderButton}
        >
          {t(TranslationKey['Warehouse and orders'])}
        </CustomButton>
      </div>

      <CustomButton type="primary" size="large" disabled={!storekeepersData} onClick={() => onClickCurrentTariffsBtn()}>
        {t(TranslationKey['Current tariffs'])}
      </CustomButton>
    </div>
  )
})
