import { FC, memo, useState } from 'react'

import { IOrderBox, IOrderBoxBatch } from '@typings/order-box'
import { IProduct } from '@typings/product'
import { IShop } from '@typings/shop'

import { AboutProductModal } from '../about-product-modal'
import { AboutProductSwitcher } from '../about-product-modal/about-product-switcher'
import { BatchInfoModal } from '../batch-info-modal'

interface ProductAndBatchModalProps {
  changeSwitcher: (field?: string | number | null) => void
  currentSwitch: AboutProductSwitcher
  selectedProduct: IProduct & { orders: IOrderBox[]; sumStock: number; purchaseQuantity: number; stockCost: number }
  shops: IShop[]
  batches: IOrderBoxBatch[]
  showLoading: boolean
  openModal: boolean
  setOpenModal: () => void
  currentBatch: IOrderBoxBatch
  getCurrentBatch: (guid: string) => void
}

export const ProductAndBatchModal: FC<ProductAndBatchModalProps> = memo(props => {
  const {
    selectedProduct,
    shops,
    batches,
    showLoading,
    openModal,
    setOpenModal,
    currentBatch,
    getCurrentBatch,
    currentSwitch,
    changeSwitcher,
  } = props

  const [isShowBatchModal, setIsShowBatchModal] = useState(false)

  const handleShowModal = () => {
    setIsShowBatchModal(prev => !prev)
  }

  return (
    <>
      <AboutProductModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedProduct={selectedProduct}
        shops={shops}
        changeSwitcher={changeSwitcher}
        currentSwitch={currentSwitch}
        batches={batches}
        showLoading={showLoading}
        setShowBatchModal={handleShowModal}
        getCurrentBatch={getCurrentBatch}
      />

      {isShowBatchModal && (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /*
        // @ts-ignore */
        <BatchInfoModal
          batch={currentBatch ?? {}}
          openModal={isShowBatchModal}
          setOpenModal={() => setIsShowBatchModal(prev => !prev)}
        />
      )}
    </>
  )
})
