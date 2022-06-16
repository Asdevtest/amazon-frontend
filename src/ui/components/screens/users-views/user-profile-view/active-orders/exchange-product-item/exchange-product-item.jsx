import React from 'react'

import {Typography, TableRow, TableCell} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'

import {t} from '@utils/translations'

import {useClassNames} from './exchange-product-item.style'

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
        <Typography className={(classNames.text, classNames.standartPrice)}>{'$ 499'}</Typography>
      </TableCell>
      <TableCell>
        <SuccessButton success onClick={() => handlerPrivateLabel(index)}>
          {t(TranslationKey.Start)}
        </SuccessButton>
      </TableCell>
      <TableCell>
        <Button onClick={() => alert('Card button click')}>{t(TranslationKey['Add for $']) + product.price}</Button>
      </TableCell>
    </TableRow>
  )
}
