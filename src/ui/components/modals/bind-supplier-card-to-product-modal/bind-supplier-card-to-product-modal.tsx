import { observer } from 'mobx-react'
import { FC, UIEvent, useCallback, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCell } from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'
import { CustomSelect } from '@components/shared/custom-select'
import { Modal } from '@components/shared/modal'

import { debounce } from '@utils/debounce'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './bind-supplier-card-to-product-modal.style'

import { BindSupplierCardModal } from './bind-supplier-card-to-product-modal.model'

interface BindSupplierCardToProductModalProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void

  supplierId?: string
  supplierCardId?: string

  product?: IProduct
  handleUpdate?: () => void
}

export const BindSupplierCardToProductModal: FC<BindSupplierCardToProductModalProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { openModal, setOpenModal, product, handleUpdate, supplierId, supplierCardId } = props

  const viewModel = useMemo(
    () =>
      new BindSupplierCardModal({
        product,
        supplierId,
        supplierCardId,
      }),
    [],
  )

  const disableSaveButton = useMemo(
    () => (!viewModel.selectedProductId && !product) || !viewModel.selectedSupplierCardId,
    [viewModel.selectedProductId, product, viewModel.selectedSupplierCardId],
  )

  const debouncedSupplierSearch = useCallback(
    debounce((value: string) => viewModel.supplierModel?.onSearchSubmit(value), 500),
    [viewModel.supplierModel?.onSearchSubmit],
  )

  const debouncedSupplierCardSearch = useCallback(
    debounce((value: string) => viewModel.supplierCardModal?.onSearchSubmit(value), 500),
    [viewModel.supplierCardModal?.onSearchSubmit],
  )

  const onSupplierPopupScroll = useCallback(
    (event: UIEvent<HTMLElement>) => {
      const isEndScroll =
        event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight

      if (isEndScroll) {
        viewModel.supplierModel?.loadMoreData()
      }
    },
    [viewModel.supplierModel?.loadMoreData],
  )

  const onSupplierCardPopupScroll = useCallback(
    (event: UIEvent<HTMLElement>) => {
      const isEndScroll =
        event.currentTarget.scrollHeight - event.currentTarget.scrollTop === event.currentTarget.clientHeight

      if (isEndScroll) {
        viewModel.supplierCardModal?.loadMoreData()
      }
    },
    [viewModel.supplierCardModal?.loadMoreData],
  )

  const onClickSave = async () => {
    const selectedProductId = (product?._id || viewModel.selectedProductId) as string
    const selectedSupplierCardId = [viewModel.selectedSupplierCardId] as string[]

    await viewModel.onBindSupplierCardToProduct(selectedProductId, selectedSupplierCardId)
    handleUpdate?.()
    setOpenModal(false)
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <p className={styles.title}>{t(TranslationKey['Bind supplier card to product'])}</p>

        {product ? (
          <ProductCell
            image={product?.images?.[0]}
            title={product?.amazonTitle}
            asin={product?.asin}
            sku={product?.skuByClient}
          />
        ) : (
          <CustomSelect
            allowClear
            showSearch
            loading={viewModel?.loading}
            size="large"
            className={styles.modalSelect}
            wrapperClassName={styles.modalSelect}
            filterOption={(inputValue, option) => option?.amazonTitle?.toLowerCase().includes(inputValue.toLowerCase())}
            label="Product"
            value={viewModel.selectedProductId}
            options={viewModel?.currentData || []}
            fieldNames={{ label: 'amazonTitle', value: '_id' }}
            onChange={viewModel?.onChangeSelectedProduct}
          />
        )}

        <CustomSelect
          allowClear
          showSearch
          filterOption={false}
          size="large"
          loading={viewModel.supplierModel?.loading}
          className={styles.modalSelect}
          wrapperClassName={styles.modalSelect}
          label="Supplier"
          value={viewModel.selectedSupplierId}
          options={viewModel?.supplierModel?.data}
          labelRender={option => option.label || 'access denied'}
          fieldNames={{ label: 'companyName', value: '_id' }}
          onChange={viewModel?.onChangeSelectedSupplier}
          onSearch={debouncedSupplierSearch}
          onClear={() => debouncedSupplierSearch('')}
          onPopupScroll={onSupplierPopupScroll}
        />

        <CustomSelect
          allowClear
          showSearch
          filterOption={false}
          size="large"
          disabled={!viewModel.selectedSupplierId}
          loading={viewModel.supplierCardModal?.loading}
          className={styles.modalSelect}
          wrapperClassName={styles.modalSelect}
          label="Supplier card"
          value={viewModel.selectedSupplierCardId}
          options={viewModel?.supplierCardModal?.data}
          labelRender={option => option.label || 'access denied'}
          fieldNames={{ label: 'cardName', value: '_id' }}
          onChange={viewModel?.onChangeSelectedSupplierCard}
          onSearch={debouncedSupplierCardSearch}
          onClear={() => debouncedSupplierCardSearch('')}
          onPopupScroll={onSupplierCardPopupScroll}
        />

        <div className={styles.footerWrapper}>
          <CustomButton
            size="large"
            type="primary"
            loading={viewModel.loading}
            disabled={disableSaveButton}
            onClick={onClickSave}
          >
            {t(TranslationKey.Save)}
          </CustomButton>

          <CustomButton size="large" onClick={() => setOpenModal(false)}>
            {t(TranslationKey.Close)}
          </CustomButton>
        </div>
      </div>
    </Modal>
  )
})