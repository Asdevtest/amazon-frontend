import React from 'react'

import {Button, Chip, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusKeyToEnum} from '@constants/task-status'
import {texts} from '@constants/texts'

import {
  formatDateDistanceFromNow,
  formatDateTime,
  formatNormDateTime,
  formatNormDateTimeWithParseISO,
} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, trimBarcode, toFixedWithKg} from '@utils/text'

import {styles} from './data-grid-cells.style'

const textConsts = getLocalizedTexts(texts, 'en').dataGridCells

export const AsinCell = withStyles(styles)(({classes: classNames, params}) => (
  <div className={classNames.asinCell}>
    <div className={classNames.asinCellContainer}>
      <img
        alt="placeholder"
        className={classNames.img}
        src={params.row.images && params.row.images[0] && getAmazonImageUrl(params.row.images[0])}
      />

      <div>
        <Typography className={classNames.csCodeTypo}>{params.row.amazonTitle}</Typography>
        <Typography className={classNames.typoCell}>
          {textConsts.asinTypo}
          <span className={classNames.typoSpan}>{params.row.id}</span>
          {` | ${formatDateDistanceFromNow(params.row.createdAt)}`}
        </Typography>
        <Typography className={classNames.csCodeTypo}>{params.row.category}</Typography>
      </div>
    </div>
  </div>
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
  <div>
    <Typography className={classNames.researcherCell}>
      {!params.row.currentSupplier ? 'N/A' : params.row.currentSupplier.name}
    </Typography>

    <Typography className={classNames.noActiveLink}>{`link: ${
      !params.row.currentSupplier ? 'N/A' : params.row.currentSupplier.link
    }`}</Typography>
  </div>
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
    <Typography className={classNames.researcherCell}>
      {!params.row.createdBy ? 'N/A' : params.row.createdBy.name}
    </Typography>
    {!onlyName && (
      <Typography className={classNames.researcherCell}>{`rate: ${
        !params.row.createdBy ? 'N/A' : params.row.createdBy.rate
      }`}</Typography>
    )}
  </div>
))

export const ClientCell = withStyles(styles)(({classes: classNames, params, onlyName}) => (
  <div>
    <Typography className={classNames.researcherCell}>
      {!params.row.clientId ? 'N/A' : params.row.clientId.name}
    </Typography>
    {!onlyName && (
      <Typography className={classNames.researcherCell}>{`rate: ${
        !params.row.clientId ? 'N/A' : params.row.clientId.rate
      }`}</Typography>
    )}
  </div>
))

export const BuyerCell = withStyles(styles)(({classes: classNames, params, onlyName}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!params.row.buyer ? 'N/A' : params.row.buyer.name}</Typography>
    {!onlyName && (
      <Typography className={classNames.researcherCell}>{`rate: ${
        !params.row.buyer ? 'N/A' : params.row.buyer.rate
      }`}</Typography>
    )}
  </div>
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
    {!(params && params.value) ? 'N/A' : formatNormDateTime(params.value)}
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

export const renderFieldValueCell = value => (!value ? 'N/A' : value)

export const TaskDescriptionCell = withStyles(styles)(({classes: classNames, params, hideImage}) => {
  const renderProductImage = (box, key) => {
    if (hideImage) {
      return
    }
    return (
      <div key={key} className={classNames.imagesWrapper}>
        <Typography className={classNames.imgNum}>{`#${key + 1}`}</Typography>
        {box.items &&
          box.items.map((product, productIndex) => (
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

export const ToFixedWithKgSignCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.priceTableCell}>{!value ? (value === 0 ? 0 : 'N/A') : toFixedWithKg(value, fix)}</div>
))

export const SmallRowImageCell = withStyles(styles)(({classes: classNames, images}) => (
  <div>
    <img alt="placeholder" className={classNames.img} src={images && images[0] && getAmazonImageUrl(images[0])} />
  </div>
))

export const ToFixedWithDollarSignCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.priceTableCell}>
    {!value ? (value === 0 ? 0 : 'N/A') : toFixedWithDollarSign(value, fix)}
  </div>
))
