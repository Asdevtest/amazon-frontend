/* eslint-disable no-unused-vars */
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {Rating} from '@mui/material'

import React from 'react'

import {Avatar, Badge, Chip, Link, TextareaAutosize, Tooltip, Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'
import {fromUnixTime} from 'date-fns'
import {TextArea} from 'react-mde'

import {BoxStatus} from '@constants/box-status'
import {getOrderStatusOptionByCode, OrderStatus, OrderStatusByKey, OrderStatusTranslate} from '@constants/order-status'
import {MyRequestStatusTranslate} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {mapTaskOperationTypeKeyToEnum, TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap, UserRolePrettyMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {Text} from '@components/text'
import {UserLink} from '@components/user-link'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
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
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixedWithDollarSign, trimBarcode, toFixedWithKg, checkAndMakeAbsoluteUrl, toFixed} from '@utils/text'
import {t} from '@utils/translations'

import {styles} from './data-grid-cells.style'

export const UserCell = withStyles(styles)(({classes: classNames, user}) => (
  <div className={classNames.sabUserWrapper}>
    <div className={classNames.userAvatarWrapper}>
      <Avatar src={getUserAvatarSrc(user?._id)} className={classNames.userAvatar} />
    </div>

    <div className={classNames.sabUserInfoWrapper}>
      <UserLink name={user?.name} userId={user?._id} />

      <Typography className={classNames.userEmail}>{user?.email}</Typography>

      <div className={classNames.sabUserRatingWrapper}>
        <Typography>{`Rating ${toFixed(user?.rating, 1)}`}</Typography>

        <Rating disabled className={classNames.sabUserRating} value={user?.rating} />
      </div>
    </div>
  </div>
))

export const UserRolesCell = withStyles(styles)(({classes: classNames, user}) => (
  <div className={classNames.userRolesWrapper}>
    <Typography className={classNames.userRole}>{UserRolePrettyMap[user.role]}</Typography>

    {user.allowedRoles
      .filter(el => el !== mapUserRoleEnumToKey[UserRole.CANDIDATE] && el !== user.role)
      .map((role, index) => (
        <Typography key={index} className={classNames.userRole}>
          {UserRolePrettyMap[role]}
        </Typography>
      ))}
  </div>
))

export const AsinCell = withStyles(styles)(({classes: classNames, product}) => (
  <div className={classNames.asinCell}>
    <div className={classNames.asinCellContainer}>
      <img alt="" className={classNames.img} src={getAmazonImageUrl(product.images[0])} />

      <div>
        <Typography className={classNames.csCodeTypo}>{product.amazonTitle}</Typography>
        <Typography className={classNames.typoCell}>
          {t(TranslationKey.ASIN)}
          <span className={classNames.typoSpan}>{product.asin}</span>
          {/* {` | ${formatDateDistanceFromNow(product.createdAt)}`} // пока отключим */}
        </Typography>
        <Typography className={classNames.csCodeTypo}>{product.category}</Typography>
      </div>
    </div>
  </div>
))

export const FeesValuesWithCalculateBtnCell = withStyles(styles)(
  ({classes: classNames, product, noCalculate, onClickCalculate}) => (
    <div className={classNames.feesTableWrapper}>
      <Typography className={classNames.typoCell}>
        {t(TranslationKey.Fees) + ': '}
        <span className={classNames.typoSpan}>{toFixedWithDollarSign(product.fbafee, 2)}</span>
      </Typography>
      <Typography className={classNames.typoCell}>
        {t(TranslationKey.Net) + ': '}
        <span className={classNames.typoSpan}>{toFixedWithDollarSign(product.reffee, 2)}</span>
      </Typography>
      {!noCalculate && (
        <Button
          disableElevation
          className={classNames.cellBtn}
          startIcon={<img alt="calculate icon" src="/assets/icons/calculate.svg" />}
          onClick={() => onClickCalculate(product)}
        >
          {'Calculate fees'}
        </Button>
      )}
    </div>
  ),
)

export const SupplierCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>
      {!product.currentSupplier ? '-' : product.currentSupplier.name}
    </Typography>

    {product.currentSupplier && (
      <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(product.currentSupplier?.link)}>
        <Typography className={classNames.noActiveLink}>{product.currentSupplier?.link}</Typography>
      </Link>
    )}
  </div>
))

export const UserLinkCell = withStyles(styles)(({classes: classNames, name, userId, blackText}) => (
  <div className={classNames.userLinkWrapper}>
    <UserLink name={name} userId={userId} blackText={blackText} />
  </div>
))

export const SupervisorCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!product.checkedBy ? '-' : product.checkedBy.name}</Typography>
  </div>
))

export const ResearcherCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!product.createdBy ? '-' : product.createdBy.name}</Typography>
  </div>
))

export const ClientCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!product.client ? '-' : product.client.name}</Typography>
  </div>
))

export const BuyerCell = withStyles(styles)(({classes: classNames, product}) => (
  <div>
    <Typography className={classNames.researcherCell}>{!product.buyer ? '-' : product.buyer.name}</Typography>
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
      label={product.barCode ? trimBarcode(product.barCode) : t(TranslationKey['Set Barcode'])}
      onClick={() => handlers.onClickBarcode(product)}
      onDoubleClick={() => handlers.onDoubleClickBarcode(product)}
      onDelete={!product.barCode ? undefined : () => handlers.onDeleteBarcode(product)}
    />
  </React.Fragment>
))

export const HsCodeCell = withStyles(styles)(({classes: classNames, product, handlers}) => (
  <React.Fragment>
    <Chip
      classes={{
        root: classNames.barcodeChip,
        clickable: classNames.barcodeChipHover,
        deletable: classNames.barcodeChipHover,
        deleteIcon: classNames.barcodeChipIcon,
      }}
      className={clsx({[classNames.barcodeChipExists]: product.hsCode})}
      size="small"
      label={product.hsCode ? trimBarcode(product.hsCode) : t(TranslationKey['Set HS code'])}
      onClick={() => handlers.onClickHsCode(product)}
      onDoubleClick={() => handlers.onDoubleClickHsCode(product)}
      onDelete={!product.hsCode ? undefined : () => handlers.onDeleteHsCode(product)}
    />
  </React.Fragment>
))

export const ChangeChipCell = withStyles(styles)(
  ({classes: classNames, row, value, onClickChip, onDoubleClickChip, onDeleteChip, text, disabled, label}) => (
    <div>
      {label ? <Typography className={classNames.changeChipCellLabel}>{label}</Typography> : null}
      <Chip
        disabled={disabled}
        classes={{
          root: classNames.barcodeChip,
          clickable: classNames.barcodeChipHover,
          deletable: classNames.barcodeChipHover,
          deleteIcon: classNames.barcodeChipIcon,
        }}
        className={clsx({[classNames.barcodeChipExists]: value})}
        size="small"
        label={value ? trimBarcode(value) : text}
        onClick={() => onClickChip(row)}
        onDoubleClick={() => onDoubleClickChip(row)}
        onDelete={!value ? undefined : () => onDeleteChip(row)}
      />
    </div>
  ),
)

export const DateCell = withStyles(styles)(({params}) => (
  <Typography>{!params.value ? '-' : formatDateTime(params.value)}</Typography>
))

export const NormDateCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.normDateCellTypo}>
    {!(params && params.value) ? '-' : formatNormDateTime(params.value)}
  </Typography>
))

export const NormDateWithoutTimeCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.normDateCellTypo}>
    {!(params && params.value) ? '-' : formatDateWithoutTime(params.value)}
  </Typography>
))

export const ShortDateCell = withStyles(styles)(({classes: classNames, params}) => (
  <Typography className={classNames.shortDateCellTypo}>
    {!(params && params.value) ? '-' : formatShortDateTime(params.value)}
  </Typography>
))

export const NormDateFromUnixCell = withStyles(styles)(({classes: classNames, value}) => (
  <Typography className={classNames.normDateCellTypo}>
    {!value ? '-' : formatDateForShowWithoutParseISO(fromUnixTime(value))}
  </Typography>
))

export const NormDateWithParseISOCell = withStyles(styles)(({params}) => (
  <Typography>{!params.value ? '-' : formatNormDateTimeWithParseISO(params.value)}</Typography>
))

export const OrderCell = withStyles(styles)(({classes: classNames, product, superbox, box, error}) => (
  <div className={classNames.order}>
    <img alt="" src={getAmazonImageUrl(product.images[0])} className={classNames.orderImg} />
    <div>
      <Typography className={classNames.orderTitle}>{product.amazonTitle}</Typography>
      <Typography className={classNames.orderText}>
        <span className={classNames.orderTextSpan}>{t(TranslationKey.ASIN) + ': '}</span>
        {product.asin}
      </Typography>
      {superbox && <Typography className={classNames.superboxTypo}>{`${'SB'} x ${superbox}`}</Typography>}

      {box && box.totalPrice - box.totalPriceChanged < 0 && (
        <span className={classNames.needPay}>{`${t(TranslationKey['Extra payment required!'])} (${toFixedWithDollarSign(
          box.totalPriceChanged - box.totalPrice,
          2,
        )})`}</span>
      )}

      {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
        <span className={classNames.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
      )}

      {error && <span className={classNames.OrderCellError}>{error}</span>}
    </div>
  </div>
))

export const renderFieldValueCell = value => (!value && value !== 0 ? '-' : value)

export const WarehouseTariffDestinationCell = withStyles(styles)(() => (
  <div>
    <Typography>{'US West Coast'}</Typography>
    <Typography>{'US Central '}</Typography>
    <Typography>{'US East Coast '}</Typography>
  </div>
))

export const WarehouseTariffRatesCell = withStyles(styles)(({classes: classNames, conditionsByRegion}) => (
  <div className={classNames.tariffRatesWrapper}>
    <Typography>{toFixed(conditionsByRegion.west.rate, 2) || '-'}</Typography>
    <Typography>{toFixed(conditionsByRegion.central.rate, 2) || '-'}</Typography>
    <Typography>{toFixed(conditionsByRegion.east.rate, 2) || '-'}</Typography>
  </div>
))

export const WarehouseTariffDatesCell = withStyles(styles)(({classes: classNames, row}) => (
  <div>
    <div className={classNames.warehouseTariffDatesItem}>
      <Typography>{t(TranslationKey['CLS (batch closing date)'])}</Typography>
      <Typography>{!row.cls ? '-' : formatDateWithoutTime(row.cls)}</Typography>
    </div>

    <div className={classNames.warehouseTariffDatesItem}>
      <Typography>{t(TranslationKey['ETD (date of shipment)'])}</Typography>
      <Typography>{!row.etd ? '-' : formatDateWithoutTime(row.etd)}</Typography>
    </div>

    <div className={classNames.warehouseTariffDatesItem}>
      <Typography>{t(TranslationKey['ETA (arrival date)'])}</Typography>
      <Typography>{!row.eta ? '-' : formatDateWithoutTime(row.eta)}</Typography>
    </div>
  </div>
))

export const RenderFieldValueCell = withStyles(styles)(({classes: classNames, value}) => (
  <Typography className={classNames.renderFieldValueCellText}>{!value && value !== 0 ? '-' : value}</Typography>
))

export const MultilineTextCell = withStyles(styles)(({classes: classNames, text, noTextText}) => (
  <div className={classNames.multilineTextWrapper}>
    <Typography className={classNames.multilineText}>{text || noTextText || '-'}</Typography>
  </div>
))

export const MultilineTextAlignLeftCell = withStyles(styles)(({classes: classNames, text}) => (
  <div className={classNames.multilineTextAlignLeftWrapper}>
    <TextareaAutosize disabled className={classNames.multilineTextAlignLeft}>
      {text}
    </TextareaAutosize>
  </div>
))

export const MultilineTextAlignLeftHeaderCell = withStyles(styles)(({classes: classNames, text}) => (
  <div className={classNames.multilineTextAlignLeftHeaderWrapper}>
    <Typography className={classNames.multilineTextAlignLeftHeader}>{text}</Typography>
  </div>
))

export const MultilineTextHeaderCell = withStyles(styles)(({classes: classNames, text}) => (
  <div className={classNames.multilineTextHeaderWrapper}>
    <Typography className={classNames.multilineHeaderText}>{text}</Typography>
  </div>
))

export const TextHeaderCell = withStyles(styles)(({classes: classNames, text}) => (
  <div className={classNames.textHeaderWrapper}>
    <Typography className={classNames.headerText}>{text}</Typography>
  </div>
))

export const MultilineStatusCell = withStyles(styles)(({classes: classNames, status}) => (
  <div className={classNames.multilineTextWrapper}>
    <Typography className={classNames.statusMultilineText}>{status?.replace(/_/g, ' ')}</Typography>
  </div>
))

export const OrderStatusCell = withStyles(styles)(({classes: classNames, status}) => {
  const colorByStatus = () => {
    if ([OrderStatus.AT_PROCESS, OrderStatus.PAID_TO_SUPPLIER].includes(status)) {
      return '#F3AF00'
    } else if ([OrderStatus.IN_STOCK, OrderStatus.TRACK_NUMBER_ISSUED].includes(status)) {
      return '#00B746'
    } else if ([OrderStatus.CANCELED_BY_BUYER, OrderStatus.CANCELED_BY_CLIENT].includes(status)) {
      return '#FF1616'
    } else {
      return '#black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <div className={classNames.statusWrapper}>
      <Typography className={classNames.orderStatusText} style={{color: colorStatus}}>
        {OrderStatusTranslate(status)}
      </Typography>
    </div>
  )
})

export const RequestStatusCell = withStyles(styles)(({classes: classNames, status}) => {
  const colorByStatus = () => {
    if ([RequestStatus.DRAFT].includes(status)) {
      return '#006CFF'
    } else if (
      [
        RequestStatus.CANCELED_BY_CREATOR,
        RequestStatus.FORBID_NEW_PROPOSALS,
        RequestStatus.CANCELED_BY_ADMIN,
        RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED,
        RequestStatus.CANCELED_BY_SUPERVISOR,
        RequestStatus.CANCELED_BY_EXECUTOR,
      ].includes(status)
    ) {
      return '#FF1616'
    } else if (
      [
        RequestStatus.IN_PROCESS,
        RequestStatus.VERIFYING_BY_SUPERVISOR,
        RequestStatus.ACCEPTED_BY_SUPERVISOR,
        RequestStatus.CORRECTED,
      ].includes(status)
    ) {
      return '#00B746'
    } else if (
      [
        RequestStatus.PUBLISHED,
        RequestStatus.TO_CORRECT_BY_ADMIN,
        RequestStatus.READY_TO_VERIFY,
        RequestStatus.TO_CORRECT,
      ].includes(status)
    ) {
      return '#F3AF00'
    } else if ([RequestStatus.EXPIRED].includes(status)) {
      return '#C4C4C4'
    } else {
      return 'black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <div className={classNames.statusWrapper}>
      <Typography className={classNames.statusText} style={{color: colorStatus}}>
        {MyRequestStatusTranslate(status)}
      </Typography>
    </div>
  )
})

export const MultilineRequestStatusCell = withStyles(styles)(({classes: classNames, status, fontSize = '14px'}) => {
  const colorByStatus = () => {
    if ([RequestStatus.DRAFT].includes(status)) {
      return '#006CFF'
    } else if (
      [
        RequestStatus.CANCELED_BY_CREATOR,
        RequestStatus.FORBID_NEW_PROPOSALS,
        RequestStatus.CANCELED_BY_ADMIN,
        RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED,
      ].includes(status)
    ) {
      return '#FF1616'
    } else if ([RequestStatus.IN_PROCESS].includes(status)) {
      return '#00B746'
    } else if ([RequestStatus.PUBLISHED, RequestStatus.TO_CORRECT_BY_ADMIN].includes(status)) {
      return '#F3AF00'
    } else if ([RequestStatus.EXPIRED].includes(status)) {
      return '#C4C4C4'
    } else {
      return 'black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <div className={classNames.multilineTextWrapper}>
      <Typography className={classNames.multilineStatusText} style={{color: colorStatus, fontSize}}>
        {MyRequestStatusTranslate(status)}
      </Typography>
    </div>
  )
})

export const TaskTypeCell = withStyles(styles)(({classes: classNames, task}) => {
  const renderTaskDescription = type => {
    switch (type) {
      case TaskOperationType.MERGE:
        return <Typography>{t(TranslationKey.Merge)}</Typography>
      case TaskOperationType.SPLIT:
        return <Typography>{t(TranslationKey.Split)}</Typography>
      case TaskOperationType.RECEIVE:
        return <Typography>{t(TranslationKey.Receive)}</Typography>
      case TaskOperationType.EDIT:
        return <Typography>{t(TranslationKey.Edit)}</Typography>
    }
  }

  return <div className={classNames.taskDescriptionScrollWrapper}>{renderTaskDescription(task.operationType)}</div>
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

  const taskMergeDescription = () => <div className={classNames.taskTableCell}>{renderBlockProductsImages}</div>
  const taskDivideDescription = () => <div className={classNames.taskTableCell}>{renderBlockProductsImages}</div>
  const taskReceiveDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <div className={classNames.taskTableCell}>
        {task.boxesBefore && task.boxesBefore.map((box, index) => renderProductImage(box, index))}
      </div>
    </div>
  )

  const taskEditDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <div className={classNames.taskTableCell}>
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
    <Typography className={classNames.noActivebarCode}>{barCode || '-'}</Typography>
  </React.Fragment>
))

export const ShowBarcodeOrHscodeCell = withStyles(styles)(({classes: classNames, barCode, hsCode, handlers}) => (
  <div className={classNames.showButton}>
    <Button onClick={() => handlers.showBarcodeOrHscode(barCode, hsCode)}>{t(TranslationKey.View)}</Button>
  </div>
))

export const FourMonthesStockCell = withStyles(styles)(({classes: classNames, handlers, params, value}) => (
  <div className={classNames.fourMonthesStockWrapper}>
    <Typography className={classNames.fourMonthesStockLabel}>{`${t(TranslationKey.Repurchase)}: ${
      params.row.stockSum - value
    }`}</Typography>
    <ChangeChipCell
      row={params.row.originalData}
      // value={value}
      text={value > 0 ? `${t(TranslationKey.Edit)} Stock` : `${t(TranslationKey.Set)} Stock`}
      onClickChip={() => handlers.onClickFourMonthsStock(params.row.originalData)}
      onDeleteChip={() => handlers.onDeleteFourMonthesStock(params.row.originalData)}
    />
  </div>
))

export const ActiveBarcodeCell = withStyles(styles)(({classes: classNames, barCode}) => (
  <React.Fragment>
    {/* <Typography className={classNames.noActivebarCode}>{barCode || '-'}</Typography> */}

    {barCode ? (
      <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(barCode)}>
        <Typography className={classNames.noActivebarCode}>{barCode}</Typography>
      </Link>
    ) : (
      <Typography className={classNames.noActivebarCode}>{'-'}</Typography>
    )}
  </React.Fragment>
))

export const ToFixedWithKgSignCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.multilineTextWrapper}>
    <Typography className={classNames.multilineText}>
      {!value ? (value === 0 ? 0 : '-') : toFixedWithKg(value, fix)}
    </Typography>
  </div>
))

export const SmallRowImageCell = withStyles(styles)(({classes: classNames, images}) => (
  <div className={classNames.smallRowImgWrapper}>
    <img alt="" className={classNames.img} src={getAmazonImageUrl(images[0])} />
  </div>
))

export const ToFixedCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.multilineTextWrapper}>
    <Typography className={classNames.multilineText}>
      {!value ? (value === 0 ? 0 : '-') : toFixed(value, fix)}
    </Typography>
  </div>
))

export const ToFixedWithDollarSignCell = withStyles(styles)(({classes: classNames, value, fix}) => (
  <div className={classNames.multilineTextWrapper}>
    <Typography className={classNames.multilineText}>
      {!value ? (value === 0 ? 0 : '-') : toFixedWithDollarSign(value, fix)}
    </Typography>
  </div>
))

export const SuccessActionBtnCell = withStyles(styles)(
  ({classes: classNames, onClickOkBtn, bTnText, tooltipText, isFirstRow}) => (
    <div className={classNames.successActionBtnWrapper}>
      <Button success tooltipInfoContent={isFirstRow && tooltipText} onClick={onClickOkBtn}>
        {bTnText}
      </Button>
    </div>
  ),
)

export const NormalActionBtnCell = withStyles(styles)(
  ({classes: classNames, onClickOkBtn, bTnText, tooltipText, disabled, isFirstRow}) => (
    <div className={classNames.normalActionBtnWrapper}>
      <Button
        disabled={disabled}
        tooltipInfoContent={isFirstRow && tooltipText}
        variant="contained"
        color="primary"
        className={classNames.actionBtn}
        onClick={onClickOkBtn}
      >
        {bTnText}
      </Button>
    </div>
  ),
)

export const WarehouseMyTasksBtnsCell = withStyles(styles)(({classes: classNames, row, handlers}) => (
  <div className={classNames.warehouseMyTasksBtnsWrapper}>
    <Button
      success
      tooltipInfoContent={t(TranslationKey['Open a window to perform a task'])}
      className={classNames.warehouseMyTasksSuccessBtn}
      onClick={() => handlers.onClickResolveBtn(row)}
    >
      {t(TranslationKey.Resolve)}
    </Button>

    {row.operationType !== TaskOperationType.RECEIVE && (
      <Button
        danger
        tooltipInfoContent={t(TranslationKey['The task will be canceled, the box will keep its previous state'])}
        className={clsx(classNames.rowCancelBtn, classNames.warehouseMyTasksCancelBtn)}
        onClick={() => {
          handlers.onClickCancelTask(row.boxes[0]._id, row._id, row.operationType)
        }}
      >
        {t(TranslationKey.Cancel)}
      </Button>
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
      {t(TranslationKey.Details)}
    </Button>
  )

  const renderHistoryItem = () => {
    switch (mapTaskOperationTypeKeyToEnum[row.operationType]) {
      case TaskOperationType.MERGE:
        return (
          <React.Fragment>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <Button
                danger
                className={classNames.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]._id, row._id, 'merge')}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            )}
          </React.Fragment>
        )
      case TaskOperationType.SPLIT:
        return (
          <React.Fragment>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <Button
                danger
                className={classNames.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]._id, row._id, 'split')}
              >
                {t(TranslationKey.Cancel)}
              </Button>
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
              <Button
                danger
                className={classNames.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]._id, row._id, 'edit')}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            )}
          </React.Fragment>
        )
    }
  }

  return <div className={classNames.clientTasksActionBtnsWrapper}>{renderHistoryItem()}</div>
})

export const ClientNotificationsBtnsCell = withStyles(styles)(({classes: classNames, row, handlers, disabled}) => (
  <div>
    <Button
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={() => handlers.onTriggerOpenConfirmModal(row)}
    >
      {t(TranslationKey.Confirm)}
    </Button>
    <Button
      danger
      disabled={disabled}
      className={classNames.rowCancelBtn}
      onClick={() => {
        handlers.onTriggerOpenRejectModal(row)
      }}
    >
      {t(TranslationKey.Reject)}
    </Button>
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
        onClick={() => handlers.onClickEditUser(row)}
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
  <div className={classNames.multilineTextWrapper}>
    <Typography>
      {qty || '-'}
      <Typography className={classNames.superboxTypo}>{` x ${superbox}`}</Typography>
    </Typography>
  </div>
))

export const OrderManyItemsCell = withStyles(styles)(({classes: classNames, box, error}) => {
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
              <span className={classNames.orderTextSpan}>{t(TranslationKey.ASIN) + ': '}</span>
              {item.product.asin}
            </Typography>

            {item.deliveryTotalPrice - item.deliveryTotalPriceChanged < 0 && itemIndex === 0 && (
              <span className={classNames.needPay}>{`${t(
                TranslationKey['Extra payment required!'],
              )} (${toFixedWithDollarSign(item.deliveryTotalPriceChanged - item.deliveryTotalPrice, 2)})`}</span>
            )}

            {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
              <span className={classNames.needPay}>
                {t(TranslationKey['The tariff is invalid or has been removed!'])}
              </span>
            )}
          </div>
        </div>
      ))}

      {error && <span className={classNames.OrderCellError}>{error}</span>}
    </div>
  )

  return (
    <Tooltip title={renderProductInfo()}>
      <div>
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
        {error && <span className={classNames.OrderCellError}>{error}</span>}
      </div>
    </Tooltip>
  )
})

export const ScrollingCell = withStyles(styles)(({classes: classNames, value}) => (
  <React.Fragment>
    <Typography className={classNames.scrollingValue}>{value || '-'}</Typography>
  </React.Fragment>
))

export const MultilineCell = withStyles(styles)(({classes: classNames, value}) => (
  <React.Fragment>
    <Typography className={classNames.multilineValue}>{value || '-'}</Typography>
  </React.Fragment>
))

export const ScrollingLinkCell = withStyles(styles)(({classes: classNames, value}) => (
  <React.Fragment>
    <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(value)} className={classNames.scrollingValue}>
      <Typography>{value || '-'}</Typography>
    </Link>
  </React.Fragment>
))

export const EditOrRemoveBtnsCell = withStyles(styles)(
  ({
    classes: classNames,
    row,
    handlers,
    isSubUsersTable,
    disableActionBtn,
    tooltipFirstButton,
    tooltipSecondButton,

    isFirstRow,
  }) => (
    <div className={classNames.editOrRemoveBtnsCell}>
      <Button
        tooltipInfoContent={isFirstRow && tooltipFirstButton}
        variant="contained"
        color="primary"
        disabled={disableActionBtn}
        onClick={() => handlers.onClickEditBtn(row)}
      >
        {isSubUsersTable ? t(TranslationKey['Assign permissions']) : t(TranslationKey.Edit)}
      </Button>

      <Button
        danger
        tooltipInfoContent={isFirstRow && tooltipSecondButton}
        disabled={disableActionBtn}
        className={classNames.rowCancelBtn}
        onClick={() => {
          handlers.onClickRemoveBtn(row)
        }}
      >
        {t(TranslationKey.Remove)}
      </Button>
    </div>
  ),
)

export const EditOrRemoveIconBtnsCell = withStyles(styles)(
  ({
    classes: classNames,
    row,
    handlers,
    isSubUsersTable,
    disableActionBtn,
    tooltipFirstButton,
    tooltipSecondButton,
    isFirstRow,
  }) => (
    <div className={classNames.editOrRemoveIconBtnsCell}>
      <div className={classNames.editOrRemoveBtnWrapper}>
        <Button
          tooltipInfoContent={isFirstRow && tooltipFirstButton}
          variant="contained"
          color="primary"
          disabled={disableActionBtn}
          className={classNames.removeOrEditBtn}
          onClick={() => handlers.onClickEditBtn(row)}
        >
          {isSubUsersTable ? t(TranslationKey['Assign permissions']) : <EditOutlinedIcon />}
        </Button>
        {/* <Typography className={classNames.editOrRemoveBtnText}>{t(TranslationKey.Edit)}</Typography> */}
      </div>
      <div className={classNames.editOrRemoveBtnWrapper}>
        <Button
          danger
          tooltipInfoContent={isFirstRow && tooltipSecondButton}
          disabled={disableActionBtn}
          // className={classNames.rowCancelBtn}
          className={classNames.removeOrEditBtn}
          onClick={() => {
            handlers.onClickRemoveBtn(row)
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </Button>
        {/* <Typography className={classNames.editOrRemoveBtnText}>{t(TranslationKey.Delete)}</Typography> */}
      </div>
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
              <span className={classNames.orderTextSpan}>{t(TranslationKey.ASIN) + ': '}</span>
              {item.product.asin}
              {box.deliveryTotalPrice - box.deliveryTotalPriceChanged < 0 && itemIndex === 0 && (
                <span className={classNames.needPay}>{`${t(
                  TranslationKey['Extra payment required!'],
                )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
              )}
            </Typography>
            <Typography className={classNames.imgNum}>{`x ${item.amount}`}</Typography>
            {box.amount > 1 && (
              <Typography className={classNames.superboxTypo}>{`Superbox x ${box.amount}`}</Typography>
            )}
          </div>
        </div>
      ))}

      {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
        <span className={classNames.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
      )}
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

export const TrashCell = withStyles(styles)(({classes: classNames, onClick, tooltipText}) => (
  <Button tooltipInfoContent={tooltipText} className={classNames.trashWrapper}>
    <img className={classNames.trashImg} src="/assets/icons/trash.svg" alt="" onClick={onClick} />
  </Button>
))

export const WarehouseBoxesBtnsCell = withStyles(styles)(({classes: classNames, row, handlers}) => (
  <div className={classNames.warehouseBoxesBtnsWrapper}>
    {row.status !== BoxStatus.REQUESTED_SEND_TO_BATCH && !row.batchId && (
      <Typography>{t(TranslationKey['Not ready to ship'])}</Typography>
    )}

    {row.batchId && row.status !== BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE && (
      <Button
        tooltipAttentionContent={
          row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF &&
          t(TranslationKey['The tariff is invalid or has been removed!'])
        }
        tooltipInfoContent={t(TranslationKey['Move a box from the current batch to another'])}
        disabled={row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF}
        className={classNames.warehouseBoxesBtn}
        variant="contained"
        color="primary"
        onClick={() => handlers.moveBox(row)}
      >
        {t(TranslationKey['Move box'])}
      </Button>
    )}

    {row.status === BoxStatus.REQUESTED_SEND_TO_BATCH && !row.batchId && (
      <Button
        success
        tooltipInfoContent={t(TranslationKey['Add a box to a new or existing batch'])}
        className={classNames.warehouseBoxesBtn}
        onClick={() => handlers.moveBox(row)}
      >
        {t(TranslationKey['Add to batch'])}
      </Button>
    )}

    <Button
      className={classNames.warehouseBoxesBtn}
      tooltipInfoContent={t(TranslationKey['Code for Harmonized System Product Identification'])}
      variant="contained"
      color="primary"
      onClick={() => handlers.setHsCode(row)}
    >
      {t(TranslationKey['Add HS Code'])}
    </Button>
  </div>
))

export const ShopsReportBtnsCell = withStyles(styles)(({classes: classNames, value, onClickSeeMore, isFirstRow}) => {
  const copyValue = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className={classNames.shopsReportBtnsWrapper}>
      <Text tooltipInfoContent={isFirstRow && t(TranslationKey['Download the file to your device'])}>
        <a download target="_blank" rel="noreferrer" href={value} className={classNames.downloadLink}>
          {t(TranslationKey.download)}
        </a>
      </Text>
      <Button
        tooltipInfoContent={isFirstRow && t(TranslationKey['Copy the link to the report'])}
        className={classNames.copyImgButton}
      >
        <img className={classNames.copyImg} src="/assets/icons/copy-img.svg" alt="" onClick={copyValue} />
      </Button>

      <Button
        tooltipInfoContent={isFirstRow && t(TranslationKey['Opens the table of a particular store'])}
        variant="contained"
        color="primary"
        onClick={onClickSeeMore}
      >
        {t(TranslationKey.View)}
      </Button>
    </div>
  )
})

export const ShortBoxDimensions = withStyles(styles)(({classes: classNames, box, volumeWeightCoefficient}) => {
  const finalWeight = calcFinalWeightForBox(box, volumeWeightCoefficient)
  return (
    <div>
      <Typography>{`${toFixed(box.lengthCmWarehouse, 2)}x${toFixed(box.widthCmWarehouse, 2)}x${toFixed(
        box.heightCmWarehouse,
        2,
      )}`}</Typography>

      <Typography>{`${t(TranslationKey.Weight)}: ${toFixedWithKg(box.weighGrossKgWarehouse, 2)}`}</Typography>
      <Typography>{`${t(TranslationKey['Volume weight'])}: ${toFixedWithKg(
        calcVolumeWeightForBox(box, volumeWeightCoefficient),
        2,
      )}`}</Typography>
      <Typography className={clsx({[classNames.alertText]: finalWeight < 12})}>{`${t(
        TranslationKey['Final weight'],
      )}: ${toFixedWithKg(finalWeight, 2)}`}</Typography>

      {finalWeight < 12 ? (
        <span className={classNames.alertText}>{t(TranslationKey['Weight less than 12 kg!'])}</span>
      ) : null}
    </div>
  )
})
