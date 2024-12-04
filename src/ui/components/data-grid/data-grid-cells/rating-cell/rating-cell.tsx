import { Rate, RateProps } from 'antd'
import { FC, memo, useState } from 'react'
import { VscFeedback } from 'react-icons/vsc'

import { ReviewsForm } from '@components/forms/reviews-form'
import { CustomButton } from '@components/shared/custom-button'
import { Modal } from '@components/shared/modal'

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
