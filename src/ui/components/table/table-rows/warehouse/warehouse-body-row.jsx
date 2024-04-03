import { cx } from '@emotion/css'
import { Fragment } from 'react'
import { withStyles } from 'tss-react/mui'

import { TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { FilesCell, ProductAsinCell } from '@components/data-grid/data-grid-cells'

import { calcPriceForBox } from '@utils/calculation'
import { checkIsClient } from '@utils/checks'
import { formatShortDateTime } from '@utils/date-time'
import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './warehouse-body-row.style'

const WarehouseBodyRowRaw = ({ item: box, itemIndex: boxIndex, areSubBoxes, ...restProps }) => {
  const styles = restProps.classes
  const ordersQty = box.items.length

  const BoxUpdatedAt = ({ product }) => (
    <Typography className={styles.shortDateCellTypo}>
      {product.updatedAt ? formatShortDateTime(product.updatedAt) : '-'}
    </Typography>
  )

  const ProductStatus = ({ product }) => (
    <div className={styles.multilineTextWrapper}>
      <Typography className={styles.multilineText} style={colorByBoxStatus(product)}>
        {t(boxStatusTranslateKey(product))}
      </Typography>
    </div>
  )

  const isMasterBox = !(!box.amount || box.amount === 1) && !areSubBoxes

  return box.items.map((order, orderIndex) => (
    <Fragment key={`orderBox_${order.order._id}_${orderIndex}`}>
      <TableRow
        className={cx(styles.row, { [styles.boxLastRow]: orderIndex === ordersQty - 1 })}
        onDoubleClick={() => restProps.setCurrentOpenedBox(box._id)}
      >
        {orderIndex === 0 && <TableCell rowSpan={ordersQty}>{boxIndex + 1}</TableCell>}

        {orderIndex === 0 && (
          <TableCell rowSpan={ordersQty}>
            <ProductStatus product={box.status} />
          </TableCell>
        )}

        <TableCell>
          <BoxUpdatedAt product={box} />
        </TableCell>
        <TableCell className={styles.tableCellProduct}>
          <ProductAsinCell
            image={order?.product?.images?.[0]}
            amazonTitle={order?.product?.amazonTitle}
            asin={order?.product?.asin}
            skuByClient={order?.product?.skuByClient}
          />
        </TableCell>

        {orderIndex === 0 && (
          <TableCell rowSpan={ordersQty}>
            <FilesCell files={box.images} />
          </TableCell>
        )}

        <TableCell className={styles.centerCell}>
          <div className={styles.amountCell}>
            {isMasterBox ? `${box.amount} boxes x ${order.amount} units` : order.amount}
          </div>
        </TableCell>

        {orderIndex === 0 && (
          <>
            <TableCell rowSpan={ordersQty}>{box.destination?.name}</TableCell>
            <TableCell rowSpan={ordersQty}>{'ID: ' + box.humanFriendlyId}</TableCell>
          </>
        )}

        {orderIndex === 0 && (
          <TableCell rowSpan={ordersQty}>{toFixedWithDollarSign(calcPriceForBox(box), 2)}</TableCell>
        )}

        <TableCell className={styles.centerCell}>
          {toFixedWithKg(
            Math.max(
              parseFloat(
                box.weighGrossKgWarehouse
                  ? (box.lengthCmWarehouse * box.widthCmWarehouse * box.heightCmWarehouse) /
                      restProps.volumeWeightCoefficient
                  : (box.lengthCmSupplier * box.widthCmSupplier * box.heightCmSupplier) /
                      restProps.volumeWeightCoefficient,
              ) || 0,
              parseFloat(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier) || 0,
            ),
            2,
          )}
        </TableCell>

        <TableCell className={styles.centerCell}>
          {toFixedWithKg(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier, 2)}
        </TableCell>

        {orderIndex === 0 && !checkIsClient(UserRoleCodeMap[restProps.userInfo?.role]) && (
          <TableCell rowSpan={ordersQty}>
            <Tooltip title={box.trackNumberText ? box.trackNumberText : null}>
              <p className={styles.cellValueNumber}>{box.trackNumberText || t(TranslationKey.Missing)}</p>
            </Tooltip>
          </TableCell>
        )}
      </TableRow>
    </Fragment>
  ))
}

export const WarehouseBodyRow = withStyles(WarehouseBodyRowRaw, styles)
