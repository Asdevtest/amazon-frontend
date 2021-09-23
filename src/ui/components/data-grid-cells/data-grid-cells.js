import React from 'react'

import {Button, Chip, Typography, Box, Tooltip} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {ProductStatusByCode} from '@constants/product-status'
import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusKeyToEnum} from '@constants/task-status'
import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {StarRating} from '@components/star-rating'

import {
  formatDateDistanceFromNow,
  formatDateTime,
  formatNormDateTime,
  formatNormDateTimeWithParseISO,
} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, trimBarcode, toFixedWithKg, withKg, toFixed} from '@utils/text'

import {styles} from './data-grid-cells.style'

const textConsts = getLocalizedTexts(texts, 'en').dataGridCells

export const AsinCell = withStyles(styles)(({classes: classNames, params}) => (
  <div className={classNames.asinCell}>
    <div className={classNames.asinCellContainer}>
      <div>
        <img
          alt="placeholder"
          className={classNames.img}
          src={params.row.images && params.row.images[0] && getAmazonImageUrl(params.row.images[0])}
        />
      </div>
      <div>
        <Typography className={classNames.csCodeTypo}>{params.row.amazonTitle}</Typography>
        <Typography className={classNames.typoCell}>
          {textConsts.asinTypo}
          <span className={classNames.typoSpan}>{params.row.id}</span>
          {` | ${formatDateDistanceFromNow(params.row.createdat)}`}
        </Typography>
        <Typography className={classNames.csCodeTypo}>{params.row.category}</Typography>
      </div>
    </div>
  </div>
))

export const PriceCell = withStyles(styles)(({classes: classNames, price}) => (
  <div className={classNames.priceTableCell}>{!price ? 'N/A' : toFixedWithDollarSign(price, 2)}</div>
))

export const FeesValuesWithCalculateBtnCell = withStyles(styles)(({classes: classNames, params, noCalculate}) => (
  <div className={classNames.feesTableCell}>
    <div className={classNames.feesTableWrapper}>
      <Typography className={classNames.typoCell}>
        {textConsts.feesTypo}
        <span className={classNames.typoSpan}>{toFixedWithDollarSign(params.row.fbafee, 2)}</span>
      </Typography>
      <Typography className={classNames.typoCell}>
        {textConsts.netTypo}
        <span className={classNames.typoSpan}>{toFixedWithDollarSign(params.row.reffee, 2)}</span>
      </Typography>
      {!noCalculate && (
        <Button
          disableElevation
          className={classNames.cellBtn}
          startIcon={<img alt="calculate icon" src="/assets/icons/calculate.svg" />}
        >
          {textConsts.calculateBtn}
        </Button>
      )}
    </div>
  </div>
))

export const SupplierCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.supplierCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
))

export const SupervisorCell = withStyles(styles)(({classes: classNames, params, onlyName}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
    {!onlyName && (
      <Typography className={classNames.researcherCell}>{`rate: ${
        !params.value ? 'N/A' : params.value.rate
      }`}</Typography>
    )}
  </div>
))

export const ResearcherCell = withStyles(styles)(({classes: classNames, params, onlyName}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
    {!onlyName && (
      <Typography className={classNames.researcherCell}>{`rate: ${
        !params.value ? 'N/A' : params.value.rate
      }`}</Typography>
    )}
  </div>
))

export const ClientCell = withStyles(styles)(({classes: classNames, params, onlyName}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
    {!onlyName && (
      <Typography className={classNames.researcherCell}>{`rate: ${
        !params.value ? 'N/A' : params.value.rate
      }`}</Typography>
    )}
  </div>
))

export const BuyerCell = withStyles(styles)(({classes: classNames, params, onlyName}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
    {!onlyName && (
      <Typography className={classNames.researcherCell}>{`rate: ${
        !params.value ? 'N/A' : params.value.rate
      }`}</Typography>
    )}
  </div>
))

export const RankCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.rankTableCell}>{!params.value ? 'N/A' : '#' + params.value}</Typography>
))

export const RatingCell = withStyles(styles)(({classes: classNames, params}) => (
  <div className={classNames.ratingTableCell}>
    <StarRating rating={params.value} />
    <Typography className={classNames.rankTypoReviews}>
      {!params.value ? 'N/A' : params.value}
      {textConsts.ratingTypo}
    </Typography>
  </div>
))

export const SalesCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.salesCell}>{!params.value ? 'N/A' : params.value}</Typography>
))

export const SalesTotalCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.salesCell}>{!params.value ? 'N/A' : params.value}</Typography>
))

export const TypeCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.salersTotal}>{!params.value ? 'N/A' : params.value}</Typography>
))

export const BarcodeCell = withStyles(styles)(({classes: classNames, params, handlers}) => (
  <React.Fragment>
    <Chip
      classes={{
        root: classNames.barcodeChip,
        clickable: classNames.barcodeChipHover,
        deletable: classNames.barcodeChipHover,
        deleteIcon: classNames.barcodeChipIcon,
      }}
      className={clsx({[classNames.barcodeChipExists]: params.row.barCode})}
      size="small"
      label={params.row.barCode ? trimBarcode(params.row.barCode) : textConsts.setBarcodeChipLabel}
      onClick={() => handlers.onClickBarcode(params.row)}
      onDoubleClick={() => handlers.onDoubleClickBarcode(params.row)}
      onDelete={!params.row.barCode ? undefined : () => handlers.onDeleteBarcode(params.row)}
    />
  </React.Fragment>
))

export const DateCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.supervisorCell}>{!params.value ? 'N/A' : formatDateTime(params.value)}</Typography>
))

export const NormDateCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.supervisorCell}>
    {!params.value ? 'N/A' : formatNormDateTime(params.value)}
  </Typography>
))

export const NormDateWithParseISOCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.supervisorCell}>
    {!params.value ? 'N/A' : formatNormDateTimeWithParseISO(params.value)}
  </Typography>
))

export const OrderCell = withStyles(styles)(({classes: classNames, product}) => (
  <div className={classNames.order}>
    <img alt="" src={product.images[0] && getAmazonImageUrl(product.images[0])} className={classNames.orderImg} />
    <div>
      <Typography className={classNames.orderTitle}>{product.amazonTitle}</Typography>
      <Typography className={classNames.orderText}>
        <span className={classNames.orderTextSpan}>{textConsts.id}</span>
        {product.id}
      </Typography>
    </div>
  </div>
))

export const BoxCell = withStyles(styles)(({params}) => (
  <React.Fragment>
    {!params.row.boxesId ? (
      <Button size="small">{textConsts.distributeBtn}</Button>
    ) : (
      <Box display="flex" alignItems="center">
        <Box mr={1.5}>
          {params.row.boxesId.map((box, index) => (
            <Typography key={index}>{'ID: ' + box + ','}</Typography>
          ))}
        </Box>
        <div>
          <Typography>{params.row.boxesId.length + ' шт.'}</Typography>
        </div>
      </Box>
    )}
  </React.Fragment>
))

export const GrossWeightCell = withStyles(styles)(({classes: classNames, params}) => (
  <React.Fragment>
    {params.row.product.grossWeight ? (
      <Typography>{toFixedWithKg(params.row.product.grossWeight)}</Typography>
    ) : (
      <Tooltip interactive placement="top" title={textConsts.titleToolTip} className={classNames.tooltip}>
        <Typography>{'N/A'}</Typography>
      </Tooltip>
    )}
  </React.Fragment>
))

export const renderFieldValueCell = value => (!value ? 'N/A' : value)

export const renderFixedDollarValueCell = ({params}) =>
  !params.value
    ? 'N/A'
    : toFixedWithDollarSign(params.row.deliveryCostToTheWarehouse + params.row.product.amazon * params.row.amount)

export const OrderSum = ({params}) => (
  <Typography>
    {toFixedWithDollarSign(
      ((parseFloat(params.row.product.currentSupplier?.price) || 0) +
        (parseFloat(params.row.product.currentSupplier?.delivery) || 0)) *
        (parseInt(params.row.amount) || 0),
    ) || 'N/A'}
  </Typography>
)

export const TaskTypeCell = withStyles(styles)(({params}) => {
  const renderOperationType = type => {
    switch (type) {
      case TaskOperationType.MERGE:
        return <Typography>{textConsts.operatioTypeMerge}</Typography>

      case TaskOperationType.SPLIT:
        return <Typography>{textConsts.operatioTypeSplit}</Typography>

      case TaskOperationType.RECEIVE:
        return <Typography>{textConsts.operatioTypeReceive}</Typography>

      case TaskOperationType.EDIT:
        return <Typography>{textConsts.operatioTypeEdit}</Typography>
    }
  }
  return <React.Fragment>{renderOperationType(params.value)}</React.Fragment>
})

export const TaskDescriptionCell = withStyles(styles)(({classes: classNames, params, hideImage}) => {
  const renderProductImage = (box, key) => {
    if (hideImage) {
      return
    }
    return (
      <div key={key} className={classNames.imagesWrapper}>
        <Typography className={classNames.imgNum}>{`#${key + 1}`}</Typography>
        {box.items.map((product, productIndex) => (
          <div key={productIndex} className={classNames.imgWrapper}>
            <img
              alt="placeholder"
              className={classNames.taskDescriptionImg}
              src={product.product?.images[0] && getAmazonImageUrl(product.product.images[0])}
            />
            <Typography className={classNames.imgNum}>{`x ${product.amount}`}</Typography>
          </div>
        ))}
        <Typography className={classNames.imgNum}>{box.amount > 1 && `Super x${box.amount}`}</Typography>
      </div>
    )
  }

  const renderBlockProductsImages = (
    <div className={classNames.blockProductsImagesWrapper}>
      <>
        {params.row.boxesBefore && params.row.boxesBefore.map((box, index) => renderProductImage(box, index))}
        <Typography>{'=>'}</Typography>
      </>

      {params.row.boxes.map((box, index) => renderProductImage(box, index))}
    </div>
  )

  const taskMergeDescription = () => (
    <div className={classNames.taskTableCell}>
      <Typography>{textConsts.merge}</Typography>

      {renderBlockProductsImages}
    </div>
  )
  const taskDivideDescription = () => (
    <div className={classNames.taskTableCell}>
      <Typography className={classNames.descriptionWrapper}>{textConsts.unMerge}</Typography>

      {renderBlockProductsImages}
    </div>
  )
  const taskReceiveDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <div className={classNames.taskTableCell}>
        <Typography className={classNames.descriptionWrapper}>{textConsts.receive}</Typography>

        {params.row.boxesBefore && params.row.boxesBefore.map((box, index) => renderProductImage(box, index))}
      </div>
    </div>
  )

  const taskEditDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <div className={classNames.taskTableCell}>
        <Typography className={classNames.descriptionWrapper}>{textConsts.edit}</Typography>

        {params.row.boxesBefore && params.row.boxesBefore.map((box, index) => renderProductImage(box, index))}
      </div>
    </div>
  )

  const renderTaskDescription = type => {
    switch (type) {
      case TaskOperationType.MERGE:
        return <div>{taskMergeDescription()}</div>

      case TaskOperationType.SPLIT:
        return <div>{taskDivideDescription()}</div>
      case TaskOperationType.RECEIVE:
        return <div>{taskReceiveDescription()}</div>
      case TaskOperationType.EDIT:
        return <div>{taskEditDescription()}</div>
    }
  }

  return <React.Fragment>{renderTaskDescription(params.row.operationType)}</React.Fragment>
})

export const TaskStatusCell = withStyles(styles)(({params}) => (
  <React.Fragment>
    <Typography>{mapTaskStatusKeyToEnum[params.row.status]}</Typography>
  </React.Fragment>
))

export const IdCell = withStyles(styles)(({id}) => (
  <React.Fragment>
    <Typography>{`id: ${id}`}</Typography>
  </React.Fragment>
))

export const NoActiveBarcodeCell = withStyles(styles)(({classes: classNames, barCode}) => (
  <React.Fragment>
    <Typography className={classNames.noActivebarCode}>{barCode || 'N/A'}</Typography>
  </React.Fragment>
))

export const WarehouseCell = withStyles(styles)(({warehouse}) => (
  <React.Fragment>
    <Typography>{warehouses[warehouse]}</Typography>
  </React.Fragment>
))

export const WeightCell = withStyles(styles)(({weight}) => (
  <React.Fragment>
    <Typography>{`${weight || 'N/A'} kg`}</Typography>
  </React.Fragment>
))

export const FinalWeightCell = withStyles(styles)(({volumeWeight, weightFinalAccounting}) => (
  <React.Fragment>
    <Typography>{withKg(Math.max(parseFloat(volumeWeight) || 0, parseFloat(weightFinalAccounting) || 0))}</Typography>
  </React.Fragment>
))

export const ProductStatusCell = withStyles(styles)(({status}) => (
  <React.Fragment>{ProductStatusByCode[status]}</React.Fragment>
))

export const DeliveryCell = withStyles(styles)(({delivery}) => (
  <React.Fragment>
    <Typography>{DeliveryTypeByCode[delivery]}</Typography>
  </React.Fragment>
))

export const SmallRowImageCell = withStyles(styles)(({classes: classNames, images}) => (
  <div>
    <img alt="placeholder" className={classNames.img} src={images && images[0] && getAmazonImageUrl(images[0])} />
  </div>
))

export const ToFixedWithDollarSignCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.priceTableCell}>{!value ? 'N/A' : toFixedWithDollarSign(value, fix)}</div>
))

export const ToFixedCell = withStyles(styles)(({value, fix}) => <div>{!value ? 'N/A' : toFixed(value, fix)}</div>)
