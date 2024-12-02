import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { ArchiveIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './header.style'

interface HeaderProps {
  onSearchSubmit: (value: string) => void
  loading: boolean
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
  const { classes: styles } = useStyles()

  const {
    loading,
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
    <div className={styles.header}>
      <div className={styles.buttonsWrapper}>
        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by SKU, ASIN, Title"
          onSearch={onSearchSubmit}
        />

        {!isArchive && (
          <div className={styles.buttonsSubWrapper}>
            <CustomButton
              loading={loading}
              type="primary"
              size="large"
              disabled={isNoSelectedRows}
              onClick={onClickOrderBtn}
            >
              {t(TranslationKey['To order'])}
            </CustomButton>

            <CustomButton
              type="primary"
              size="large"
              icon={<FiPlus />}
              disabled={selectedRows.length > 1}
              onClick={onClickProductLaunch}
            >
              {t(TranslationKey['Product launch'])}
            </CustomButton>

            <CustomButton
              type="primary"
              size="large"
              disabled={isSelectedRowsNotEqualOne}
              onClick={onClickBindInventoryGoodsToStockBtn}
            >
              {t(TranslationKey['Bind a product from Amazon'])}
            </CustomButton>

            <CustomButton type="primary" size="large" disabled={isNoSelectedRows} onClick={onClickAddSupplierBtn}>
              {t(TranslationKey['Supplier search'])}
            </CustomButton>

            <CustomButton type="primary" size="large" disabled={isNoSelectedRows} onClick={onClickParseProductsBtn}>
              {'Parse all'}
            </CustomButton>

            <CustomButton
              type="primary"
              size="large"
              disabled={isSelectedRowsNotEqualOne}
              onClick={onClickProducDataButton}
            >
              {t(TranslationKey['Product batches data'])}
            </CustomButton>
          </div>
        )}
      </div>

      <div className={styles.controlButtonsWrapper}>
        {!isArchive && (
          <div className={styles.controlButtonsSubWrapper}>
            <CustomButton
              block
              type="primary"
              size="large"
              icon={<FiPlus />}
              onClick={() => onTriggerOpenModal('showSendOwnProductModal')}
            >
              {t(TranslationKey.Product)}
            </CustomButton>
          </div>
        )}

        {!isArchive && (
          <div className={styles.controlButtonsSubWrapper}>
            <CustomButton block size="large" onClick={onTriggerArchive}>
              {t(TranslationKey['Open archive'])}
            </CustomButton>

            <CustomButton
              danger
              block
              size="large"
              icon={<ArchiveIcon />}
              disabled={isNoSelectedRows}
              onClick={onClickTriggerArchOrResetProducts}
            >
              {t(TranslationKey.Archiving)}
            </CustomButton>
          </div>
        )}

        {isArchive && (
          <div className={styles.controlButtonsSubWrapper}>
            <CustomButton block size="large" onClick={onTriggerArchive}>
              {t(TranslationKey['Open inventory'])}
            </CustomButton>

            <CustomButton
              block
              type="primary"
              size="large"
              disabled={isNoSelectedRows}
              onClick={onClickTriggerArchOrResetProducts}
            >
              {t(TranslationKey['Return to inventory'])}
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  )
})
