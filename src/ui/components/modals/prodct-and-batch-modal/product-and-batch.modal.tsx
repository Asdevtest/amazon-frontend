import { FC, useState } from 'react'

import { Modal } from '@components/shared/modal'

import { IOrderBoxBatch } from '@typings/order-box'
import { IProduct } from '@typings/product'

import { AboutProductModal } from '../about-product-modal'
import { BatchInfoModal } from '../batch-info-modal'

interface ProductAndBatchModalProps {
  selectedProduct: IProduct
  shops: any
  getBatches: () => void
  batches: IOrderBoxBatch[]
  showLoading: boolean
  openModal: boolean
  setOpenModal: () => void
  currentBatch: IOrderBoxBatch
  getCurrentBatch: (guid: string) => void
}

export const ProductAndBatchModal: FC<ProductAndBatchModalProps> = props => {
  const {
    selectedProduct,
    shops,
    batches,
    showLoading,
    getBatches,
    openModal,
    setOpenModal,
    currentBatch,
    getCurrentBatch,
  } = props

  const [isShowBatchModal, setIsShowBatchModal] = useState(false)

  console.log(isShowBatchModal)

  const handleShowModal = () => {
    setIsShowBatchModal(prev => !prev)
  }

  return (
    <>
      <Modal openModal={openModal} setOpenModal={setOpenModal}>
        <AboutProductModal
          selectedProduct={selectedProduct}
          shops={shops}
          getBatches={getBatches}
          batches={batches}
          showLoading={showLoading}
          setShowBatchModal={handleShowModal}
          getCurrentBatch={getCurrentBatch}
        />
      </Modal>
      {isShowBatchModal && (
        <BatchInfoModal
          batch={currentBatch ?? {}}
          openModal={isShowBatchModal}
          userInfo={undefined}
          history={undefined}
          patchActualShippingCostBatch={undefined}
          location={undefined}
          setOpenModal={() => setIsShowBatchModal(prev => !prev)}
          onClickHsCode={undefined}
          onSubmitChangeBoxFields={undefined}
        />
      )}
    </>
  )
}
