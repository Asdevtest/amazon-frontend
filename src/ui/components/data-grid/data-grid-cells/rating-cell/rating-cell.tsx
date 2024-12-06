import { Rate, RateProps } from 'antd'
import { FC, memo, useState } from 'react'
import { VscFeedback } from 'react-icons/vsc'

import { ReviewsForm } from '@components/forms/reviews-form'
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'
import { Text } from '@components/shared/text'

import { useStyles } from './rating-cell.style'

interface RatingCellProps extends RateProps {
  rating: number
  id?: string
  name?: string
  totalFeedback?: number
  isSupplier?: boolean
  hideTotalCountFeedback?: boolean
}

export const RatingCell: FC<RatingCellProps> = memo(props => {
  const { rating, hideTotalCountFeedback, isSupplier, totalFeedback, id, name, ...restProps } = props

  const { classes: styles } = useStyles()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className={styles.root}>
        <div className={styles.flexRow}>
          <Rate count={1} value={5} {...restProps} />
          <Text strong copyable={false} text={String(rating || 5)} />
        </div>

        {!hideTotalCountFeedback && totalFeedback ? (
          <CustomButton
            size="small"
            type="link"
            icon={<VscFeedback />}
            className={styles.feedback}
            onClick={() => setShowModal(true)}
          >
            {totalFeedback || ''}
          </CustomButton>
        ) : null}
      </div>

      {id && name ? (
        <Modal openModal={showModal} setOpenModal={() => setShowModal(!showModal)}>
          <ReviewsForm
            isSupplier={isSupplier}
            user={{ _id: id, name, rating }}
            onClose={() => setShowModal(!showModal)}
          />
        </Modal>
      ) : null}
    </>
  )
})
