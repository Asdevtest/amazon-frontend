import { TableCell, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './exchange-product-item.style'

export const ExchangeProductItem = ({ product, handlerPrivateLabel, index }) => {
  const { classes: styles } = useStyles()
  return (
    <TableRow>
      <TableCell>
        <img alt="" src={product.categoryImg} className={styles.img} />
      </TableCell>
      <TableCell>
        <Typography className={(styles.text, styles.typoCategory)}>{product.category}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={(styles.text, styles.typoPrice)}>
          {'$ ' + (product.price + product.deliveryPrice).toFixed(2)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography className={styles.text}>{product.qty}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={styles.text}>{'$ ' + product.avgPrice}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={styles.text}>{product.recConsignmentQty}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={styles.text}>{product.recConsignmentWeight}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={styles.text}>{product.avgBSR}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={styles.text}>{product.avgReviews}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={styles.text}>{product.avgRevenue}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={(styles.text, styles.standartPrice)}>{'$ 499'}</Typography>
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
