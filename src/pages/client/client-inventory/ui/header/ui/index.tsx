import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SearchInput } from '@components/shared/search-input'
import { ArchiveIcon, PlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle, ButtonVariant } from '@typings/enums/button-style'

import classes from './styles.module.scss'

interface HeaderProps {
  onSearchSubmit: (value: string) => void
  isArchive: boolean
  selectedRows: string[]
  onClickOrderBtn: () => void
  onClickProductLaunch: () => void
  onClickBindInventoryGoodsToStockBtn: () => void
  onClickAddSupplierBtn: () => void
  onClickParseProductsBtn: () => void
  onClickProducDataButton: () => void
  onTriggerArchive: () => void
  onTriggerOpenModal: (key: string) => void
  onClickTriggerArchOrResetProducts: () => void
}

export const Header: FC<HeaderProps> = memo(props => {
  const {
    isArchive,
    selectedRows,
    onSearchSubmit,
    onClickOrderBtn,
    onClickProductLaunch,
    onClickBindInventoryGoodsToStockBtn,
    onClickAddSupplierBtn,
    onClickParseProductsBtn,
    onClickProducDataButton,
    onTriggerArchive,
    onTriggerOpenModal,
    onClickTriggerArchOrResetProducts,
  } = props

  const isSelectedRowsNotEqualOne = selectedRows.length !== 1
  const isNoSelectedRows = selectedRows.length === 0

  return (
    <div className={classes.header}>
      <div className={classes.buttonsWrapper}>
        <SearchInput
          inputClasses={classes.searchInput}
          placeholder={t(TranslationKey['Search by SKU, ASIN, Title'])}
          onSubmit={onSearchSubmit}
        />

        {!isArchive && (
          <div className={classes.buttonsSubWrapper}>
            <Button
              styleType={ButtonStyle.SUCCESS}
              tooltipInfoContent={t(TranslationKey['To order selected products'])}
              disabled={isNoSelectedRows}
              onClick={onClickOrderBtn}
            >
              {t(TranslationKey['To order'])}
            </Button>

            <Button styleType={ButtonStyle.SUCCESS} disabled={selectedRows.length > 1} onClick={onClickProductLaunch}>
              <PlusIcon className={classes.icon} />
              {t(TranslationKey['Product launch'])}
            </Button>

            <Button
              tooltipInfoContent={t(
                TranslationKey['Bind the selected product from the inventory to an item from the store'],
              )}
              disabled={isSelectedRowsNotEqualOne}
              onClick={onClickBindInventoryGoodsToStockBtn}
            >
              {t(TranslationKey['Bind an product from Amazon'])}
            </Button>

            <Button
              tooltipInfoContent={t(TranslationKey['Supplier Addition Services'])}
              disabled={isNoSelectedRows}
              onClick={onClickAddSupplierBtn}
            >
              {t(TranslationKey['Supplier search'])}
            </Button>

            <Button disabled={isNoSelectedRows} onClick={onClickParseProductsBtn}>
              {'Parse all'}
            </Button>

            <Button
              tooltipInfoContent={t(TranslationKey['Product batches data'])}
              disabled={isSelectedRowsNotEqualOne}
              onClick={onClickProducDataButton}
            >
              {t(TranslationKey['Product batches data'])}
            </Button>
          </div>
        )}
      </div>

      <div className={classes.controlButtonsWrapper}>
        {!isArchive && (
          <div className={classes.controlButtonsSubWrapper}>
            <Button
              tooltipInfoContent={t(TranslationKey['Deleted product archive'])}
              variant={ButtonVariant.OUTLINED}
              onClick={onTriggerArchive}
            >
              {t(TranslationKey['Open archive'])}
            </Button>

            <Button
              tooltipInfoContent={t(
                TranslationKey['Delete the selected product (the product is moved to the archive)'],
              )}
              disabled={isNoSelectedRows}
              styleType={ButtonStyle.DANGER}
              variant={ButtonVariant.OUTLINED}
              onClick={onClickTriggerArchOrResetProducts}
            >
              <ArchiveIcon />
              {t(TranslationKey.Archiving)}
            </Button>
          </div>
        )}

        {!isArchive && (
          <div className={classes.controlButtonsSubWrapper}>
            <Button
              styleType={ButtonStyle.SUCCESS}
              tooltipInfoContent={t(TranslationKey['Allows you to add your product to inventory'])}
              onClick={() => onTriggerOpenModal('showSendOwnProductModal')}
            >
              <PlusIcon className={classes.icon} />
              {t(TranslationKey.Product)}
            </Button>

            <Button styleType={ButtonStyle.SUCCESS} onClick={() => onTriggerOpenModal('showAddSuppliersModal')}>
              <PlusIcon className={classes.icon} />
              {t(TranslationKey['Supplier list'])}
            </Button>
          </div>
        )}

        {isArchive && (
          <div className={classes.controlButtonsSubWrapper}>
            <Button
              tooltipInfoContent={t(TranslationKey['Return the selected product to the inventory list'])}
              disabled={isNoSelectedRows}
              variant={ButtonVariant.OUTLINED}
              onClick={onClickTriggerArchOrResetProducts}
            >
              {t(TranslationKey['Return to inventory'])}
            </Button>

            <Button
              tooltipInfoContent={t(TranslationKey['Return to inventory with a list of items'])}
              variant={ButtonVariant.OUTLINED}
              onClick={onTriggerArchive}
            >
              {t(TranslationKey['Open inventory'])}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
})
