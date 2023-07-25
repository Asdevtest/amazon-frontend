import React from 'react'

import { TableCell, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useClassNames } from './exchange-product-item.style'

export const ExchangeProductItem = ({ product, handlerPrivateLabel, index }) => {
  const { classes: classNames } = useClassNames()
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
        <Typography className={(classNames.text, classNames.standartPrice)}>{'$ 499'}</Typography>
      </TableCell>
      <TableCell>
        <Button success onClick={() => handlerPrivateLabel(index)}>
          {t(TranslationKey.Start)}
        </Button>
      </TableCell>
      <TableCell>
        <Button onClick={() => alert('Card button click')}>{t(TranslationKey['Add for $']) + product.price}</Button>
      </TableCell>
    </TableRow>
  )
}
