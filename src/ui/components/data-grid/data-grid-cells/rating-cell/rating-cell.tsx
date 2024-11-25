import { Rate, RateProps } from 'antd'
import { FC, memo, useState } from 'react'
import { GoComment } from 'react-icons/go'

import { ReviewsForm } from '@components/forms/reviews-form'
import { Modal } from '@components/shared/modal'

import { useStyles } from './rating-cell.style'

interface RatingCellProps extends RateProps {
  rating: number
  id?: string
  name?: string
  totalFeedback?: number
}

export const RatingCell: FC<RatingCellProps> = memo(props => {
  const { rating, totalFeedback, id, name, ...restProps } = props

  const { classes: styles } = useStyles()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className={styles.root}>
        {totalFeedback ? (
          <div className={styles.totalFeedbackWrapper}>
            <GoComment />
            <p className={styles.totalFeedback}>{totalFeedback}</p>
          </div>
        ) : null}

        <Rate
          {...restProps}
          allowHalf
          value={rating}
          className={styles.rate}
          // @ts-ignore
          onClick={() => setShowModal(true)} // this method is not in antd type but it works
        />
      </div>

      {id && name ? (
        <Modal openModal={showModal} setOpenModal={() => setShowModal(!showModal)}>
          <ReviewsForm user={{ _id: id, name, rating }} onClose={() => setShowModal(!showModal)} />
        </Modal>
      ) : null}
    </>
  )
})
