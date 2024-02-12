import { observer } from 'mobx-react'
import { FC } from 'react'

import { SuppliersAndIdeas } from '@components/product/suppliers-and-ideas'
import { Modal } from '@components/shared/modal'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './idea-cards-modal.style'

interface IdeaCardsModalProps {
  productId?: string
  product?: IProduct
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  updateData?: () => void
  currentIdeaId?: string
  isCreate?: boolean
}

export const IdeaCardsModal: FC<IdeaCardsModalProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { openModal, product, productId, setOpenModal, isCreate, currentIdeaId, updateData } = props

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.root}>
        <SuppliersAndIdeas
          isModalView
          isCreate={isCreate}
          currentIdeaId={currentIdeaId}
          closeModalHandler={setOpenModal}
          productId={productId}
          product={product}
          updateData={updateData}
        />
      </div>
    </Modal>
  )
})
