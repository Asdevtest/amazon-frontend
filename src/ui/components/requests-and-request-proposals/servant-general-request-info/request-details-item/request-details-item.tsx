/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useStyles } from './request-details-item.style'

interface RequestDetailsItemProps {
  request: any
  showAllDetails?: boolean
}

export const RequestDetailsItem: FC<RequestDetailsItemProps> = memo(({ request, showAllDetails }) => {
  const { classes: styles, cx } = useStyles()

  const requestDetailsConfig = [
    { title: t(TranslationKey.Shop), value: request?.product?.shop?.name },
    {
      title: t(TranslationKey.Marketplace),
      value: request?.product?.marketPlaceCountry ? (
        <div className={styles.marketPlaceWrapper}>
          <Avatar size={20} src={getAmazonImageUrl(request?.product?.marketPlaceCountry?.image)} />
          <p>{request?.product?.marketPlaceCountry?.shortTitle}</p>
        </div>
      ) : null,
    },
    { title: t(TranslationKey.Announcement), value: request?.announcement?.title },
  ]

  const requestAdditionalDetails = [
    { title: t(TranslationKey.Title), value: request?.title },
    { title: 'ID', value: request?.xid },
  ]

  if (showAllDetails) {
    requestDetailsConfig.unshift(...requestAdditionalDetails)
  }

  return (
    <>
      {requestDetailsConfig.map((item, index) => (
        <div key={index} className={styles.requestDetailsWrapper}>
          <p className={styles.title}>{item?.title + ':'}</p>
          <p className={cx(styles.title, styles.text)}>{item?.value || t(TranslationKey.Missing)}</p>
        </div>
      ))}
    </>
  )
})
