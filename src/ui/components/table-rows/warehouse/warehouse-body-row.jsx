import React, {useState} from 'react'

import {Checkbox, TableCell, TableRow, Typography, Table, TableBody} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {BoxViewForm} from '@components/forms/box-view-form'
import {Modal} from '@components/modal'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {calcPriceForBox} from '@utils/calculation'
import {checkIsImageLink} from '@utils/checks'
import {formatNormDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'
import {t} from '@utils/translations'

import {styles} from './warehouse-body-row.style'

const WarehouseBodyRowRaw = ({item: box, itemIndex: boxIndex, handlers, rowsDatas, areSubBoxes, ...restProps}) => {
  const classNames = restProps.classes
  const ordersQty = box.items.length
  const boxCreatedAt = formatNormDateTime(box.createdAt)
  const [isMaximizedMasterBox, setIsMaximizedMasterBox] = useState(false)

  const [showPhotosModal, setShowPhotosModal] = useState(false)
  const [curImages, setCurImages] = useState([])

  const [showBoxViewModal, setShowBoxViewModal] = useState(false)

  const onTriggerIsMaximizedMasterBox = () => {
    setIsMaximizedMasterBox(!isMaximizedMasterBox)
  }

  const ProductCell = ({imgSrc, title}) => (
    <TableCell className={classNames.productCell}>
      <img className={classNames.img} src={imgSrc} />
      <Typography className={classNames.productCellTitle}>{title}</Typography>
    </TableCell>
  )

  const isMasterBox = !(!box.amount || box.amount === 1) && !areSubBoxes

  const getBoxSecondTableCellContent = () => {
    if (areSubBoxes) {
      return
    }
    if (box.isDraft) {
      return <Typography>{'isDraft'}</Typography>
    } else {
      return (
        <div className={classNames.checkboxRow}>
          {handlers?.checkbox ? (
            <Checkbox
              color="primary"
              checked={rowsDatas?.selectedBoxes.includes(box._id)}
              onChange={() => handlers.checkbox(box._id)}
            />
          ) : undefined}
          {isMasterBox ? (
            isMaximizedMasterBox ? (
              <ArrowDropUpIcon onClick={onTriggerIsMaximizedMasterBox} />
            ) : (
              <ArrowDropDownIcon onClick={onTriggerIsMaximizedMasterBox} />
            )
          ) : undefined}
        </div>
      )
    }
  }

  return (
    <>
      {box.items.map((order, orderIndex) => (
        <React.Fragment key={`orderBox_${order.order._id}_${orderIndex}`}>
          <TableRow
            className={clsx(classNames.row, {[classNames.boxLastRow]: orderIndex === ordersQty - 1})}
            onDoubleClick={() => setShowBoxViewModal(!showBoxViewModal)}
          >
            {orderIndex === 0 && (
              <React.Fragment>
                <TableCell rowSpan={ordersQty}>{boxIndex + 1}</TableCell>
                <TableCell rowSpan={ordersQty} className={classNames.centerCell}>
                  {getBoxSecondTableCellContent()}
                </TableCell>
              </React.Fragment>
            )}
            <TableCell>{boxCreatedAt}</TableCell>
            <ProductCell imgSrc={getAmazonImageUrl(order.product.images[0])} title={order.product.amazonTitle} />

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

            <TableCell className={classNames.cellValueNumber}>
              {isMasterBox ? `${box.amount} boxes x ${order.amount} units` : order.amount}
            </TableCell>

            {orderIndex === 0 && (
              <React.Fragment>
                <TableCell rowSpan={ordersQty} className={classNames.textEllipsis}>
                  {box.destination?.name}
                </TableCell>
                <TableCell rowSpan={ordersQty}>{'ID: ' + box.humanFriendlyId}</TableCell>
              </React.Fragment>
            )}

            {orderIndex === 0 && (
              <TableCell rowSpan={ordersQty} className={classNames.cellValueNumber}>
                {toFixedWithDollarSign(calcPriceForBox(box), 2)}
              </TableCell>
            )}

            <TableCell className={classNames.cellValueNumber}>
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

            <TableCell className={classNames.cellValueNumber}>
              {toFixedWithKg(box.weighGrossKgWarehouse ? box.weighGrossKgWarehouse : box.weighGrossKgSupplier, 2)}
            </TableCell>

            <TableCell>{order.order.trackingNumberChina || t(TranslationKey.Missing)}</TableCell>
          </TableRow>
          {isMaximizedMasterBox ? (
            <TableRow className={classNames.subBoxesTableWrapper}>
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

          <Modal openModal={showBoxViewModal} setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}>
            <BoxViewForm
              box={box}
              volumeWeightCoefficient={restProps.volumeWeightCoefficient}
              setOpenModal={() => setShowBoxViewModal(!showBoxViewModal)}
            />
          </Modal>
        </React.Fragment>
      ))}

      <BigImagesModal
        isAmazone
        openModal={showPhotosModal}
        setOpenModal={() => setShowPhotosModal(!showPhotosModal)}
        images={curImages}
      />
    </>
  )
}

export const WarehouseBodyRow = withStyles(styles)(WarehouseBodyRowRaw)
