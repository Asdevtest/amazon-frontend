import { Rate, RateProps } from 'antd'
import { FC, memo, useState } from 'react'

import { ReviewsForm } from '@components/forms/reviews-form'
import { Modal } from '@components/shared/modal'

import { useStyles } from './rating-cell.style'

interface RatingCellProps extends RateProps {
  rating: number
  id?: string
  name?: string
}

export const RatingCell: FC<RatingCellProps> = memo(props => {
  const { rating, id, name, ...restProps } = props

  const { classes: styles } = useStyles()
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className={styles.root}>
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
