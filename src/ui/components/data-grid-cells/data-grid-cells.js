import React from 'react'

import {Button, Chip, Tooltip, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusKeyToEnum} from '@constants/task-status'
import {texts} from '@constants/texts'

import {ErrorButton} from '@components/buttons/error-button/error-button'
import {SuccessButton} from '@components/buttons/success-button/success-button'

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

export const FeesValuesWithCalculateBtnCell = withStyles(styles)(
  ({classes: classNames, params, noCalculate, onClickCalculate}) => (
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
            onClick={() => onClickCalculate(params.row)}
          >
            {textConsts.calculateBtn}
          </Button>
        )}
      </div>
    </div>
  ),
)

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
    <Typography className={classNames.researcherCell}>{!params.row.client ? 'N/A' : params.row.client.name}</Typography>
    {!onlyName && (
      <Typography className={classNames.researcherCell}>{`rate: ${
        !params.row.client ? 'N/A' : params.row.client.rate
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

export const DateCell = withStyles(styles)(({params}) => (
  <Typography>{!params.value ? 'N/A' : formatDateTime(params.value)}</Typography>
))

export const NormDateCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.normDateCellTypo}>
    {!(params && params.value) ? 'N/A' : formatNormDateTime(params.value)}
  </Typography>
))

export const NormDateWithParseISOCell = withStyles(styles)(({params}) => (
  <Typography>{!params.value ? 'N/A' : formatNormDateTimeWithParseISO(params.value)}</Typography>
))

export const OrderCell = withStyles(styles)(({classes: classNames, product, superbox}) => (
  <div className={classNames.order}>
    <img alt="" src={product.images[0] && getAmazonImageUrl(product.images[0])} className={classNames.orderImg} />
    <div>
      <Typography className={classNames.orderTitle}>{product.amazonTitle}</Typography>
      <Typography className={classNames.orderText}>
        <span className={classNames.orderTextSpan}>{textConsts.id}</span>
        {product.id}
      </Typography>
      {superbox && (
        <Typography className={classNames.superboxTypo}>{`${textConsts.superboxTypo} x ${superbox}`}</Typography>
      )}
    </div>
  </div>
))

export const renderFieldValueCell = value => (!value && value !== 0 ? 'N/A' : value)

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
        {!hideImage && <Typography>{'=>'}</Typography>}
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

  return (
    <div className={classNames.taskDescriptionScrollWrapper}>{renderTaskDescription(params.row.operationType)}</div>
  )
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
  <div className={classNames.smallRowImgWrapper}>
    <img alt="placeholder" className={classNames.img} src={images && images[0] && getAmazonImageUrl(images[0])} />
  </div>
))

export const ToFixedWithDollarSignCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.priceTableCell}>
    {!value ? (value === 0 ? 0 : 'N/A') : toFixedWithDollarSign(value, fix)}
  </div>
))

export const SuccessActionBtnCell = withStyles(styles)(({onClickOkBtn, bTnText}) => (
  <div>
    <SuccessButton onClick={onClickOkBtn}>{bTnText}</SuccessButton>
  </div>
))

export const NormalActionBtnCell = withStyles(styles)(({onClickOkBtn, bTnText}) => (
  <div>
    <Button variant="contained" color="primary" onClick={onClickOkBtn}>
      {bTnText}
    </Button>
  </div>
))

export const WarehouseMyTasksBtnsCell = withStyles(styles)(({classes: classNames, row, handlers}) => (
  <div>
    <Button variant="contained" color="primary" onClick={() => handlers.onClickResolveBtn(row)}>
      {textConsts.resolveBtn}
    </Button>

    {row.operationType !== TaskOperationType.RECEIVE && (
      <ErrorButton
        className={classNames.rowCancelBtn}
        onClick={() => {
          handlers.onClickCancelTask(row.boxes[0]._id, row.id, row.operationType)
        }}
      >
        {textConsts.cancelBtn}
      </ErrorButton>
    )}
  </div>
))

export const ClientOrdersNotificationsBtnsCell = withStyles(styles)(({classes: classNames, row, handlers}) => (
  <div>
    <Button
      variant="contained"
      color="primary"
      onClick={() => handlers.onTriggerOpenConfirmModal('showConfirmModal', row)}
    >
      {textConsts.confirmBtn}
    </Button>
    <ErrorButton
      className={classNames.rowCancelBtn}
      onClick={() => {
        handlers.onTriggerOpenModal('showConfirmModal', row)
      }}
    >
      {textConsts.rejectBtn}
    </ErrorButton>
  </div>
))

export const AdminUsersActionBtnsCell = withStyles(styles)(
  ({classes: classNames, row, handlers, editBtnText, balanceBtnText}) => (
    <React.Fragment>
      <Button
        className={classNames.marginRightBtn}
        variant="contained"
        color="primary"
        onClick={() => handlers.onClickEditUser()}
      >
        {editBtnText}
      </Button>
      <Button variant="contained" color="primary" onClick={() => handlers.onClickBalance(row)}>
        {balanceBtnText}
      </Button>
    </React.Fragment>
  ),
)

export const SuperboxQtyCell = withStyles(styles)(({classes: classNames, qty, superbox}) => (
  <div>
    <Typography>
      {qty || 'N/A'}
      <Typography className={classNames.superboxTypo}>{` x ${superbox}`}</Typography>
    </Typography>
  </div>
))

export const OrderManyItemsCell = withStyles(styles)(({classes: classNames, box}) => {
  const renderProductInfo = () => (
    <div className={classNames.manyItemsOrderWrapper}>
      {box.items.map((item, itemIndex) => (
        <div key={itemIndex} className={classNames.order}>
          <img
            alt=""
            src={item.product.images[0] && getAmazonImageUrl(item.product.images[0])}
            className={classNames.orderImg}
          />
          <div>
            <Typography className={classNames.manyItemsOrderTitle}>{item.product.amazonTitle}</Typography>
            <Typography className={classNames.orderText}>
              <span className={classNames.orderTextSpan}>{textConsts.id}</span>
              {item.product.id}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Tooltip title={renderProductInfo()}>
      <div className={classNames.manyItemsImagesWrapper}>
        {box.items.map((product, productIndex) => (
          <div key={productIndex} className={classNames.manyItemsImgWrapper}>
            <img
              alt="placeholder"
              className={classNames.taskDescriptionImg}
              src={product.product?.images[0] && getAmazonImageUrl(product.product.images[0])}
            />
            <Typography className={classNames.imgNum}>{`x ${product.amount}`}</Typography>
          </div>
        ))}
      </div>
    </Tooltip>
  )
})

export const ScrollingCell = withStyles(styles)(({classes: classNames, value}) => (
  <React.Fragment>
    <Typography className={classNames.scrollingValue}>{value || 'N/A'}</Typography>
  </React.Fragment>
))

export const EditOrRemoveBtnsCell = withStyles(styles)(({classes: classNames, row, handlers, isSubUsersTable}) => (
  <div>
    <Button variant="contained" color="primary" onClick={() => handlers.onClickEditBtn(row)}>
      {isSubUsersTable ? textConsts.addPermissionsBtn : textConsts.editBtn}
    </Button>

    <ErrorButton
      className={classNames.rowCancelBtn}
      onClick={() => {
        handlers.onClickRemoveBtn(isSubUsersTable ? row : row._id)
      }}
    >
      {textConsts.removeBtn}
    </ErrorButton>
  </div>
))

export const BatchBoxesCell = withStyles(styles)(({classes: classNames, boxes}) => {
  const renderProductInfo = box => (
    <div className={classNames.batchProductsWrapper}>
      {box.items.map((item, itemIndex) => (
        <div key={itemIndex} className={classNames.order}>
          <img
            alt=""
            src={item.product.images[0] && getAmazonImageUrl(item.product.images[0])}
            className={classNames.orderImg}
          />
          <div>
            <Typography className={classNames.batchProductTitle}>{item.product.amazonTitle}</Typography>
            <Typography className={classNames.orderText}>
              <span className={classNames.orderTextSpan}>{textConsts.id}</span>
              {item.product.id}
              {box.sendToBatchComplete && <span className={classNames.sendSuccess}>{' Отправлено'}</span>}
            </Typography>
            <Typography className={classNames.imgNum}>{`x ${item.amount}`}</Typography>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className={classNames.batchBoxesWrapper}>
      {boxes.map(box => (
        <div key={box._id}>{renderProductInfo(box)}</div>
      ))}
    </div>
  )
})
