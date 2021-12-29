import {TableCell, TableRow, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {Button} from '@components/buttons/button'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'

import {useClassNames} from './product-in-order-table-row.style'

export const ProductInOrderTableRow = observer(({item, handlers}) => {
  const classNames = useClassNames()

  return (
    <TableRow>
      <TableCell className={classNames.orderCell}>
        <div className={classNames.product}>
          <img
            alt=""
            src={item.product.images && item.product.images[0] && getAmazonImageUrl(item.product.images[0])}
            className={classNames.img}
          />
          <div className={classNames.descriptionWrapper}>
            <Typography className={classNames.amazonTitle}>{item.product && item.product.amazonTitle}</Typography>
            <Typography>{item.product && item.product.id}</Typography>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Typography className={classNames.barCodeTypo}>
          {item.product && item.product.barCode ? item.product.barCode : 'N/A'}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography>{item.amount}</Typography>
      </TableCell>

      <TableCell className={classNames.buyerComment}>
        <Typography>{item.order.buyerComment}</Typography>
      </TableCell>

      <TableCell>
        <Button
          disableElevation
          color="primary"
          className={classNames.button}
          variant="contained"
          onClick={() => {
            handlers.onTriggerOpenModal()
            handlers.onSelectPhotos({images: item.product.images, imgIndex: 0})
          }}
        >
          {'Фотографии'}
        </Button>
      </TableCell>
    </TableRow>
  )
})
