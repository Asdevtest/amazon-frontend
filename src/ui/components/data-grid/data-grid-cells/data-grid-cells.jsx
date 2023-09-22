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
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DoneIcon from '@mui/icons-material/Done'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import PrintIcon from '@mui/icons-material/Print'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp'
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Grid,
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
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/requests/request-proposal-status'
import { RequestStatus, colorByStatus } from '@constants/requests/request-status'
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
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
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
  ParentProductIcon,
  PlusIcon,
  SaveIcon,
  ShareLinkIcon,
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
import { checkIsPositiveNum, checkIsString, checkIsValidProposalStatusToShowResoult } from '@utils/checks'
import {
  formatDateForShowWithoutParseISO,
  formatDateTime,
  formatDateWithoutTime,
  formatNormDateTime,
  formatNormDateTimeWithParseISO,
  formatShortDateTime,
  getDistanceBetweenDatesInSeconds,
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

import { styles } from './data-grid-cells.style'

export const UserCell = React.memo(
  withStyles(
    ({ classes: classNames, userId, name, email, rating }) => (
      <div className={classNames.sabUserWrapper}>
        <div className={classNames.userAvatarWrapper}>
          <Avatar src={getUserAvatarSrc(userId)} className={classNames.userAvatar} />
        </div>

        <div className={classNames.sabUserInfoWrapper}>
          <div className={classNames.userLink}>
            <UserLink
              customStyles={{ fontWeight: 600, fontSize: '14px', lineHeight: '19px' }}
              name={name}
              userId={userId}
            />
          </div>

          <Typography className={classNames.userEmail}>{email}</Typography>

          <div className={classNames.sabUserRatingWrapper}>
            <Typography className={classNames.ratingScore}>{`Rating ${toFixed(rating, 1)}`}</Typography>

            <Rating disabled className={classNames.sabUserRating} value={rating} />
          </div>
        </div>
      </div>
    ),
    styles,
  ),
)

export const UserMiniCell = React.memo(
  withStyles(
    ({ classes: classNames, userName, userId }) => (
      <div className={classNames.userMainWrapper}>
        <Avatar src={getUserAvatarSrc(userId)} className={classNames.userCellAvatar} />

        <UserLink name={userName} userId={userId} />
      </div>
    ),
    styles,
  ),
)

export const InStockCell = React.memo(
  withStyles(
    ({ classes: classNames, boxAmounts, boxId, onClickInStock }) => (
      <div className={classNames.inStockWrapper}>
        {!!boxAmounts.length &&
          boxAmounts
            ?.sort((x, y) => x?.storekeeper?.name?.localeCompare(y?.storekeeper?.name))
            ?.map(el => (
              <div key={el?._id} className={classNames.inStockSubWrapper}>
                <UserLink maxNameWidth={100} name={el?.storekeeper?.name} userId={el.storekeeper?._id} />

                <Link
                  target="_blank"
                  underline={'hover'}
                  className={classNames.linkWrapper}
                  onClick={e => {
                    e.stopPropagation()
                    onClickInStock(boxId, el?.storekeeper)
                  }}
                >
                  <Typography>{el?.amountInBoxes}</Typography>
                </Link>
              </div>
            ))}
      </div>
    ),
    styles,
  ),
)

export const UserRolesCell = React.memo(
  withStyles(
    ({ classes: classNames, user }) => (
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
  ),
)

export const AsinCell = React.memo(
  withStyles(
    ({ classes: classNames, product, asin }) => (
      <div className={cx(classNames.multilineTextHeaderWrapper, classNames.asinCellCopyWrapper)}>
        <Typography className={classNames.typoCell}>
          {product?.asin || asin ? (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.amazon.com/dp/${product?.asin || asin}`}
              className={classNames.normalizeLink}
            >
              <span className={classNames.linkSpan}>{shortAsin(product?.asin || asin)}</span>
            </a>
          ) : (
            <span className={classNames.typoSpan}>{t(TranslationKey.Missing)}</span>
          )}
        </Typography>
        {product?.asin || asin ? <CopyValue text={product?.asin || asin} /> : null}
      </div>
    ),
    styles,
  ),
)

export const ProductAsinCell = React.memo(
  withStyles(
    ({ classes: classNames, image, amazonTitle, asin, skusByClient, withoutImage }) => (
      <div className={classNames.asinCell}>
        <div className={classNames.asinCellContainer}>
          {!withoutImage && <img alt="" className={classNames.img} src={getAmazonImageUrl(image)} />}

          <div className={classNames.csCodeTypoWrapper}>
            <Typography className={classNames.csCodeTypo}>{amazonTitle}</Typography>
            <div className={classNames.copyAsin}>
              <Typography className={classNames.typoCell}>
                {`${t(TranslationKey.ASIN)}: `}

                {asin ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.amazon.com/dp/${asin}`}
                    className={classNames.normalizeLink}
                    onClick={e => e.stopPropagation()}
                  >
                    <span className={classNames.linkSpan}>{shortAsin(asin)}</span>
                  </a>
                ) : (
                  <span className={classNames.typoSpan}>{t(TranslationKey.Missing)}</span>
                )}
              </Typography>
              {asin ? <CopyValue text={asin} /> : null}
            </div>

            <div className={classNames.copyAsin}>
              <Typography className={classNames.typoCell}>
                {`${t(TranslationKey.SKU)}: `}
                <span className={cx(classNames.defaultText, { [classNames.typoSpan]: !skusByClient })}>
                  {skusByClient ? shortSku(skusByClient) : t(TranslationKey.Missing)}
                </span>
              </Typography>
              {skusByClient ? <CopyValue text={skusByClient} /> : null}
            </div>
          </div>
        </div>
      </div>
    ),
    styles,
  ),
)

export const SelectProductAsinCellWithourTitle = React.memo(
  withStyles(
    ({
      classes: classNames,
      product,
      preventDefault,
      checkboxDisabled,
      checkboxChecked,
      withCheckbox,
      onClickCheckbox,
    }) => (
      <div className={classNames.selectedProductWrapper}>
        {withCheckbox && (
          <Checkbox
            disabled={checkboxDisabled}
            checked={checkboxChecked}
            onClick={e => {
              e.stopPropagation()
              !!onClickCheckbox && onClickCheckbox()
            }}
          />
        )}

        <div className={classNames.asinCellMainWrapper}>
          <img alt="" className={cx(classNames.imgMini)} src={getAmazonImageUrl(product?.images?.slice()[0])} />

          <div className={classNames.asinAndSkuWrapper}>
            <div className={classNames.attributeWrapper}>
              <Typography className={classNames.asinAndSkuTitle}>
                {t(TranslationKey.ASIN) + ': '}

                {product?.asin ? (
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.amazon.com/dp/${product.asin}`}
                    className={classNames.normalizeLink}
                    onClick={event => {
                      if (preventDefault) {
                        event.preventDefault()
                      }
                    }}
                  >
                    <span className={classNames.attributeLink}>{shortAsin(product.asin)}</span>
                  </a>
                ) : (
                  <span className={classNames.attributeMissing}>{t(TranslationKey.Missing)}</span>
                )}
              </Typography>
              {/* {product.asin ? <CopyValue text={product.asin} /> : null} */}
            </div>

            <div className={classNames.attributeWrapper}>
              <Typography className={classNames.asinAndSkuTitle}>
                {t(TranslationKey.SKU) + ': '}

                {product.skusByClient?.slice()[0] ? (
                  <span className={classNames.attributeLink}>{shortSku(product.skusByClient?.slice()[0])}</span>
                ) : (
                  <span className={classNames.attributeMissing}>{t(TranslationKey.Missing)}</span>
                )}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    ),
    styles,
  ),
)

export const AsinCopyCell = React.memo(
  withStyles(({ classes: classNames, asinData }) => {
    const asins = asinData.split(', ').map((asin, i) =>
      asin ? (
        <div key={i} className={classNames.multilineTextHeaderWrapper}>
          <Typography className={classNames.typoCell}>
            {<span className={classNames.multilineHeaderText}>{shortAsin(asin)}</span>}
          </Typography>
          {<CopyValue text={asin} />}
        </div>
      ) : (
        <span key={i} className={classNames.multilineHeaderText}>
          {t(TranslationKey.Missing)}
        </span>
      ),
    )
    return <div className={classNames.flexDirectionColumn}>{asins}</div>
  }, styles),
)

export const StringListCell = React.memo(
  withStyles(
    ({ classes: classNames, sourceString, withCopy, maxItemsDisplay, maxLettersInItem, onClickCell, asin }) => {
      const [menuAnchor, setMenuAnchor] = useState(null)
      const handleClick = event => {
        setMenuAnchor(event.currentTarget)
      }
      const handleClose = () => {
        setMenuAnchor(null)
      }
      const items = Array.isArray(sourceString) ? sourceString : sourceString?.split(', ')

      const [itemsForRender, setItemsForRender] = useState(items || [])
      const [nameSearchValue, setNameSearchValue] = useState('')

      useEffect(() => {
        if (nameSearchValue) {
          const filter = items?.filter(item => String(item).toLowerCase().includes(nameSearchValue.toLowerCase()))
          setItemsForRender(filter)
        } else {
          setItemsForRender(items)
        }
      }, [nameSearchValue])

      return (
        <div className={cx(classNames.flexDirectionColumn, classNames.adaptText)} /* onClick={onClickCell} */>
          <div onClick={onClickCell && onClickCell}>
            {!!items?.length &&
              items
                ?.slice(0, maxItemsDisplay)
                ?.filter(el => el)
                ?.map((item, i) => (
                  <AsinOrSkuLink
                    key={i}
                    withCopyValue
                    asin={getShortenStringIfLongerThanCount(item, maxLettersInItem)}
                  />
                ))}
          </div>

          {items?.length > maxItemsDisplay ? (
            <Button variant="text" className={cx(classNames.mainFilterBtn)} onClick={handleClick}>
              <div className={cx(classNames.mainFilterBtnInsert)}>
                <MoreHorizOutlinedIcon color="primary" />
              </div>
            </Button>
          ) : null}

          <Menu
            keepMounted
            anchorEl={menuAnchor}
            autoFocus={false}
            open={Boolean(menuAnchor)}
            // classes={{paper: classNames.menu, list: classNames.list}}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            onClose={handleClose}
          >
            <div className={classNames.stringListMenuWrapper}>
              <div className={classNames.searchInputWrapper}>
                <SearchInput
                  inputClasses={classNames.searchInput}
                  placeholder={t(TranslationKey.Search)}
                  onChange={e => {
                    setNameSearchValue(e.target.value)
                  }}
                />
              </div>
              <div className={classNames.shopsWrapper}>
                <div className={classNames.shopsBody}>
                  {itemsForRender?.map((item, i) => (
                    <div key={i} className={classNames.multilineTextHeaderWrapper}>
                      <Typography className={classNames.shopOrderText}>
                        {getShortenStringIfLongerThanCount(item, maxLettersInItem)}
                      </Typography>
                      {withCopy && <CopyValue text={item} />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Menu>
        </div>
      )
    },
    styles,
  ),
)

export const PaymentMethodsCell = React.memo(
  withStyles(
    ({ classes: classNames, paymentMethods, onClickCell }) => (
      <div className={classNames.paymentMethods} onClick={onClickCell && onClickCell}>
        {paymentMethods.map(({ paymentMethod }) => (
          <div key={paymentMethod.title} className={classNames.paymentMethod}>
            <img src={paymentMethod.iconImage} alt={paymentMethod.title} className={classNames.paymentMethodIcon} />
            <p className={classNames.paymentMethodTitle}>{paymentMethod.title}</p>
          </div>
        ))}
      </div>
    ),
    styles,
  ),
)

export const ProductCell = React.memo(
  withStyles(
    ({ classes: classNames, image, amazonTitle, asin, skusByClient }) => (
      <div className={classNames.productCell}>
        <div className={classNames.asinCellContainer}>
          <img
            alt=""
            className={classNames.productCellImg}
            src={getAmazonImageUrl(image)}
            onError={e => (e.target.src = '/assets/img/no-photo.jpg')}
          />

          <div className={classNames.productWrapper}>
            <Typography className={classNames.csCodeTypo}>{amazonTitle}</Typography>
            <div className={classNames.skuAndAsinWrapper}>
              <Typography className={classNames.productTypoCell}>
                {t(TranslationKey.SKU)}
                <span className={classNames.typoSpan}>{skusByClient ? shortSku(skusByClient) : '-'}</span>
                {/* {` | ${formatDateDistanceFromNow(product.createdAt)}`} // пока отключим */}
              </Typography>
              {skusByClient ? <CopyValue text={skusByClient} /> : null}
              {'/'}
              <Typography className={classNames.productTypoCell}>
                {t(TranslationKey.ASIN)}
                <span className={classNames.typoSpan}>{shortAsin(asin)}</span>
                {/* {` | ${formatDateDistanceFromNow(product.createdAt)}`} // пока отключим */}
              </Typography>
              {asin ? <CopyValue text={asin} /> : null}
            </div>
          </div>
        </div>
      </div>
    ),
    styles,
  ),
)

export const FeesValuesWithCalculateBtnCell = React.memo(
  withStyles(
    ({ classes: classNames, noCalculate, onClickCalculate, productId, fbafee, reffee }) => (
      <div className={classNames.feesTableWrapper}>
        <Typography className={classNames.typoCell}>
          {t(TranslationKey.Fees) + ': '}
          <span className={classNames.typoSpan}>{toFixedWithDollarSign(fbafee, 2)}</span>
        </Typography>
        <Typography className={classNames.typoCell}>
          {t(TranslationKey.Net) + ': '}
          <span className={classNames.typoSpan}>{toFixedWithDollarSign(reffee, 2)}</span>
        </Typography>
        {!noCalculate && (
          <Button
            disableElevation
            className={classNames.cellBtn}
            startIcon={<img alt="calculate icon" src="/assets/icons/calculate.svg" />}
            onClick={() => onClickCalculate(productId)}
          >
            {'Calculate fees'}
          </Button>
        )}
      </div>
    ),
    styles,
  ),
)

export const SupplierCell = React.memo(
  withStyles(
    ({ classes: classNames, supplierName, supplierLink }) => (
      <>
        {!supplierName && <Typography className={classNames.researcherCell}>-</Typography>}

        {supplierName && (
          <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(supplierLink)}>
            <Typography className={classNames.noActiveLink}>{supplierName}</Typography>
          </Link>
        )}
      </>
    ),
    styles,
  ),
)

export const UserLinkCell = React.memo(
  withStyles(
    ({ classes: classNames, name, userId, blackText, customStyles }) => (
      <div className={classNames.userLinkWrapper}>
        <UserLink
          withAvatar
          name={name}
          userId={userId}
          blackText={blackText}
          customStyles={{ fontWeight: 400, fontSize: 14, ...customStyles }}
        />
      </div>
    ),
    styles,
  ),
)

export const ManyUserLinkCell = React.memo(
  withStyles(({ classes: classNames, usersData }) => {
    return (
      <div
        className={cx(classNames.manyUserLinkWrapper, {
          [classNames.manyUserLinkWrapperStart]: usersData?.length >= 5,
        })}
      >
        {usersData?.map(user => (
          <UserLink
            key={user?._id}
            notShowName
            blackText
            withAvatar
            name={user?.name}
            userId={user?._id}
            customStyles={{ fontWeight: 400, fontSize: 14 }}
          />
        ))}
      </div>
    )
  }, styles),
)

export const BarcodeCell = React.memo(
  withStyles(
    ({ classes: classNames, product, handlers, disabled }) => (
      <Chip
        disabled={disabled}
        classes={{
          root: classNames.barcodeChip,
          clickable: classNames.barcodeChipHover,
          deletable: classNames.barcodeChipHover,
          deleteIcon: classNames.barcodeChipIcon,
        }}
        className={cx({ [classNames.barcodeChipNoExists]: !product?.barCode })}
        size="small"
        label={product?.barCode ? trimBarcode(product?.barCode) : t(TranslationKey.BarCode)}
        onClick={() => handlers.onClickBarcode(product)}
        onDoubleClick={() => handlers.onDoubleClickBarcode(product)}
        onDelete={!product?.barCode ? undefined : () => handlers.onDeleteBarcode(product)}
      />
    ),
    styles,
  ),
)

export const HsCodeCell = React.memo(
  withStyles(
    ({ classes: classNames, product, handlers }) => (
      <Chip
        classes={{
          root: classNames.barcodeChip,
          clickable: classNames.barcodeChipHover,
          deletable: classNames.barcodeChipHover,
          deleteIcon: classNames.barcodeChipIcon,
        }}
        className={cx({ [classNames.barcodeChipNoExists]: !product.hsCode })}
        size="small"
        label={product.hsCode ? trimBarcode(product.hsCode) : t(TranslationKey['HS code'])}
        onClick={() => handlers.onClickHsCode(product)}
        onDoubleClick={() => handlers.onDoubleClickHsCode(product)}
        onDelete={!product.hsCode ? undefined : () => handlers.onDeleteHsCode(product)}
      />
    ),
    styles,
  ),
)

export const ChangeInputCell = React.memo(
  withStyles(({ classes: classNames, rowId, onClickSubmit, text, disabled, isInts, maxLength, checkValue }) => {
    const sourceValue = text !== null ? text : ''

    const [value, setValue] = useState(sourceValue)
    const defaultValue = sourceValue

    useEffect(() => {
      setValue(sourceValue)
    }, [text])

    const [isMyInputFocused, setIsMyInputFocused] = useState(false)

    const [isShow, setShow] = useState(false)

    const valueChecked = checkValue ? checkValue(value) : true

    useEffect(() => {
      const listener = event => {
        if (valueChecked && isMyInputFocused && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
          event.preventDefault()
          setShow(true)
          setTimeout(() => {
            setShow(false)
          }, 2000)
          onClickSubmit(rowId, value)
        }
      }
      document.addEventListener('keydown', listener)
      return () => {
        document.removeEventListener('keydown', listener)
      }
    }, [value])

    return (
      <div>
        <Input
          disabled={disabled}
          // className={classNames.changeInput}
          className={cx(classNames.changeInput, { [classNames.errorInputActive]: !valueChecked && value !== '' })}
          classes={{ input: classNames.changeInput }}
          inputProps={{ maxLength: maxLength ? maxLength : 7 }}
          value={value}
          endAdornment={
            <InputAdornment position="start">
              {isShow && sourceValue !== value ? (
                <DoneIcon classes={{ root: classNames.doneIcon }} />
              ) : sourceValue !== value && valueChecked ? (
                <div className={classNames.iconWrapper}>
                  <SaveIcon
                    className={classNames.changeInputIcon}
                    onClick={() => {
                      setShow(true)
                      setTimeout(() => {
                        setShow(false)
                      }, 2000)
                      onClickSubmit(rowId, value)
                    }}
                  />
                  <ClearIcon classes={{ root: classNames.clearIcon }} onClick={() => setValue(defaultValue)} />
                </div>
              ) : null}
            </InputAdornment>
          }
          onChange={e => {
            if (isInts) {
              setValue(checkIsPositiveNum(e.target.value) && e.target.value ? parseInt(e.target.value) : '')
            } else {
              setValue(e.target.value)
            }
          }}
          onKeyDown={e => {
            e.stopPropagation()
          }}
          onBlur={() => setIsMyInputFocused(false)}
          onFocus={() => setIsMyInputFocused(true)}
        />
      </div>
    )
  }, styles),
)

export const ChangeInputCommentCell = React.memo(
  withStyles(
    ({
      classes: classNames,
      id,
      onClickSubmit,
      onChangeText,
      text,
      disabled,
      maxLength,
      rowsCount,
      fieldName,
      placeholder,
      disableMultiline,
    }) => {
      const [value, setValue] = useState(text)
      const [isEdited, setIsEdited] = useState(false)

      useEffect(() => {
        setValue(text)
      }, [text])

      const [isShow, setShow] = useState(false)

      return (
        <div className={classNames.ChangeInputCommentCellWrapper}>
          <Input
            multiline={!disableMultiline}
            autoFocus={false}
            minRows={rowsCount ?? 2}
            maxRows={rowsCount ?? 2}
            inputProps={{ maxLength: maxLength ? maxLength : 256 }}
            placeholder={placeholder ?? t(TranslationKey.Comment)}
            disabled={disabled}
            className={classNames.changeInputComment}
            classes={{ input: classNames.changeInputComment }}
            value={value}
            endAdornment={
              !!onClickSubmit && (
                <InputAdornment position="start" className={classNames.commentControls}>
                  {isShow && text !== value ? (
                    <DoneIcon classes={{ root: classNames.doneIcon }} />
                  ) : isEdited ? (
                    <div className={classNames.iconWrapper}>
                      <SaveIcon
                        className={classNames.changeInputIcon}
                        onClick={() => {
                          setShow(true)
                          setTimeout(() => {
                            setShow(false)
                            setIsEdited(false)
                          }, 2000)
                          onClickSubmit(id, value)
                        }}
                      />
                      <ClearIcon
                        classes={{ root: classNames.clearIcon }}
                        onClick={() => {
                          setIsEdited(false)
                          setValue(text)
                        }}
                      />
                    </div>
                  ) : null}
                </InputAdornment>
              )
            }
            onChange={e => {
              setValue(e.target.value)
              setIsEdited(true)
              if (onChangeText) {
                onChangeText(fieldName || 'comments')(e.target.value)
              }
            }}
            onKeyDown={event => {
              event.stopPropagation()
            }}
          />
        </div>
      )
    },
    styles,
  ),
)

export const ChangeChipCell = React.memo(
  withStyles(
    ({ classes: classNames, row, value, onClickChip, onDoubleClickChip, onDeleteChip, text, disabled, label }) => (
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
          className={cx(classNames.chipStock, { [classNames.barcodeChipNoExists]: !value })}
          size="small"
          label={value ? trimBarcode(value) : text}
          onClick={e => {
            e.stopPropagation()

            onClickChip(row)
          }}
          onDoubleClick={e => {
            e.stopPropagation()
            onDoubleClickChip(row)
          }}
          onDelete={
            !value
              ? undefined
              : e => {
                  e.stopPropagation()
                  onDeleteChip(row)
                }
          }
        />
      </>
    ),
    styles,
  ),
)

export const PhotoAndFilesCell = React.memo(
  withStyles(
    ({ classes: classNames, files }) => (
      <div className={classNames.photoWrapper}>
        <PhotoAndFilesCarousel small width={'300px'} files={files} />
      </div>
    ),
    styles,
  ),
)

export const DateCell = React.memo(
  withStyles(({ value }) => <Typography>{!value ? '-' : formatDateTime(value)}</Typography>, styles),
)

export const NormDateCell = React.memo(
  withStyles(
    ({ classes: classNames, value }) => (
      <Typography className={classNames.normDateCellTypo}>{value ? formatNormDateTime(value) : '-'}</Typography>
    ),
    styles,
  ),
)

export const NormDateWithoutTimeCell = React.memo(
  withStyles(
    ({ classes: classNames, value }) => (
      <Typography className={classNames.normDateCellTypo}>{!value ? '-' : formatDateWithoutTime(value)}</Typography>
    ),
    styles,
  ),
)

export const ShortDateCell = React.memo(
  withStyles(
    ({ classes: classNames, value }) => (
      <Typography className={classNames.shortDateCellTypo}>{!value ? '-' : formatShortDateTime(value)}</Typography>
    ),
    styles,
  ),
)

export const NormDateFromUnixCell = React.memo(
  withStyles(
    ({ classes: classNames, value }) => (
      <Typography className={classNames.normDateCellTypo}>
        {!value ? '-' : formatDateForShowWithoutParseISO(fromUnixTime(value))}
      </Typography>
    ),
    styles,
  ),
)

export const NormDateWithParseISOCell = React.memo(
  withStyles(({ value }) => <Typography>{!value ? '-' : formatNormDateTimeWithParseISO(value)}</Typography>, styles),
)

export const OrderCell = React.memo(
  withStyles(
    ({ classes: classNames, product, superbox, box, error, withoutSku, itemAmount, withQuantity, imageSize }) => (
      <div className={classNames.order}>
        <img
          src={getAmazonImageUrl(product?.images[0])}
          alt="product"
          className={cx(classNames.orderImg, {
            [classNames.orderImageBig]: imageSize === 'big',
            [classNames.orderImageSmall]: imageSize === 'small',
          })}
        />
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
                  onClick={e => e.stopPropagation()}
                >
                  <span className={classNames.linkSpan}>{shortAsin(product.asin)}</span>
                </a>
              ) : (
                <span className={classNames.typoSpan}>{t(TranslationKey.Missing)}</span>
              )}
            </Typography>
            {product?.asin ? <CopyValue text={product.asin} /> : null}
          </div>

          {!withoutSku && (
            <div className={classNames.copyAsin}>
              <Typography className={classNames.orderText}>
                <span className={classNames.orderTextSpan}>{t(TranslationKey.SKU) + ': '}</span>
                {product?.skusByClient?.length ? product.skusByClient[0] : t(TranslationKey.Missing)}
              </Typography>
              {product?.skusByClient?.length ? <CopyValue text={product?.skusByClient[0]} /> : null}
            </div>
          )}

          {withQuantity ? (
            <div className={classNames.copyAsin}>
              <Typography className={classNames.orderText}>
                <span className={classNames.orderTextSpan}>{t(TranslationKey.Quantity) + ': '}</span>
                {itemAmount ? itemAmount : box?.items?.[0].amount}
              </Typography>
            </div>
          ) : null}

          {superbox && (
            <div className={classNames.superboxWrapper}>
              <Typography className={classNames.superboxTypo}>{`SB x ${superbox}`}</Typography>
              {/* <Typography className={classNames.superboxTypo}>{`x ${box?.items?.[0].amount}`}</Typography>{' '} */}
            </div>
          )}

          {((box && box.deliveryTotalPrice - box.deliveryTotalPriceChanged < 0) ||
            box?.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE) && (
            <span className={classNames.needPay}>{`${t(
              TranslationKey['Extra payment required!'],
            )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
          )}

          {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
            <span className={classNames.needPay}>
              {t(TranslationKey['The tariff is invalid or has been removed!'])}
            </span>
          )}

          {error && <span className={classNames.OrderCellError}>{error}</span>}
        </div>
      </div>
    ),
    styles,
  ),
)

export const DownloadAndPrintFilesCell = React.memo(
  withStyles(props => {
    const { classes: styles, files } = props
    const imageRef = useRef(null)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState({})

    const handlePrint = useReactToPrint({
      content: () => imageRef.current,
      documentTitle: 'AwesomeFileName',
      removeAfterPrint: true,
    })

    const handleImagePreview = el => {
      if (!imageTypes.includes(el.fileType)) {
        window.open(el.fileUrl, '_blank')
        return
      }
      setSelectedImage(el)
      setIsOpenModal(true)
    }

    const printFile = el => {
      if (!imageTypes.includes(el.fileType)) {
        window.open(el.fileUrl, '_blank')
        return
      }
      flushSync(() => setSelectedImage(el))
      handlePrint()
    }

    return (
      <>
        <Box display="flex" flexDirection="column" gap="10px" py="14px">
          {files.map((el, index) => (
            <div key={index}>
              <Typography className={styles.dapTitle}>{el.title}</Typography>
              {el.fileUrl && (
                <Box display="flex" gap="8px" alignItems="center">
                  <Button
                    className={styles.dapBtn}
                    onClick={e => {
                      e.stopPropagation()
                      handleImagePreview(el)
                    }}
                  >
                    <span>{el.fileName}</span>.{el.fileType}
                  </Button>

                  <IconButton
                    sx={{ color: '#0164F4' }}
                    onClick={e => {
                      e.stopPropagation()
                      printFile(el)
                    }}
                  >
                    <PrintIcon
                      classes={{
                        root: styles.printIcon,
                      }}
                    />
                  </IconButton>
                </Box>
              )}
              {!el.fileUrl && (
                <Typography sx={{ marginLeft: '25px', width: 'fit-content' }}>
                  {t(TranslationKey['Not added'])}
                </Typography>
              )}
            </div>
          ))}
        </Box>

        <Box display="none">
          <img ref={imageRef} src={getAmazonImageUrl(selectedImage.fileUrl)} alt="Printed Image" />
        </Box>

        <ImageModal
          isOpenModal={isOpenModal}
          handleOpenModal={() => setIsOpenModal(prevState => !prevState)}
          imageList={[selectedImage.fileUrl]}
          currentImageIndex={0}
          handleCurrentImageIndex={() => null}
          controls={() => (
            <>
              <Button onClick={() => handlePrint()}>
                <PrintIcon
                  classes={{
                    root: styles.printIconModal,
                  }}
                />
              </Button>
            </>
          )}
        />
      </>
    )
  }, styles),
)

export const OrderBoxesCell = React.memo(
  withStyles(
    ({ classes: classNames, superbox, superboxQty, qty, box, product, withoutSku, withQuantity }) =>
      superbox ? (
        <div className={classNames.orderBoxesWrapper}>
          <SuperboxQtyCell qty={qty} superbox={superboxQty} />
          <OrderManyItemsCell box={box} withoutSku={withoutSku} withQuantity={withQuantity} />
        </div>
      ) : (
        <div className={classNames.orderBoxesWrapper}>
          {/* <div className={classNames.fixedTextWidth}>
            <MultilineTextCell text={`x${qty}`} />
          </div> */}
          <OrderCell
            product={product}
            superbox={superboxQty}
            box={box}
            withoutSku={withoutSku}
            withQuantity={withQuantity}
          />
        </div>
      ),
    styles,
  ),
)

export const renderFieldValueCell = value => (!value && value !== 0 ? '-' : value)

export const WarehouseTariffDestinationCell = React.memo(
  withStyles(
    () => (
      <div>
        <Typography>{'US West Coast'}</Typography>
        <Typography>{'US Central '}</Typography>
        <Typography>{'US East Coast '}</Typography>
      </div>
    ),
    styles,
  ),
)

export const WarehouseTariffRatesCell = React.memo(
  withStyles(
    ({ classes: classNames, conditionsByRegion, inYuans }) => (
      <div className={classNames.tariffRatesWrapper}>
        <Typography>
          {toFixed(
            inYuans
              ? roundHalf(conditionsByRegion.west.rate * conditionsByRegion.yuanToDollarRate)
              : conditionsByRegion.west.rate,
            2,
          ) || '-'}
        </Typography>
        <Typography>
          {toFixed(
            inYuans
              ? roundHalf(conditionsByRegion.central.rate * conditionsByRegion.yuanToDollarRate)
              : conditionsByRegion.central.rate,
            2,
          ) || '-'}
        </Typography>
        <Typography>
          {toFixed(
            inYuans
              ? roundHalf(conditionsByRegion.east.rate * conditionsByRegion.yuanToDollarRate)
              : conditionsByRegion.east.rate,
            2,
          ) || '-'}
        </Typography>
      </div>
    ),
    styles,
  ),
)

export const WarehouseTariffDatesCell = React.memo(
  withStyles(
    ({ classes: classNames, cls, etd, eta }) => (
      <div>
        <div className={classNames.warehouseTariffDatesItem}>
          <Typography>{t(TranslationKey['CLS (batch closing date)'])}</Typography>
          <Typography>{!cls ? '-' : formatDateWithoutTime(cls)}</Typography>
        </div>

        <div className={classNames.warehouseTariffDatesItem}>
          <Typography>{t(TranslationKey['ETD (date of shipment)'])}</Typography>
          <Typography>{!etd ? '-' : formatDateWithoutTime(etd)}</Typography>
        </div>

        <div className={classNames.warehouseTariffDatesItem}>
          <Typography>{t(TranslationKey['ETA (arrival date)'])}</Typography>
          <Typography>{!eta ? '-' : formatDateWithoutTime(eta)}</Typography>
        </div>
      </div>
    ),
    styles,
  ),
)

export const TaskPriorityCell =
  /* React.memo( */
  withStyles(
    ({ classes: classNames, curPriority, onChangePriority, taskId, disabled }) => (
      <PrioritySelect
        setCurrentPriority={priority => onChangePriority(taskId, priority)}
        currentPriority={curPriority}
        disabled={disabled}
      />
    ),
    styles,
  )
/* ) */

export const WarehouseDestinationAndTariffCell = React.memo(
  withStyles(
    ({
      classes: classNames,
      boxesMy,
      destinations,
      destinationsFavourites,
      setDestinationsFavouritesItem,
      storekeepers,
      onSelectDestination,
      setShowSelectionStorekeeperAndTariffModal,
      onClickSetTariff,
      disabled,
    }) => {
      const currentStorekeeper = storekeepers?.find(el => el._id === boxesMy?.storekeeper?._id)
      const currentTariff = currentStorekeeper?.tariffLogistics?.find(el => el?._id === boxesMy?.logicsTariff?._id)

      const tariffName = currentTariff?.name

      const curDestination = destinations?.find(el => el?._id === boxesMy?.destination?._id)

      const firstNumOfCode = curDestination?.zipCode?.[0]

      const regionOfDeliveryName = zipCodeGroups?.find(el => el?.codes?.includes(Number(firstNumOfCode)))?.name

      const tariffRate =
        currentTariff?.conditionsByRegion[regionOfDeliveryName]?.rate ||
        currentTariff?.destinationVariations?.find(el => el._id === boxesMy?.variationTariff?._id)?.pricePerKgUsd

      return (
        <div className={classNames.destinationAndTariffWrapper}>
          <WithSearchSelect
            disabled={disabled}
            width={160}
            selectedItemName={
              destinations.find(el => el?._id === boxesMy?.destination?._id)?.name || t(TranslationKey['Not chosen'])
            }
            data={
              boxesMy?.logicsTariff?._id && currentTariff?.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF
                ? destinations
                    // .filter(el => el?.storekeeper?._id !== boxesMy?.storekeeper?._id)
                    // .filter(el => el?._id === boxesMy?.logicsTariff?._id)
                    .filter(el => el?._id === boxesMy?.variationTariff?.destinationId)
                : destinations.filter(el => el?.storekeeper?._id !== boxesMy?.storekeeper?._id)
            }
            searchFields={['name']}
            favourites={destinationsFavourites}
            onClickSetDestinationFavourite={setDestinationsFavouritesItem}
            onClickNotChosen={() =>
              onSelectDestination(boxesMy?._id, {
                destinationId: null,
              })
            }
            onClickSelect={el => onSelectDestination(boxesMy?._id, { destinationId: el?._id })}
          />
          <Button
            disableElevation
            disabled={disabled}
            className={classNames.storekeeperBtn}
            onClick={e => {
              e.stopPropagation()
              onClickSetTariff(boxesMy)
              setShowSelectionStorekeeperAndTariffModal()
            }}
          >
            {/* {boxesMy?.storekeeper?._id
                ? `${
                    storekeepers.find(el => el._id === boxesMy?.storekeeper?._id)?.name ||
                    t(TranslationKey['Not available'])
                  } /
                        ${
                          boxesMy?.storekeeper?._id
                            ? `${tariffName ? tariffName + ' / ' : ''}${
                                regionOfDeliveryName ? regionOfDeliveryName : ''
                              }${tariffRate ? ' / ' + tariffRate + ' $' : ''}`
                            : 'none'
                        }`
                : t(TranslationKey.Select)} */}
            {boxesMy?.storekeeper?._id
              ? `${
                  boxesMy?.storekeeper?._id
                    ? `${tariffName ? tariffName : 'none'}${tariffRate ? ' / ' + toFixed(tariffRate, 2) + ' $' : ''}`
                    : 'none'
                }`
              : t(TranslationKey.Select)}
          </Button>
        </div>
      )
    },
    styles,
  ),
)

export const CheckboxCell = React.memo(
  withStyles(
    ({ classes: classNames, checked, disabled, onClick }) => (
      <div className={classNames.checkboxWrapper}>
        <Checkbox
          disabled={disabled}
          checked={checked}
          onClick={e => {
            e.stopPropagation()

            onClick()
          }}
        />
      </div>
    ),
    styles,
  ),
)

export const RenderFieldValueCell = React.memo(
  withStyles(
    ({ classes: classNames, value }) => (
      <Typography className={classNames.renderFieldValueCellText}>{!value && value !== 0 ? '-' : value}</Typography>
    ),
    styles,
  ),
)

export const BatchTrackingCell = React.memo(
  withStyles(
    ({ classes: classNames, rowHandlers, id, trackingNumber, arrivalDate, disabled, disableMultilineForTrack }) => (
      <div className={classNames.batchTrackingWrapper}>
        <Field
          containerClasses={classNames.batchTrackingContainer}
          label={t(TranslationKey['Track number'])}
          labelClasses={classNames.batchTrackingTitle}
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
          containerClasses={classNames.batchTrackingContainer}
          label={t(TranslationKey['Arrival date'])}
          labelClasses={classNames.batchTrackingTitle}
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
    ),
    styles,
  ),
)

export const DatePickerCell = React.memo(
  withStyles(({ classes: classNames, id, arrivalDate, onClickSaveArrivalDate, disabled }) => {
    const [value, setValue] = useState(arrivalDate || '')

    useEffect(() => {
      setValue(arrivalDate)
    }, [arrivalDate])

    const [isShow, setShow] = useState(false)

    return (
      <div className={classNames.arrivalDateWrapper}>
        <NewDatePicker
          disabled={disabled}
          className={classNames.dateField}
          value={value}
          onChange={e => {
            setValue(e)
          }}
        />
        {!!onClickSaveArrivalDate && (
          <div className={classNames.arrivalDateControlWrapper}>
            {isShow && arrivalDate !== value ? (
              <DoneIcon classes={{ root: cx(classNames.doneIcon, classNames.arrivalDateIcon) }} />
            ) : arrivalDate !== value ? (
              <div className={cx(classNames.iconWrapper, classNames.iconWrapperArrivalDate)}>
                <SaveIcon
                  className={cx(classNames.changeInputIcon, classNames.arrivalDateIcon)}
                  onClick={() => {
                    setShow(true)
                    setTimeout(() => {
                      setShow(false)
                    }, 2000)
                    onClickSaveArrivalDate(id, value)
                  }}
                />
                <ClearIcon
                  classes={{ root: cx(classNames.clearIcon, classNames.arrivalDateIcon) }}
                  onClick={() => setValue(arrivalDate)}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>
    )
  }, styles),
)

export const MultilineTextCell = React.memo(
  withStyles(
    ({
      classes: classNames,
      text,
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
      const maxTextLength = maxLength ?? MAX_LENGTH_TITLE
      const isValidTextLength = text?.length <= maxTextLength
      const oneLineText =
        isValidTextLength || oneLines ? text : getShortenStringIfLongerThanCount(text, maxLength ?? maxTextLength)
      const textForRender = threeLines || twoLines ? text : oneLineText
      const isTooltip = withTooltip || tooltipText || !isValidTextLength

      return (
        <div
          className={cx(classNames.multilineTextWrapper, {
            [classNames.illuminationCell]: illuminationCell && textForRender,
          })}
        >
          <Tooltip title={isTooltip ? tooltipText || text : ''}>
            <Typography
              className={cx(
                classNames.multilineText,
                { [classNames.multilineLeftAlignText]: leftAlign },
                { [classNames.multilineLink]: onClickText && textForRender },
                { [classNames.oneMultilineText]: oneLines },
                { [classNames.twoMultilineText]: twoLines },
                { [classNames.threeMultilineText]: threeLines },
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
    styles,
  ),
)

export const VacantRequestPriceCell = React.memo(
  withStyles(({ classes: classNames, price, cashBackInPercent, AlignLeft }) => {
    const discountedPrice = calcNumberMinusPercent(price, cashBackInPercent)

    return (
      <div className={cx(classNames.priceCellWrapper, { [classNames.priceCellWrapperAlignLeft]: AlignLeft })}>
        {discountedPrice && cashBackInPercent ? (
          <Typography
            className={cx(classNames.priceText, {
              [classNames.newPrice]: discountedPrice && cashBackInPercent,
            })}
          >
            {'$ ' + toFixed(discountedPrice, 2)}
          </Typography>
        ) : null}

        <Typography
          className={cx(classNames.priceText, {
            [classNames.oldPrice]: discountedPrice && cashBackInPercent,
          })}
        >
          {'$ ' + toFixed(price, 2)}
        </Typography>
      </div>
    )
  }, styles),
)

export const OrdersIdsItemsCell = React.memo(
  withStyles(({ classes: classNames, value }) => {
    const sortedValue = value?.split('item')

    const orderIds = sortedValue[0]

    const ordersItems = 'item' + sortedValue[1]

    return (
      <div className={classNames.orderIdsItemsWrapper}>
        <MultilineTextCell text={orderIds} />

        <MultilineTextCell text={ordersItems} />
      </div>
    )
  }, styles),
)

export const CommentOfSbCell = React.memo(
  withStyles(
    ({ classes: classNames, productsInWarehouse }) => (
      <div className={classNames.commentOfSbWrapper}>
        {productsInWarehouse?.length === 1 ? (
          <Tooltip title={productsInWarehouse[0].comment}>
            <div className={classNames.multilineTextAlignLeftWrapper}>
              <Typography
                // disabled
                className={classNames.multilineTextAlignLeft}
              >
                {(checkIsString(productsInWarehouse[0].comment) &&
                  getShortenStringIfLongerThanCount(productsInWarehouse[0].comment, 147)) ||
                  ''}
              </Typography>
            </div>
          </Tooltip>
        ) : (
          <div className={classNames.commentOfSbSubWrapper}>
            {productsInWarehouse.some(el => el.comment) && (
              <Typography className={classNames.commentOfSbSubMultiText}>{t(TranslationKey.Comments) + ':'}</Typography>
            )}
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
  ),
)

export const MultilineTextAlignLeftCell = React.memo(
  withStyles(
    ({ classes: classNames, text, withTooltip, isAsin, pointer, fourLines }) =>
      withTooltip ? (
        <Tooltip title={text}>
          <div className={classNames.multilineTextAlignLeftWrapper}>
            <Typography
              // disabled
              className={cx(
                classNames.multilineTextAlignLeft,
                { [classNames.cursorPointer]: pointer },
                { [classNames.fourLinesTextAlignLeft]: fourLines },
              )}
            >
              {getShortenStringIfLongerThanCount(text, 150)}
            </Typography>
          </div>
        </Tooltip>
      ) : (
        <div className={classNames.multilineTextAlignLeftWrapper}>
          {isAsin ? (
            <Typography
              className={cx(classNames.multilineAsinTextAlignLeft, { [classNames.fourLinesTextAlignLeft]: fourLines })}
            >
              {checkIsString(text) ? text.replace(/\n/g, ' ') : text}
            </Typography>
          ) : (
            <Typography
              className={cx(classNames.multilineTextAlignLeft, {
                [classNames.multilineTextAlignLeftSub]: isAsin,
                [classNames.cursorPointer]: pointer,
                [classNames.fourLinesTextAlignLeft]: fourLines,
              })}
            >
              {checkIsString(text) ? text.replace(/\n/g, ' ') : text}
            </Typography>
          )}
          {isAsin ? <CopyValue text={text} /> : null}
        </div>
      ),
    styles,
  ),
)

export const MultilineTextAlignLeftHeaderCell = React.memo(
  withStyles(
    ({ classes: classNames, text }) => (
      <div className={classNames.multilineTextAlignLeftHeaderWrapper}>
        <Typography className={classNames.multilineTextAlignLeftHeader}>{text}</Typography>
      </div>
    ),
    styles,
  ),
)

export const MultilineTextHeaderCell = React.memo(
  withStyles(
    ({
      classes: classNames,
      text,
      withIcon,
      isShowIconOnHover,
      isFilterActive,
      component,
      textCenter,
      color,
      withTooltip,
      tooltipText,
    }) => (
      <div
        className={cx(classNames.multilineTextHeaderWrapper, {
          [classNames.multilineTextHeaderCenter]: textCenter,
          [classNames.multilineTextHeaderSpaceBetween]: component,
        })}
      >
        <Tooltip title={withTooltip ? tooltipText || text : ''}>
          <Typography className={classNames.multilineHeaderText} style={color && { color }}>
            {text}
          </Typography>
        </Tooltip>
        {component}
        {withIcon || isShowIconOnHover || isFilterActive ? (
          <FilterAltOutlinedIcon
            className={cx(classNames.headerIcon, {
              [classNames.headerIconBlue]: isFilterActive,
            })}
          />
        ) : null}
      </div>
    ),
    styles,
  ),
)

export const IconHeaderCell = React.memo(withStyles(({ classes: classNames, url }) => <img src={url} />, styles))

export const PriorityAndChinaDeliverCell = React.memo(
  withStyles(({ classes: classNames, priority, chinaDelivery, status, isRequest, onClickOpenInNewTab }) => {
    const isPendingOrder = Number(status) <= Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])

    return (
      <div className={classNames.priorityAndChinaDeliveryWrapper}>
        {onClickOpenInNewTab && (
          <OpenInNewTabCell
            onClickOpenInNewTab={e => {
              e.stopPropagation()
              onClickOpenInNewTab()
            }}
          />
        )}

        {isPendingOrder ? <ClockIcon className={classNames.clockIcon} /> : null}

        <div>
          {Number(priority) === orderPriority.urgentPriority ||
          (isRequest && Number(priority) === requestPriority.urgentPriority) ? (
            <div className={classNames.priority}>
              <img src="/assets/icons/fire.svg" />
            </div>
          ) : null}

          {chinaDelivery === true ? (
            <div className={classNames.chinaDelivery}>
              <img src="/assets/icons/truck.svg" />
            </div>
          ) : null}
        </div>
      </div>
    )
  }, styles),
)

export const BoxesAndQuantity = React.memo(
  withStyles(({ classes: classNames, boxesData }) => {
    if (Array.isArray(boxesData)) {
      const mergedBoxes = boxesData.map(item => `${item.boxAmount}x${item.itemAmount}`)
      const filteredBoxes = [...new Set(mergedBoxes)]
      const count = mergedBoxes.reduce((acc, el) => {
        acc[el] = (acc[el] || 0) + 1
        return acc
      }, {})
      const boxes = filteredBoxes.map((item, i) =>
        item ? (
          <Typography key={i} className={classNames.boxesAndQuantityText}>
            {item}
            {count[item] !== 1 ? ` x ${count[item]}` : ''}
            {filteredBoxes.length > 1 && i + 1 !== filteredBoxes.length ? ',' : ''}
          </Typography>
        ) : null,
      )
      return <div className={classNames.boxesAndQuantityWrapper}>{boxes}</div>
    } else {
      return (
        <div className={classNames.boxesAndQuantityWrapper}>
          <Typography className={classNames.boxesAndQuantityText}>
            {`${boxesData.amount}x${boxesData.items[0].amount}`}
          </Typography>
        </div>
      )
    }
  }, styles),
)

export const TextHeaderCell = React.memo(
  withStyles(
    ({ classes: classNames, text }) => (
      <div className={classNames.textHeaderWrapper}>
        <Typography className={classNames.headerText}>{text}</Typography>
      </div>
    ),
    styles,
  ),
)

export const MultilineStatusCell = React.memo(
  withStyles(
    ({ classes: classNames, status, leftAlign }) => (
      <div className={classNames.multilineTextWrapper}>
        <Typography className={cx(classNames.statusMultilineText, { [classNames.multilineLeftAlignText]: leftAlign })}>
          {status?.replace(/_/g, ' ')}
        </Typography>
      </div>
    ),
    styles,
  ),
)

export const TaskStatusCell = React.memo(
  withStyles(({ classes: classNames, status }) => {
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
        <Typography className={classNames.orderStatusText} style={{ color: colorStatus }}>
          {TaskStatusTranslate(status)}
        </Typography>
      </div>
    )
  }, styles),
)

export const RequestStatusCell = React.memo(
  withStyles(
    ({ classes: classNames, status, isChat, styles, languageTag }) => (
      <div className={classNames.statusWrapper}>
        <Typography
          className={cx(classNames.statusText, { [classNames.statusTextChat]: isChat })}
          style={{ ...styles, color: colorByStatus(status) }}
        >
          {MyRequestStatusTranslate(status)}
        </Typography>
      </div>
    ),
    styles,
  ),
)

export const MultilineRequestStatusCell = React.memo(
  withStyles(({ classes: classNames, status, fontSize = '14px', leftAlign }) => {
    // const [statusTranslate, setStatusTranslate] = useState(MyRequestStatusTranslate(status))

    // useEffect(() => {
    //   setStatusTranslate(MyRequestStatusTranslate(status))
    // }, [languageTag])

    const colorByStatus = () => {
      if ([RequestStatus.DRAFT].includes(status)) {
        return SettingsModel.uiTheme === UiTheme.light ? '#007bff' : '#4CA1DE'
      } else if (
        [
          RequestStatus.CANCELED_BY_CREATOR,
          RequestStatus.FORBID_NEW_PROPOSALS,
          RequestStatus.CANCELED_BY_ADMIN,
        ].includes(status)
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
      <div className={classNames.multilineTextWrapper}>
        <Typography className={classNames.multilineStatusText} style={{ color: colorStatus, fontSize }}>
          {MyRequestStatusTranslate(status)}
        </Typography>
      </div>
    )
  }, styles),
)

export const TaskTypeCell = React.memo(
  withStyles(({ classes: classNames, operationType }) => {
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
      <div className={classNames.taskDescriptionScrollWrapper}>
        <Typography className={classNames.operationTypeText}>{renderTaskDescription(operationType)}</Typography>
      </div>
    )
  }, styles),
)

export const TaskDescriptionCell = React.memo(
  withStyles(({ classes: classNames, task }) => {
    const renderProductImages = (product, key, box) => (
      <div key={key && key} className={classNames.imgWrapper}>
        <img src={getAmazonImageUrl(product?.product.images[0])} alt="box" className={classNames.taskDescriptionImg} />

        <div className={classNames.taskDescriptionCountWrapper}>
          {box?.amount > 1 && (
            <Typography className={classNames.taskDescriptionSuperBox}>{`SB ${box.amount}`}</Typography>
          )}

          <Typography className={classNames.imgNum}>{product?.amount}</Typography>
        </div>
      </div>
    )

    const renderBox = (box, key, isOneBox) => (
      <div key={key && key} className={classNames.imagesWrapper}>
        <div className={cx(classNames.standartBoxWrapper)}>
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
                <div key={index} className={classNames.renderBoxWrapper}>
                  {renderBox(box, index)}
                  <PlusIcon className={classNames.taskDescriptionIcon} />
                </div>
              ) : (
                renderBox(box, index, task.boxesBefore.length === 1)
              ),
            )}
          </div>
        )}

        <EqualIcon className={classNames.taskDescriptionIcon} />

        <div className={classNames.sideWrapper}>
          {task.boxes?.map((box, index) =>
            index !== task.boxes.length - 1 ? (
              <div key={index} className={classNames.renderBoxWrapper}>
                {renderBox(box, index)}
                <PlusIcon className={classNames.taskDescriptionIcon} />
              </div>
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
          <img src="/assets/icons/big-box.svg" className={classNames.bigBoxSvg} alt="big-box" />
          <BoxArrow className={classNames.boxArrowSvg} />

          <div className={classNames.gridBoxesWrapper}>
            {task.boxesBefore.map((el, i) => (
              <div key={i} className={classNames.gridBoxWrapper}>
                {el.amount > 1 && (
                  <div className={classNames.superboxWrapper}>
                    <CubeIcon className={classNames.cubeIconSvg} />
                    <Typography className={classNames.imgNum}>{el.amount > 1 && ` x${el.amount}`}</Typography>
                  </div>
                )}
                <div className={classNames.gridEditWrapper}>
                  {el.items.map((product, productIndex) => renderProductImages(product, productIndex))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )

    const taskEditDescription = () => (
      <div className={classNames.blockProductsImagesWrapper}>
        <div className={classNames.receiveOrEditWrapper}>
          <img src="/assets/icons/big-box.svg" className={classNames.bigBoxSvg} />
          <EditIcon className={classNames.boxEditSvg} />

          {task.boxesBefore[0]?.amount > 1 && (
            <div className={classNames.superboxWrapper}>
              <CubeIcon className={classNames.cubeIconSvg} />
              <Typography className={classNames.imgNum}>
                {task.boxesBefore[0].amount > 1 && ` x${task.boxesBefore[0].amount}`}
              </Typography>
            </div>
          )}

          <div className={classNames.gridEditWrapper}>
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

    return <div className={classNames.taskDescriptionScrollWrapper}>{renderTaskDescription(task.operationType)}</div>
  }, styles),
)

export const IdCell = React.memo(
  withStyles(
    ({ id }) => (
      <React.Fragment>
        <Typography>{`id: ${id}`}</Typography>
      </React.Fragment>
    ),
    styles,
  ),
)

export const NoActiveBarcodeCell = React.memo(
  withStyles(
    ({ classes: classNames, barCode }) => (
      <React.Fragment>
        <Typography className={classNames.noActivebarCode}>{barCode || '-'}</Typography>
      </React.Fragment>
    ),
    styles,
  ),
)

export const ShowBarcodeOrHscodeCell = React.memo(
  withStyles(
    ({ classes: classNames, barCode, hsCode, handlers }) => (
      <div className={classNames.showButton}>
        <Button onClick={() => handlers.showBarcodeOrHscode(barCode, hsCode)}>{t(TranslationKey.View)}</Button>
      </div>
    ),
    styles,
  ),
)

export const FourMonthesStockCell = React.memo(
  withStyles(
    ({ classes: classNames, onClickSaveFourMonthsStock, rowId, fourMonthesStock, value }) => (
      <div className={classNames.fourMonthesStockWrapper}>
        <Typography className={classNames.fourMonthesStockLabel}>{`${t(
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
    ),
    styles,
  ),
)

export const CommentUsersCell = React.memo(
  withStyles(
    ({ classes: classNames, handler, id, comment, maxLength }) => (
      <div className={classNames.CommentUsersCellWrapper}>
        <ChangeInputCommentCell id={id} text={comment} maxLength={maxLength || 128} onClickSubmit={handler} />
      </div>
    ),
    styles,
  ),
)

export const ActualCostWithDelivery = React.memo(
  withStyles(
    ({
      classes: classNames,
      actualShippingCost,
      rowMemo,
      calculationMethod,
      isActualGreaterTheVolume,
      volumeWeightCoefficient,
      finalWeight,
    }) => {
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
        <div className={classNames.pricesWrapper}>
          {rowMemo.items.map((el, i) => (
            <Typography key={i} className={classNames.multilineText}>
              {toFixedWithDollarSign(getTotalCost(el), 2) || '-'}
            </Typography>
          ))}
        </div>
      )
    },
    styles,
  ),
)

export const ActualCostWithDeliveryPerUnit = React.memo(
  withStyles(
    ({
      classes: classNames,
      actualShippingCost,
      rowMemo,
      calculationMethod,
      isActualGreaterTheVolume,
      volumeWeightCoefficient,
      finalWeight,
    }) => {
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
        <div className={classNames.pricesWrapper}>
          {rowMemo.items.map((el, i) => (
            <Typography key={i} className={classNames.multilineText}>
              {toFixedWithDollarSign(getTotalCost(el), 2) || '-'}
            </Typography>
          ))}
        </div>
      )
    },
    styles,
  ),
)

export const ActiveBarcodeCell = React.memo(
  withStyles(
    ({ classes: classNames, barCode }) => (
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
  ),
)

export const ToFixedWithKgSignCell = React.memo(
  withStyles(
    ({ classes: classNames, value, fix, amount }) => (
      <div className={classNames.multilineTextWrapper}>
        <Typography className={classNames.multilineText}>
          {!value ? (value === 0 ? 0 : '-') : toFixedWithKg(value, fix)}
        </Typography>
      </div>
    ),
    styles,
  ),
)

export const SmallRowImageCell = React.memo(
  withStyles(
    ({ classes: classNames, image }) => (
      <div className={classNames.smallRowImgWrapper}>
        <img alt="" className={classNames.img} src={getAmazonImageUrl(image)} />
      </div>
    ),
    styles,
  ),
)

export const ToFixedCell = React.memo(
  withStyles(
    ({ classes: classNames, value, fix }) => (
      <div className={classNames.multilineTextWrapper}>
        <Typography className={classNames.multilineText}>
          {!value ? (value === 0 ? 0 : '-') : toFixed(value, fix)}
        </Typography>
      </div>
    ),
    styles,
  ),
)

export const ToFixedWithDollarSignCell = React.memo(
  withStyles(
    ({ classes: classNames, value, fix, leftAlign }) => (
      <div className={classNames.multilineTextWrapper}>
        <Typography className={cx(classNames.multilineText, { [classNames.multilineLeftAlignText]: leftAlign })}>
          {!value ? (value === 0 ? 0 : '-') : toFixedWithDollarSign(value, fix)}
        </Typography>
      </div>
    ),
    styles,
  ),
)

export const SuccessActionBtnCell = React.memo(
  withStyles(
    ({ classes: classNames, onClickOkBtn, bTnText, tooltipText, isFirstRow }) => (
      <Button
        success
        tooltipInfoContent={isFirstRow && tooltipText}
        className={classNames.actionBtn}
        onClick={onClickOkBtn}
      >
        {bTnText}
      </Button>
    ),
    styles,
  ),
)

export const NormalActionBtnCell = React.memo(
  withStyles(
    ({ classes: classNames, onClickOkBtn, bTnText, tooltipText, disabled, isFirstRow }) => (
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
    ),
    styles,
  ),
)

export const WarehouseMyTasksBtnsCell = React.memo(
  withStyles(
    ({ classes: classNames, handlers, isFirstRow, operationType, rowId, boxId }) => (
      <div className={classNames.warehouseMyTasksBtnsWrapper}>
        <Button
          success
          tooltipInfoContent={isFirstRow && t(TranslationKey['Open a window to perform a task'])}
          className={classNames.warehouseMyTasksSuccessBtn}
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
            className={cx(classNames.rowCancelBtn, classNames.warehouseMyTasksCancelBtn)}
            onClick={() => {
              handlers.onClickCancelTask(boxId, rowId, operationType)
            }}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        )}
      </div>
    ),
    styles,
  ),
)

export const ClientTasksActionBtnsCell = React.memo(
  withStyles(({ classes: classNames, row, handlers }) => {
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
                  className={classNames.cancelTaskBtn}
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
                  className={classNames.cancelTaskBtn}
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

    return <div className={classNames.clientTasksActionBtnsWrapper}>{renderHistoryItem()}</div>
  }, styles),
)

export const ClientNotificationsBtnsCell = React.memo(
  withStyles(
    ({ classes: classNames, row, handlers, disabled }) => (
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
  ),
)

export const ProductMyRequestsBtnsCell =
  //  React.memo(
  withStyles(({ classes: classNames, rowId, row, handlers }) => {
    const disableOpenResultBtn =
      !row.countProposalsByStatuses.acceptedProposals &&
      !row.countProposalsByStatuses.atWorkProposals &&
      !row.countProposalsByStatuses.verifyingProposals

    return (
      <div className={classNames.productMyRequestsBtnsWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classNames.productMyRequestsBtn}
          onClick={() => handlers.onClickOpenRequest(rowId)}
        >
          {t(TranslationKey['Open a request'])}
        </Button>
        <Button
          success
          disabled={disableOpenResultBtn}
          className={classNames.productMyRequestsBtn}
          onClick={() => handlers.onClickOpenResult(rowId)}
        >
          {t(TranslationKey['Open result'])}
        </Button>
      </div>
    )
  }, styles)
// )

export const SuperboxQtyCell = React.memo(
  withStyles(
    ({ classes: classNames, qty, superbox }) => (
      <div className={classNames.superBoxQtyWrapper}>
        <Typography>{qty * superbox}</Typography>
        {/* <Typography className={classNames.superboxTypo}>{` x ${superbox}`}</Typography> */}
      </div>
    ),
    styles,
  ),
)

export const OrderManyItemsCell = React.memo(
  withStyles(({ classes: classNames, box, error, withoutSku, imageSize }) => {
    const isEqualsItems = box.items.every(el => el.product._id === box.items[0].product._id)

    const renderProductInfo = () => (
      <div className={classNames.manyItemsOrderWrapper}>
        {box.items.map((item, itemIndex) => (
          <div key={itemIndex} className={classNames.order}>
            <img
              alt=""
              src={item.product.images[0] && getAmazonImageUrl(item.product.images[0])}
              className={cx(classNames.orderImg, {
                [classNames.orderImageBig]: imageSize === 'big',
              })}
            />
            <div>
              <Typography className={classNames.manyItemsOrderTitle}>{item.product.amazonTitle}</Typography>
              <Typography className={classNames.orderText}>
                <span className={classNames.orderTextSpan}>{t(TranslationKey.ASIN) + ': '}</span>
                {item.product.asin}
              </Typography>

              {!withoutSku ? (
                <Typography className={classNames.orderText}>
                  <span className={classNames.orderTextSpan}>{t(TranslationKey.SKU) + ': '}</span>
                  {item.product.skusByClient?.length ? item.product.skusByClient.join(',') : t(TranslationKey.Missing)}
                </Typography>
              ) : null}

              {(item.deliveryTotalPrice - item.deliveryTotalPriceChanged < 0 ||
                item?.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE) &&
                itemIndex === 0 && (
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
      <div className={classNames.manyItemsMainWrapper}>
        <Tooltip title={renderProductInfo()} classes={{ popper: classNames.manyItemsMainWrapperTooltip }}>
          <div>
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
          </div>
        </Tooltip>

        {isEqualsItems ? (
          <OrderCell box={box} product={box.items[0].product} superbox={box?.amount > 1 && box?.amount} />
        ) : null}
      </div>
    )
  }, styles),
)

export const ScrollingCell = React.memo(
  withStyles(
    ({ classes: classNames, value, fontSize }) => (
      <React.Fragment>
        <Typography style={{ fontSize }} className={classNames.scrollingValue}>
          {value || '-'}
        </Typography>
      </React.Fragment>
    ),
    styles,
  ),
)

export const ManyItemsPriceCell = React.memo(
  withStyles(
    ({ classes: classNames, params, withoutSku, withQuantity }) => {
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

      return <div className={classNames.ManyItemsPriceCellMainWrapper}>{cell}</div>
    },

    styles,
  ),
)

export const PricePerUnitCell = React.memo(
  withStyles(
    ({ classes: classNames, item }) => (
      <div className={classNames.pricesWrapper}>
        {item.items.map((el, i) => (
          <Typography key={i} className={classNames.multilineText}>
            {/* {toFixedWithDollarSign(calcSupplierPriceForUnit(el.order.orderSupplier), 2)} */}
            {toFixedWithDollarSign(el.order.totalPrice / el.order.amount, 2)}
          </Typography>
        ))}
      </div>
    ),
    styles,
  ),
)

export const FinalPricePerUnitCell = React.memo(
  withStyles(
    ({ classes: classNames, box, boxFinalWeight }) => (
      <div className={classNames.pricesWrapper}>
        {box.items.map((el, i) => (
          <Typography key={i} className={classNames.multilineText}>
            {toFixedWithDollarSign(
              // calcSupplierPriceForUnit(el.order.orderSupplier)

              el.order.totalPrice / el.order.amount + (boxFinalWeight * getTariffRateForBoxOrOrder(box)) / el.amount,
              // calculateDeliveryCostPerPcs({
              //   itemSupplierBoxWeightGrossKg: el.order.orderSupplier.boxProperties?.boxWeighGrossKg,
              //   deliveryCost: box.deliveryTotalPrice,
              //   itemAmount: el.amount,
              //   itemSupplierAmountInBox: el.order.orderSupplier.boxProperties?.amountInBox,
              //   boxFinalWeight,
              //   box,
              // })

              2,
            )}
          </Typography>
        ))}
      </div>
    ),
    styles,
  ),
)

export const CopyAndEditLinkCell = React.memo(
  withStyles(({ classes: classNames, link, isEdit, onChangeText }) => {
    const [value, setValue] = useState(link)

    useEffect(() => {
      setValue(link)
    }, [link])

    return (
      <React.Fragment>
        {isEdit ? (
          <div className={classNames.ChangeInputCommentCellWrapper}>
            <Input
              autoFocus={false}
              inputProps={256}
              placeholder={t(TranslationKey.Comment)}
              className={classNames.changeInputComment}
              classes={{ input: classNames.changeInputComment }}
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
          <div className={classNames.CopyLinkWrapper}>
            <Link target="_blank" rel="noopener" className={classNames.linkText} href={checkAndMakeAbsoluteUrl(value)}>
              <Typography className={classNames.linkTextClass}>{value}</Typography>
            </Link>

            <CopyValue text={value} />
          </div>
        ) : (
          <Typography className={classNames.missingLinkText}>{t(TranslationKey.Missing)}</Typography>
        )}
      </React.Fragment>
    )
  }, styles),
)

export const EditOrRemoveBtnsCell = React.memo(
  withStyles(
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
  ),
)

export const EditOrRemoveIconBtnsCell = React.memo(
  withStyles(
    ({
      classes: classNames,
      row,
      handlers,
      isSubUsersTable,
      disableActionBtn,
      tooltipFirstButton,
      tooltipSecondButton,
      isFirstRow,
      isArchive,
      isSave,
      isShowButtonText = true,
    }) => {
      return (
        <div className={classNames.editOrRemoveIconBtnsCell}>
          {!isSave && (
            <Button
              tooltipInfoContent={isFirstRow && tooltipFirstButton}
              disabled={disableActionBtn}
              className={classNames.removeOrEditBtn}
              onClick={() => handlers && handlers.onClickEditBtn(row)}
            >
              {isSubUsersTable ? t(TranslationKey['Assign permissions']) : <EditOutlinedIcon />}
            </Button>
          )}

          {isSave && (
            <Button
              tooltipInfoContent={isFirstRow && tooltipFirstButton}
              disabled={disableActionBtn}
              className={classNames.removeOrEditBtn}
              onClick={() => handlers.onClickSaveBtn(row)}
            >
              {isSubUsersTable ? t(TranslationKey['Assign permissions']) : <SaveOutlinedIcon />}
            </Button>
          )}

          {handlers?.onTriggerArchive && (
            <Button
              success={isArchive}
              // tooltipInfoContent={isFirstRow && tooltipFirstButton}
              disabled={disableActionBtn}
              className={classNames.removeOrEditBtn}
              onClick={() => handlers?.onTriggerArchive(row)}
            >
              <img src={isArchive ? '/assets/icons/arrow-up.svg' : '/assets/icons/arrow-down.svg'} />
            </Button>
          )}

          {isArchive || isArchive === undefined ? (
            <Button
              danger
              tooltipInfoContent={isFirstRow && tooltipSecondButton}
              disabled={disableActionBtn}
              className={classNames.removeOrEditBtn}
              onClick={() => {
                handlers && handlers.onClickRemoveBtn(row)
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
          ) : null}
        </div>
      )
    },
    styles,
  ),
)

export const BatchBoxesCell = React.memo(
  withStyles(({ classes: classNames, boxes, productViewMode }) => {
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
        object[`${boxStr}${extraPay}`] = object[`${boxStr}${extraPay}`]
          ? [...object[`${boxStr}${extraPay}`], box]
          : [box]
      } else {
        object[boxStr] = object[boxStr] ? [...object[boxStr], box] : [box]
      }
    })
    const filteredBoxes = Object.values(object)

    return (
      <div
        className={cx(classNames.batchBoxesWrapper, {
          [classNames.withScrollBatchBoxesWrapper]: isAbbreviatedView,
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
  }, styles),
)

export const TrashCell = React.memo(
  withStyles(
    ({ classes: classNames, onClick, tooltipText, isFirstRow }) => (
      <Button tooltipInfoContent={isFirstRow && tooltipText} className={classNames.trashWrapper}>
        <img className={classNames.trashImg} src="/assets/icons/trash.svg" alt="" onClick={onClick} />
      </Button>
    ),
    styles,
  ),
)

export const WarehouseBoxesBtnsCell = React.memo(
  withStyles(
    ({ classes: classNames, row, handlers, isFirstRow }) => (
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

        {/* <Button disabled className={classNames.warehouseBoxesBtn} onClick={() => handlers.onEditBox(row)}>
        {t(TranslationKey.Edit)}
      </Button>

      <Button
        disabled={row.isDraft}
        className={classNames.warehouseBoxesBtn}
        tooltipInfoContent={isFirstRow && t(TranslationKey['Code for Harmonized System Product Identification'])}
        onClick={() => handlers.setHsCode(row)}
      >
        {row.items.some(item => !item.product.hsCode)
          ? t(TranslationKey['Add HS Code'])
          : t(TranslationKey['Edit HS Code'])}
      </Button> */}
      </div>
    ),
    styles,
  ),
)

export const ShopsReportBtnsCell = React.memo(
  withStyles(
    ({ classes: classNames, value, onClickSeeMore, isFirstRow }) => (
      <div className={classNames.shopsReportBtnsWrapper}>
        {/* <div className={classNames.shopsReportBtnsSubWrapper}> */}
        <Text /* tooltipInfoContent={isFirstRow && t(TranslationKey['Download the file to your device'])} */>
          <a download target="_blank" rel="noreferrer" href={value} className={classNames.downloadLink}>
            {t(TranslationKey.download)}
          </a>
        </Text>
        <Button
          /* tooltipInfoContent={isFirstRow && t(TranslationKey['Copy the link to the report'])} */
          className={classNames.copyImgButton}
        >
          <CopyValue text={value} />
        </Button>
        {/* </div> */}

        <Button
          /* tooltipInfoContent={isFirstRow && t(TranslationKey['Opens the table of a particular store'])} */
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
  ),
)

export const DownloadAndCopyBtnsCell = React.memo(
  withStyles(
    ({ classes: classNames, value, isFirstRow }) => (
      <>
        {value ? (
          <div className={classNames.shopsReportBtnsWrapper}>
            <div className={cx({ [classNames.tooltipWrapperMargin]: isFirstRow })}>
              <Text tooltipInfoContent={isFirstRow && t(TranslationKey['Download the file to your device'])}>
                <a
                  download
                  target="_blank"
                  rel="noreferrer"
                  href={value}
                  className={classNames.downloadLink}
                  onClick={e => e.stopPropagation()}
                >
                  {t(TranslationKey.View)}
                </a>
              </Text>
            </div>

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
  ),
)

export const ShortBoxDimensions = React.memo(
  withStyles(({ classes: classNames, box, volumeWeightCoefficient, curUser, handlers, unitsOption }) => {
    const finalWeight = calcFinalWeightForBox(box, volumeWeightCoefficient)

    const lengthConversion = getConversion(unitsOption, inchesCoefficient)
    const weightConversion = getConversion(unitsOption, poundsWeightCoefficient)
    const totalWeightConversion = getConversion(unitsOption, 12 / poundsWeightCoefficient, 12)
    const weightSizesType = getWeightSizesType(unitsOption)

    return (
      <div className={classNames.shortBoxDimensionsWrapper}>
        <Typography className={classNames.shortBoxDimensionsText}>{`${toFixed(
          box.lengthCmWarehouse / lengthConversion,
          2,
        )}x${toFixed(box.widthCmWarehouse / lengthConversion, 2)}x${toFixed(
          box.heightCmWarehouse / lengthConversion,
          2,
        )}`}</Typography>

        <Typography className={classNames.shortBoxDimensionsText}>{`${t(TranslationKey.Weight)}: ${toFixed(
          box.weighGrossKgWarehouse / weightConversion,
          2,
        )} ${weightSizesType}`}</Typography>

        <Typography className={classNames.shortBoxDimensionsText}>{`${t(TranslationKey['Volume weight'])}: ${toFixed(
          calcVolumeWeightForBox(box, volumeWeightCoefficient) / weightConversion,
          2,
        )} ${weightSizesType}`}</Typography>

        <Typography
          className={cx(classNames.shortBoxDimensionsText, {
            [classNames.alertText]: !box.isDraft && finalWeight / weightConversion < totalWeightConversion,
          })}
        >{`${t(TranslationKey['Final weight'])}: ${toFixed(
          finalWeight / weightConversion,
          2,
        )} ${weightSizesType}!`}</Typography>

        {!box.isDraft && finalWeight / weightConversion < totalWeightConversion && (
          <span className={classNames.alertText}>{`${t(TranslationKey['Weight less than'])} ${toFixed(
            totalWeightConversion,
            2,
          )} ${weightSizesType}!`}</span>
        )}

        {box.amount > 1 && (
          <Typography className={classNames.shortBoxDimensionsText}>{`${t(
            TranslationKey['Total final weight'],
          )}: ${toFixed(
            (calcFinalWeightForBox(box, volumeWeightCoefficient) / weightConversion) * box.amount,
            2,
          )} ${weightSizesType}`}</Typography>
        )}
      </div>
    )
  }, styles),
)

export const RedFlagsCell = React.memo(
  withStyles(
    ({ classes: classNames, flags }) => (
      <div className={classNames.redFlags}>
        <RedFlags activeFlags={flags} />
      </div>
    ),
    styles,
  ),
)
export const TagsCell = React.memo(
  withStyles(
    ({ classes: classNames, tags }) => (
      <div className={classNames.tags}>
        {tags?.map((el, index) => {
          const createTagText = `#${el.title}`
          const isValidTextLength = createTagText?.length <= MAX_LENGTH_TITLE

          return (
            <React.Fragment key={el._id}>
              <Tooltip title={!isValidTextLength ? createTagText : ''}>
                <p className={classNames.tagItem}>
                  {createTagText}
                  {index !== tags.length - 1 && ', '}
                </p>
              </Tooltip>
            </React.Fragment>
          )
        })}
      </div>
    ),
    styles,
  ),
)

export const OrderIdAndAmountCountCell = React.memo(
  withStyles(
    ({ classes: classNames, orderId, amount, onClickOrderId }) => (
      <div className={classNames.orderIdAndAmountCount}>
        <p className={classNames.multilineLink} onClick={onClickOrderId}>
          {orderId}
        </p>
        {amount >= 1 && (
          <div className={classNames.amountWithClocks}>
            <WatchLaterSharpIcon /> {amount}
          </div>
        )}
      </div>
    ),
    styles,
  ),
)

export const FormedCell = React.memo(
  withStyles(
    ({ classes: classNames, sub, onChangeIsFormedInBox, params }) => (
      <div className={classNames.formedCell}>
        <CheckboxCell
          disabled={params.row.originalData.isDraft || params.row.status !== BoxStatus.IN_STOCK}
          checked={params.value}
          onClick={onChangeIsFormedInBox}
        />
        {sub?.name && <MultilineTextCell text={sub.name} />}
      </div>
    ),
    styles,
  ),
)

export const SelectRowCell = React.memo(
  withStyles(
    ({
      classes: classNames,
      checkboxComponent,
      showVariationButton,
      isParentProduct,
      onClickShareIcon,
      onClickVariationButton,
    }) => (
      <div className={classNames.selectRowCellWrapper}>
        {checkboxComponent}

        <div className={classNames.buttonsWrapper}>
          <OpenInNewTabCell onClickOpenInNewTab={onClickShareIcon} />

          {showVariationButton && (
            <Tooltip
              arrow
              title={t(TranslationKey['Product variations'])}
              placement="top"
              classes={{ tooltip: classNames.tooltip, arrow: classNames.arrow }}
            >
              <div className={classNames.iconWrapper} onClick={onClickVariationButton}>
                {isParentProduct ? (
                  <ParentProductIcon className={classNames.shareLinkIcon} />
                ) : (
                  <VariationProductIcon className={classNames.shareLinkIcon} />
                )}
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    ),
    styles,
  ),
)

export const ProductInfoExtended = React.memo(
  withStyles(
    ({ classes: classNames, box, boxesLength }) => (
      <div className={classNames.batchProductsWrapper}>
        {boxesLength > 1 ? (
          <Typography className={classNames.batchProductsBoxesLength}>{`x${boxesLength}`}</Typography>
        ) : null}

        <div className={classNames.batchProductsSubWrapper}>
          {box.items.map((item, itemIndex) => (
            <div key={itemIndex} className={classNames.order}>
              <img alt="" src={getAmazonImageUrl(item.image)} className={classNames.orderImg} />
              <div className={classNames.batchProductInfoWrapper}>
                <Typography className={classNames.batchProductTitle}>{item.amazonTitle}</Typography>
                <div className={classNames.boxInfoWrapper}>
                  <Typography className={classNames.asinText}>{t(TranslationKey.ASIN) + ': '}</Typography>
                  <AsinOrSkuLink withCopyValue asin={item.asin} />
                </div>

                {box.deliveryTotalPriceChanged - box.deliveryTotalPrice > 0 && itemIndex === 0 && (
                  <Typography className={classNames.orderText}>
                    <span className={classNames.needPay}>{`${t(
                      TranslationKey['Extra payment required!'],
                    )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
                  </Typography>
                )}

                <div className={classNames.amountBoxesWrapper}>
                  <Typography className={classNames.amountBoxesText}>{`x ${item.amount}`}</Typography>
                  {box.amount > 1 && (
                    <Typography className={classNames.amountBoxesText}>{`Superbox x ${box.amount}`}</Typography>
                  )}
                </div>
              </div>
            </div>
          ))}

          {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
            <span className={classNames.needPay}>
              {t(TranslationKey['The tariff is invalid or has been removed!'])}
            </span>
          )}
        </div>
      </div>
    ),
    styles,
  ),
)

export const ProductInfoAbbreviated = React.memo(
  withStyles(
    ({ classes: classNames, box, boxesLength }) => (
      <div
        className={cx(classNames.abbreviatedBatchProductsWrapper, {
          [classNames.abbreviatedWrapperDivider]: boxesLength > 1 && box.items.length > 1,
        })}
      >
        <div className={cx(classNames.abbreviatedBatchProductsSubWrapper)}>
          {boxesLength > 1 && <Typography className={classNames.amountBoxesText}>{`x${boxesLength}`}</Typography>}

          <div className={classNames.abbreviatedBatchProductInfoMainWrapper}>
            {box.items.map((item, itemIndex) => (
              <>
                <div key={itemIndex} className={classNames.abbreviatedBatchProductInfoWrapper}>
                  <img alt="" src={getAmazonImageUrl(item.image)} className={classNames.abbreviatedImg} />

                  <div className={classNames.div}>
                    <Typography className={classNames.abbreviatedTitle}>{item.amazonTitle}</Typography>

                    {box.amount > 1 && (
                      <Typography className={classNames.amountBoxesText}>{`SBX${box.amount}`}</Typography>
                    )}
                  </div>

                  <div className={classNames.boxInfoWrapper}>
                    <Typography className={classNames.asinText}>{t(TranslationKey.ASIN) + ': '}</Typography>
                    <AsinOrSkuLink withCopyValue asin={item.asin} />
                  </div>

                  <Typography className={classNames.amountBoxesText}>{`X${item.amount}`}</Typography>
                </div>
                {box.deliveryTotalPriceChanged - box.deliveryTotalPrice > 0 && itemIndex === 0 && (
                  <Typography className={classNames.orderText}>
                    <span className={classNames.needPay}>{`${t(
                      TranslationKey['Extra payment required!'],
                    )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
                  </Typography>
                )}
              </>
            ))}
          </div>
        </div>

        {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
          <span className={classNames.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
        )}
      </div>
    ),
    styles,
  ),
)

export const IdeaActions = React.memo(
  withStyles(props => {
    const { classes: styles, onClickReject, onClickToCheck } = props

    return (
      <div className={styles.ideaActions}>
        <Button onClick={onClickToCheck}>{t(TranslationKey['To check'])}</Button>
        <Button danger onClick={onClickReject}>
          {t(TranslationKey.Reject)}
        </Button>
      </div>
    )
  }, styles),
)

export const IdeaRequests = React.memo(
  withStyles(props => {
    const {
      classes: styles,
      onFinishedOnly,
      onClickCreateRequest,
      onClickLinkRequest,
      onClickResultButton,
      onClickRequestId,
      onClickUnbindButton,
      withoutControls,
      row,
    } = props
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
  }, styles),
)

export const OnCheckingIdeaActions = React.memo(
  withStyles(props => {
    const { classes: styles, onClickAccept, onClickReject, isAcceptDisabled } = props

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
  }, styles),
)

export const IdeaSupplier = React.memo(
  withStyles(props => {
    const { classes: styles, onClickAddSupplier, suppliers } = props

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
  }, styles),
)

export const IdeaProduct = React.memo(
  withStyles(props => {
    const { classes: styles, onClickCreateCard, onClickSelectSupplier, rowData } = props

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
        {/* {((rowData.childProduct && !rowData.suppliers.length) || !rowData.variation) && (
          <Button small className={styles.ideaProductActionButton} onClick={() => onClickSelectSupplier(rowData)}>
            {t(TranslationKey['Set supplier to card'])}
          </Button>
        )} */}

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
  }, styles),
)

export const CreateCardIdeaActions = React.memo(
  withStyles(props => {
    const { classes: styles, rowHandlers, row } = props

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
  }, styles),
)

export const AddAsinIdeaActions = React.memo(
  withStyles(props => {
    const { classes: styles, rowHandlers, row } = props

    return (
      <Box display={'flex'} gap={'5px'}>
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
        {/* <Button small onClick={() => rowHandlers.onClickParseProductData(row.childProduct || row.parentProduct)}> */}
        {/*   {t(TranslationKey["Parse product data"])} */}
        {/* </Button> */}
      </Box>
    )
  }, styles),
)

export const RealizedIdeaActions = React.memo(
  withStyles(props => {
    const { classes: styles, rowHandlers, row } = props

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
  }, styles),
)

export const ClosedIdeaActions = React.memo(
  withStyles(props => {
    const { classes: styles, rowHandlers, row } = props

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
  }, styles),
)

export const AllIdeasActions = React.memo(
  withStyles(props => {
    const { classes: styles, row, rowHandlers } = props
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
  }, styles),
)

export const TimeFromSeconds = React.memo(
  withStyles(props => {
    const { classes: styles, seconds, color } = props
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
  }, styles),
)

export const OpenInNewTabCell = React.memo(
  withStyles(props => {
    const { classes: styles, onClickOpenInNewTab } = props

    return (
      <Tooltip
        arrow
        title={t(TranslationKey['Open in a new tab'])}
        placement="top"
        classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
      >
        <div className={styles.iconWrapper} onClick={onClickOpenInNewTab}>
          <ShareLinkIcon className={styles.shareLinkIcon} />
        </div>
      </Tooltip>
    )
  }, styles),
)

const OrderNotificationMessage = React.memo(
  withStyles(props => {
    const { classes: styles, navigateToHandler, notification } = props

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
  }, styles),
)

const BoxNotificationMessage = React.memo(
  withStyles(props => {
    const { classes: styles, navigateToHandler, notification } = props
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
  }, styles),
)

const RequestNotificationMessage = React.memo(
  withStyles(props => {
    const { classes: styles, navigateToHandler, notification } = props
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
            {t(TranslationKey['Status of the proposal'])}{' '}
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
            <NavLink to={getUrlToRequest(notification?._id)} className={styles.notificationId} target="_blank">
              {`"${notification?.humanFriendlyId || notification?.request?.humanFriendlyId}" `}
            </NavLink>
            {t(TranslationKey.expires)} {formatNormDateTime(notification?.timeoutAt)}
          </>
        )}
      </p>
    )
  }, styles),
)

const IdeaNotificationMessage = React.memo(
  withStyles(props => {
    const { classes: styles, navigateToHandler, notification } = props

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
  }, styles),
)

export const NotificationMessage = React.memo(
  withStyles(props => {
    const { classes: styles, notificationType, notification, navigateToHandler } = props

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
  }, styles),
)

export const MultipleAsinCell = React.memo(
  withStyles(props => {
    const { classes: styles, asinList } = props

    return (
      <div className={styles.multipleAsinWrapper}>
        {asinList.map((asin, index) => (
          <AsinOrSkuLink key={index} withCopyValue asin={asin} />
        ))}
      </div>
    )
  }, styles),
)
