/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { EyeIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './shop-notification-message-cell.style'

import { IShop, ShopUpdateResult } from './shop-notification.type'

interface ShopNotificationMessageCellProps {
  notification: any
}

export const ShopNotificationMessageCell: FC<ShopNotificationMessageCellProps> = memo(({ notification }) => {
  const { classes: styles, cx } = useStyles()

  const maxShopsLength = 10
  const success = ShopUpdateResult.SUCCESS
  const error = ShopUpdateResult.ERROR

  const renderShop = (shop: IShop, needСomma: boolean) => (
    <Link className={styles.shopLink} to={`/client/shops/shops`}>
      {`${shop?.name}${needСomma ? ', ' : ''}`}
    </Link>
  )

  const renderShops = (shops: IShop[], status: ShopUpdateResult) => {
    const isSuccess = status === success
    const statusTranslation = isSuccess
      ? t(TranslationKey['Successfully updated'])
      : t(TranslationKey['Not updated because of a bug'])

    const moreThenThreeShops = shops?.length > maxShopsLength

    const shopsToRender = moreThenThreeShops
      ? shops?.slice(0, maxShopsLength)?.map((shop, shopIndex) => renderShop(shop, shopIndex + 1 !== maxShopsLength))
      : shops?.map((shop, shopIndex) => renderShop(shop, shopIndex + 1 !== shops.length))

    return (
      <p className={styles.multilineText}>
        <span className={cx(styles.shopLink1, isSuccess ? styles.success : styles.error)}>
          {statusTranslation}
          {moreThenThreeShops && (
            <Tooltip
              title={shops?.map((shop, shopIndex) => renderShop(shop, shopIndex + 1 !== shops.length))}
              classes={{ tooltip: styles.tooltip }}
            >
              <div className={styles.tooltipIcon}>
                <EyeIcon className={styles.tooltipIcon} />
              </div>
            </Tooltip>
          )}
          {': '}
        </span>

        {shopsToRender}
      </p>
    )
  }

  const renderMessage = () => {
    const validShopData = notification?.shops?.reduce(
      (acc: { [success]: IShop[]; [error]: IShop[] }, shop: IShop) => {
        if (shop?.result === success) {
          acc[success].push(shop)
        } else {
          acc[error].push(shop)
        }

        return acc
      },
      {
        [success]: [],
        [error]: [],
      },
    )

    return Object.keys(validShopData).map(status => {
      if (validShopData[status].length > 0) {
        return renderShops(validShopData[status], status as ShopUpdateResult)
      }
      return null
    })
  }

  return <div className={styles.wrapper}>{renderMessage()}</div>
})
