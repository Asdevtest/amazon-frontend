/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Table, TableBody, TableCell, TableRow, Tooltip, Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { boxStatusTranslateKey, colorByBoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal } from '@components/modals/image-modal/image-modal'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'

import { calcPriceForBox } from '@utils/calculation'
import { checkIsClient, checkIsImageLink } from '@utils/checks'
import { formatShortDateTime } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { shortAsin, shortSku, toFixedWithDollarSign, toFixedWithKg } from '@utils/text'
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
  const classNames = restProps.classes
  const ordersQty = box.items.length
  const [isMaximizedMasterBox, setIsMaximizedMasterBox] = useState(false)

  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [curImages, setCurImages] = useState([])
  const [curImageIndex, setCurImageIndex] = useState(0)

  // const style = colorByBoxStatus(box.status)

  const BoxUpdatedAt = ({ product }) => (
    <Typography className={classNames.shortDateCellTypo}>
      {product.updatedAt ? formatShortDateTime(product.updatedAt) : '-'}
    </Typography>
  )

  const ProductStatus = ({ product }) => (
    <div className={classNames.multilineTextWrapper}>
      <Typography className={classNames.multilineText} style={colorByBoxStatus(product)}>
        {t(boxStatusTranslateKey(product))}
      </Typography>
    </div>
  )

  const ProductCell = ({ product }) => (
    <div className={classNames.asinCell}>
      <div className={classNames.asinCellContainer}>
        <img alt="" className={classNames.img} src={getAmazonImageUrl(product.images.slice()[0])} />

        <div className={classNames.csCodeTypoWrapper}>
          <Typography className={classNames.csCodeTypo}>{product.amazonTitle}</Typography>
          <div className={classNames.copyAsin}>
            <Typography className={classNames.typoCell}>
              {t(TranslationKey.ASIN)}

              {product.asin ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`https://www.amazon.com/dp/${product.asin}`}
                  className={classNames.normalizeLink}
                >
                  <span className={classNames.linkSpan}>{shortAsin(product.asin)}</span>
                </a>
              ) : (
                <span className={classNames.typoSpan}>{t(TranslationKey.Missing)}</span>
              )}
            </Typography>
            {product.asin ? <CopyValue text={product.asin} /> : null}
          </div>

          <div className={classNames.copyAsin}>
            <Typography className={classNames.typoCell}>
              {t(TranslationKey.SKU)}
              <span className={classNames.typoSpan}>
                {product.skusByClient.slice()[0]
                  ? shortSku(product.skusByClient.slice()[0])
                  : t(TranslationKey.Missing)}
              </span>
            </Typography>
            {product.skusByClient.slice()[0] ? <CopyValue text={product.skusByClient.slice()[0]} /> : null}
          </div>
        </div>
      </div>
    </div>
  )

  const isMasterBox = !(!box.amount || box.amount === 1) && !areSubBoxes

  return (
    <>
      {box.items.map((order, orderIndex) => (
        <React.Fragment key={`orderBox_${order.order._id}_${orderIndex}`}>
          <TableRow
            className={cx(classNames.row, { [classNames.boxLastRow]: orderIndex === ordersQty - 1 })}
            onDoubleClick={() => restProps.setCurrentOpenedBox(box._id)}
          >
            {orderIndex === 0 && (
              <React.Fragment>
                <TableCell rowSpan={ordersQty}>{boxIndex + 1}</TableCell>
              </React.Fragment>
            )}

            {orderIndex === 0 && (
              <React.Fragment>
                <TableCell rowSpan={ordersQty} className={[classNames.textEllipsis, classNames.cellValueNumber]}>
                  <ProductStatus product={box.status} />
                </TableCell>
              </React.Fragment>
            )}

            <TableCell>
              <BoxUpdatedAt product={box} />
            </TableCell>
            <TableCell>
              <ProductCell product={order.product} />
            </TableCell>

            {orderIndex === 0 && (
              <React.Fragment>
                <TableCell rowSpan={ordersQty}>
                  <Button
                    disableElevation
                    tooltipInfoContent={
                      boxIndex === 0 && t(TranslationKey['Viewing photos of the box taken at the prep center'])
                    }
                    disabled={!box.images?.length}
                    color="primary"
                    className={classNames.button}
                    variant="contained"
                    onClick={() => {
                      setCurImages(box.images.filter(img => checkIsImageLink(img)))
                      setShowPhotosModal(!showPhotosModal)
                    }}
                  >
                    {t(TranslationKey.Photos)}
                  </Button>
                </TableCell>
              </React.Fragment>
            )}

            <TableCell className={classNames.centerCell}>
              <div className={classNames.amountCell}>
                {isMasterBox ? `${box.amount} boxes x ${order.amount} units` : order.amount}
              </div>
            </TableCell>

            {orderIndex === 0 && (
              <React.Fragment>
                <TableCell rowSpan={ordersQty} className={[classNames.textEllipsis, classNames.cellValueNumber]}>
                  {box.destination?.name}
                </TableCell>
                <TableCell className={classNames.cellValueNumber} rowSpan={ordersQty}>
                  {'ID: ' + box.humanFriendlyId}
                </TableCell>
              </React.Fragment>
            )}

            {orderIndex === 0 && (
              <TableCell rowSpan={ordersQty}>
                <div className={classNames.cellValueNumber}>{toFixedWithDollarSign(calcPriceForBox(box), 2)}</div>
              </TableCell>
            )}

            <TableCell className={classNames.centerCell}>
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

            <TableCell className={classNames.centerCell}>
              {toFixedWithKg(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier, 2)}
            </TableCell>

            {orderIndex === 0 && !checkIsClient(UserRoleCodeMap[restProps.userInfo?.role]) && (
              <TableCell rowSpan={ordersQty} className={[classNames.textEllipsis, classNames.cellValueNumber]}>
                <Tooltip title={box.trackNumberText ? box.trackNumberText : null}>
                  <div className={classNames.cellValueNumber}>{box.trackNumberText || t(TranslationKey.Missing)}</div>
                </Tooltip>
              </TableCell>
            )}
          </TableRow>
          {isMaximizedMasterBox ? (
            <TableRow>
              <TableCell colSpan="2" />
              <TableCell colSpan="40">
                <Table className={classNames.subBoxesTable}>
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
        </React.Fragment>
      ))}

      <ImageModal
        isOpenModal={showPhotosModal}
        handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        imageList={curImages}
        handleCurrentImageIndex={index => setCurImageIndex(index)}
        currentImageIndex={curImageIndex}
      />
    </>
  )
}

export const WarehouseBodyRow = withStyles(WarehouseBodyRowRaw, styles)
