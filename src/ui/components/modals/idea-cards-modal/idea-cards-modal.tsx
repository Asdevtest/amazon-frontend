import { observer } from 'mobx-react'
import { FC } from 'react'

import { SuppliersAndIdeas } from '@components/product/suppliers-and-ideas'
import { Modal } from '@components/shared/modal'

import { useClassNames } from './idea-cards-modal.styles'

interface IdeaCardsModalProps {
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
  productId?: string
  currentIdeaId?: string
  product?: any
  isCreate?: boolean
}

export const IdeaCardsModal: FC<IdeaCardsModalProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { openModal, setOpenModal, isCreate, productId, product, currentIdeaId } = props

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
          productId={productId}
          product={product}
          currentIdeaId={currentIdeaId}
        />
      </div>
    </Modal>
  )
})
