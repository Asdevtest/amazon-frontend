import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'

import {useClassNames} from './box-order.style'

export const BoxOrder = observer(({order}) => {
  const classNames = useClassNames()
  return (
    <div className={classNames.order}>
      <div className={classNames.imgWithTitles}>
        <img
          className={classNames.img}
          src={
            order.product &&
            order.product.images &&
            order.product.images[0] &&
            getAmazonImageUrl(order.product.images[0])
          }
        />
        <div>
          <Typography>{order.product && order.product.amazonTitle}</Typography>
          <Typography color="textSecondary">{order.product && order.product.id}</Typography>
          <Typography color="textSecondary">
            {`БАРКОД: ${order.product && order.product.barCode ? order.product.barCode : 'N/A'}`}
          </Typography>
        </div>
      </div>

      <Typography>{order.barCode}</Typography>
    </div>
  )
})
