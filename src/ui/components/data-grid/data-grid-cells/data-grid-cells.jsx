/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import { fromUnixTime } from 'date-fns'
import { toJS } from 'mobx'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { NavLink, useHistory } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { withStyles } from 'tss-react/mui'

import ClearIcon from '@mui/icons-material/Clear'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DoneIcon from '@mui/icons-material/Done'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import PrintIcon from '@mui/icons-material/Print'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  IconButton,
  InputAdornment,
  Link,
  Menu,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material'

import { imageTypes } from '@constants/configs/image-types'
import {
  getConversion,
  getWeightSizesType,
  inchesCoefficient,
  poundsWeightCoefficient,
} from '@constants/configs/sizes-settings'
import { zipCodeGroups } from '@constants/configs/zip-code-groups'
import { NotificationIdeaStatus, NotificationType } from '@constants/keys/notifications'
import { tableProductViewMode } from '@constants/keys/table-product-view'
import { tariffTypes } from '@constants/keys/tariff-types'
import {
  UserRole,
  UserRoleCodeMap,
  UserRoleCodeMapForRoutes,
  UserRolePrettyMap,
  mapUserRoleEnumToKey,
} from '@constants/keys/user-roles'
import { orderPriority } from '@constants/orders/order-priority'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { requestPriority } from '@constants/requests/request-priority'
import {
  MyRequestStatusTranslate,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
  disabledCancelBtnStatuses,
  noDisabledEditBtnStatuses,
} from '@constants/requests/request-proposal-status'
import { RequestStatus, colorByStatus, showResultStatuses } from '@constants/requests/request-status'
import { getBatchParameters } from '@constants/statuses/batch-weight-calculations-method'
import { BoxStatus } from '@constants/statuses/box-status'
import {
  colorByIdeaStatus,
  ideaStatus,
  ideaStatusByCode,
  ideaStatusByKey,
  ideaStatusGroups,
  ideaStatusGroupsNames,
  ideaStatusTranslate,
} from '@constants/statuses/idea-status.ts'
import { TaskOperationType, mapTaskOperationTypeKeyToEnum } from '@constants/task/task-operation-type'
import { TaskStatus, TaskStatusTranslate, mapTaskStatusEmumToKey } from '@constants/task/task-status'
import { MAX_LENGTH_TITLE } from '@constants/text'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { IdeaRequestCard } from '@components/cards/idea-view-and-edit-card/idea-request-card'
import { ImageModal } from '@components/modals/image-modal/image-modal'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { NewDatePicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { PrioritySelect } from '@components/shared/priority-select/priority-select'
import { RedFlags } from '@components/shared/redFlags/red-flags'
import { SearchInput } from '@components/shared/search-input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import {
  BoxArrow,
  ClockIcon,
  CubeIcon,
  EditIcon,
  EqualIcon,
  FireIcon,
  ParentProductIcon,
  PlusIcon,
  SaveIcon,
  ShareLinkIcon,
  TruckIcon,
  VariationProductIcon,
} from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'
import { UserLink } from '@components/user/user-link'

import {
  calcFinalWeightForBox,
  calcNumberMinusPercent,
  calcVolumeWeightForBox,
  getTariffRateForBoxOrOrder,
  roundHalf,
} from '@utils/calculation'
import {
  checkIsMoreNCharactersAfterDot,
  checkIsNumberWithDot,
  checkIsPositiveNum,
  checkIsString,
  checkIsValidProposalStatusToShowResoult,
} from '@utils/checks'
import {
  formatDateForShowWithoutParseISO,
  formatDateTime,
  formatDateWithoutTime,
  formatNormDateTime,
  formatNormDateTimeWithParseISO,
  formatShortDateTime,
} from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import {
  checkAndMakeAbsoluteUrl,
  getShortenStringIfLongerThanCount,
  secondsToTime,
  shortAsin,
  shortSku,
  toFixed,
  toFixedWithDollarSign,
  toFixedWithKg,
  trimBarcode,
} from '@utils/text'
import { t } from '@utils/translations'

import { useDataGridCellsStyles } from './data-grid-cells.style'

export { UserCell } from './user-cell/user-cell'
export { UserMiniCell } from './user-mini-cell/user-mini-cell'
export { InStockCell } from './in-stock-cell/in-stock-cell'
export { UserRolesCell } from './user-roles-cell/user-roles-cell'
export { AsinCell } from './asin-cell/asin-cell'
export { ProductAsinCell } from './product-asin-cell/product-asin-cell'
export { SelectProductAsinCellWithourTitle } from './select-product-asin-cell-withour-title/select-product-asin-cell-withour-title'
export { StringListCell } from './string-list-cell/string-list-cell'
export { PaymentMethodsCell } from './payment-methods-cell/payment-methods-cell'
export { FeesValuesWithCalculateBtnCell } from './fees-values-with-calculate-btn-cell/fees-values-with-calculate-btn-cell'
export { SupplierCell } from './supplier-cell/supplier-cell'
export { UserLinkCell } from './user-link-cell/user-link-cell'
export { ManyUserLinkCell } from './many-user-link-cell/many-user-link-cell'
export { BarcodeCell } from './barcode-cell/barcode-cell'
export { HsCodeCell } from './hs-code-cell/hs-code-cell'
export { ChangeInputCell } from './change-input-cell/change-input-cell'
export { ChangeInputCommentCell } from './change-input-comment-cell/change-input-comment-cell'
export { ChangeChipCell } from './change-chip-cell/change-chip-cell'
export { PhotoAndFilesCell } from './photo-and-files-cell/photo-and-files-cell'
export { NormDateCell } from './norm-date-cell/norm-date-cell'
export { NormDateWithoutTimeCell } from './norm-date-without-time-cell/norm-date-without-time-cell'
export { ShortDateCell } from './short-date-cell/short-date-cell'
export { NormDateFromUnixCell } from './norm-date-from-unix-cell/norm-date-from-unix-cell'
export { NormDateWithParseISOCell } from './norm-date-with-parse-iso-cell/norm-date-with-parse-iso-cell'
export { OrderCell } from './order-cell/order-cell'
export { DownloadAndPrintFilesCell } from './download-and-print-files-cell/download-and-print-files-cell'
export { SuperboxQtyCell } from './superbox-qty-cell/superbox-qty-cell'
export { OrderManyItemsCell } from './order-many-items-cell/order-many-items-cell'
export { OrderBoxesCell } from './order-boxes-cell/order-boxes-cell'
export { RenderFieldValueCell } from './render-field-value-cell/render-field-value-cell'
export { WarehouseTariffDestinationCell } from './warehouse-tariff-destination-cell/warehouse-tariff-destination-cell'
export { WarehouseTariffRatesCell } from './warehouse-tariff-rates-cell/warehouse-tariff-rates-cell'
export { WarehouseTariffDatesCell } from './warehouse-tariff-dates-cell/warehouse-tariff-dates-cell'
export { EditOrRemoveIconBtnsCell } from './edit-or-remove-icon-btns-cell/edit-or-remove-icon-btns-cell'
export { TaskPriorityCell } from './task-priority-cell/task-priority-cell'
export { WarehouseDestinationAndTariffCell } from './warehouse-destination-and-tariff-cell/warehouse-destination-and-tariff-cell'

export const CheckboxCell = React.memo(({ checked, disabled, onClick }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.checkboxWrapper}>
      <Checkbox
        disabled={disabled}
        checked={checked}
        onClick={e => {
          e.stopPropagation()

          onClick()
        }}
      />
    </div>
  )
})

export const BatchTrackingCell = React.memo(
  ({ rowHandlers, id, trackingNumber, arrivalDate, disabled, disableMultilineForTrack }) => {
    const { classes: styles } = useDataGridCellsStyles()

    return (
      <div className={styles.batchTrackingWrapper}>
        <Field
          containerClasses={styles.batchTrackingContainer}
          label={t(TranslationKey['Track number'])}
          labelClasses={styles.batchTrackingTitle}
          inputComponent={
            <ChangeInputCommentCell
              disableMultiline={disableMultilineForTrack}
              disabled={disabled}
              id={id}
              rowsCount={1}
              maxLength={64}
              placeholder={t(TranslationKey['Enter track number'])}
              text={trackingNumber}
              onClickSubmit={rowHandlers?.onClickSaveTrackingNumber}
            />
          }
        />

        <Field
          containerClasses={styles.batchTrackingContainer}
          label={t(TranslationKey['Arrival date'])}
          labelClasses={styles.batchTrackingTitle}
          inputComponent={
            <DatePickerCell
              disabled={disabled}
              id={id}
              arrivalDate={arrivalDate}
              onClickSaveArrivalDate={rowHandlers?.onClickSaveArrivalDate}
            />
          }
        />
      </div>
    )
  },
)

export const DatePickerCell = React.memo(({ id, arrivalDate, onClickSaveArrivalDate, disabled }) => {
  const { classes: styles } = useDataGridCellsStyles()
  const [value, setValue] = useState(arrivalDate || '')

  useEffect(() => {
    setValue(arrivalDate)
  }, [arrivalDate])

  const [isShow, setShow] = useState(false)

  return (
    <div className={styles.arrivalDateWrapper}>
      <NewDatePicker
        disabled={disabled}
        className={styles.dateField}
        value={value}
        onChange={e => {
          setValue(e)
        }}
      />
      {!!onClickSaveArrivalDate && (
        <div className={styles.arrivalDateControlWrapper}>
          {isShow && arrivalDate !== value ? (
            <DoneIcon classes={{ root: cx(styles.doneIcon, styles.arrivalDateIcon) }} />
          ) : arrivalDate !== value ? (
            <div className={cx(styles.iconWrapper, styles.iconWrapperArrivalDate)}>
              <SaveIcon
                className={cx(styles.changeInputIcon, styles.arrivalDateIcon)}
                onClick={() => {
                  setShow(true)
                  setTimeout(() => {
                    setShow(false)
                  }, 2000)
                  onClickSaveArrivalDate(id, value)
                }}
              />
              <ClearIcon
                classes={{ root: cx(styles.clearIcon, styles.arrivalDateIcon) }}
                onClick={() => setValue(arrivalDate)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
})

export const MultilineTextCell = React.memo(
  ({
    text = '',
    noText,
    color,
    withTooltip,
    leftAlign,
    tooltipText,
    withLineBreaks,
    onClickText,
    oneLines,
    twoLines,
    threeLines,
    illuminationCell,
    customTextStyles,
    maxLength,
    customTextClass,
  }) => {
    const { classes: styles } = useDataGridCellsStyles()

    const maxTextLength = maxLength ?? MAX_LENGTH_TITLE
    const isValidTextLength = text?.length <= maxTextLength
    const oneLineText =
      isValidTextLength || oneLines ? text : getShortenStringIfLongerThanCount(text, maxLength ?? maxTextLength)
    const textForRender = threeLines || twoLines ? text : oneLineText
    const isTooltip = withTooltip || tooltipText || !isValidTextLength

    return (
      <div
        className={cx(styles.multilineTextWrapper, {
          [styles.illuminationCell]: illuminationCell && textForRender,
        })}
      >
        <Tooltip title={isTooltip ? tooltipText || text : ''}>
          <Typography
            className={cx(
              styles.multilineText,
              { [styles.multilineLeftAlignText]: leftAlign },
              { [styles.multilineLink]: onClickText && textForRender },
              { [styles.oneMultilineText]: oneLines },
              { [styles.twoMultilineText]: twoLines },
              { [styles.threeMultilineText]: threeLines },
              customTextClass,
            )}
            style={customTextStyles || (color && { color })}
            onClick={onClickText && onClickText}
          >
            {checkIsString(textForRender) && !withLineBreaks
              ? textForRender.replace(/\n/g, ' ')
              : textForRender || noText || '-'}
          </Typography>
        </Tooltip>
      </div>
    )
  },
)

export const VacantRequestPriceCell = React.memo(({ price, cashBackInPercent, AlignLeft }) => {
  const { classes: styles } = useDataGridCellsStyles()
  const discountedPrice = calcNumberMinusPercent(price, cashBackInPercent)

  return (
    <div className={cx(styles.priceCellWrapper, { [styles.priceCellWrapperAlignLeft]: AlignLeft })}>
      {discountedPrice && cashBackInPercent ? (
        <Typography
          className={cx(styles.priceText, {
            [styles.newPrice]: discountedPrice && cashBackInPercent,
          })}
        >
          {'$ ' + toFixed(discountedPrice, 2)}
        </Typography>
      ) : null}

      <Typography
        className={cx(styles.priceText, {
          [styles.oldPrice]: discountedPrice && cashBackInPercent,
        })}
      >
        {'$ ' + toFixed(price, 2)}
      </Typography>
    </div>
  )
})

export const OrdersIdsItemsCell = React.memo(({ value }) => {
  const { classes: styles } = useDataGridCellsStyles()
  const sortedValue = value?.split('item')
  const orderIds = sortedValue[0]
  const ordersItems = 'item' + sortedValue[1]

  return (
    <div className={styles.orderIdsItemsWrapper}>
      <MultilineTextCell text={orderIds} />
      <MultilineTextCell text={ordersItems} />
    </div>
  )
})

export const CommentOfSbCell = React.memo(({ productsInWarehouse }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.commentOfSbWrapper}>
      {productsInWarehouse?.length === 1 ? (
        <Tooltip title={productsInWarehouse[0].comment}>
          <div className={styles.multilineTextAlignLeftWrapper}>
            <Typography
              // disabled
              className={styles.multilineTextAlignLeft}
            >
              {(checkIsString(productsInWarehouse[0].comment) &&
                getShortenStringIfLongerThanCount(productsInWarehouse[0].comment, 147)) ||
                ''}
            </Typography>
          </div>
        </Tooltip>
      ) : (
        <div className={styles.commentOfSbSubWrapper}>
          {productsInWarehouse.some(el => el.comment) && (
            <Typography className={styles.commentOfSbSubMultiText}>{t(TranslationKey.Comments) + ':'}</Typography>
          )}
          {productsInWarehouse?.map((item, index) => (
            <Tooltip key={index} title={item.comment}>
              <Typography className={styles.commentOfSbSubMultiText}>{`${index}. ${
                item.comment ? item.comment : '-'
              }`}</Typography>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  )
})

export const MultilineTextAlignLeftCell = React.memo(({ text, withTooltip, isAsin, pointer, fourLines }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return withTooltip ? (
    <Tooltip title={text}>
      <div className={styles.multilineTextAlignLeftWrapper}>
        <Typography
          // disabled
          className={cx(
            styles.multilineTextAlignLeft,
            { [styles.cursorPointer]: pointer },
            { [styles.fourLinesTextAlignLeft]: fourLines },
          )}
        >
          {getShortenStringIfLongerThanCount(text, 150)}
        </Typography>
      </div>
    </Tooltip>
  ) : (
    <div className={styles.multilineTextAlignLeftWrapper}>
      {isAsin ? (
        <Typography className={cx(styles.multilineAsinTextAlignLeft, { [styles.fourLinesTextAlignLeft]: fourLines })}>
          {checkIsString(text) ? text.replace(/\n/g, ' ') : text}
        </Typography>
      ) : (
        <Typography
          className={cx(styles.multilineTextAlignLeft, {
            [styles.multilineTextAlignLeftSub]: isAsin,
            [styles.cursorPointer]: pointer,
            [styles.fourLinesTextAlignLeft]: fourLines,
          })}
        >
          {checkIsString(text) ? text.replace(/\n/g, ' ') : text}
        </Typography>
      )}
      {isAsin ? <CopyValue text={text} /> : null}
    </div>
  )
})

export const MultilineTextAlignLeftHeaderCell = React.memo(({ text }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.multilineTextAlignLeftHeaderWrapper}>
      <Typography className={styles.multilineTextAlignLeftHeader}>{text}</Typography>
    </div>
  )
})

export const MultilineTextHeaderCell = React.memo(
  ({
    text = '',
    withIcon,
    isShowIconOnHover,
    isFilterActive,
    component,
    textCenter,
    color,
    withTooltip,
    tooltipText,
  }) => {
    const { classes: styles } = useDataGridCellsStyles()

    return (
      <div
        className={cx(styles.multilineTextHeaderWrapper, {
          [styles.multilineTextHeaderCenter]: textCenter,
          [styles.multilineTextHeaderSpaceBetween]: component,
        })}
      >
        <Tooltip title={withTooltip ? tooltipText || text : ''}>
          <Typography className={styles.multilineHeaderText} style={color && { color }}>
            {text}
          </Typography>
        </Tooltip>
        {component}
        {withIcon || isShowIconOnHover || isFilterActive ? (
          <FilterAltOutlinedIcon
            className={cx(styles.headerIcon, {
              [styles.headerIconBlue]: isFilterActive,
            })}
          />
        ) : null}
      </div>
    )
  },
)

export const IconHeaderCell = React.memo(({ url }) => <img src={url} />)

export const PriorityAndChinaDeliverCell = React.memo(
  ({ priority, chinaDelivery, status, isRequest, onClickOpenInNewTab }) => {
    const { classes: styles } = useDataGridCellsStyles()
    const isPendingOrder = Number(status) <= Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])
    const isUrgent =
      Number(priority) === orderPriority.urgentPriority ||
      (isRequest && Number(priority) === requestPriority.urgentPriority)

    return (
      <div className={styles.priorityAndChinaDeliveryWrapper}>
        {onClickOpenInNewTab && <OpenInNewTabCell onClickOpenInNewTab={onClickOpenInNewTab} />}

        {isPendingOrder ? <ClockIcon className={styles.clockIcon} /> : null}

        <div className={styles.priorityAndChinaDelivery}>
          {isUrgent ? <FireIcon /> : null}

          {chinaDelivery === true ? <TruckIcon /> : null}
        </div>
      </div>
    )
  },
)

export const BoxesAndQuantity = React.memo(({ boxesData }) => {
  const { classes: styles } = useDataGridCellsStyles()
  if (Array.isArray(boxesData)) {
    const mergedBoxes = boxesData.map(item => `${item.boxAmount}x${item.itemAmount}`)
    const filteredBoxes = [...new Set(mergedBoxes)]
    const count = mergedBoxes.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1
      return acc
    }, {})
    const boxes = filteredBoxes.map((item, i) =>
      item ? (
        <Typography key={i} className={styles.boxesAndQuantityText}>
          {item}
          {count[item] !== 1 ? ` x ${count[item]}` : ''}
          {filteredBoxes.length > 1 && i + 1 !== filteredBoxes.length ? ',' : ''}
        </Typography>
      ) : null,
    )
    return <div className={styles.boxesAndQuantityWrapper}>{boxes}</div>
  } else {
    return (
      <div className={styles.boxesAndQuantityWrapper}>
        <Typography className={styles.boxesAndQuantityText}>
          {`${boxesData.amount}x${boxesData.items[0].amount}`}
        </Typography>
      </div>
    )
  }
})

export const MultilineStatusCell = React.memo(({ status, leftAlign }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <Typography className={cx(styles.statusMultilineText, { [styles.multilineLeftAlignText]: leftAlign })}>
        {status?.replace(/_/g, ' ')}
      </Typography>
    </div>
  )
})

export const TaskStatusCell = React.memo(({ status }) => {
  const { classes: styles } = useDataGridCellsStyles()

  const colorByStatus = () => {
    if ([TaskStatus.AT_PROCESS, TaskStatus.NEW].includes(status)) {
      return '#F3AF00'
    } else if ([TaskStatus.SOLVED].includes(status)) {
      return '#00B746'
    } else if ([TaskStatus.NOT_SOLVED].includes(status)) {
      return '#FF1616'
    } else {
      return '#black'
    }
  }

  const colorStatus = colorByStatus()

  return (
    <div className={styles.statusWrapper}>
      <Typography className={styles.orderStatusText} style={{ color: colorStatus }}>
        {TaskStatusTranslate(status)}
      </Typography>
    </div>
  )
})

export const RequestStatusCell = React.memo(({ status, isChat, styles }) => {
  const { style } = useDataGridCellsStyles()

  return (
    <div className={style.statusWrapper}>
      <Typography
        className={cx(style.statusText, { [style.statusTextChat]: isChat })}
        style={{ ...styles, color: colorByStatus(status) }}
      >
        {MyRequestStatusTranslate(status)}
      </Typography>
    </div>
  )
})

export const MultilineRequestStatusCell = React.memo(({ status, fontSize = '14px' }) => {
  const { classes: styles } = useDataGridCellsStyles()

  const colorByStatus = () => {
    if ([RequestStatus.DRAFT].includes(status)) {
      return SettingsModel.uiTheme === UiTheme.light ? '#007bff' : '#4CA1DE'
    } else if (
      [RequestStatus.CANCELED_BY_CREATOR, RequestStatus.FORBID_NEW_PROPOSALS, RequestStatus.CANCELED_BY_ADMIN].includes(
        status,
      )
    ) {
      return '#FF1616'
    } else if ([RequestStatus.IN_PROCESS, RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED].includes(status)) {
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
    <div className={styles.multilineTextWrapper}>
      <Typography className={styles.multilineStatusText} style={{ color: colorStatus, fontSize }}>
        {MyRequestStatusTranslate(status)}
      </Typography>
    </div>
  )
})

export const TaskTypeCell = React.memo(({ operationType }) => {
  const { classes: styles } = useDataGridCellsStyles()
  const renderTaskDescription = type => {
    switch (type) {
      case TaskOperationType.MERGE:
        return t(TranslationKey.Merge)
      case TaskOperationType.SPLIT:
        return t(TranslationKey.Split)
      case TaskOperationType.RECEIVE:
        return t(TranslationKey.Receive)
      case TaskOperationType.EDIT:
        return t(TranslationKey.Edit)
      case TaskOperationType.EDIT_BY_STOREKEEPER:
        return t(TranslationKey['Storekeeper edit'])
    }
  }

  return (
    <div className={styles.taskDescriptionScrollWrapper}>
      <p className={styles.operationTypeText}>{renderTaskDescription(operationType)}</p>
    </div>
  )
})

export const TaskDescriptionCell = React.memo(({ task }) => {
  const { classes: styles } = useDataGridCellsStyles()
  const renderProductImages = (product, key, box) => (
    <div key={key && key} className={styles.imgWrapper}>
      <img src={getAmazonImageUrl(product?.product.images[0])} alt="box" className={styles.taskDescriptionImg} />

      <div className={styles.taskDescriptionCountWrapper}>
        {box?.amount > 1 && <Typography className={styles.taskDescriptionSuperBox}>{`SB ${box.amount}`}</Typography>}

        <Typography className={styles.imgNum}>{product?.amount}</Typography>
      </div>
    </div>
  )

  const renderBox = (box, key, isOneBox) => (
    <div key={key && key} className={styles.imagesWrapper}>
      <div className={cx(styles.standartBoxWrapper)}>
        {box.items && box.items.map((product, productIndex) => renderProductImages(product, productIndex, box))}
      </div>
    </div>
  )

  const renderBlockProductsImages = (
    <div className={styles.blockProductsImagesWrapper}>
      {task.boxesBefore && (
        <div className={styles.sideWrapper}>
          {task.boxesBefore.map((box, index) =>
            index !== task.boxesBefore.length - 1 ? (
              <div key={index} className={styles.renderBoxWrapper}>
                {renderBox(box, index)}
                <PlusIcon className={styles.taskDescriptionIcon} />
              </div>
            ) : (
              renderBox(box, index, task.boxesBefore.length === 1)
            ),
          )}
        </div>
      )}

      <EqualIcon className={styles.taskDescriptionIcon} />

      <div className={styles.sideWrapper}>
        {task.boxes?.map((box, index) =>
          index !== task.boxes.length - 1 ? (
            <div key={index} className={styles.renderBoxWrapper}>
              {renderBox(box, index)}
              <PlusIcon className={styles.taskDescriptionIcon} />
            </div>
          ) : (
            renderBox(box, index, task.boxes.length === 1)
          ),
        )}
      </div>
    </div>
  )

  const taskMergeDescription = () => <div className={styles.taskTableCell}>{renderBlockProductsImages}</div>

  const taskDivideDescription = () => <div className={styles.taskTableCell}>{renderBlockProductsImages}</div>

  const taskReceiveDescription = () => (
    <div className={styles.blockProductsImagesWrapper}>
      <div className={styles.receiveOrEditWrapper}>
        <img src="/assets/icons/big-box.svg" className={styles.bigBoxSvg} alt="big-box" />
        <BoxArrow className={styles.boxArrowSvg} />

        <div className={styles.gridBoxesWrapper}>
          {task.boxesBefore.map((el, i) => (
            <div key={i} className={styles.gridBoxWrapper}>
              {el.amount > 1 && (
                <div className={styles.superboxWrapper}>
                  <CubeIcon className={styles.cubeIconSvg} />
                  <Typography className={styles.imgNum}>{el.amount > 1 && ` x${el.amount}`}</Typography>
                </div>
              )}
              <div className={styles.gridEditWrapper}>
                {el.items.map((product, productIndex) => renderProductImages(product, productIndex))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const taskEditDescription = () => (
    <div className={styles.blockProductsImagesWrapper}>
      <div className={styles.receiveOrEditWrapper}>
        <img src="/assets/icons/big-box.svg" className={styles.bigBoxSvg} />
        <EditIcon className={styles.boxEditSvg} />

        {task.boxesBefore[0]?.amount > 1 && (
          <div className={styles.superboxWrapper}>
            <CubeIcon className={styles.cubeIconSvg} />
            <Typography className={styles.imgNum}>
              {task.boxesBefore[0].amount > 1 && ` x${task.boxesBefore[0].amount}`}
            </Typography>
          </div>
        )}

        <div className={styles.gridEditWrapper}>
          {task.boxesBefore[0]?.items.map((product, productIndex) => renderProductImages(product, productIndex))}
        </div>
      </div>
    </div>
  )

  const renderTaskDescription = type => {
    switch (type) {
      case TaskOperationType.MERGE:
        return <>{taskMergeDescription()}</>
      case TaskOperationType.SPLIT:
        return <>{taskDivideDescription()}</>
      case TaskOperationType.RECEIVE:
        return <>{taskReceiveDescription()}</>
      case TaskOperationType.EDIT:
        return <>{taskEditDescription()}</>
      case TaskOperationType.EDIT_BY_STOREKEEPER:
        return <>{taskEditDescription()}</>
    }
  }

  return <div className={styles.taskDescriptionScrollWrapper}>{renderTaskDescription(task.operationType)}</div>
})

export const FourMonthesStockCell = React.memo(({ onClickSaveFourMonthsStock, rowId, fourMonthesStock, value }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.fourMonthesStockWrapper}>
      <Typography className={styles.fourMonthesStockLabel}>{`${t(
        TranslationKey['To repurchase'],
      )}: ${value}`}</Typography>

      <ChangeInputCell
        isInts
        rowId={rowId}
        text={fourMonthesStock}
        checkValue={value => value === 0 || value > 49}
        onClickSubmit={onClickSaveFourMonthsStock}
      />
    </div>
  )
})

export const CommentUsersCell = React.memo(({ handler, id, comment, maxLength }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.CommentUsersCellWrapper}>
      <ChangeInputCommentCell id={id} text={comment} maxLength={maxLength || 128} onClickSubmit={handler} />
    </div>
  )
})

export const ActualCostWithDelivery = React.memo(
  ({
    actualShippingCost,
    rowMemo,
    calculationMethod,
    isActualGreaterTheVolume,
    volumeWeightCoefficient,
    finalWeight,
  }) => {
    const { classes: styles } = useDataGridCellsStyles()

    const getTotalCost = item => {
      const { shippingCost, itemsQuantity, singleProductPrice } = getBatchParameters(
        rowMemo,
        item,
        volumeWeightCoefficient,
        finalWeight,
        calculationMethod,
        isActualGreaterTheVolume,
        actualShippingCost,
      )
      return itemsQuantity * singleProductPrice + shippingCost
    }

    return (
      <div className={styles.pricesWrapper}>
        {rowMemo.items.map((el, i) => (
          <Typography key={i} className={styles.multilineText}>
            {toFixedWithDollarSign(getTotalCost(el), 2) || '-'}
          </Typography>
        ))}
      </div>
    )
  },
)

export const ActualCostWithDeliveryPerUnit = React.memo(
  ({
    actualShippingCost,
    rowMemo,
    calculationMethod,
    isActualGreaterTheVolume,
    volumeWeightCoefficient,
    finalWeight,
  }) => {
    const { classes: styles } = useDataGridCellsStyles()
    const getTotalCost = item => {
      const { shippingCost, itemsQuantity, singleProductPrice } = getBatchParameters(
        rowMemo,
        item,
        volumeWeightCoefficient,
        finalWeight,
        calculationMethod,
        isActualGreaterTheVolume,
        actualShippingCost,
      )

      const fullBatchPrice = itemsQuantity * singleProductPrice + shippingCost

      return fullBatchPrice / itemsQuantity
    }

    return (
      <div className={styles.pricesWrapper}>
        {rowMemo.items.map((el, i) => (
          <Typography key={i} className={styles.multilineText}>
            {(!!actualShippingCost && toFixedWithDollarSign(getTotalCost(el), 2)) || '-'}
          </Typography>
        ))}
      </div>
    )
  },
)

export const ActiveBarcodeCell = React.memo(({ barCode }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <>
      {barCode ? (
        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(barCode)}>
          <Typography className={styles.noActivebarCode}>{barCode}</Typography>
        </Link>
      ) : (
        <Typography className={styles.noActivebarCode}>{'-'}</Typography>
      )}
    </>
  )
})

export const ToFixedWithKgSignCell = React.memo(({ value, fix, amount }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <Typography className={styles.multilineText}>
        {!value ? (value === 0 ? 0 : '-') : toFixedWithKg(value, fix)}
      </Typography>
    </div>
  )
})

export const SmallRowImageCell = React.memo(({ image }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.smallRowImgWrapper}>
      <img alt="" className={styles.img} src={getAmazonImageUrl(image)} />
    </div>
  )
})

export const ToFixedCell = React.memo(({ value, fix }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={styles.multilineText}>{!value ? (value === 0 ? 0 : '-') : toFixed(value, fix)}</p>
    </div>
  )
})

export const ToFixedWithDollarSignCell = React.memo(({ value, fix, leftAlign }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={cx(styles.multilineText, { [styles.multilineLeftAlignText]: leftAlign })}>
        {!value ? (value === 0 ? 0 : '-') : toFixedWithDollarSign(value, fix)}
      </p>
    </div>
  )
})

export const SuccessActionBtnCell = React.memo(({ onClickOkBtn, bTnText, tooltipText, isFirstRow }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <Button success tooltipInfoContent={isFirstRow && tooltipText} className={styles.actionBtn} onClick={onClickOkBtn}>
      {bTnText}
    </Button>
  )
})

export const NormalActionBtnCell = React.memo(({ onClickOkBtn, bTnText, tooltipText, disabled, isFirstRow }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <Button
      disabled={disabled}
      tooltipInfoContent={isFirstRow && tooltipText}
      variant="contained"
      color="primary"
      className={styles.actionBtn}
      onClick={onClickOkBtn}
    >
      {bTnText}
    </Button>
  )
})

export const WarehouseMyTasksBtnsCell = React.memo(({ handlers, isFirstRow, operationType, rowId, boxId }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.warehouseMyTasksBtnsWrapper}>
      <Button
        success
        tooltipInfoContent={isFirstRow && t(TranslationKey['Open a window to perform a task'])}
        className={styles.warehouseMyTasksSuccessBtn}
        onClick={() => handlers.onClickResolveBtn(rowId)}
      >
        {t(TranslationKey.Resolve)}
      </Button>

      {operationType !== TaskOperationType.RECEIVE && (
        <Button
          danger
          tooltipInfoContent={
            isFirstRow && t(TranslationKey['The task will be canceled, the box will keep its previous state'])
          }
          className={cx(styles.rowCancelBtn, styles.warehouseMyTasksCancelBtn)}
          onClick={() => {
            handlers.onClickCancelTask(boxId, rowId, operationType)
          }}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      )}
    </div>
  )
})

export const ClientTasksActionBtnsCell = React.memo(({ row, handlers }) => {
  const { classes: styles } = useDataGridCellsStyles()

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
      className={styles.infoBtn}
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
                className={styles.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]?._id, row._id, 'merge')}
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
                className={styles.cancelTaskBtn}
                onClick={() => handlers.onClickCancelBtn(row.boxes[0]?._id, row._id, 'split')}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            )}
          </React.Fragment>
        )
      case TaskOperationType.RECEIVE:
        return <React.Fragment>{renderTaskInfoBtn()}</React.Fragment>
      case TaskOperationType.EDIT_BY_STOREKEEPER:
      case TaskOperationType.EDIT:
        return (
          <React.Fragment>
            {renderTaskInfoBtn()}
            {checkIfTaskCouldBeCanceled(row.status) && (
              <Button
                danger
                className={styles.cancelTaskBtn}
                onClick={() => {
                  handlers.onClickCancelBtn(row.boxes?.at(0)?._id || row.boxesBefore?.at(0)?._id, row._id, 'edit')
                }}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            )}
          </React.Fragment>
        )
    }
  }

  return <div className={styles.clientTasksActionBtnsWrapper}>{renderHistoryItem()}</div>
})

export const ClientNotificationsBtnsCell = React.memo(({ row, handlers, disabled }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.notificationBtnsWrapper}>
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        className={styles.notificationBtn}
        onClick={() => handlers.onTriggerOpenConfirmModal(row)}
      >
        {t(TranslationKey.Confirm)}
      </Button>
      <Button
        danger
        disabled={disabled}
        className={styles.notificationBtn}
        onClick={() => {
          handlers.onTriggerOpenRejectModal(row)
        }}
      >
        {t(TranslationKey.Reject)}
      </Button>
    </div>
  )
})

export const ProductMyRequestsBtnsCell = React.memo(({ rowId, row, handlers }) => {
  const { classes: styles } = useDataGridCellsStyles()

  const disableOpenResultBtn =
    !row.countProposalsByStatuses.acceptedProposals &&
    !row.countProposalsByStatuses.atWorkProposals &&
    !row.countProposalsByStatuses.verifyingProposals

  return (
    <div className={styles.productMyRequestsBtnsWrapper}>
      <Button
        variant="contained"
        color="primary"
        className={styles.productMyRequestsBtn}
        onClick={() => handlers.onClickOpenRequest(rowId)}
      >
        {t(TranslationKey['Open a request'])}
      </Button>
      <Button
        success
        disabled={disableOpenResultBtn}
        className={styles.productMyRequestsBtn}
        onClick={() => handlers.onClickOpenResult(rowId)}
      >
        {t(TranslationKey['Open result'])}
      </Button>
    </div>
  )
})

export const ScrollingCell = React.memo(({ value, fontSize }) => {
  const { classes: styles } = useDataGridCellsStyles()
  return (
    <p style={{ fontSize }} className={styles.scrollingValue}>
      {value || '-'}
    </p>
  )
})

export const ManyItemsPriceCell = React.memo(({ params, withoutSku, withQuantity }) => {
  const { classes: styles } = useDataGridCellsStyles()

  const cell = params?.items?.map((el, itemIndex) => (
    <OrderCell
      key={itemIndex}
      withoutSku={withoutSku}
      withQuantity={withQuantity}
      box={params}
      product={el?.product}
      superbox={params.amount > 1 && params.amount}
      superboxProductAmount={params}
      itemAmount={el.amount}
    />
  ))

  return <div className={styles.ManyItemsPriceCellMainWrapper}>{cell}</div>
})

export const PricePerUnitCell = React.memo(({ item }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.pricesWrapper}>
      {item.items.map((el, i) => (
        <p key={i} className={styles.multilineText}>
          {toFixedWithDollarSign(el.order.totalPrice / el.order.amount, 2)}
        </p>
      ))}
    </div>
  )
})

export const FinalPricePerUnitCell = React.memo(({ box, boxFinalWeight }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.pricesWrapper}>
      {box.items.map((el, i) => (
        <Typography key={i} className={styles.multilineText}>
          {toFixedWithDollarSign(
            el.order.totalPrice / el.order.amount + (boxFinalWeight * getTariffRateForBoxOrOrder(box)) / el.amount,

            2,
          )}
        </Typography>
      ))}
    </div>
  )
})

export const CopyAndEditLinkCell = React.memo(({ link, isEdit, onChangeText }) => {
  const { classes: styles } = useDataGridCellsStyles()

  const [value, setValue] = useState(link)

  useEffect(() => {
    setValue(link)
  }, [link])

  return (
    <>
      {isEdit ? (
        <div className={styles.ChangeInputCommentCellWrapper}>
          <Input
            autoFocus={false}
            inputProps={256}
            placeholder={t(TranslationKey.Comment)}
            className={styles.changeInputComment}
            classes={{ input: styles.changeInputComment }}
            value={value}
            onChange={e => {
              setValue(e.target.value)

              if (onChangeText) {
                onChangeText('sourceFile')(e.target.value)
              }
            }}
            onKeyDown={event => {
              event.stopPropagation()
            }}
          />
        </div>
      ) : value ? (
        <div className={styles.CopyLinkWrapper}>
          <Link target="_blank" rel="noopener" className={styles.linkText} href={checkAndMakeAbsoluteUrl(value)}>
            <Typography className={styles.linkTextClass}>{value}</Typography>
          </Link>

          <CopyValue text={value} />
        </div>
      ) : (
        <Typography className={styles.missingLinkText}>{t(TranslationKey.Missing)}</Typography>
      )}
    </>
  )
})

export const EditOrRemoveBtnsCell = React.memo(
  ({ row, handlers, isSubUsersTable, disableActionBtn, tooltipFirstButton, tooltipSecondButton, isFirstRow }) => {
    const { classes: styles } = useDataGridCellsStyles()

    return (
      <div className={styles.editOrRemoveBtnsCell}>
        <Button
          tooltipInfoContent={isFirstRow && tooltipFirstButton}
          variant="contained"
          color="primary"
          disabled={disableActionBtn}
          className={[styles.rowCancelBtn, styles.addPermissionBtn]}
          onClick={() => handlers.onClickEditBtn(row)}
        >
          {isSubUsersTable ? t(TranslationKey['Assign permissions']) : t(TranslationKey.Edit)}
        </Button>

        <Button
          danger
          tooltipInfoContent={isFirstRow && tooltipSecondButton}
          disabled={disableActionBtn}
          className={styles.rowCancelBtn}
          onClick={() => {
            handlers.onClickRemoveBtn(row)
          }}
        >
          {t(TranslationKey.Remove)}
        </Button>
      </div>
    )
  },
)

export const BatchBoxesCell = React.memo(({ boxes, productViewMode }) => {
  const { classes: styles } = useDataGridCellsStyles()

  const isAbbreviatedView = productViewMode === tableProductViewMode.ABBREVIATED

  const simpleBoxes = boxes.map(box => ({
    amount: box.amount,
    deliveryTotalPrice: box.deliveryTotalPrice,
    deliveryTotalPriceChanged: box.deliveryTotalPriceChanged,
    items: box.items.map(item => ({
      image: item.product.images[0],
      amazonTitle: item.product.amazonTitle,
      asin: item.product.asin,
      amount: item.amount,
    })),
    status: box.status,
  }))

  const object = {}
  simpleBoxes.forEach(box => {
    const boxStr = JSON.stringify(
      getObjectFilteredByKeyArrayBlackList(box, ['deliveryTotalPrice', 'deliveryTotalPriceChanged']),
    )

    const extraPay = box.deliveryTotalPriceChanged - box.deliveryTotalPrice
    if (extraPay > 0) {
      object[`${boxStr}${extraPay}`] = object[`${boxStr}${extraPay}`] ? [...object[`${boxStr}${extraPay}`], box] : [box]
    } else {
      object[boxStr] = object[boxStr] ? [...object[boxStr], box] : [box]
    }
  })
  const filteredBoxes = Object.values(object)

  return (
    <div
      className={cx(styles.batchBoxesWrapper, {
        [styles.withScrollBatchBoxesWrapper]: isAbbreviatedView,
      })}
    >
      {filteredBoxes.map((boxes, i) => (
        <Fragment key={i}>
          {isAbbreviatedView ? (
            <ProductInfoAbbreviated box={boxes[0]} boxesLength={boxes.length} />
          ) : (
            <ProductInfoExtended box={boxes[0]} boxesLength={boxes.length} />
          )}
        </Fragment>
      ))}
    </div>
  )
})

export const TrashCell = React.memo(({ onClick, tooltipText, isFirstRow }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <Button tooltipInfoContent={isFirstRow && tooltipText} className={styles.trashWrapper}>
      <img className={styles.trashImg} src="/assets/icons/trash.svg" alt="" onClick={onClick} />
    </Button>
  )
})

export const WarehouseBoxesBtnsCell = React.memo(({ row, handlers }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.warehouseBoxesBtnsWrapper}>
      {row.status !== BoxStatus.REQUESTED_SEND_TO_BATCH && !row.batchId && (
        <Typography>{t(TranslationKey['Not ready to ship'])}</Typography>
      )}

      {row.batchId &&
        row.status !== BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE &&
        row.status !== BoxStatus.NEW && (
          <Button
            tooltipAttentionContent={
              row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF &&
              t(TranslationKey['The tariff is invalid or has been removed!'])
            }
            tooltipInfoContent={t(TranslationKey['Move a box from the current batch to another'])}
            disabled={row.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF || row.isDraft}
            className={styles.warehouseBoxesBtn}
            onClick={() => handlers.moveBox(row)}
          >
            {t(TranslationKey['Move box'])}
          </Button>
        )}

      {row.status === BoxStatus.REQUESTED_SEND_TO_BATCH && !row.batchId && (
        <Button
          success
          disabled={row.isDraft}
          tooltipInfoContent={t(TranslationKey['Add a box to a new or existing batch'])}
          className={styles.warehouseBoxesBtn}
          onClick={() => handlers.moveBox(row)}
        >
          {t(TranslationKey['Add to batch'])}
        </Button>
      )}
    </div>
  )
})

export const ShopsReportBtnsCell = React.memo(({ value, onClickSeeMore }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.shopsReportBtnsWrapper}>
      <a download target="_blank" rel="noreferrer" href={value} className={styles.downloadLink}>
        {t(TranslationKey.download)}
      </a>
      <Button className={styles.copyImgButton}>
        <CopyValue text={value} />
      </Button>

      <Button variant="contained" color="primary" className={styles.viewBtn} onClick={onClickSeeMore}>
        {t(TranslationKey.View)}
      </Button>
    </div>
  )
})

export const DownloadAndCopyBtnsCell = React.memo(({ value, isFirstRow }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <>
      {value ? (
        <div className={styles.shopsReportBtnsWrapper}>
          <div className={cx({ [styles.tooltipWrapperMargin]: isFirstRow })}>
            <Text tooltipInfoContent={isFirstRow && t(TranslationKey['Download the file to your device'])}>
              <a
                download
                target="_blank"
                rel="noreferrer"
                href={value}
                className={styles.downloadLink}
                onClick={e => e.stopPropagation()}
              >
                {t(TranslationKey.View)}
              </a>
            </Text>
          </div>

          <Button
            tooltipInfoContent={isFirstRow && t(TranslationKey['Copy the link'])}
            className={styles.copyImgButton}
          >
            <CopyValue text={value} />
          </Button>
        </div>
      ) : (
        <Typography>{'-'}</Typography>
      )}
    </>
  )
})

export const ShortBoxDimensions = React.memo(({ box, volumeWeightCoefficient, unitsOption }) => {
  const { classes: styles } = useDataGridCellsStyles()
  const finalWeight = calcFinalWeightForBox(box, volumeWeightCoefficient)

  const lengthConversion = getConversion(unitsOption, inchesCoefficient)
  const weightConversion = getConversion(unitsOption, poundsWeightCoefficient)
  const totalWeightConversion = getConversion(unitsOption, 12 / poundsWeightCoefficient, 12)
  const weightSizesType = getWeightSizesType(unitsOption)

  return (
    <div className={styles.shortBoxDimensionsWrapper}>
      <Typography className={styles.shortBoxDimensionsText}>{`${toFixed(
        box.lengthCmWarehouse / lengthConversion,
        2,
      )}x${toFixed(box.widthCmWarehouse / lengthConversion, 2)}x${toFixed(
        box.heightCmWarehouse / lengthConversion,
        2,
      )}`}</Typography>

      <Typography className={styles.shortBoxDimensionsText}>{`${t(TranslationKey.Weight)}: ${toFixed(
        box.weighGrossKgWarehouse / weightConversion,
        2,
      )} ${weightSizesType}`}</Typography>

      <Typography className={styles.shortBoxDimensionsText}>{`${t(TranslationKey['Volume weight'])}: ${toFixed(
        calcVolumeWeightForBox(box, volumeWeightCoefficient) / weightConversion,
        2,
      )} ${weightSizesType}`}</Typography>

      <Typography
        className={cx(styles.shortBoxDimensionsText, {
          [styles.alertText]: !box.isDraft && finalWeight / weightConversion < totalWeightConversion,
        })}
      >{`${t(TranslationKey['Final weight'])}: ${toFixed(
        finalWeight / weightConversion,
        2,
      )} ${weightSizesType}!`}</Typography>

      {!box.isDraft && finalWeight / weightConversion < totalWeightConversion && (
        <span className={styles.alertText}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
          totalWeightConversion,
          2,
        )} ${weightSizesType}!`}</span>
      )}

      {box.amount > 1 && (
        <Typography className={styles.shortBoxDimensionsText}>{`${t(TranslationKey['Total final weight'])}: ${toFixed(
          (calcFinalWeightForBox(box, volumeWeightCoefficient) / weightConversion) * box.amount,
          2,
        )} ${weightSizesType}`}</Typography>
      )}
    </div>
  )
})

export const RedFlagsCell = React.memo(({ flags }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.redFlags}>
      <RedFlags activeFlags={flags} />
    </div>
  )
})

export const TagsCell = React.memo(({ tags }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.tags}>
      {tags?.map((el, index) => {
        const createTagText = `#${el.title}`
        const isValidTextLength = createTagText?.length <= MAX_LENGTH_TITLE

        return (
          <React.Fragment key={el._id}>
            <Tooltip title={!isValidTextLength ? createTagText : ''}>
              <p className={styles.tagItem}>
                {createTagText}
                {index !== tags.length - 1 && ', '}
              </p>
            </Tooltip>
          </React.Fragment>
        )
      })}
    </div>
  )
})

export const OrderIdAndAmountCountCell = React.memo(({ orderId, amount, onClickOrderId }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.orderIdAndAmountCount}>
      <p className={styles.multilineLink} onClick={onClickOrderId}>
        {orderId}
      </p>
      {amount >= 1 && (
        <div className={styles.amountWithClocks}>
          <WatchLaterSharpIcon /> {amount}
        </div>
      )}
    </div>
  )
})

export const FormedCell = React.memo(({ sub, onChangeIsFormedInBox, params }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.formedCell}>
      <CheckboxCell
        disabled={params.row.originalData.isDraft || params.row.status !== BoxStatus.IN_STOCK}
        checked={params.value}
        onClick={onChangeIsFormedInBox}
      />
      {sub?.name && <MultilineTextCell text={sub.name} />}
    </div>
  )
})

export const SelectRowCell = React.memo(
  ({ checkboxComponent, showVariationButton, isParentProduct, onClickShareIcon, onClickVariationButton }) => {
    const { classes: styles } = useDataGridCellsStyles()

    return (
      <div className={styles.selectRowCellWrapper}>
        {checkboxComponent}

        <div className={styles.buttonsWrapper}>
          <OpenInNewTabCell onClickOpenInNewTab={onClickShareIcon} />

          {showVariationButton && (
            <Tooltip
              arrow
              title={t(TranslationKey['Product variations'])}
              placement="top"
              classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
            >
              <div className={styles.iconWrapper} onClick={onClickVariationButton}>
                {isParentProduct ? (
                  <ParentProductIcon className={styles.shareLinkIcon} />
                ) : (
                  <VariationProductIcon className={styles.shareLinkIcon} />
                )}
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    )
  },
)

export const ProductInfoExtended = React.memo(({ box, boxesLength }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.batchProductsWrapper}>
      {boxesLength > 1 ? (
        <Typography className={styles.batchProductsBoxesLength}>{`x${boxesLength}`}</Typography>
      ) : null}

      <div className={styles.batchProductsSubWrapper}>
        {box.items.map((item, itemIndex) => (
          <div key={itemIndex} className={styles.order}>
            <img alt="" src={getAmazonImageUrl(item.image)} className={styles.orderImg} />
            <div className={styles.batchProductInfoWrapper}>
              <Typography className={styles.batchProductTitle}>{item.amazonTitle}</Typography>
              <div className={styles.boxInfoWrapper}>
                <Typography className={styles.asinText}>{t(TranslationKey.ASIN) + ': '}</Typography>
                <AsinOrSkuLink withCopyValue asin={item.asin} />
              </div>

              {box.deliveryTotalPriceChanged - box.deliveryTotalPrice > 0 && itemIndex === 0 && (
                <Typography className={styles.productInfoText}>
                  <span className={styles.needPay}>{`${t(
                    TranslationKey['Extra payment required!'],
                  )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
                </Typography>
              )}

              <div className={styles.amountBoxesWrapper}>
                <Typography className={styles.amountBoxesText}>{`x ${item.amount}`}</Typography>
                {box.amount > 1 && (
                  <Typography className={styles.amountBoxesText}>{`Superbox x ${box.amount}`}</Typography>
                )}
              </div>
            </div>
          </div>
        ))}

        {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
          <span className={styles.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
        )}
      </div>
    </div>
  )
})

export const ProductInfoAbbreviated = React.memo(({ box, boxesLength }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div
      className={cx(styles.abbreviatedBatchProductsWrapper, {
        [styles.abbreviatedWrapperDivider]: boxesLength > 1 && box.items.length > 1,
      })}
    >
      <div className={cx(styles.abbreviatedBatchProductsSubWrapper)}>
        {boxesLength > 1 && <Typography className={styles.amountBoxesText}>{`x${boxesLength}`}</Typography>}

        <div className={styles.abbreviatedBatchProductInfoMainWrapper}>
          {box.items.map((item, itemIndex) => (
            <>
              <div key={itemIndex} className={styles.abbreviatedBatchProductInfoWrapper}>
                <img alt="" src={getAmazonImageUrl(item.image)} className={styles.abbreviatedImg} />

                <div className={styles.div}>
                  <Typography className={styles.abbreviatedTitle}>{item.amazonTitle}</Typography>

                  {box.amount > 1 && <Typography className={styles.amountBoxesText}>{`SBX${box.amount}`}</Typography>}
                </div>

                <div className={styles.boxInfoWrapper}>
                  <Typography className={styles.asinText}>{t(TranslationKey.ASIN) + ': '}</Typography>
                  <AsinOrSkuLink withCopyValue asin={item.asin} />
                </div>

                <Typography className={styles.amountBoxesText}>{`X${item.amount}`}</Typography>
              </div>
              {box.deliveryTotalPriceChanged - box.deliveryTotalPrice > 0 && itemIndex === 0 && (
                <Typography className={styles.productInfoText}>
                  <span className={styles.needPay}>{`${t(
                    TranslationKey['Extra payment required!'],
                  )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
                </Typography>
              )}
            </>
          ))}
        </div>
      </div>

      {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
        <span className={styles.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
      )}
    </div>
  )
})

export const IdeaActions = React.memo(props => {
  const { classes: styles } = useDataGridCellsStyles()
  const { onClickReject, onClickToCheck } = props

  return (
    <div className={styles.ideaActions}>
      <Button onClick={onClickToCheck}>{t(TranslationKey['To check'])}</Button>
      <Button danger onClick={onClickReject}>
        {t(TranslationKey.Reject)}
      </Button>
    </div>
  )
})

export const IdeaRequests = React.memo(props => {
  const {
    onFinishedOnly,
    onClickCreateRequest,
    onClickLinkRequest,
    onClickResultButton,
    onClickRequestId,
    onClickUnbindButton,
    withoutControls,
    row,
  } = props
  const { classes: styles } = useDataGridCellsStyles()

  const [requests, setRequests] = useState([])

  useEffect(() => {
    if (onFinishedOnly) {
      setRequests([...(row?.requestsOnFinished || [])])
    } else {
      setRequests([...(row?.requestsOnCheck || []), ...(row?.requestsOnFinished || [])])
    }
  }, [row?.requestsOnCheck, row?.requestsOnFinished])

  return (
    <div className={styles.ideaRequestsWrapper}>
      {requests?.map((request, requestIndex) => {
        return (
          <IdeaRequestCard
            key={requestIndex}
            requestType={request.typeTask}
            requestId={request.humanFriendlyId}
            requestStatus={request.status}
            executor={request.executor}
            proposals={request.proposals}
            disableSeeResultButton={
              !request?.proposals?.some(proposal => checkIsValidProposalStatusToShowResoult(proposal.status))
            }
            onClickRequestId={() => onClickRequestId(request._id)}
            onClickResultButton={() => onClickResultButton(request)}
            onClickUnbindButton={() => onClickUnbindButton(request._id)}
          />
        )
      })}
      {!withoutControls && (
        <div className={styles.ideaRequestsControls}>
          <Button success onClick={onClickCreateRequest}>
            <PlusIcon /> {t(TranslationKey['Create a request'])}
          </Button>
          <Button onClick={onClickLinkRequest}>{t(TranslationKey['Link request'])}</Button>
        </div>
      )}
    </div>
  )
})

export const OnCheckingIdeaActions = React.memo(props => {
  const { onClickAccept, onClickReject, isAcceptDisabled } = props
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.ideaActions}>
      <Button success disabled={isAcceptDisabled} onClick={onClickAccept}>
        {t(TranslationKey.Accept)}
      </Button>
      <Button danger onClick={onClickReject}>
        {t(TranslationKey.Reject)}
      </Button>
    </div>
  )
})

export const IdeaSupplier = React.memo(props => {
  const { onClickAddSupplier, suppliers } = props
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.ideaSupplier}>
      {!!suppliers.length && <Typography>{suppliers[0].name}</Typography>}
      {!suppliers.length && (
        <Button success className={styles.buttonWithIcon} onClick={onClickAddSupplier}>
          <PlusIcon /> {t(TranslationKey.Add)}
        </Button>
      )}
    </div>
  )
})

export const IdeaProduct = React.memo(props => {
  const { onClickCreateCard, rowData } = props
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.ideaWrapper}>
      {!rowData.childProduct && rowData.variation && (
        <Button
          success
          small
          className={styles.ideaProductActionButton}
          onClick={() => onClickCreateCard(rowData.originalData)}
        >
          {t(TranslationKey['Create a product card'])}
        </Button>
      )}

      {!!rowData.childProduct && (
        <ProductAsinCell
          withoutImage
          amazonTitle={rowData.childProduct?.amazonTitle}
          asin={rowData.childProduct?.asin}
          skusByClient={rowData.childProduct?.skusByClient?.slice()[0]}
        />
      )}
    </div>
  )
})

export const CreateCardIdeaActions = React.memo(props => {
  const { rowHandlers, row } = props
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <Button
      small
      success
      disabled={!row.childProduct && row.variation}
      onClick={() => rowHandlers.onClickAcceptOnCreatingProduct(row._id)}
    >
      {t(TranslationKey.Accept)}
    </Button>
  )
})

export const AddAsinIdeaActions = React.memo(props => {
  const { rowHandlers, row } = props

  return (
    <Box display={'flex'}>
      <Button
        success
        small
        disabled={
          row.originalData.variation
            ? !row?.originalData?.childProduct?.barCode
            : !row?.originalData?.parentProduct?.barCode
        }
        onClick={() => rowHandlers.onClickAcceptOnAddingAsin(row._id)}
      >
        {t(TranslationKey.Accept)}
      </Button>
    </Box>
  )
})

export const RealizedIdeaActions = React.memo(props => {
  const { rowHandlers, row } = props

  return (
    <>
      {(row.variation ? !row.childProduct?.order : !row.parentProduct.order) ? (
        <Button
          small
          success
          onClick={() => rowHandlers.onClickToOrder(row.childProduct?._id || row.parentProduct?._id)}
        >
          {t(TranslationKey['To order'])}
        </Button>
      ) : (
        <Text>{t(TranslationKey.Ordered)}</Text>
      )}
    </>
  )
})

export const ClosedIdeaActions = React.memo(props => {
  const { rowHandlers, row } = props

  return (
    <Box display="flex" gap="20px">
      <Button
        small
        success
        disabled={ideaStatusByKey[ideaStatus.CLOSED] === row.status}
        onClick={() => rowHandlers.onClickRestore(row._id)}
      >
        {t(TranslationKey.Restore)}
      </Button>
      <Button
        small
        danger
        disabled={ideaStatusByKey[ideaStatus.CLOSED] === row.status}
        onClick={() => rowHandlers.onClickClose(row._id)}
      >
        {t(TranslationKey.Close)}
      </Button>
    </Box>
  )
})

export const AllIdeasActions = React.memo(props => {
  const { row, rowHandlers } = props
  const status = row.status

  return (
    <>
      {ideaStatusGroups[ideaStatusGroupsNames.NEW].includes(status) && (
        <IdeaActions
          onClickToCheck={() => rowHandlers.onClickToCheck(row._id)}
          onClickReject={() => rowHandlers.onClickReject(row._id)}
        />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.ON_CHECKING].includes(status) && (
        <OnCheckingIdeaActions
          onClickAccept={() => rowHandlers.onClickAcceptOnCheckingStatus(row._id)}
          onClickReject={() => rowHandlers.onClickReject(row._id)}
        />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.SEARCH_SUPPLIERS].includes(status) && (
        <OnCheckingIdeaActions
          isAcceptDisabled={row.status !== ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]}
          onClickAccept={() => rowHandlers.onClickAcceptOnSuppliersSearch(row._id)}
          onClickReject={() => rowHandlers.onClickReject(row._id)}
        />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.CREATE_CARD].includes(status) && (
        <CreateCardIdeaActions row={row} rowHandlers={rowHandlers} />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.ADD_ASIN].includes(status) && (
        <AddAsinIdeaActions rowHandlers={rowHandlers} row={row} />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.REALIZED].includes(status) && (
        <RealizedIdeaActions rowHandlers={rowHandlers} row={row} />
      )}
      {ideaStatusGroups[ideaStatusGroupsNames.CLOSED].includes(status) && (
        <ClosedIdeaActions row={row} rowHandlers={rowHandlers} />
      )}
    </>
  )
})

export const TimeFromSeconds = React.memo(props => {
  const { seconds, color } = props
  const { classes: styles } = useDataGridCellsStyles()

  const time = secondsToTime(seconds)

  return seconds >= 60 ? (
    <div className={styles.secondsTimeWrapper} style={color && { color }}>
      {time.days > 0 && (
        <Typography>
          {time.days} {t(TranslationKey.days)}
        </Typography>
      )}

      {time.hours > 0 && (
        <Typography>
          {time.hours} {t(TranslationKey.hour)}
        </Typography>
      )}

      {time.minutes > 0 && (
        <Typography>
          {time.minutes} {t(TranslationKey.minute)}
        </Typography>
      )}
    </div>
  ) : (
    <MultilineTextCell color={color} text={time.seconds > 0 ? `${time.seconds} ${t(TranslationKey.sec)}` : 0} />
  )
})

export const OpenInNewTabCell = React.memo(({ onClickOpenInNewTab, href }) => {
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <Tooltip
      arrow
      title={t(TranslationKey['Open in a new tab'])}
      placement="top"
      classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
    >
      <div
        className={styles.iconWrapper}
        onClick={event => {
          event.stopPropagation()
          if (!href) {
            onClickOpenInNewTab()
          }
        }}
      >
        {href ? (
          <NavLink to={href || ''} target="_blank">
            <ShareLinkIcon className={styles.shareLinkIcon} />
          </NavLink>
        ) : (
          <ShareLinkIcon className={styles.shareLinkIcon} />
        )}
      </div>
    </Tooltip>
  )
})

const OrderNotificationMessage = React.memo(props => {
  const { navigateToHandler, notification } = props
  const { classes: styles } = useDataGridCellsStyles()

  const onClickOrderId = () => {
    navigateToHandler(notification, NotificationType.Order)
  }

  const isVacOrders = !!notification?.vacOrders?.length
  const isNeedConfirmOrders = !!notification?.needConfirmOrders?.length

  return (
    <p>
      {isNeedConfirmOrders && (
        <>
          {`${t(TranslationKey.Order)} `}
          <a className={styles.notificationId} onClick={onClickOrderId}>
            {notification?.needConfirmOrders?.[0]?.id}
          </a>
          {` ${t(TranslationKey['needs to be confirmed'])}`}
        </>
      )}

      {isVacOrders && (
        <>
          {`${t(TranslationKey['New order available'])} `}
          <a className={styles.notificationId} onClick={onClickOrderId}>
            {notification?.vacOrders?.[0]?.id}
          </a>
        </>
      )}

      {!isVacOrders && !isNeedConfirmOrders && (
        <>
          {`${t(TranslationKey['Order redemption deadline'])} `}
          <a className={styles.notificationId} onClick={onClickOrderId}>
            {notification?.id}
          </a>
          {` ${t(TranslationKey.expires)} ${formatNormDateTime(notification?.deadline)}`}
        </>
      )}
    </p>
  )
})

const BoxNotificationMessage = React.memo(props => {
  const { navigateToHandler, notification } = props
  const { classes: styles } = useDataGridCellsStyles()
  const history = useHistory()

  const goToBox = boxId => {
    history.push(`/client/warehouse/in-stock?search-text=${boxId}`)
  }

  return (
    <p>
      {`${t(TranslationKey.Box)} № `}
      <a className={styles.notificationId} onClick={() => goToBox(notification?.humanFriendlyId)}>
        {notification?.humanFriendlyId}
      </a>{' '}
      {t(TranslationKey['accepted in stock'])}
    </p>
  )
})

const RequestNotificationMessage = React.memo(props => {
  const { navigateToHandler, notification } = props
  const { classes: styles } = useDataGridCellsStyles()
  const history = useHistory()
  const isStatusChanged = !!notification?.status
  const isDeadlineExpires = !!notification?.timeoutAt

  const getUrlToRequest = id => {
    if (UserRoleCodeMap[UserModel.userInfo.role] === UserRole.FREELANCER) {
      return `/${
        UserRoleCodeMapForRoutes[UserModel.userInfo.role]
      }/freelance/my-proposals/custom-search-request?request-id=${id}`
    } else {
      return `/${
        UserRoleCodeMapForRoutes[UserModel.userInfo.role]
      }/freelance/my-requests/custom-request?request-id=${id}`
    }
  }

  return (
    <p>
      {isStatusChanged && !isDeadlineExpires && (
        <>
          {t(TranslationKey['Status of the proposal by request '])}{' '}
          <NavLink to={getUrlToRequest(notification?.request?._id)} className={styles.notificationId} target="_blank">
            {`"${notification?.request?.humanFriendlyId}" `}
          </NavLink>
          {t(TranslationKey['changed to'])}
          <span style={{ color: RequestProposalStatusColor(notification?.status) }}>
            {' '}
            {RequestProposalStatusTranslate(notification?.status)}
          </span>
        </>
      )}

      {isDeadlineExpires && (
        <>
          {t(TranslationKey['Deadline for request'])}{' '}
          <NavLink
            to={getUrlToRequest(notification?.request?._id || notification?._id)}
            className={styles.notificationId}
            target="_blank"
          >
            {`"${notification?.humanFriendlyId || notification?.request?.humanFriendlyId}" `}
          </NavLink>
          {t(TranslationKey.expires)} {formatNormDateTime(notification?.timeoutAt)}
        </>
      )}
    </p>
  )
})

const IdeaNotificationMessage = React.memo(props => {
  const { navigateToHandler, notification } = props
  const { classes: styles } = useDataGridCellsStyles()

  const getIdeaMessageTextToRender = () => {
    switch (notification.type) {
      case NotificationIdeaStatus.Create:
        return t(TranslationKey['created the idea'])

      case NotificationIdeaStatus.StatusChange:
        return t(TranslationKey['changed the status of the idea'])

      case NotificationIdeaStatus.Patch:
        return t(TranslationKey['updated the data on the idea of'])
    }
  }

  return (
    <p>
      <a className={styles.notificationId} onClick={() => navigateToHandler(notification, 'user')}>
        {notification?.creator?.name}
      </a>
      {` ${getIdeaMessageTextToRender()} `}
      <a className={styles.notificationId} onClick={() => navigateToHandler(notification, NotificationType.Idea)}>
        {notification?.productName}
      </a>
      {notification.type === NotificationIdeaStatus.StatusChange && (
        <>
          {` ${t(TranslationKey.to)} `}
          <span style={{ color: colorByIdeaStatus(ideaStatusByCode[notification.status]) }}>
            {ideaStatusTranslate(ideaStatusByCode[notification.status])}
          </span>
        </>
      )}
    </p>
  )
})

export const NotificationMessage = React.memo(props => {
  const { notificationType, notification, navigateToHandler } = props

  return (
    <>
      {notificationType === NotificationType.Order && (
        <OrderNotificationMessage navigateToHandler={navigateToHandler} notification={notification} />
      )}

      {notificationType === NotificationType.Box && (
        <BoxNotificationMessage navigateToHandler={navigateToHandler} notification={notification} />
      )}

      {notificationType === NotificationType.Idea && (
        <IdeaNotificationMessage navigateToHandler={navigateToHandler} notification={notification} />
      )}

      {[NotificationType.Request, NotificationType.Proposal].includes(notificationType) && (
        <RequestNotificationMessage navigateToHandler={navigateToHandler} notification={notification} />
      )}
    </>
  )
})

export const MultipleAsinCell = React.memo(props => {
  const { asinList } = props
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.multipleAsinWrapper}>
      {asinList.map((asin, index) => (
        <AsinOrSkuLink key={index} withCopyValue asin={asin} />
      ))}
    </div>
  )
})

export const FreelancerMyProposalsActions = React.memo(props => {
  const { status, onClickDeleteButton, onClickEditButton, onClickResultButton } = props
  const { classes: styles } = useDataGridCellsStyles()

  return (
    <div className={styles.proposalsActions}>
      <Button
        danger
        disabled={disabledCancelBtnStatuses.includes(status)}
        className={styles.freelancerMyProposalsButton}
        onClick={onClickDeleteButton}
      >
        <CloseIcon />
      </Button>

      <Button
        className={styles.freelancerMyProposalsButton}
        disabled={!noDisabledEditBtnStatuses.includes(status)}
        onClick={onClickEditButton}
      >
        <EditOutlinedIcon />
      </Button>

      <Button success disabled={!showResultStatuses.includes(status)} onClick={onClickResultButton}>
        {t(TranslationKey.Result)}
      </Button>
    </div>
  )
})
