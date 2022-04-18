/* eslint-disable no-unused-vars */
import React from 'react'

import {Button, Chip, Link, Tooltip, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {fromUnixTime} from 'date-fns'
import {useHistory} from 'react-router-dom'

import {BoxStatus} from '@constants/box-status'
import {RequestStatus} from '@constants/request-status'
import {mapTaskOperationTypeKeyToEnum, TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'
import {texts} from '@constants/texts'
import {mapUserRoleEnumToKey, UserRole} from '@constants/user-roles'

import {ErrorButton} from '@components/buttons/error-button/error-button'
import {SuccessButton} from '@components/buttons/success-button/success-button'

import {
  formatDateDistanceFromNow,
  formatDateForShowWithoutParseISO,
  formatDateTime,
  formatDateWithoutTime,
  formatNormDateTime,
  formatNormDateTimeWithParseISO,
  formatShortDateTime,
} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, trimBarcode, toFixedWithKg, checkAndMakeAbsoluteUrl, toFixed} from '@utils/text'

import {styles} from './data-grid-cells.style'

const textConsts = getLocalizedTexts(texts, 'en').dataGridCells

export const AsinCell = withStyles(styles)(({classes: classNames, product}) => (
  <div className={classNames.asinCell}>
    <div className={classNames.asinCellContainer}>
      <img alt="" className={classNames.img} src={getAmazonImageUrl(product.images[0])} />

      <div>
        <Typography className={classNames.csCodeTypo}>{product.amazonTitle}</Typography>
        <Typography className={classNames.typoCell}>
          {textConsts.asinTypo}
          <span className={classNames.typoSpan}>{product.asin}</span>
          {` | ${formatDateDistanceFromNow(product.createdAt)}`}
        </Typography>
        <Typography className={classNames.csCodeTypo}>{product.category}</Typography>
      </div>
    </div>
  </div>
))

export const FeesValuesWithCalculateBtnCell = withStyles(styles)(
  ({classes: classNames, product, noCalculate, onClickCalculate}) => (
    <div className={classNames.feesTableCell}>
      <div className={classNames.feesTableWrapper}>
        <Typography className={classNames.typoCell}>
          {textConsts.feesTypo}
          <span className={classNames.typoSpan}>{toFixedWithDollarSign(product.fbafee, 2)}</span>
        </Typography>
        <Typography className={classNames.typoCell}>
          {textConsts.netTypo}
          <span className={classNames.typoSpan}>{toFixedWithDollarSign(product.reffee, 2)}</span>
        </Typography>
        {!noCalculate && (
          <Button
            disableElevation
            className={classNames.cellBtn}
            startIcon={<img alt="calculate icon" src="/assets/icons/calculate.svg" />}
            onClick={() => onClickCalculate(product)}
          >
            {textConsts.calculateBtn}
          </Button>
        )}
      </div>
    </div>
  ),
)

export const SupplierCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>
      {!product.currentSupplier ? 'N/A' : product.currentSupplier.name}
    </Typography>

    {product.currentSupplier && (
      <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(product.currentSupplier?.link)}>
        <Typography className={classNames.noActiveLink}>{product.currentSupplier?.link}</Typography>
      </Link>
    )}
  </div>
))

export const UserLinkCell = withStyles(styles)(({classes: classNames, name, userId}) => {
  const history = useHistory()

  const onLinkClick = () => {
    history.push({
      pathname: '/another-user',
      search: userId,
    })
  }

  return (
    <div>
      {name ? (
        <Typography className={classNames.linkText} onClick={onLinkClick}>
          {name}
        </Typography>
      ) : (
        <Typography>{'N/A'}</Typography>
      )}
    </div>
  )
})

export const SupervisorCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!product.checkedBy ? 'N/A' : product.checkedBy.name}</Typography>
  </div>
))

export const ResearcherCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!product.createdBy ? 'N/A' : product.createdBy.name}</Typography>
  </div>
))

export const ClientCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!product.client ? 'N/A' : product.client.name}</Typography>
  </div>
))

export const BuyerCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!product.buyer ? 'N/A' : product.buyer.name}</Typography>
  </div>
))

export const BarcodeCell = withStyles(styles)(({classes: classNames, product, handlers}) => (
  <React.Fragment>
    <Chip
      classes={{
        root: classNames.barcodeChip,
        clickable: classNames.barcodeChipHover,
        deletable: classNames.barcodeChipHover,
        deleteIcon: classNames.barcodeChipIcon,
      }}
      className={clsx({[classNames.barcodeChipExists]: product.barCode})}
      size="small"
      label={product.barCode ? trimBarcode(product.barCode) : textConsts.setBarcodeChipLabel}
      onClick={() => handlers.onClickBarcode(product)}
      onDoubleClick={() => handlers.onDoubleClickBarcode(product)}
      onDelete={!product.barCode ? undefined : () => handlers.onDeleteBarcode(product)}
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

export const NormDateWithoutTimeCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.normDateCellTypo}>
    {!(params && params.value) ? 'N/A' : formatDateWithoutTime(params.value)}
  </Typography>
))

export const ShortDateCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.shortDateCellTypo}>
    {!(params && params.value) ? 'N/A' : formatShortDateTime(params.value)}
  </Typography>
))

export const NormDateFromUnixCell = withStyles(styles)(({classes: classNames, value}) => (
  <Typography className={classNames.normDateCellTypo}>
    {!value ? 'N/A' : formatDateForShowWithoutParseISO(fromUnixTime(value))}
  </Typography>
))

export const NormDateWithParseISOCell = withStyles(styles)(({params}) => (
  <Typography>{!params.value ? 'N/A' : formatNormDateTimeWithParseISO(params.value)}</Typography>
))

export const OrderCell = withStyles(styles)(({classes: classNames, product, superbox}) => (
  <div className={classNames.order}>
    <img alt="" src={getAmazonImageUrl(product.images[0])} className={classNames.orderImg} />
    <div>
      <Typography className={classNames.orderTitle}>{product.amazonTitle}</Typography>
      <Typography className={classNames.orderText}>
        <span className={classNames.orderTextSpan}>{textConsts.id}</span>
        {product.asin}
      </Typography>
      {superbox && (
        <Typography className={classNames.superboxTypo}>{`${textConsts.superboxTypo} x ${superbox}`}</Typography>
      )}
    </div>
  </div>
))

export const renderFieldValueCell = value => (!value && value !== 0 ? 'N/A' : value)

export const WarehouseTariffDestinationCell = withStyles(styles)(() => (
  <div>
    <Typography>{'US West Coast'}</Typography>
    <Typography>{'US Central '}</Typography>
    <Typography>{'US East Coast '}</Typography>
  </div>
))

export const WarehouseTariffRatesCell = withStyles(styles)(({conditionsByRegion}) => (
  <div>
    <Typography>{toFixed(conditionsByRegion.west.rate, 2) || 'N/A'}</Typography>
    <Typography>{toFixed(conditionsByRegion.central.rate, 2) || 'N/A'}</Typography>
    <Typography>{toFixed(conditionsByRegion.east.rate, 2) || 'N/A'}</Typography>
  </div>
))

export const WarehouseTariffDatesCell = withStyles(styles)(({classes: classNames, row}) => (
  <div>
    <div className={classNames.warehouseTariffDatesItem}>
      <Typography>{'ETD(дата отправки):'}</Typography>
      <Typography>{!row.etd ? 'N/A' : formatDateWithoutTime(row.etd)}</Typography>
    </div>

    <div className={classNames.warehouseTariffDatesItem}>
      <Typography>{'ETA(дата прибытия):'}</Typography>
      <Typography>{!row.eta ? 'N/A' : formatDateWithoutTime(row.eta)}</Typography>
    </div>

    <div className={classNames.warehouseTariffDatesItem}>
      <Typography>{'CLS(дата закрытия партии):'}</Typography>
      <Typography>{!row.cls ? 'N/A' : formatDateWithoutTime(row.cls)}</Typography>
    </div>
  </div>
))

export const RenderFieldValueCell = withStyles(styles)(({classes: classNames, value}) => (
  <Typography className={classNames.renderFieldValueCellText}>{!value && value !== 0 ? 'N/A' : value}</Typography>
))

export const MultilineTextCell = withStyles(styles)(({classes: classNames, text}) => (
  <div className={classNames.multilineTextWrapper}>
    <Typography className={classNames.multilineText}>{text}</Typography>
  </div>
))

export const MultilineStatusCell = withStyles(styles)(({classes: classNames, status}) => (
  <div className={classNames.multilineTextWrapper}>
    <Typography className={classNames.multilineText}>{status?.replace(/_/g, ' ')}</Typography>
  </div>
))

export const MultilineRequestStatusCell = withStyles(styles)(({classes: classNames, status}) => {
  const colorByStatus = () => {
    if ([RequestStatus.DRAFT, RequestStatus.CANCELED_BY_CREATOR].includes(status)) {
      return '#006CFF'
    } else if ([RequestStatus.IN_PROCESS, RequestStatus.CANCELED_BY_ADMIN].includes(status)) {
      return '#F3AF00'
    } else if ([RequestStatus.PUBLISHED, RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED].includes(status)) {
      return '#00B746'
    } else if ([RequestStatus.EXPIRED].includes(status)) {
      return '#C4C4C4'
    } else {
      return 'black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <div className={classNames.multilineTextWrapper}>
      <Typography className={classNames.multilineStatusText} style={{color: colorStatus}}>
        {status.replace(/_/g, ' ')}
      </Typography>
    </div>
  )
})

export const TaskDescriptionCell = withStyles(styles)(({classes: classNames, task, hideImage}) => {
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
                alt=""
                className={classNames.taskDescriptionImg}
                src={getAmazonImageUrl(product.product.images[0])}
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
        {task.boxesBefore && task.boxesBefore.map((box, index) => renderProductImage(box, index))}
        {!hideImage && <Typography>{'=>'}</Typography>}
      </>

      {task.boxes.map((box, index) => renderProductImage(box, index))}
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

        {task.boxesBefore && task.boxesBefore.map((box, index) => renderProductImage(box, index))}
      </div>
    </div>
  )

  const taskEditDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <div className={classNames.taskTableCell}>
        <Typography className={classNames.descriptionWrapper}>{textConsts.edit}</Typography>

        {task.boxesBefore && task.boxesBefore.map((box, index) => renderProductImage(box, index))}
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

  return <div className={classNames.taskDescriptionScrollWrapper}>{renderTaskDescription(task.operationType)}</div>
})

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

export const ActiveBarcodeCell = withStyles(styles)(({classes: classNames, barCode}) => (
  <React.Fragment>
    {/* <Typography className={classNames.noActivebarCode}>{barCode || 'N/A'}</Typography> */}

    {barCode ? (
      <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(barCode)}>
        <Typography className={classNames.noActivebarCode}>{barCode}</Typography>
      </Link>
    ) : (
      <Typography className={classNames.noActivebarCode}>{'N/A'}</Typography>
    )}
  </React.Fragment>
))

export const ToFixedWithKgSignCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.priceTableCell}>{!value ? (value === 0 ? 0 : 'N/A') : toFixedWithKg(value, fix)}</div>
))

export const SmallRowImageCell = withStyles(styles)(({classes: classNames, images}) => (
  <div className={classNames.smallRowImgWrapper}>
    <img alt="" className={classNames.img} src={getAmazonImageUrl(images[0])} />
  </div>
))

export const ToFixedCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.priceTableCell}>{!value ? (value === 0 ? 0 : 'N/A') : toFixed(value, fix)}</div>
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
    <SuccessButton className={classNames.warehouseMyTasksSuccessBtn} onClick={() => handlers.onClickResolveBtn(row)}>
      {textConsts.resolveBtn}
    </SuccessButton>

    {row.operationType !== TaskOperationType.RECEIVE && (
      <ErrorButton
        className={clsx(classNames.rowCancelBtn, classNames.warehouseMyTasksCancelBtn)}
        onClick={() => {
          handlers.onClickCancelTask(row.boxes[0]._id, row._id, row.operationType)
        }}
      >
        {textConsts.cancelBtn}
      </ErrorButton>
    )}
  </div>
))

export const ClientTasksActionBtnsCell = withStyles(styles)(({classes: classNames, row, handlers}) => {
  const checkIfTaskCouldBeCanceled = status => {
    if (status === mapTaskStatusEmumToKey[TaskStatus.NEW]) {
      return true
    }
    return false
  }

  const renderTaskInfoBtn = () => (
    <Button
      variant="contained"
      color="primary"
      className={classNames.infoBtn}
      onClick={() => handlers.onClickTaskInfo(row)}
    >
      {textConsts.showDetails}
    </Button>
  )

  const renderHistoryItem = () => {
    switch (mapTaskOperationTypeKeyToEnum[row.operationType]) {
      case TaskOperationType.MERGE:
        return (
          <React.Fragment>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <ErrorButton
                className={classNames.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]._id, row._id, 'merge')}
              >
                {textConsts.cancelTaskBtn}
              </ErrorButton>
            )}
          </React.Fragment>
        )
      case TaskOperationType.SPLIT:
        return (
          <React.Fragment>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <ErrorButton
                className={classNames.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]._id, row._id, 'split')}
              >
                {textConsts.cancelTaskBtn}
              </ErrorButton>
            )}
          </React.Fragment>
        )
      case TaskOperationType.RECEIVE:
        return <React.Fragment>{renderTaskInfoBtn()}</React.Fragment>
      case TaskOperationType.EDIT:
        return (
          <React.Fragment>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <ErrorButton
                className={classNames.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]._id, row._id, 'edit')}
              >
                {textConsts.cancelTaskBtn}
              </ErrorButton>
            )}
          </React.Fragment>
        )
    }
  }

  return <div>{renderHistoryItem()}</div>
})

export const ClientOrdersNotificationsBtnsCell = withStyles(styles)(({classes: classNames, row, handlers}) => (
  <div>
    <Button variant="contained" color="primary" onClick={() => handlers.onTriggerOpenConfirmModal(row)}>
      {textConsts.confirmBtn}
    </Button>
    <ErrorButton
      className={classNames.rowCancelBtn}
      onClick={() => {
        handlers.onTriggerOpenRejectModal(row)
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
        disabled={row.role === mapUserRoleEnumToKey[UserRole.ADMIN]}
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
              {item.product.asin}
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
              alt=""
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

export const ScrollingLinkCell = withStyles(styles)(({classes: classNames, value}) => (
  <React.Fragment>
    <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(value)} className={classNames.scrollingValue}>
      <Typography>{value || 'N/A'}</Typography>
    </Link>
  </React.Fragment>
))

export const EditOrRemoveBtnsCell = withStyles(styles)(
  ({classes: classNames, row, handlers, isSubUsersTable, disableActionBtn}) => (
    <div>
      <Button
        variant="contained"
        color="primary"
        disabled={disableActionBtn}
        onClick={() => handlers.onClickEditBtn(row)}
      >
        {isSubUsersTable ? textConsts.addPermissionsBtn : textConsts.editBtn}
      </Button>

      <ErrorButton
        disabled={disableActionBtn}
        className={classNames.rowCancelBtn}
        onClick={() => {
          handlers.onClickRemoveBtn(row)
        }}
      >
        {textConsts.removeBtn}
      </ErrorButton>
    </div>
  ),
)

export const BatchBoxesCell = withStyles(styles)(({classes: classNames, boxes}) => {
  const renderProductInfo = box => (
    <div className={classNames.batchProductsWrapper}>
      {box.items.map((item, itemIndex) => (
        <div key={itemIndex} className={classNames.order}>
          <img alt="" src={getAmazonImageUrl(item.product.images[0])} className={classNames.orderImg} />
          <div>
            <Typography className={classNames.batchProductTitle}>{item.product.amazonTitle}</Typography>
            <Typography className={classNames.orderText}>
              <span className={classNames.orderTextSpan}>{textConsts.id}</span>
              {item.product.asin}
              {box.sendToBatchComplete && <span className={classNames.sendSuccess}>{' Отправлено'}</span>}
            </Typography>
            <Typography className={classNames.imgNum}>{`x ${item.amount}`}</Typography>
            {box.amount > 1 && (
              <Typography className={classNames.superboxTypo}>{`Superbox x ${box.amount}`}</Typography>
            )}
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

export const TrashCell = withStyles(styles)(({classes: classNames, onClick}) => (
  <div className={classNames.trashWrapper}>
    <img className={classNames.trashImg} src="/assets/icons/trash.svg" alt="" onClick={onClick} />
  </div>
))

export const WarehouseBoxesBtnsCell = withStyles(styles)(({classes: classNames, row, handlers}) => (
  <div>
    {row.status !== BoxStatus.REQUESTED_SEND_TO_BATCH && !row.batchId && (
      <Typography>{'Не готово к отправке'}</Typography>
    )}

    {row.batchId && row.status !== BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE && (
      <Button variant="contained" color="primary" onClick={() => handlers.moveBox(row)}>
        {'Переместить'}
      </Button>
    )}

    {row.status === BoxStatus.REQUESTED_SEND_TO_BATCH && (
      <SuccessButton className={classNames.warehouseMyTasksSuccessBtn} onClick={() => handlers.moveBox(row)}>
        {'Добавить в партию'}
      </SuccessButton>
    )}
  </div>
))
