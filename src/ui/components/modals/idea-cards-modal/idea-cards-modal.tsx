import { observer } from 'mobx-react'
import { FC } from 'react'

import { SuppliersAndIdeas } from '@components/product/suppliers-and-ideas'
import { Modal } from '@components/shared/modal'

import { IProduct } from '@typings/product'

import { useClassNames } from './idea-cards-modal.styles'

interface IdeaCardsModalProps {
  productId?: string
  product?: IProduct
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  currentIdeaId?: string
  isCreate?: boolean
}

export const IdeaCardsModal: FC<IdeaCardsModalProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { openModal, product, productId, setOpenModal, isCreate, currentIdeaId } = props

  return (
    <Modal
      dialogContextClassName={classNames.modalDialogContextClassName}
      openModal={openModal}
      setOpenModal={setOpenModal}
    >
      <div className={classNames.root}>
        <SuppliersAndIdeas
          isModalView
          isCreate={isCreate}
          currentIdeaId={currentIdeaId}
          closeModalHandler={setOpenModal}
          productId={productId}
          product={product}
        />
      </div>
    </Modal>
  )
})
