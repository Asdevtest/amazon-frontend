/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Badge } from '@components/shared/badge'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'

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
    nameSearchValue,
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
        <CustomSwitcher
          switchMode="medium"
          condition={currentStorekeeperId}
          switcherSettings={[
            ...storekeepersData
              .filter(storekeeper => storekeeper.boxesCount !== 0)
              .sort((a, b) => (a.name || '')?.localeCompare(b.name || ''))
              .map(storekeeper => ({
                label: () => storekeeper.name || '',
                value: storekeeper._id,
                icon: <Badge>{storekeeper.boxesCount}</Badge>,
              })),
            { label: () => t(TranslationKey['All warehouses']) || '', value: '' },
          ]}
          changeConditionHandler={onClickStorekeeperBtn}
        />

        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title, Order, item, Prep Id, ID Box'])}
          startText={nameSearchValue}
          onSubmit={onSearchSubmit}
        />
      </div>

      <CustomSwitcher
        switchMode="medium"
        condition={curDestinationId}
        switcherSettings={[
          ...clientDestinations
            .sort((a, b) => a.name?.localeCompare(b.name))
            .map(destination => ({ label: () => destination?.name, value: destination?._id })),

          { label: () => t(TranslationKey.Undistributed), value: null },
          { label: () => t(TranslationKey.All), value: undefined },
        ]}
        changeConditionHandler={onClickDestinationBtn}
      />

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
