import React from 'react'

import {Button, Chip, Typography, Box, Tooltip} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusKeyToEnum} from '@constants/task-status'
import {texts} from '@constants/texts'

import {StarRating} from '@components/star-rating'

import {formatDateDistanceFromNow, formatDateTime, formatNormDateTime} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, trimBarcode, toFixedWithKg} from '@utils/text'

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

export const PriceCell = withStyles(styles)(({classes: classNames, params}) => (
  <div className={classNames.priceTableCell}>
    {!params.row.amazon ? 'N/A' : toFixedWithDollarSign(params.row.amazon, 2)}
  </div>
))

export const FeesValuesWithCalculateBtnCell = withStyles(styles)(({classes: classNames, params}) => (
  <div className={classNames.feesTableCell}>
    <div>
      <Typography className={classNames.typoCell}>
        {textConsts.feesTypo}
        <span className={classNames.typoSpan}>{toFixedWithDollarSign(params.row.fbafee)}</span>
      </Typography>
      <Typography className={classNames.typoCell}>
        {textConsts.netTypo}
        <span className={classNames.typoSpan}>{toFixedWithDollarSign(params.row.reffee)}</span>
      </Typography>
      <Button
        disableElevation
        className={classNames.cellBtn}
        startIcon={<img alt="calculate icon" src="/assets/icons/calculate.svg" />}
      >
        {textConsts.calculateBtn}
      </Button>
    </div>
  </div>
))

export const SupplierCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.supplierCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
))

export const SupervisorCell = withStyles(styles)(({classes: classNames, params}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
    <Typography className={classNames.researcherCell}>{`rate: ${
      !params.value ? 'N/A' : params.value.rate
    }`}</Typography>
  </div>
))

export const ResearcherCell = withStyles(styles)(({classes: classNames, params}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
    <Typography className={classNames.researcherCell}>{`rate: ${
      !params.value ? 'N/A' : params.value.rate
    }`}</Typography>
  </div>
))

export const ClientCell = withStyles(styles)(({classes: classNames, params}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
    <Typography className={classNames.researcherCell}>{`rate: ${
      !params.value ? 'N/A' : params.value.rate
    }`}</Typography>
  </div>
))

export const BuyerCell = withStyles(styles)(({classes: classNames, params}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.value ? 'N/A' : params.value.name}</Typography>
    <Typography className={classNames.researcherCell}>{`rate: ${
      !params.value ? 'N/A' : params.value.rate
    }`}</Typography>
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
      className={clsx({[classNames.barcodeChipExists]: params.row.barcode})}
      size="small"
      label={params.row.barcode ? trimBarcode(params.row.barcode) : textConsts.setBarcodeChipLabel}
      onClick={() => handlers.onClickBarcode(params.row)}
      onDoubleClick={() => handlers.onDoubleClickBarcode(params.row)}
      onDelete={!params.row.barcode ? undefined : () => handlers.onDeleteBarcode(params.row)}
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

export const OrderCell = withStyles(styles)(({classes: classNames, params}) => (
  <div className={classNames.order}>
    <img
      alt=""
      src={params.row.product.images[0] && getAmazonImageUrl(params.row.product.images[0])}
      className={classNames.orderImg}
    />
    <div>
      <Typography className={classNames.orderTitle}>{params.row.product.amazonTitle}</Typography>
      <Typography className={classNames.orderText}>
        <span className={classNames.orderTextSpan}>{textConsts.id}</span>
        {params.row.product.id}
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

export const renderFieldValueCell = ({params}) => (!params.value ? 'N/A' : params.value)

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

export const TaskDescriptionCell = withStyles(styles)(({classes: classNames, params}) => {
  const renderProductImage = (box, key) => (
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
    <>
      <Typography>{textConsts.merge}</Typography>
      {renderBlockProductsImages}
    </>
  )
  const taskDivideDescription = () => (
    <>
      <Typography className={classNames.descriptionWrapper}>{textConsts.unMerge}</Typography>
      {renderBlockProductsImages}
    </>
  )
  const taskReceiveDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <>
        <Typography className={classNames.descriptionWrapper}>{textConsts.receive}</Typography>
        {params.row.boxesBefore && params.row.boxesBefore.map((box, index) => renderProductImage(box, index))}
      </>
    </div>
  )

  const taskEditDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <>
        <Typography className={classNames.descriptionWrapper}>{textConsts.edit}</Typography>
        {params.row.boxesBefore && params.row.boxesBefore.map((box, index) => renderProductImage(box, index))}
      </>
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
