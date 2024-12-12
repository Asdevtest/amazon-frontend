import { observer } from 'mobx-react'
import { FC, UIEvent, useCallback, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductCell } from '@components/data-grid/data-grid-cells'
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'
import { CustomSelect } from '@components/shared/selects/custom-select'
import { AsinOption } from '@components/shared/selects/infinite-scroll-select'

import { debounce } from '@utils/debounce'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './bind-supplier-card-to-product-modal.style'

import { BindSupplierCardModal } from './bind-supplier-card-to-product-modal.model'
import { SupplierCardOption } from './components/supplier-card-option/supplier-card-option'
import { filterProducts } from './helpers/filter-products'

interface BindSupplierCardToProductModalProps {
  openModal: boolean
  setOpenModal: (openModal: boolean) => void

  isIdea?: boolean
  supplierId?: string
  supplierCardId?: string

  product?: IProduct
  handleUpdate?: () => void
}

export const BindSupplierCardToProductModal: FC<BindSupplierCardToProductModalProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { openModal, setOpenModal, isIdea, product, handleUpdate, supplierId, supplierCardId } = props

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

    await viewModel[isIdea ? 'onBindSupplierCardToIdea' : 'onBindSupplierCardToProduct'](
      selectedProductId,
      selectedSupplierCardId,
    )
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
            loading={viewModel?.isLoadingRequestStatus}
            size="large"
            className={styles.modalSelect}
            wrapperClassName={styles.modalSelect}
            labelRender={option => {
              const currentProduct = viewModel?.productsMap?.[option?.value]

              return (
                <ProductCell
                  image={currentProduct?.images?.[0]}
                  asin={currentProduct?.asin}
                  sku={currentProduct?.skuByClient}
                />
              )
            }}
            filterOption={(inputValue, option) =>
              filterProducts(inputValue, option?.amazonTitle) ||
              filterProducts(inputValue, option?.asin) ||
              filterProducts(inputValue, option?.skuByClient)
            }
            label="Product"
            value={viewModel.selectedProductId}
            options={viewModel?.currentData || []}
            optionRender={({ data }) => <AsinOption data={data} />}
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
          optionRender={({ data }) => <SupplierCardOption image={data?.images?.[0]} title={data?.cardName} />}
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
            loading={viewModel?.isLoadingRequestStatus}
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
