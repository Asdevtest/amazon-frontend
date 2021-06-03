import React from 'react'

import {Typography, TableRow, TableCell, Button} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './exchange-product-item.style'

const textConsts = getLocalizedTexts(texts, 'ru').buyerUserExchangeItem

export const ExchangeProductItem = ({product, handlerPrivateLabel, index}) => {
  const classNames = useClassNames()
  return (
    <TableRow>
      <TableCell>
        <img alt="" src={product.categoryImg} className={classNames.img} />
      </TableCell>
      <TableCell>
        <Typography className={(classNames.text, classNames.typoCategory)}>{product.category}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={(classNames.text, classNames.typoPrice)}>
          {'$ ' + (product.price + product.deliveryPrice).toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={classNames.text}>{product.qty}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classNames.text}>{'$ ' + product.avgPrice}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classNames.text}>{product.recConsignmentQty}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classNames.text}>{product.recConsignmentWeight}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classNames.text}>{product.avgBSR}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classNames.text}>{product.avgReviews}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classNames.text}>{product.avgRevenue}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={(classNames.text, classNames.standartPrice)}>{textConsts.standartPrice}</Typography>
      </TableCell>
      <TableCell>
        <Button success onClick={() => handlerPrivateLabel(index)}>
          {textConsts.startBtn}
        </Button>
      </TableCell>
      <TableCell>
        <Button onClick={() => alert(textConsts.addBtnAlert)}>{textConsts.addBtn + product.price}</Button>
      </TableCell>
    </TableRow>
  )
}
