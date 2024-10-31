import { TableCell, TableRow } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import '@typings/enums/button-style'

import { useStyles } from './exchange-product-item.style'

export const ExchangeProductItem = ({ product, handlerPrivateLabel, index }) => {
  const { classes: styles } = useStyles()
  return (
    <TableRow>
      <TableCell>
        <img alt="" src={product.categoryImg} className={styles.img} />
      </TableCell>
      <TableCell>
        <p className={(styles.text, styles.typoCategory)}>{product.category}</p>
      </TableCell>
      <TableCell>
        <p className={(styles.text, styles.typoPrice)}>{'$ ' + (product.price + product.deliveryPrice).toFixed(2)}</p>
      </TableCell>
      <TableCell>
        <p className={styles.text}>{product.qty}</p>
      </TableCell>
      <TableCell>
        <p className={styles.text}>{'$ ' + product.avgPrice}</p>
      </TableCell>
      <TableCell>
        <p className={styles.text}>{product.recConsignmentQty}</p>
      </TableCell>
      <TableCell>
        <p className={styles.text}>{product.recConsignmentWeight}</p>
      </TableCell>
      <TableCell>
        <p className={styles.text}>{product.avgBSR}</p>
      </TableCell>
      <TableCell>
        <p className={styles.text}>{product.avgReviews}</p>
      </TableCell>
      <TableCell>
        <p className={styles.text}>{product.avgRevenue}</p>
      </TableCell>
      <TableCell>
        <p className={(styles.text, styles.standartPrice)}>{'$ 499'}</p>
      </TableCell>
      <TableCell>
        <CustomButton type="primary" onClick={() => handlerPrivateLabel(index)}>
          {t(TranslationKey.Start)}
        </CustomButton>
      </TableCell>
      <TableCell>
        <CustomButton onClick={() => alert('Card button click')}>
          {t(TranslationKey['Add for $']) + product.price}
        </CustomButton>
      </TableCell>
    </TableRow>
  )
}
