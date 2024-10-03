/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomInputSearch } from '@components/shared/custom-input-search'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { IDestination } from '@typings/shared/destinations'

import { useStyles } from './view-header.style'

import { ActionButtons } from '../action-buttons/action-buttons'

interface ViewHeaderProps {
  currentStorekeeperId: string
  storekeepersData: IStorekeeper[]
  nameSearchValue: string
  curDestinationId: string
  clientDestinations: IDestination[]
  selectedRows: string[]
  isHaveRequestSendToBatch: boolean
  isChoosenOnlySendToBatchBoxes: boolean
  onClickStorekeeperBtn: () => void
  onSearchSubmit: (value: string) => void
  onClickDestinationBtn: () => void
  onClickCurrentTariffsBtn: () => void
  onClickRequestToSendBatch: () => void
  onClickMergeBtn: () => void
  onClickSplitBtn: () => void
  onClickEditBtn: () => void
  onClickGroupingBtn: () => void
  onClickReturnBoxesToStockBtn: () => void
  onClickWarehouseOrderButton: () => void
}

export const ViewHeader: FC<ViewHeaderProps> = memo(props => {
  const { classes: styles } = useStyles()
  const {
    currentStorekeeperId,
    storekeepersData,
    curDestinationId,
    clientDestinations,
    selectedRows,
    isHaveRequestSendToBatch,
    isChoosenOnlySendToBatchBoxes,
    onClickStorekeeperBtn,
    onSearchSubmit,
    onClickDestinationBtn,
    onClickCurrentTariffsBtn,
    onClickRequestToSendBatch,
    onClickMergeBtn,
    onClickSplitBtn,
    onClickEditBtn,
    onClickGroupingBtn,
    onClickReturnBoxesToStockBtn,
    onClickWarehouseOrderButton,
  } = props

  return (
    <div className={styles.viewHeaderWrapper}>
      <div className={styles.topHeaderBtnsWrapper}>
        <div className={styles.topHeaderBtnsWrapper}>
          <CustomRadioButton
            size="large"
            options={[
              { label: t(TranslationKey['All warehouses']) || '', value: '' },
              ...storekeepersData
                .filter(storekeeper => storekeeper.boxesCount !== 0)
                .sort((a, b) => (a.name || '')?.localeCompare(b.name || ''))
                .map(storekeeper => ({
                  label: storekeeper.name || '',
                  value: storekeeper._id,
                  badge: storekeeper.boxesCount,
                })),
            ]}
            defaultValue={currentStorekeeperId}
            onChange={onClickStorekeeperBtn}
          />

          <CustomSelect
            size="large"
            options={[
              { label: t(TranslationKey.All), value: 'all' },
              { label: t(TranslationKey.Undistributed), value: null },
              ...clientDestinations
                .sort((a, b) => a.name?.localeCompare(b.name))
                .map(destination => ({ label: destination?.name, value: destination?._id })),
            ]}
            value={curDestinationId}
            onChange={onClickDestinationBtn}
          />
        </div>

        <CustomInputSearch
          enterButton
          allowClear
          wrapperClassName={styles.searchInput}
          size="large"
          placeholder="Search by SKU, ASIN, Title, Order, item, Prep Id, ID Box"
          onSearch={onSearchSubmit}
        />
      </div>

      <ActionButtons
        selectedRows={selectedRows}
        storekeepersData={storekeepersData}
        isHaveRequestSendToBatch={isHaveRequestSendToBatch}
        isChoosenOnlySendToBatchBoxes={isChoosenOnlySendToBatchBoxes}
        onClickRequestToSendBatch={onClickRequestToSendBatch}
        onClickMergeBtn={onClickMergeBtn}
        onClickSplitBtn={onClickSplitBtn}
        onClickEditBtn={onClickEditBtn}
        onClickGroupingBtn={onClickGroupingBtn}
        onClickReturnBoxesToStockBtn={onClickReturnBoxesToStockBtn}
        onClickCurrentTariffsBtn={onClickCurrentTariffsBtn}
        onClickWarehouseOrderButton={onClickWarehouseOrderButton}
      />
    </div>
  )
})
