/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import {
  Avatar,
  Badge,
  Chip,
  Grid,
  Link,
  TextareaAutosize,
  Tooltip,
  Typography,
  Rating,
  InputAdornment,
} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {fromUnixTime} from 'date-fns'
import {TextArea} from 'react-mde'
import {useHistory} from 'react-router-dom'
import {withStyles} from 'tss-react/mui'

import {BoxStatus} from '@constants/box-status'
import {getOrderStatusOptionByCode, OrderStatus, OrderStatusByKey, OrderStatusTranslate} from '@constants/order-status'
import {MyRequestStatusTranslate} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {mapTaskOperationTypeKeyToEnum, TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus, TaskStatusTranslate} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMap, UserRolePrettyMap} from '@constants/user-roles'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {Input} from '@components/input'
import {Text} from '@components/text'
import {UserLink} from '@components/user-link'

import {calcFinalWeightForBox, calcVolumeWeightForBox} from '@utils/calculation'
import {checkIsPositiveNum, checkIsStorekeeper, checkIsString} from '@utils/checks'
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
import {
  toFixedWithDollarSign,
  trimBarcode,
  toFixedWithKg,
  checkAndMakeAbsoluteUrl,
  toFixed,
  shortSku,
  shortAsin,
} from '@utils/text'
import {t} from '@utils/translations'

import {styles} from './data-grid-cells.style'

export const UserCell = withStyles(
  ({classes: classNames, user}) => (
    <div className={classNames.sabUserWrapper}>
      <div className={classNames.userAvatarWrapper}>
        <Avatar src={getUserAvatarSrc(user?._id)} className={classNames.userAvatar} />
      </div>

      <div className={classNames.sabUserInfoWrapper}>
        <div className={classNames.userLink}>
          <UserLink name={user?.name} userId={user?._id} />
        </div>

        <Typography className={classNames.userEmail}>{user?.email}</Typography>

        <div className={classNames.sabUserRatingWrapper}>
          <Typography>{`Rating ${toFixed(user?.rating, 1)}`}</Typography>

          <Rating disabled className={classNames.sabUserRating} value={user?.rating} />
        </div>
      </div>
    </div>
  ),
  styles,
)

export const InStockCell = withStyles(
  ({classes: classNames, boxAmounts}) => (
    <div className={classNames.inStockWrapper}>
      {boxAmounts?.map(el => (
        <div key={el._id} className={classNames.inStockSubWrapper}>
          <UserLink name={el.storekeeper?.name} userId={el.storekeeper?._id} />

          <Typography>{el.amountInBoxes}</Typography>
        </div>
      ))}
    </div>
  ),
  styles,
)

export const UserRolesCell = withStyles(
  ({classes: classNames, user}) => (
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
  ),
  styles,
)

export const AsinCell = withStyles(
  ({classes: classNames, product}) => (
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
  ),
  styles,
)

export const ProductCell = withStyles(
  ({classes: classNames, product}) => (
    <div className={classNames.productCell}>
      <div className={classNames.asinCellContainer}>
        <img alt="" className={classNames.productCellImg} src={getAmazonImageUrl(product.images?.[0])} />

        <div className={classNames.productWrapper}>
          <Typography className={classNames.csCodeTypo}>{product.amazonTitle}</Typography>
          <div className={classNames.skuAndAsinWrapper}>
            <Typography className={classNames.productTypoCell}>
              {t(TranslationKey.SKU)}
              <span className={classNames.typoSpan}>
                {product.skusByClient?.length ? shortSku(product.skusByClient[0]) : '-'}
              </span>
              {/* {` | ${formatDateDistanceFromNow(product.createdAt)}`} // пока отключим */}
            </Typography>
            {product.skusByClient[0] ? <CopyValue text={product.skusByClient[0]} /> : null}
            {'/'}
            <Typography className={classNames.productTypoCell}>
              {t(TranslationKey.ASIN)}
              <span className={classNames.typoSpan}>{shortAsin(product.asin)}</span>
              {/* {` | ${formatDateDistanceFromNow(product.createdAt)}`} // пока отключим */}
            </Typography>
            {product.asin ? <CopyValue text={product.asin} /> : null}
          </div>
        </div>
      </div>
    </div>
  ),
  styles,
)

export const FeesValuesWithCalculateBtnCell = withStyles(
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
  styles,
)

export const SupplierCell = withStyles(
  ({classes: classNames, product}) => (
    <>
      <Typography className={classNames.researcherCell}>
        {!product.currentSupplier ? '-' : product.currentSupplier.name}
      </Typography>

      {product.currentSupplier && (
        <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(product.currentSupplier?.link)}>
          <Typography className={classNames.noActiveLink}>{product.currentSupplier?.link}</Typography>
        </Link>
      )}
    </>
  ),
  styles,
)

export const UserLinkCell = withStyles(
  ({classes: classNames, name, userId, blackText}) => (
    <div className={classNames.userLinkWrapper}>
      <UserLink withAvatar name={name} userId={userId} blackText={blackText} />
    </div>
  ),
  styles,
)

export const SupervisorCell = withStyles(
  ({classes: classNames, product}) => (
    <Typography className={classNames.researcherCell}>{!product.checkedBy ? '-' : product.checkedBy.name}</Typography>
  ),
  styles,
)

export const ResearcherCell = withStyles(
  ({classes: classNames, product}) => (
    <Typography className={classNames.researcherCell}>{!product.createdBy ? '-' : product.createdBy.name}</Typography>
  ),
  styles,
)

export const ClientCell = withStyles(
  ({classes: classNames, product}) => (
    <Typography className={classNames.researcherCell}>{!product.client ? '-' : product.client.name}</Typography>
  ),
  styles,
)

export const BuyerCell = withStyles(
  ({classes: classNames, product}) => (
    <Typography className={classNames.researcherCell}>{!product.buyer ? '-' : product.buyer.name}</Typography>
  ),
  styles,
)

export const BarcodeCell = withStyles(
  ({classes: classNames, product, handlers}) => (
    <Chip
      classes={{
        root: classNames.barcodeChip,
        clickable: classNames.barcodeChipHover,
        deletable: classNames.barcodeChipHover,
        deleteIcon: classNames.barcodeChipIcon,
      }}
      className={cx({[classNames.barcodeChipNoExists]: !product.barCode})}
      size="small"
      label={product.barCode ? trimBarcode(product.barCode) : t(TranslationKey.BarCode)}
      onClick={() => handlers.onClickBarcode(product)}
      onDoubleClick={() => handlers.onDoubleClickBarcode(product)}
      onDelete={!product.barCode ? undefined : () => handlers.onDeleteBarcode(product)}
    />
  ),
  styles,
)

export const HsCodeCell = withStyles(
  ({classes: classNames, product, handlers}) => (
    <Chip
      classes={{
        root: classNames.barcodeChip,
        clickable: classNames.barcodeChipHover,
        deletable: classNames.barcodeChipHover,
        deleteIcon: classNames.barcodeChipIcon,
      }}
      className={cx({[classNames.barcodeChipNoExists]: !product.hsCode})}
      size="small"
      label={product.hsCode ? trimBarcode(product.hsCode) : t(TranslationKey['HS code'])}
      onClick={() => handlers.onClickHsCode(product)}
      onDoubleClick={() => handlers.onDoubleClickHsCode(product)}
      onDelete={!product.hsCode ? undefined : () => handlers.onDeleteHsCode(product)}
    />
  ),
  styles,
)

export const ChangeInputCell = withStyles(({classes: classNames, row, onClickSubmit, text, disabled, isInts}) => {
  const sourceValue = text ? text : ''

  const [value, setValue] = useState(sourceValue)
  return (
    <div>
      <Input
        disabled={disabled}
        // className={cx(classNames.changeInput, {[classNames.inputValueNoExists]: !value})}

        className={classNames.changeInput}
        classes={{input: classNames.changeInput}}
        inputProps={{maxLength: 7}}
        value={value}
        endAdornment={
          <InputAdornment position="start">
            {sourceValue !== value ? (
              <img
                src={'/assets/icons/save-discet.svg'}
                className={classNames.changeInputIcon}
                onClick={() => onClickSubmit(row, value)}
              />
            ) : null}
          </InputAdornment>
        }
        onChange={e =>
          isInts
            ? setValue(checkIsPositiveNum(e.target.value) && e.target.value ? parseInt(e.target.value) : '')
            : setValue(e.target.value)
        }
      />
    </div>
  )
}, styles)

export const ChangeChipCell = withStyles(
  ({classes: classNames, row, value, onClickChip, onDoubleClickChip, onDeleteChip, text, disabled, label}) => (
    <>
      {label ? <Typography className={classNames.changeChipCellLabel}>{label}</Typography> : null}
      <Chip
        disabled={disabled}
        classes={{
          root: classNames.barcodeChip,
          clickable: classNames.barcodeChipHover,
          deletable: classNames.barcodeChipHover,
          deleteIcon: classNames.barcodeChipIcon,
        }}
        className={cx(classNames.chipStock, {[classNames.barcodeChipNoExists]: !value})}
        size="small"
        label={value ? trimBarcode(value) : text}
        onClick={() => onClickChip(row)}
        onDoubleClick={() => onDoubleClickChip(row)}
        onDelete={!value ? undefined : () => onDeleteChip(row)}
      />
    </>
  ),
  styles,
)

export const PhotoAndFilesCell = withStyles(
  ({classes: classNames, files}) => (
    <div className={classNames.photoWrapper}>
      <PhotoAndFilesCarousel small width={'300px'} files={files} />
    </div>
  ),
  styles,
)

export const DateCell = withStyles(
  ({params}) => <Typography>{!params.value ? '-' : formatDateTime(params.value)}</Typography>,
  styles,
)

export const NormDateCell = withStyles(
  ({classes: classNames, params}) => (
    <Typography className={classNames.normDateCellTypo}>
      {!(params && params.value) ? '-' : formatNormDateTime(params.value)}
    </Typography>
  ),
  styles,
)

export const NormDateWithoutTimeCell = withStyles(
  ({classes: classNames, params}) => (
    <Typography className={classNames.normDateCellTypo}>
      {!(params && params.value) ? '-' : formatDateWithoutTime(params.value)}
    </Typography>
  ),
  styles,
)

export const ShortDateCell = withStyles(
  ({classes: classNames, params}) => (
    <Typography className={classNames.shortDateCellTypo}>
      {!(params && params.value) ? '-' : formatShortDateTime(params.value)}
    </Typography>
  ),
  styles,
)

export const NormDateFromUnixCell = withStyles(
  ({classes: classNames, value}) => (
    <Typography className={classNames.normDateCellTypo}>
      {!value ? '-' : formatDateForShowWithoutParseISO(fromUnixTime(value))}
    </Typography>
  ),
  styles,
)

export const NormDateWithParseISOCell = withStyles(
  ({params}) => <Typography>{!params.value ? '-' : formatNormDateTimeWithParseISO(params.value)}</Typography>,
  styles,
)

export const OrderCell = withStyles(
  ({classes: classNames, product, superbox, box, error}) => (
    <div className={classNames.order}>
      <img alt="" src={getAmazonImageUrl(product?.images[0])} className={classNames.orderImg} />
      <div>
        <Typography className={classNames.orderTitle}>{product?.amazonTitle}</Typography>
        <div className={classNames.copyAsin}>
          <Typography className={classNames.orderText}>
            <span className={classNames.orderTextSpan}>{t(TranslationKey.ASIN) + ': '}</span>
            {product?.asin ? (
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
          {product?.asin ? <CopyValue text={product.asin} /> : null}
        </div>
        <div className={classNames.copyAsin}>
          <Typography className={classNames.orderText}>
            <span className={classNames.orderTextSpan}>{t(TranslationKey.SKU) + ': '}</span>
            {product?.skusByClient?.length ? product.skusByClient[0] : t(TranslationKey.Missing)}
          </Typography>
          {product?.skusByClient?.length ? <CopyValue text={product?.skusByClient[0]} /> : null}
        </div>

        {superbox && <Typography className={classNames.superboxTypo}>{`${'SB'} x ${superbox}`}</Typography>}

        {box && box.totalPrice - box.totalPriceChanged < 0 && (
          <span className={classNames.needPay}>{`${t(
            TranslationKey['Extra payment required!'],
          )} (${toFixedWithDollarSign(box.totalPriceChanged - box.totalPrice, 2)})`}</span>
        )}

        {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
          <span className={classNames.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
        )}

        {error && <span className={classNames.OrderCellError}>{error}</span>}
      </div>
    </div>
  ),
  styles,
)

export const OrderBoxesCell = withStyles(
  ({classes: classNames, superbox, superboxQty, qty, box, product}) =>
    superbox ? (
      <div className={classNames.orderBoxesWrapper}>
        <SuperboxQtyCell qty={qty} superbox={superboxQty} />
        <OrderManyItemsCell box={box} />
      </div>
    ) : (
      <div className={classNames.orderBoxesWrapper}>
        <MultilineTextCell text={`x${qty}`} />
        <OrderCell product={product} superbox={superboxQty} box={box} />
      </div>
    ),
  styles,
)

export const renderFieldValueCell = value => (!value && value !== 0 ? '-' : value)

export const WarehouseTariffDestinationCell = withStyles(
  () => (
    <div>
      <Typography>{'US West Coast'}</Typography>
      <Typography>{'US Central '}</Typography>
      <Typography>{'US East Coast '}</Typography>
    </div>
  ),
  styles,
)

export const WarehouseTariffRatesCell = withStyles(
  ({classes: classNames, conditionsByRegion}) => (
    <div className={classNames.tariffRatesWrapper}>
      <Typography>{toFixed(conditionsByRegion.west.rate, 2) || '-'}</Typography>
      <Typography>{toFixed(conditionsByRegion.central.rate, 2) || '-'}</Typography>
      <Typography>{toFixed(conditionsByRegion.east.rate, 2) || '-'}</Typography>
    </div>
  ),
  styles,
)

export const WarehouseTariffDatesCell = withStyles(
  ({classes: classNames, row}) => (
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
  ),
  styles,
)

export const RenderFieldValueCell = withStyles(
  ({classes: classNames, value}) => (
    <Typography className={classNames.renderFieldValueCellText}>{!value && value !== 0 ? '-' : value}</Typography>
  ),
  styles,
)

export const MultilineTextCell = withStyles(
  ({classes: classNames, text, noTextText, color, withTooltip, leftAlign}) => (
    <>
      {withTooltip ? (
        <Tooltip title={text}>
          <div className={classNames.multilineTextWrapper}>
            <Typography
              className={cx(classNames.multilineText, {[classNames.multilineLeftAlignText]: leftAlign})}
              style={color && {color}}
            >
              {checkIsString(text) ? text.replace(/\n/g, ' ') : text || noTextText || '-'}
            </Typography>
          </div>
        </Tooltip>
      ) : (
        <div className={classNames.multilineTextWrapper}>
          <Typography
            className={cx(classNames.multilineText, {[classNames.multilineLeftAlignText]: leftAlign})}
            style={color && {color}}
          >
            {checkIsString(text) ? text.replace(/\n/g, ' ') : text || noTextText || '-'}
          </Typography>
        </div>
      )}
    </>
  ),
  styles,
)

export const OrdersIdsItemsCell = withStyles(({classes: classNames, value}) => {
  const sortedValue = value.split('item')

  const orderIds = sortedValue[0]

  const ordersItems = 'item' + sortedValue[1]

  return (
    <div className={classNames.orderIdsItemsWrapper}>
      <MultilineTextCell text={orderIds} />

      <MultilineTextCell text={ordersItems} />
    </div>
  )
}, styles)

export const CommentOfSbCell = withStyles(
  ({classes: classNames, productsInWarehouse}) => (
    <div className={classNames.commentOfSbWrapper}>
      {productsInWarehouse?.length === 1 ? (
        <Tooltip title={productsInWarehouse[0].comment}>
          <div className={classNames.multilineTextAlignLeftWrapper}>
            <TextareaAutosize
              disabled
              value={
                checkIsString(productsInWarehouse[0].comment) && productsInWarehouse[0].comment.length > 150
                  ? productsInWarehouse[0].comment.slice(0, 147) + '...'
                  : productsInWarehouse[0].comment
              }
              className={classNames.multilineTextAlignLeft}
            />
          </div>
        </Tooltip>
      ) : (
        <div className={classNames.commentOfSbSubWrapper}>
          {productsInWarehouse.some(el => el.comment) && <Typography>{t(TranslationKey.Comments) + ':'}</Typography>}
          {productsInWarehouse?.map((item, index) => (
            <Tooltip key={index} title={item.comment}>
              <Typography className={classNames.commentOfSbSubMultiText}>{`${index}. ${
                item.comment ? item.comment : '-'
              }`}</Typography>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  ),
  styles,
)

export const MultilineTextAlignLeftCell = withStyles(
  ({classes: classNames, text, withTooltip, isAsin}) =>
    withTooltip ? (
      <Tooltip title={text}>
        <div className={classNames.multilineTextAlignLeftWrapper}>
          <TextareaAutosize
            disabled
            value={checkIsString(text) && text.length > 150 ? text.slice(0, 147) + '...' : text}
            // value={text.length > 10 ? text.slice(0, 7) + '...' : text}
            className={classNames.multilineTextAlignLeft}
          />
        </div>
      </Tooltip>
    ) : (
      <div className={classNames.multilineTextAlignLeftWrapper}>
        {isAsin ? (
          <Typography className={cx(classNames.multilineAsinTextAlignLeft)}>
            {checkIsString(text) ? text.replace(/\n/g, ' ') : text}
          </Typography>
        ) : (
          <TextareaAutosize
            disabled
            value={checkIsString(text) ? text.replace(/\n/g, ' ') : text}
            className={cx(classNames.multilineTextAlignLeft, {[classNames.multilineTextAlignLeftSub]: isAsin})}
          />
        )}
        {isAsin ? <CopyValue text={text} /> : null}
      </div>
    ),
  styles,
)

export const MultilineTextAlignLeftHeaderCell = withStyles(
  ({classes: classNames, text}) => (
    <div className={classNames.multilineTextAlignLeftHeaderWrapper}>
      <Typography className={classNames.multilineTextAlignLeftHeader}>{text}</Typography>
    </div>
  ),
  styles,
)

export const MultilineTextHeaderCell = withStyles(
  ({classes: classNames, text}) => (
    <div className={classNames.multilineTextHeaderWrapper}>
      <Typography className={classNames.multilineHeaderText}>{text}</Typography>
    </div>
  ),
  styles,
)

export const TextHeaderCell = withStyles(
  ({classes: classNames, text}) => (
    <div className={classNames.textHeaderWrapper}>
      <Typography className={classNames.headerText}>{text}</Typography>
    </div>
  ),
  styles,
)

export const MultilineStatusCell = withStyles(
  ({classes: classNames, status}) => (
    <div className={classNames.multilineTextWrapper}>
      <Typography className={classNames.statusMultilineText}>{status?.replace(/_/g, ' ')}</Typography>
    </div>
  ),
  styles,
)

export const TaskStatusCell = withStyles(({classes: classNames, status}) => {
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
    <div className={classNames.statusWrapper}>
      <Typography className={classNames.orderStatusText} style={{color: colorStatus}}>
        {TaskStatusTranslate(status)}
      </Typography>
    </div>
  )
}, styles)

export const RequestStatusCell = withStyles(({classes: classNames, status, isChat}) => {
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
        RequestStatus.OFFER_CONDITIONS_REJECTED,
      ].includes(status)
    ) {
      return '#FF1616'
    } else if (
      [
        RequestStatus.IN_PROCESS,
        RequestStatus.VERIFYING_BY_SUPERVISOR,
        RequestStatus.ACCEPTED_BY_SUPERVISOR,
        RequestStatus.ACCEPTED_BY_CLIENT,
        RequestStatus.CORRECTED,
        RequestStatus.OFFER_CONDITIONS_CORRECTED,
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
      <Typography
        className={cx(classNames.statusText, {[classNames.statusTextChat]: isChat})}
        style={{color: colorStatus}}
      >
        {MyRequestStatusTranslate(status)}
      </Typography>
    </div>
  )
}, styles)

export const MultilineRequestStatusCell = withStyles(({classes: classNames, status, fontSize = '14px'}) => {
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
}, styles)

export const TaskTypeCell = withStyles(({classes: classNames, task}) => {
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
}, styles)

export const TaskDescriptionCell = withStyles(({classes: classNames, task}) => {
  const renderProductImages = (product, key, box) => (
    <Grid key={key && key} item className={classNames.imgWrapper}>
      <img alt="" className={classNames.taskDescriptionImg} src={getAmazonImageUrl(product?.product.images[0])} />
      <div className={classNames.taskDescriptionCountWrapper}>
        {box?.amount > 1 && (
          <Typography className={classNames.taskDescriptionSuperBox}>{`SB ${box.amount}`}</Typography>
        )}

        <Typography className={classNames.imgNum}>{product?.amount}</Typography>
      </div>
    </Grid>
  )

  const renderBox = (box, key, isOneBox) => (
    <div key={key && key} className={classNames.imagesWrapper}>
      <div className={cx(classNames.standartBoxWrapper, {[classNames.isOneBoxWrapper]: isOneBox})}>
        {box.items && box.items.map((product, productIndex) => renderProductImages(product, productIndex, box))}
      </div>
    </div>
  )

  const renderBlockProductsImages = (
    <div className={classNames.blockProductsImagesWrapper}>
      {task.boxesBefore && (
        <div className={classNames.sideWrapper}>
          {task.boxesBefore.map((box, index) =>
            index !== task.boxesBefore.length - 1 ? (
              <>
                {renderBox(box, index)}
                <img key={index + '+'} src="/assets/icons/+.svg" className={classNames.taskDescriptionIcon} />
              </>
            ) : (
              renderBox(box, index, task.boxesBefore.length === 1)
            ),
          )}
        </div>
      )}

      <img src="/assets/icons/equal.svg" className={classNames.taskDescriptionIcon} />

      <div className={classNames.sideWrapper}>
        {task.boxes.map((box, index) =>
          index !== task.boxes.length - 1 ? (
            <>
              {renderBox(box, index)}
              <img key={index + '+'} src="/assets/icons/+.svg" className={classNames.taskDescriptionIcon} />
            </>
          ) : (
            renderBox(box, index, task.boxes.length === 1)
          ),
        )}
      </div>
    </div>
  )

  const taskMergeDescription = () => <div className={classNames.taskTableCell}>{renderBlockProductsImages}</div>

  const taskDivideDescription = () => <div className={classNames.taskTableCell}>{renderBlockProductsImages}</div>

  const taskReceiveDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <div className={classNames.receiveOrEditWrapper}>
        <img src="/assets/icons/big-box.svg" />
        <img src="/assets/icons/box-arrow.svg" />
        {task.boxesBefore.map((box, index) => renderProductImages(box?.items[0], index))}
      </div>
    </div>
  )

  const taskEditDescription = () => (
    <div className={classNames.blockProductsImagesWrapper}>
      <div className={classNames.receiveOrEditWrapper}>
        <img src="/assets/icons/big-box.svg" />
        <img src="/assets/icons/box-edit.svg" />

        {task.boxesBefore[0]?.amount > 1 && (
          <div className={classNames.superboxWrapper}>
            <img src="/assets/icons/cube.svg" />
            <Typography className={classNames.imgNum}>
              {task.boxesBefore[0].amount > 1 && ` x${task.boxesBefore[0].amount}`}
            </Typography>
          </div>
        )}

        <Grid container spacing={2} className={classNames.gridEditWrapper}>
          {task.boxesBefore[0]?.items.map((product, productIndex) => renderProductImages(product, productIndex))}
        </Grid>
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
    }
  }

  return <div className={classNames.taskDescriptionScrollWrapper}>{renderTaskDescription(task.operationType)}</div>
}, styles)

export const IdCell = withStyles(
  ({id}) => (
    <React.Fragment>
      <Typography>{`id: ${id}`}</Typography>
    </React.Fragment>
  ),
  styles,
)

export const NoActiveBarcodeCell = withStyles(
  ({classes: classNames, barCode}) => (
    <React.Fragment>
      <Typography className={classNames.noActivebarCode}>{barCode || '-'}</Typography>
    </React.Fragment>
  ),
  styles,
)

export const ShowBarcodeOrHscodeCell = withStyles(
  ({classes: classNames, barCode, hsCode, handlers}) => (
    <div className={classNames.showButton}>
      <Button onClick={() => handlers.showBarcodeOrHscode(barCode, hsCode)}>{t(TranslationKey.View)}</Button>
    </div>
  ),
  styles,
)

export const FourMonthesStockCell = withStyles(
  ({classes: classNames, handlers, params, value}) => (
    <div className={classNames.fourMonthesStockWrapper}>
      <Typography className={classNames.fourMonthesStockLabel}>{`${t(TranslationKey.Repurchase)}: ${
        value < params.row.stockSum ? 0 : value - params.row.stockSum
      }`}</Typography>
      {/* <ChangeChipCell
        row={params.row.originalData}
        // value={value}
        text={value > 0 ? value : `${t(TranslationKey.Set)} Stock`}
        onClickChip={() => handlers.onClickFourMonthsStock(params.row.originalData)}
        onDeleteChip={() => handlers.onDeleteFourMonthesStock(params.row.originalData)}
      /> */}

      <ChangeInputCell
        isInts
        row={params.row.originalData}
        // text={Number(params.value) > 0 ? params.value : `-`}
        text={params.value}
        onClickSubmit={handlers.onClickSaveFourMonthsStock}
      />
    </div>
  ),
  styles,
)

export const ActiveBarcodeCell = withStyles(
  ({classes: classNames, barCode}) => (
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
  ),
  styles,
)

export const ToFixedWithKgSignCell = withStyles(
  ({classes: classNames, value, fix}) => (
    <div className={classNames.multilineTextWrapper}>
      <Typography className={classNames.multilineText}>
        {!value ? (value === 0 ? 0 : '-') : toFixedWithKg(value, fix)}
      </Typography>
    </div>
  ),
  styles,
)

export const SmallRowImageCell = withStyles(
  ({classes: classNames, images}) => (
    <div className={classNames.smallRowImgWrapper}>
      <img alt="" className={classNames.img} src={getAmazonImageUrl(images[0])} />
    </div>
  ),
  styles,
)

export const ToFixedCell = withStyles(
  ({classes: classNames, value, fix}) => (
    <div className={classNames.multilineTextWrapper}>
      <Typography className={classNames.multilineText}>
        {!value ? (value === 0 ? 0 : '-') : toFixed(value, fix)}
      </Typography>
    </div>
  ),
  styles,
)

export const ToFixedWithDollarSignCell = withStyles(
  ({classes: classNames, value, fix}) => (
    <div className={classNames.multilineTextWrapper}>
      <Typography className={classNames.multilineText}>
        {!value ? (value === 0 ? 0 : '-') : toFixedWithDollarSign(value, fix)}
      </Typography>
    </div>
  ),
  styles,
)

export const SuccessActionBtnCell = withStyles(
  ({classes: classNames, onClickOkBtn, bTnText, tooltipText, isFirstRow}) => (
    <div className={classNames.successActionBtnWrapper}>
      <Button success tooltipInfoContent={isFirstRow && tooltipText} onClick={onClickOkBtn}>
        {bTnText}
      </Button>
    </div>
  ),
  styles,
)

export const NormalActionBtnCell = withStyles(
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
  styles,
)

export const WarehouseMyTasksBtnsCell = withStyles(
  ({classes: classNames, row, handlers, isFirstRow}) => (
    <div className={classNames.warehouseMyTasksBtnsWrapper}>
      <Button
        success
        tooltipInfoContent={isFirstRow && t(TranslationKey['Open a window to perform a task'])}
        className={classNames.warehouseMyTasksSuccessBtn}
        onClick={() => handlers.onClickResolveBtn(row)}
      >
        {t(TranslationKey.Resolve)}
      </Button>

      {row.operationType !== TaskOperationType.RECEIVE && (
        <Button
          danger
          tooltipInfoContent={
            isFirstRow && t(TranslationKey['The task will be canceled, the box will keep its previous state'])
          }
          className={cx(classNames.rowCancelBtn, classNames.warehouseMyTasksCancelBtn)}
          onClick={() => {
            handlers.onClickCancelTask(row.boxes[0]._id, row._id, row.operationType)
          }}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      )}
    </div>
  ),
  styles,
)

export const ClientTasksActionBtnsCell = withStyles(({classes: classNames, row, handlers}) => {
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
}, styles)

export const ClientNotificationsBtnsCell = withStyles(
  ({classes: classNames, row, handlers, disabled}) => (
    <div className={classNames.notificationBtnsWrapper}>
      <Button
        disabled={disabled}
        variant="contained"
        color="primary"
        className={classNames.notificationBtn}
        onClick={() => handlers.onTriggerOpenConfirmModal(row)}
      >
        {t(TranslationKey.Confirm)}
      </Button>
      <Button
        danger
        disabled={disabled}
        className={classNames.notificationBtn}
        onClick={() => {
          handlers.onTriggerOpenRejectModal(row)
        }}
      >
        {t(TranslationKey.Reject)}
      </Button>
    </div>
  ),
  styles,
)

export const AdminUsersActionBtnsCell = withStyles(
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
  styles,
)

export const SuperboxQtyCell = withStyles(
  ({classes: classNames, qty, superbox}) => (
    <div className={classNames.superBoxQtyWrapper}>
      <Typography>{qty || '-'}</Typography>
      <Typography className={classNames.superboxTypo}>{` x ${superbox}`}</Typography>
    </div>
  ),
  styles,
)

export const OrderManyItemsCell = withStyles(({classes: classNames, box, error}) => {
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

            <Typography className={classNames.orderText}>
              <span className={classNames.orderTextSpan}>{t(TranslationKey.SKU) + ': '}</span>
              {item.product.skusByClient?.length ? item.product.skusByClient.join(',') : t(TranslationKey.Missing)}
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
      <>
        <div className={classNames.manyItemsImagesWrapper}>
          {box.items.map((product, productIndex) => (
            <div key={productIndex} className={classNames.manyItemsImgWrapper}>
              <img
                alt=""
                className={classNames.ordersImg}
                src={product.product?.images[0] && getAmazonImageUrl(product.product.images[0])}
              />
              <Typography className={classNames.imgNum}>{`x ${product.amount}`}</Typography>
            </div>
          ))}
        </div>
        {error && <span className={classNames.OrderCellError}>{error}</span>}
      </>
    </Tooltip>
  )
}, styles)

export const ScrollingCell = withStyles(
  ({classes: classNames, value}) => (
    <React.Fragment>
      <Typography className={classNames.scrollingValue}>{value || '-'}</Typography>
    </React.Fragment>
  ),
  styles,
)

// export const ScrollingCell = withStyles(({classes: classNames, value}) => (
//   <React.Fragment>
//     <Typography className={classNames.scrollingValue}>{value || '-'}</Typography>
//   </React.Fragment>
// ))

export const MultilineCell = withStyles(
  ({classes: classNames, value}) => (
    <React.Fragment>
      <Typography className={classNames.multilineValue}>{value || '-'}</Typography>
    </React.Fragment>
  ),
  styles,
)

export const ScrollingLinkCell = withStyles(
  ({classes: classNames, value}) => (
    <React.Fragment>
      <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(value)} className={classNames.scrollingValue}>
        <Typography>{value || '-'}</Typography>
      </Link>
    </React.Fragment>
  ),
  styles,
)

export const EditOrRemoveBtnsCell = withStyles(
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
        className={[classNames.rowCancelBtn, classNames.addPermissionBtn]}
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
  styles,
)

export const EditOrRemoveIconBtnsCell = withStyles(
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
  styles,
)

export const BatchBoxesCell = withStyles(({classes: classNames, boxes}) => {
  const renderProductInfo = box => (
    <div className={classNames.batchProductsWrapper}>
      {box.items.map((item, itemIndex) => (
        <div key={itemIndex} className={classNames.order}>
          <img alt="" src={getAmazonImageUrl(item.product.images[0])} className={classNames.orderImg} />
          <div>
            <Typography className={classNames.batchProductTitle}>{item.product.amazonTitle}</Typography>
            <div className={classNames.copyAsin}>
              <Typography className={classNames.orderText}>
                <span className={classNames.orderTextSpan}>{t(TranslationKey.ASIN) + ': '}</span>
                {item.product.asin}
              </Typography>
              {item.product.asin ? <CopyValue text={item.product.asin} /> : null}
              <Typography className={classNames.orderText}>
                {box.deliveryTotalPrice - box.deliveryTotalPriceChanged < 0 && itemIndex === 0 && (
                  <span className={classNames.needPay}>{`${t(
                    TranslationKey['Extra payment required!'],
                  )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
                )}
              </Typography>
            </div>

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
}, styles)

export const TrashCell = withStyles(
  ({classes: classNames, onClick, tooltipText, isFirstRow}) => (
    <Button tooltipInfoContent={isFirstRow && tooltipText} className={classNames.trashWrapper}>
      <img className={classNames.trashImg} src="/assets/icons/trash.svg" alt="" onClick={onClick} />
    </Button>
  ),
  styles,
)

export const WarehouseBoxesBtnsCell = withStyles(
  ({classes: classNames, row, handlers, isFirstRow}) => (
    <div className={classNames.warehouseBoxesBtnsWrapper}>
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
          disabled={row.isDraft}
          tooltipInfoContent={t(TranslationKey['Add a box to a new or existing batch'])}
          className={classNames.warehouseBoxesBtn}
          onClick={() => handlers.moveBox(row)}
        >
          {t(TranslationKey['Add to batch'])}
        </Button>
      )}

      <Button
        disabled={row.isDraft}
        className={classNames.warehouseBoxesBtn}
        tooltipInfoContent={isFirstRow && t(TranslationKey['Code for Harmonized System Product Identification'])}
        variant="contained"
        color="primary"
        onClick={() => handlers.setHsCode(row)}
      >
        {row.items.some(item => !item.product.hsCode)
          ? t(TranslationKey['Add HS Code'])
          : t(TranslationKey['Edit HS Code'])}
      </Button>
    </div>
  ),
  styles,
)

export const ShopsReportBtnsCell = withStyles(
  ({classes: classNames, value, onClickSeeMore, isFirstRow}) => (
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
        <CopyValue text={value} />
      </Button>

      <Button
        tooltipInfoContent={isFirstRow && t(TranslationKey['Opens the table of a particular store'])}
        variant="contained"
        color="primary"
        className={classNames.viewBtn}
        onClick={onClickSeeMore}
      >
        {t(TranslationKey.View)}
      </Button>
    </div>
  ),
  styles,
)

export const DownloadAndCopyBtnsCell = withStyles(
  ({classes: classNames, value, isFirstRow}) => (
    <>
      {value ? (
        <div className={classNames.shopsReportBtnsWrapper}>
          <Text tooltipInfoContent={isFirstRow && t(TranslationKey['Download the file to your device'])}>
            <a download target="_blank" rel="noreferrer" href={value} className={classNames.downloadLink}>
              {t(TranslationKey.View)}
            </a>
          </Text>
          <Button
            tooltipInfoContent={isFirstRow && t(TranslationKey['Copy the link'])}
            className={classNames.copyImgButton}
          >
            <CopyValue text={value} />
          </Button>
        </div>
      ) : (
        <Typography>{'-'}</Typography>
      )}
    </>
  ),
  styles,
)

export const ShortBoxDimensions = withStyles(
  ({classes: classNames, box, volumeWeightCoefficient, curUser, handlers}) => {
    const finalWeight = calcFinalWeightForBox(box, volumeWeightCoefficient)

    return (
      <div className={classNames.shortBoxDimensionsWrapper}>
        <Typography className={classNames.shortBoxDimensionsText}>{`${toFixed(box.lengthCmWarehouse, 2)}x${toFixed(
          box.widthCmWarehouse,
          2,
        )}x${toFixed(box.heightCmWarehouse, 2)}`}</Typography>

        <Typography className={classNames.shortBoxDimensionsText}>{`${t(TranslationKey.Weight)}: ${toFixedWithKg(
          box.weighGrossKgWarehouse,
          2,
        )}`}</Typography>
        <Typography className={classNames.shortBoxDimensionsText}>{`${t(
          TranslationKey['Volume weight'],
        )}: ${toFixedWithKg(calcVolumeWeightForBox(box, volumeWeightCoefficient), 2)}`}</Typography>
        <Typography
          className={cx(classNames.shortBoxDimensionsText, {
            [classNames.alertText]: !box.isDraft && finalWeight < 12,
          })}
        >{`${t(TranslationKey['Final weight'])}: ${toFixedWithKg(finalWeight, 2)}`}</Typography>

        {!box.isDraft && finalWeight < 12 ? (
          <span className={classNames.alertText}>{t(TranslationKey['Weight less than 12 kg!'])}</span>
        ) : null}
        {checkIsStorekeeper(UserRoleCodeMap[curUser]) ? (
          <Button
            disabled={box.isDraft || box.status !== BoxStatus.IN_STOCK}
            className={cx(classNames.shortBoxDimensionsButton, {
              [classNames.editPaddingButton]: !box.isDraft && finalWeight < 12,
            })}
            onClick={() => handlers.setDimensions(box)}
          >
            {t(TranslationKey.Set)}
          </Button>
        ) : null}
      </div>
    )
  },
  styles,
)

// export const ShortBoxDimensions = withStyles(
//   ({classes: classNames, box, volumeWeightCoefficient, curUser, handlers}) => {
//     const dimensionsConfig = {
//       PRIMARY: 'PRIMARY',
//       SHIPPING: 'SHIPPING',
//     }

//     const [toggleDimensionsValue, setToggleDimensionsValue] = useState(
//       (box.deliveryHeight || box.deliveryLength || box.deliveryMass || box.deliveryWidth) && !box.fitsInitialDimensions
//         ? dimensionsConfig.SHIPPING
//         : dimensionsConfig.PRIMARY,
//     )

//     const finalWeight = calcFinalWeightForBox(
//       box,
//       volumeWeightCoefficient,
//       toggleDimensionsValue === dimensionsConfig.SHIPPING,
//     )

//     return (
//       <div className={classNames.shortBoxDimensionsWrapper}>
//         <div className={classNames.toggleSizesWrapper}>
//           <div className={classNames.toggleItemWrapper}>
//             {toggleDimensionsValue === dimensionsConfig.PRIMARY ? <span className={classNames.indicator}></span> : null}

//             <Typography
//               className={cx(classNames.sizesLabel, {
//                 [classNames.selectedLabel]: toggleDimensionsValue === dimensionsConfig.PRIMARY,
//               })}
//               onClick={() => setToggleDimensionsValue(dimensionsConfig.PRIMARY)}
//             >
//               {t(TranslationKey['Primary dimensions'])}
//             </Typography>

//             {box.fitsInitialDimensions ? <DoneOutlineRoundedIcon color="success" fontSize="small" /> : null}
//           </div>
//           <div className={classNames.toggleItemWrapper}>
//             {toggleDimensionsValue === dimensionsConfig.SHIPPING ? (
//               <span className={classNames.indicator}></span>
//             ) : null}

//             <Typography
//               className={cx(classNames.sizesLabel, {
//                 [classNames.selectedLabel]: toggleDimensionsValue === dimensionsConfig.SHIPPING,
//               })}
//               onClick={() => setToggleDimensionsValue(dimensionsConfig.SHIPPING)}
//             >
//               {t(TranslationKey['Shipping dimensions'])}
//             </Typography>
//           </div>
//         </div>

//         <Typography className={classNames.shortBoxDimensionsText}>{`${toFixed(
//           toggleDimensionsValue === dimensionsConfig.SHIPPING ? box.deliveryLength : box.lengthCmWarehouse,
//           2,
//         )}x${toFixed(
//           toggleDimensionsValue === dimensionsConfig.SHIPPING ? box.deliveryWidth : box.widthCmWarehouse,
//           2,
//         )}x${toFixed(
//           toggleDimensionsValue === dimensionsConfig.SHIPPING ? box.deliveryHeight : box.heightCmWarehouse,
//           2,
//         )}`}</Typography>

//         <Typography className={classNames.shortBoxDimensionsText}>{`${t(TranslationKey.Weight)}: ${toFixedWithKg(
//           toggleDimensionsValue === dimensionsConfig.SHIPPING ? box.deliveryMass : box.weighGrossKgWarehouse,
//           2,
//         )}`}</Typography>
//         <Typography className={classNames.shortBoxDimensionsText}>{`${t(
//           TranslationKey['Volume weight'],
//         )}: ${toFixedWithKg(
//           calcVolumeWeightForBox(box, volumeWeightCoefficient, toggleDimensionsValue === dimensionsConfig.SHIPPING),
//           2,
//         )}`}</Typography>
//         <Typography
//           className={cx(classNames.shortBoxDimensionsText, {
//             [classNames.alertText]: !box.isDraft && finalWeight < 12,
//           })}
//         >{`${t(TranslationKey['Final weight'])}: ${toFixedWithKg(finalWeight, 2)}`}</Typography>

//         {!box.isDraft && finalWeight < 12 ? (
//           <span className={classNames.alertText}>{t(TranslationKey['Weight less than 12 kg!'])}</span>
//         ) : null}
//         {checkIsStorekeeper(UserRoleCodeMap[curUser]) ? (
//           <Button
//             disabled={box.isDraft}
//             className={cx(classNames.shortBoxDimensionsButton, {
//               [classNames.editPaddingButton]: !box.isDraft && finalWeight < 12,
//             })}
//             onClick={() => handlers.setDimensions(box)}
//           >
//             {t(TranslationKey.Set)}
//           </Button>
//         ) : null}
//       </div>
//     )
//   },
// )
