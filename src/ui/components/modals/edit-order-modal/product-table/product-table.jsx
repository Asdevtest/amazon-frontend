import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'
import { Field } from '@components/shared/field'

import { calcProductsPriceWithDelivery } from '@utils/calculation'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { checkAndMakeAbsoluteUrl, shortAsin, toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './product-table.style'

export const ProductTable = props => {
  const { modalHeadCells, order, orderFields, setOrderField, checkIsPlanningPrice } = props

  const { classes: styles } = useStyles()

  return (
    <TableContainer className={styles.tableContainer}>
      <Table className={styles.table}>
        <TableHead>
          <TableRow>
            {modalHeadCells.map((el, i) => (
              <TableCell key={i} className={styles.tableCell}>
                {el}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <img className={styles.imgBox} src={getAmazonImageUrl(order.product.images[0])} alt={order.csCode} />
            </TableCell>
            <TableCell>
              <Typography className={styles.amazonTitle}>{order.product.amazonTitle}</Typography>
              <Typography sx={{ display: 'flex', gap: '2px' }}>
                ASIN:{' '}
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://www.amazon.com/dp/${order.product.asin}`}
                  onClick={e => e.stopPropagation()}
                >
                  <span className={styles.asin}>{shortAsin(order.product.asin)}</span>
                </a>
                <CopyValue text={order.product.asin} />
              </Typography>
            </TableCell>
            <TableCell>
              {order.orderSupplier ? toFixed(order.orderSupplier.price, 2) : t(TranslationKey['Not available'])}
            </TableCell>
            <TableCell className={styles.tableCell}>
              {toFixed(order?.orderSupplier?.batchDeliveryCostInDollar / order?.orderSupplier?.amount, 2) ||
                t(TranslationKey['Not available'])}
            </TableCell>
            <TableCell className={styles.tableCell}>
              <div className={styles.fieldWrapper}>
                <Field
                  error={!orderFields.amount}
                  disabled={
                    (orderFields.status !== OrderStatusByKey[OrderStatus.AT_PROCESS] &&
                      orderFields.status !== OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]) ||
                    checkIsPlanningPrice
                  }
                  inputProps={{ maxLength: 5 }}
                  inputClasses={styles.commentInput}
                  value={orderFields.amount}
                  onChange={e => setOrderField('amount')(e)}
                />
              </div>
            </TableCell>
            <TableCell>{toFixedWithDollarSign(calcProductsPriceWithDelivery(order.product, orderFields), 2)}</TableCell>
            <TableCell>
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.orderSupplier?.link)}>
                <Typography className={styles.link}>
                  {order.orderSupplier?.link || `${t(TranslationKey['Not available'])}`}
                </Typography>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
