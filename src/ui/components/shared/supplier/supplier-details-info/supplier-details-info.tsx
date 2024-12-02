import { Rate } from 'antd'
import { FC, memo, useState } from 'react'
import { VscFeedback } from 'react-icons/vsc'

import { ReviewsForm } from '@components/forms/reviews-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomImage } from '@components/shared/custom-image'
import { Modal } from '@components/shared/modal'
import { Text } from '@components/shared/text'

import { useStyles } from './supplier-details-info.style.'

interface SupplierDitailsInfoProps {
  xid?: number
  rate?: number
  image?: string
  userId?: string
  totalCountFeedback?: number
}

export const SupplierDitailsInfo: FC<SupplierDitailsInfoProps> = memo(porps => {
  const { image, xid, rate = 0, userId, totalCountFeedback } = porps

  const { classes: styles } = useStyles()
  const [openReview, setOpenReview] = useState(false)

  const xidText = `ID: ${xid}`

  return (
    <>
      <div className={styles.root}>
        {image ? <CustomImage preview={false} src={image} height={20} width={30} /> : null}
        {xid ? <Text copyable={false} text={xidText} rows={1} /> : null}
        <Rate disabled allowHalf value={rate} />
        {totalCountFeedback ? (
          <CustomButton
            size="small"
            type="link"
            icon={<VscFeedback />}
            className={styles.feedback}
            onClick={() => setOpenReview(true)}
          >
            {totalCountFeedback || ''}
          </CustomButton>
        ) : null}
      </div>

      <Modal openModal={openReview} setOpenModal={setOpenReview}>
        <ReviewsForm
          isSupplier
          user={{ _id: userId || '', name: String(xid), rating: rate }}
          onClose={() => setOpenReview(false)}
        />
      </Modal>
    </>
  )
})
