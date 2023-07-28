import { observer } from 'mobx-react'
import { FC } from 'react'

import { SuppliersAndIdeas } from '@components/product/suppliers-and-ideas'
import { Modal } from '@components/shared/modal'

import { useClassNames } from './idea-cards-modal.styles'

interface IdeaCardsModalProps {
  productId: string
  product: any
  openModal: boolean
  setOpenModal: (openModal?: boolean) => void
}

export const IdeaCardsModal: FC<IdeaCardsModalProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { openModal, setOpenModal, productId, product } = props

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.root}>
        <SuppliersAndIdeas productId={productId} product={product} />
      </div>
    </Modal>
  )
})
