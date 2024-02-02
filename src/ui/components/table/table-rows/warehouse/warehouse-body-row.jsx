/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { Fragment, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ProductAsinCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'

import { calcPriceForBox } from '@utils/calculation'
import { checkIsClient, checkIsMediaFileLink } from '@utils/checks'
import { formatShortDateTime } from '@utils/date-time'
import { toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
import { t } from '@utils/translations'

import { styles } from './warehouse-body-row.style'

const WarehouseBodyRowRaw = ({
  item: box,
  itemIndex: boxIndex,
  handlers,
  rowsDatas,
  areSubBoxes,
  onClickHsCode,
  ...restProps
}) => {
  const styles = restProps.classes
  const ordersQty = box.items.length
  const [isMaximizedMasterBox, setIsMaximizedMasterBox] = useState(false)

  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [curImages, setCurImages] = useState([])
  const [curImageIndex, setCurImageIndex] = useState(0)

  // const style = colorByBoxStatus(box.status)

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

  return (
    <>
      {box.items.map((order, orderIndex) => (
        <Fragment key={`orderBox_${order.order._id}_${orderIndex}`}>
          <TableRow
            className={cx(styles.row, { [styles.boxLastRow]: orderIndex === ordersQty - 1 })}
            onDoubleClick={() => restProps.setCurrentOpenedBox(box._id)}
          >
            {orderIndex === 0 && (
              <Fragment>
                <TableCell rowSpan={ordersQty}>{boxIndex + 1}</TableCell>
              </Fragment>
            )}

            {orderIndex === 0 && (
              <>
                <TableCell rowSpan={ordersQty} className={[styles.textEllipsis, styles.cellValueNumber]}>
                  <ProductStatus product={box.status} />
                </TableCell>
              </>
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
              <>
                <TableCell rowSpan={ordersQty}>
                  <Button
                    disableElevation
                    tooltipInfoContent={
                      boxIndex === 0 && t(TranslationKey['Viewing photos of the box taken at the prep center'])
                    }
                    disabled={!box.images?.length}
                    color="primary"
                    className={styles.button}
                    variant="contained"
                    onClick={() => {
                      setCurImages(box.images.filter(img => checkIsMediaFileLink(img)))
                      setShowPhotosModal(!showPhotosModal)
                    }}
                  >
                    {t(TranslationKey.Photos)}
                  </Button>
                </TableCell>
              </>
            )}

            <TableCell className={styles.centerCell}>
              <div className={styles.amountCell}>
                {isMasterBox ? `${box.amount} boxes x ${order.amount} units` : order.amount}
              </div>
            </TableCell>

            {orderIndex === 0 && (
              <>
                <TableCell rowSpan={ordersQty} className={[styles.textEllipsis, styles.cellValueNumber]}>
                  {box.destination?.name}
                </TableCell>
                <TableCell className={styles.cellValueNumber} rowSpan={ordersQty}>
                  {'ID: ' + box.humanFriendlyId}
                </TableCell>
              </>
            )}

            {orderIndex === 0 && (
              <TableCell rowSpan={ordersQty}>
                <div className={styles.cellValueNumber}>{toFixedWithDollarSign(calcPriceForBox(box), 2)}</div>
              </TableCell>
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
              <TableCell rowSpan={ordersQty} className={[styles.textEllipsis, styles.cellValueNumber]}>
                <Tooltip title={box.trackNumberText ? box.trackNumberText : null}>
                  <div className={styles.cellValueNumber}>{box.trackNumberText || t(TranslationKey.Missing)}</div>
                </Tooltip>
              </TableCell>
            )}
          </TableRow>
          {isMaximizedMasterBox ? (
            <TableRow>
              <TableCell colSpan="2" />
              <TableCell colSpan="40">
                <Table className={styles.subBoxesTable}>
                  <TableBody>
                    {Array(box.amount)
                      .fill(true)
                      .map((_, index) => (
                        <WarehouseBodyRow key={`subBox_${index}`} areSubBoxes item={box} itemIndex={index} />
                      ))}
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          ) : undefined}
        </Fragment>
      ))}

      {showPhotosModal && (
        <ImageModal
          isOpenModal={showPhotosModal}
          files={curImages}
          currentFileIndex={curImageIndex}
          onOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          onCurrentFileIndex={index => setCurImageIndex(index)}
        />
      )}
    </>
  )
}

export const WarehouseBodyRow = withStyles(WarehouseBodyRowRaw, styles)
