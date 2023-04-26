/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ClearIcon from '@mui/icons-material/Clear'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DoneIcon from '@mui/icons-material/Done'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined'
import PrintIcon from '@mui/icons-material/Print'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
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
  MenuItem,
  Rating,
  Select,
  Tooltip,
  Typography,
} from '@mui/material'

import React, {useEffect, useRef, useState} from 'react'

import {fromUnixTime} from 'date-fns'
import {flushSync} from 'react-dom'
import {useReactToPrint} from 'react-to-print'
import {withStyles} from 'tss-react/mui'

import {BoxStatus} from '@constants/box-status'
import {imageTypes} from '@constants/image-types'
import {OrderStatus, OrderStatusByKey} from '@constants/order-status'
import {MyRequestStatusTranslate} from '@constants/request-proposal-status'
import {RequestStatus} from '@constants/request-status'
import {ClockIcon} from '@constants/svg-icons'
import {mapTaskOperationTypeKeyToEnum, TaskOperationType} from '@constants/task-operation-type'
import {
  colorByTaskPriorityStatus,
  mapTaskPriorityStatusEnum,
  mapTaskPriorityStatusEnumToKey,
  TaskPriorityStatus,
  taskPriorityStatusTranslate,
} from '@constants/task-priority-status'
import {mapTaskStatusEmumToKey, TaskStatus, TaskStatusTranslate} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRolePrettyMap} from '@constants/user-roles'
import {zipCodeGroups} from '@constants/zip-code-groups'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {NewDatePicker} from '@components/date-picker/date-picker'
import {Field} from '@components/field'
import {Input} from '@components/input'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {SearchInput} from '@components/search-input'
import {WithSearchSelect} from '@components/selects/with-search-select'
import {RedFlags} from '@components/shared/redFlags/red-flags'
import {Text} from '@components/text'
import {UserLink} from '@components/user-link'

import {
  calcFinalWeightForBox,
  calcNumberMinusPercent,
  calcVolumeWeightForBox,
  getTariffRateForBoxOrOrder,
  roundHalf,
} from '@utils/calculation'
import {checkIsPositiveNum, checkIsString} from '@utils/checks'
import {
  formatDateForShowWithoutParseISO,
  formatDateTime,
  formatDateWithoutTime,
  formatNormDateTime,
  formatNormDateTimeWithParseISO,
  formatShortDateTime,
} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {
  checkAndMakeAbsoluteUrl,
  getShortenStringIfLongerThanCount,
  shortAsin,
  shortSku,
  toFixed,
  toFixedWithDollarSign,
  toFixedWithKg,
  trimBarcode,
} from '@utils/text'
import {t} from '@utils/translations'

import {styles} from './data-grid-cells.style'

export const UserCell = React.memo(
  withStyles(
    ({classes: classNames, user}) => (
      <div className={classNames.sabUserWrapper}>
        <div className={classNames.userAvatarWrapper}>
          <Avatar src={getUserAvatarSrc(user?._id)} className={classNames.userAvatar} />
        </div>

        <div className={classNames.sabUserInfoWrapper}>
          <div className={classNames.userLink}>
            <UserLink
              customStyles={{fontWeight: 600, fontSize: '14px', lineHeight: '19px'}}
              name={user?.name}
              userId={user?._id}
            />
          </div>

          <Typography className={classNames.userEmail}>{user?.email}</Typography>

          <div className={classNames.sabUserRatingWrapper}>
            <Typography className={classNames.ratingScore}>{`Rating ${toFixed(user?.rating, 1)}`}</Typography>

            <Rating disabled className={classNames.sabUserRating} value={user?.rating} />
          </div>
        </div>
      </div>
    ),
    styles,
  ),
)

export const UserMiniCell = React.memo(
  withStyles(
    ({classes: classNames, user}) => (
      <div className={classNames.userMainWrapper}>
        <Avatar src={getUserAvatarSrc(user?._id)} className={classNames.userCellAvatar} />

        <UserLink name={user?.name} userId={user?._id} />
      </div>
    ),
    styles,
  ),
)

export const InStockCell = React.memo(
  withStyles(
    ({classes: classNames, boxAmounts, box, onClickInStock}) => (
      <div className={classNames.inStockWrapper}>
        {boxAmounts
          ?.sort((x, y) => x.storekeeper.name.localeCompare(y.storekeeper.name))
          ?.map(el => (
            <div key={el._id} className={classNames.inStockSubWrapper}>
              <UserLink maxNameWidth={100} name={el.storekeeper?.name} userId={el.storekeeper?._id} />

              <Link
                target="_blank"
                underline={'hover'}
                className={classNames.linkWrapper}
                onClick={() => onClickInStock(box, el.storekeeper)}
              >
                <Typography>{el.amountInBoxes}</Typography>
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
  ),
)

export const AsinCell = React.memo(
  withStyles(
    ({classes: classNames, product, asin}) => (
      <div className={classNames.multilineTextHeaderWrapper}>
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
    ({classes: classNames, product}) => (
      <div className={classNames.asinCell}>
        <div className={classNames.asinCellContainer}>
          <img alt="" className={classNames.img} src={getAmazonImageUrl(product?.images?.slice()[0])} />

          <div className={classNames.csCodeTypoWrapper}>
            <Typography className={classNames.csCodeTypo}>{product?.amazonTitle}</Typography>
            <div className={classNames.copyAsin}>
              <Typography className={classNames.typoCell}>
                {t(TranslationKey.ASIN)}

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
              {product.asin ? <CopyValue text={product.asin} /> : null}
            </div>

            <div className={classNames.copyAsin}>
              <Typography className={classNames.typoCell}>
                {t(TranslationKey.SKU)}
                <span className={classNames.typoSpan}>
                  {product.skusByClient?.slice()[0]
                    ? shortSku(product.skusByClient?.slice()[0])
                    : t(TranslationKey.Missing)}
                </span>
              </Typography>
              {product.skusByClient?.slice()[0] ? <CopyValue text={product.skusByClient?.slice()[0]} /> : null}
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
    ({classes: classNames, product, preventDefault}) => (
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

            {/* {product.skusByClient?.slice()[0] ? <CopyValue text={product.skusByClient?.slice()[0]} /> : null} */}
          </div>
        </div>
      </div>
    ),
    styles,
  ),
)

export const AsinCopyCell = React.memo(
  withStyles(({classes: classNames, asinData}) => {
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
  withStyles(({classes: classNames, sourceString, withCopy, maxItemsDisplay, maxLettersInItem}) => {
    const [menuAnchor, setMenuAnchor] = useState(null)
    const handleClick = event => {
      setMenuAnchor(event.currentTarget)
    }
    const handleClose = () => {
      setMenuAnchor(null)
    }
    const items = Array.isArray(sourceString) ? sourceString : sourceString.split(', ')

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
      <div className={cx(classNames.flexDirectionColumn, classNames.adaptText)}>
        {items
          .slice(0, maxItemsDisplay)
          .filter(el => el)
          .map((item, i) => (
            <div key={i} className={classNames.multilineTextHeaderWrapper}>
              <Typography className={cx(classNames.typoCell, classNames.adaptText)}>
                {
                  <span className={cx(classNames.multilineHeaderText, classNames.adaptText)}>
                    {getShortenStringIfLongerThanCount(item, maxLettersInItem)}
                  </span>
                }
              </Typography>
              {withCopy && <CopyValue text={item} />}
            </div>
          ))}

        {items.length > maxItemsDisplay ? (
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
                {itemsForRender.map((item, i) => (
                  <div key={i} className={classNames.multilineTextHeaderWrapper}>
                    <Typography className={classNames.typoCell}>
                      {
                        <span className={classNames.multilineHeaderText}>
                          {getShortenStringIfLongerThanCount(item, maxLettersInItem)}
                        </span>
                      }
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
  }, styles),
)

export const ProductCell = React.memo(
  withStyles(
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
  ),
)

export const FeesValuesWithCalculateBtnCell = React.memo(
  withStyles(
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
  ),
)

export const SupplierCell = React.memo(
  withStyles(
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
  ),
)

export const UserLinkCell = React.memo(
  withStyles(
    ({classes: classNames, name, userId, blackText, customStyles}) => (
      <div className={classNames.userLinkWrapper}>
        <UserLink withAvatar name={name} userId={userId} blackText={blackText} customStyles={customStyles} />
      </div>
    ),
    styles,
  ),
)

export const SupervisorCell = React.memo(
  withStyles(
    ({classes: classNames, product}) => (
      <Typography className={classNames.researcherCell}>{!product.checkedBy ? '-' : product.checkedBy.name}</Typography>
    ),
    styles,
  ),
)

export const ResearcherCell = React.memo(
  withStyles(
    ({classes: classNames, product}) => (
      <Typography className={classNames.researcherCell}>{!product.createdBy ? '-' : product.createdBy.name}</Typography>
    ),
    styles,
  ),
)

export const ClientCell = React.memo(
  withStyles(
    ({classes: classNames, product}) => (
      <Typography className={classNames.researcherCell}>{!product.client ? '-' : product.client.name}</Typography>
    ),
    styles,
  ),
)

export const BuyerCell = React.memo(
  withStyles(
    ({classes: classNames, product}) => (
      <Typography className={classNames.researcherCell}>{!product.buyer ? '-' : product.buyer.name}</Typography>
    ),
    styles,
  ),
)

export const BarcodeCell = React.memo(
  withStyles(
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
  ),
)

export const HsCodeCell = React.memo(
  withStyles(
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
  ),
)

export const ChangeInputCell = React.memo(
  withStyles(({classes: classNames, row, onClickSubmit, text, disabled, isInts, maxLength}) => {
    const sourceValue = text ? text : ''

    const [value, setValue] = useState(sourceValue)
    const defaultValue = sourceValue

    useEffect(() => {
      setValue(sourceValue)
    }, [text])

    const [isMyInputFocused, setIsMyInputFocused] = useState(false)

    const [isShow, setShow] = useState(false)

    useEffect(() => {
      const listener = event => {
        if (isMyInputFocused && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
          event.preventDefault()
          setShow(true)
          setTimeout(() => {
            setShow(false)
          }, 2000)
          onClickSubmit(row, value)
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
          // className={cx(classNames.changeInput, {[classNames.inputValueNoExists]: !value})}

          className={classNames.changeInput}
          classes={{input: classNames.changeInput}}
          inputProps={{maxLength: maxLength ? maxLength : 7}}
          value={value}
          endAdornment={
            <InputAdornment position="start">
              {isShow && sourceValue !== value ? (
                <DoneIcon classes={{root: classNames.doneIcon}} />
              ) : sourceValue !== value ? (
                <div className={classNames.iconWrapper}>
                  <img
                    src={'/assets/icons/save-discet.svg'}
                    className={classNames.changeInputIcon}
                    onClick={() => {
                      setShow(true)
                      setTimeout(() => {
                        setShow(false)
                      }, 2000)
                      onClickSubmit(row, value)
                    }}
                  />
                  <ClearIcon classes={{root: classNames.clearIcon}} onClick={() => setValue(defaultValue)} />
                </div>
              ) : null}
            </InputAdornment>
          }
          onChange={e =>
            isInts
              ? setValue(checkIsPositiveNum(e.target.value) && e.target.value ? parseInt(e.target.value) : '')
              : setValue(e.target.value)
          }
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
    }) => {
      const [value, setValue] = useState(text)

      useEffect(() => {
        setValue(text)
      }, [text])

      const [isShow, setShow] = useState(false)

      return (
        <div className={classNames.ChangeInputCommentCellWrapper}>
          <Input
            multiline
            autoFocus={false}
            minRows={rowsCount ?? 2}
            maxRows={rowsCount ?? 2}
            inputProps={{maxLength: maxLength ? maxLength : 256}}
            placeholder={placeholder ?? t(TranslationKey.Comment)}
            disabled={disabled}
            className={classNames.changeInputComment}
            classes={{input: classNames.changeInputComment}}
            value={value}
            endAdornment={
              !!onClickSubmit && (
                <InputAdornment position="start" className={classNames.commentControls}>
                  {isShow && text !== value ? (
                    <DoneIcon classes={{root: classNames.doneIcon}} />
                  ) : text !== value ? (
                    <div className={classNames.iconWrapper}>
                      <img
                        src={'/assets/icons/save-discet.svg'}
                        className={classNames.changeInputIcon}
                        onClick={() => {
                          setShow(true)
                          setTimeout(() => {
                            setShow(false)
                          }, 2000)
                          onClickSubmit(id, value)
                        }}
                      />
                      <ClearIcon classes={{root: classNames.clearIcon}} onClick={() => setValue(text)} />
                    </div>
                  ) : null}
                </InputAdornment>
              )
            }
            onChange={e => {
              setValue(e.target.value)
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
    ({classes: classNames, files}) => (
      <div className={classNames.photoWrapper}>
        <PhotoAndFilesCarousel small width={'300px'} files={files} />
      </div>
    ),
    styles,
  ),
)

export const DateCell = React.memo(
  withStyles(({params}) => <Typography>{!params.value ? '-' : formatDateTime(params.value)}</Typography>, styles),
)

export const NormDateCell = React.memo(
  withStyles(
    ({classes: classNames, params}) => (
      <Typography className={classNames.normDateCellTypo}>
        {!(params && params.value) ? '-' : formatNormDateTime(params.value)}
      </Typography>
    ),
    styles,
  ),
)

export const NormDateWithoutTimeCell = React.memo(
  withStyles(
    ({classes: classNames, params}) => (
      <Typography className={classNames.normDateCellTypo}>
        {!(params && params.value) ? '-' : formatDateWithoutTime(params.value)}
      </Typography>
    ),
    styles,
  ),
)

export const ShortDateCell = React.memo(
  withStyles(
    ({classes: classNames, params}) => (
      <Typography className={classNames.shortDateCellTypo}>
        {!(params && params.value) ? '-' : formatShortDateTime(params.value)}
      </Typography>
    ),
    styles,
  ),
)

export const NormDateFromUnixCell = React.memo(
  withStyles(
    ({classes: classNames, value}) => (
      <Typography className={classNames.normDateCellTypo}>
        {!value ? '-' : formatDateForShowWithoutParseISO(fromUnixTime(value))}
      </Typography>
    ),
    styles,
  ),
)

export const NormDateWithParseISOCell = React.memo(
  withStyles(
    ({params}) => <Typography>{!params.value ? '-' : formatNormDateTimeWithParseISO(params.value)}</Typography>,
    styles,
  ),
)

export const OrderCell = React.memo(
  withStyles(
    ({classes: classNames, product, superbox, box, error, withoutSku, itemAmount, withQuantity}) => (
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
    const {classes: styles, files} = props
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
                  <Button className={styles.dapBtn} onClick={() => handleImagePreview(el)}>
                    <span>{el.fileName}</span>.{el.fileType}
                  </Button>

                  <IconButton sx={{color: '#0164F4'}} onClick={() => printFile(el)}>
                    <PrintIcon color="inherit" />
                  </IconButton>
                </Box>
              )}
              {!el.fileUrl && (
                <Typography sx={{marginLeft: '25px', width: 'fit-content'}}>
                  {t(TranslationKey['Not added'])}
                </Typography>
              )}
            </div>
          ))}
        </Box>

        <Box display="none">
          <img ref={imageRef} src={getAmazonImageUrl(selectedImage.fileUrl)} alt="Printed Image" />
        </Box>

        <BigImagesModal
          openModal={isOpenModal}
          setOpenModal={() => setIsOpenModal(prevState => !prevState)}
          images={[selectedImage.fileUrl]}
          controls={() => (
            <>
              <Button onClick={() => handlePrint()}>
                <PrintIcon color="inherit" />
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
    ({classes: classNames, superbox, superboxQty, qty, box, product, withoutSku, withQuantity}) =>
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
    ({classes: classNames, conditionsByRegion, inYuans}) => (
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
  ),
)

export const TaskPriorityCell =
  /* React.memo( */
  withStyles(
    ({classes: classNames, curPriority, onChangePriority, taskId}) => (
      <Select
        value={curPriority}
        className={classNames.nativeSelect}
        input={<Input className={classNames.nativeSelect} />}
        classes={{
          select: cx({
            [classNames.colorYellow]: curPriority === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.STANDART],
            [classNames.colorGreen]: curPriority === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.LONG],
            [classNames.colorRed]: [
              mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.URGENT],
              mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC],
            ].includes(curPriority),
          }),
        }}
        onChange={e => onChangePriority(taskId, e.target.value)}
      >
        {Object.keys(mapTaskPriorityStatusEnum)
          .filter(el => el !== curPriority)
          .map((statusCode, statusIndex) => (
            <MenuItem
              key={statusIndex}
              value={statusCode}
              style={{color: colorByTaskPriorityStatus(mapTaskPriorityStatusEnum[statusCode])}}
              className={classNames.menuItem}
            >
              {taskPriorityStatusTranslate(mapTaskPriorityStatusEnum[statusCode])}

              {TaskPriorityStatus.URGENT === mapTaskPriorityStatusEnum[statusCode] && (
                <img className={classNames.rushOrderImg} src="/assets/icons/fire.svg" alt="Fire" />
              )}
            </MenuItem>
          ))}
      </Select>
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
      const tariffName = storekeepers
        .find(el => el._id === boxesMy?.storekeeper?._id)
        ?.tariffLogistics.find(el => el._id === boxesMy?.logicsTariff?._id)?.name

      const curDestination = destinations.find(el => el._id === boxesMy?.destination?._id)

      const firstNumOfCode = curDestination?.zipCode[0]

      const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

      const tariffRate = storekeepers
        .find(el => el._id === boxesMy?.storekeeper?._id)
        ?.tariffLogistics.find(el => el._id === boxesMy?.logicsTariff?._id)?.conditionsByRegion[
        regionOfDeliveryName
      ]?.rate

      return (
        <div className={classNames.destinationAndTariffWrapper}>
          <div className={classNames.destination}>
            <WithSearchSelect
              disabled={disabled}
              width={160}
              selectedItemName={
                destinations.find(el => el._id === boxesMy?.destination?._id)?.name || t(TranslationKey['Not chosen'])
              }
              data={destinations.filter(el => el.storekeeper?._id !== boxesMy?.storekeeper._id)}
              searchFields={['name']}
              favourites={destinationsFavourites}
              onClickSetDestinationFavourite={setDestinationsFavouritesItem}
              onClickNotChosen={() => onSelectDestination(boxesMy?._id, {destinationId: null})}
              onClickSelect={el => onSelectDestination(boxesMy?._id, {destinationId: el._id})}
            />
          </div>
          <div className={classNames.tatiff}>
            <Button
              disableElevation
              disabled={disabled}
              variant={boxesMy?.storekeeper?._id && 'text'}
              className={classNames.storekeeperBtn}
              onClick={e => {
                e.stopPropagation()
                onClickSetTariff(boxesMy)
                setShowSelectionStorekeeperAndTariffModal()
              }}
            >
              {boxesMy?.storekeeper?._id
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
                : t(TranslationKey.Select)}
            </Button>
          </div>
        </div>
      )
    },
    styles,
  ),
)

export const CheckboxCell = React.memo(
  withStyles(
    ({classes: classNames, checked, disabled, onClick}) => (
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
    ({classes: classNames, value}) => (
      <Typography className={classNames.renderFieldValueCellText}>{!value && value !== 0 ? '-' : value}</Typography>
    ),
    styles,
  ),
)

export const BatchTrackingCell = React.memo(
  withStyles(
    ({classes: classNames, rowHandlers, id, trackingNumber, arrivalDate, disabled}) => (
      <div className={classNames.batchTrackingWrapper}>
        <Field
          containerClasses={cx(classNames.batchTrackingContainer)}
          label={t(TranslationKey['Batch tracking'])}
          labelClasses={classNames.batchTrackingTitle}
          inputComponent={
            <ChangeInputCommentCell
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
          containerClasses={cx(classNames.dateAndTimeContainerleft)}
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
  withStyles(({classes: classNames, id, arrivalDate, onClickSaveArrivalDate, disabled}) => {
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
              <DoneIcon classes={{root: cx(classNames.doneIcon, classNames.arrivalDateIcon)}} />
            ) : arrivalDate !== value ? (
              <div className={cx(classNames.iconWrapper, classNames.iconWrapperArrivalDate)}>
                <img
                  src={'/assets/icons/save-discet.svg'}
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
                  classes={{root: cx(classNames.clearIcon, classNames.arrivalDateIcon)}}
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
      noTextText,
      color,
      otherStyles,
      threeLines,
      withTooltip,
      leftAlign,
      tooltipText,
      withLineBreaks,
      onClickText,
      oneLines,
      illuminationCell,
      customTextStyles,
    }) => (
      <>
        {withTooltip || tooltipText ? (
          <Tooltip title={tooltipText || text}>
            <div
              className={cx(classNames.multilineTextWrapper, {[classNames.illuminationCell]: illuminationCell && text})}
            >
              <Typography
                className={cx(
                  classNames.multilineText,
                  {[classNames.multilineLeftAlignText]: leftAlign},
                  {[classNames.multilineLink]: onClickText && text},
                  {[classNames.threeMultilineText]: threeLines},
                  {[classNames.oneMultilineText]: oneLines},
                )}
                style={otherStyles || customTextStyles || (color && {color})}
                onClick={onClickText && onClickText}
              >
                {checkIsString(text) && !withLineBreaks ? text.replace(/\n/g, ' ') : text || noTextText || '-'}
              </Typography>
            </div>
          </Tooltip>
        ) : (
          <div
            className={cx(classNames.multilineTextWrapper, {[classNames.illuminationCell]: illuminationCell && text})}
          >
            <Typography
              className={cx(
                classNames.multilineText,
                {[classNames.multilineLeftAlignText]: leftAlign},
                {[classNames.multilineLink]: onClickText && text},
                {[classNames.threeMultilineText]: threeLines},
                {[classNames.oneMultilineText]: oneLines},
                {[classNames.fulfilled]: customTextStyles},
              )}
              style={otherStyles || customTextStyles || (color && {color})}
              onClick={onClickText && onClickText}
            >
              {checkIsString(text) && !withLineBreaks ? text.replace(/\n/g, ' ') : text || noTextText || '-'}
            </Typography>
          </div>
        )}
      </>
    ),
    styles,
  ),
)

export const VacantRequestPriceCell = React.memo(
  withStyles(({classes: classNames, price, cashBackInPercent, AlignLeft}) => {
    const discountedPrice = calcNumberMinusPercent(price, cashBackInPercent)

    return (
      <div className={cx(classNames.priceCellWrapper, {[classNames.priceCellWrapperAlignLeft]: AlignLeft})}>
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
  withStyles(({classes: classNames, value}) => {
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
    ({classes: classNames, productsInWarehouse}) => (
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
  ),
)

export const MultilineTextAlignLeftCell = React.memo(
  withStyles(
    ({classes: classNames, text, withTooltip, isAsin, pointer, fourLines}) =>
      withTooltip ? (
        <Tooltip title={text}>
          <div className={classNames.multilineTextAlignLeftWrapper}>
            <Typography
              // disabled
              className={cx(
                classNames.multilineTextAlignLeft,
                {[classNames.cursorPointer]: pointer},
                {[classNames.fourLinesTextAlignLeft]: fourLines},
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
              className={cx(classNames.multilineAsinTextAlignLeft, {[classNames.fourLinesTextAlignLeft]: fourLines})}
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
    ({classes: classNames, text}) => (
      <div className={classNames.multilineTextAlignLeftHeaderWrapper}>
        <Typography className={classNames.multilineTextAlignLeftHeader}>{text}</Typography>
      </div>
    ),
    styles,
  ),
)

export const MultilineTextHeaderCell = React.memo(
  withStyles(
    ({classes: classNames, text, withIcon, isShowIconOnHover, isFilterActive}) => (
      <Tooltip title={text}>
        <div className={classNames.multilineTextHeaderWrapper}>
          <Typography className={classNames.multilineHeaderText}>{text}</Typography>
          {withIcon || isShowIconOnHover || isFilterActive ? (
            <FilterAltOutlinedIcon
              className={cx(classNames.headerIcon, {
                [classNames.headerIconBlue]: isFilterActive,
              })}
            />
          ) : null}
        </div>
      </Tooltip>
    ),
    styles,
  ),
)

export const IconHeaderCell = React.memo(withStyles(({classes: classNames, url}) => <img src={url} />, styles))

export const PriorityAndChinaDeliverCell = React.memo(
  withStyles(({classes: classNames, priority, chinaDelivery, status}) => {
    const isPendingOrder = Number(status) <= Number(OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])

    return (
      <div className={classNames.priorityAndChinaDeliveryWrapper}>
        {isPendingOrder ? <ClockIcon className={classNames.clockIcon} /> : null}

        <div>
          {priority === '40' ? (
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
  withStyles(({classes: classNames, boxesData}) => {
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
    ({classes: classNames, text}) => (
      <div className={classNames.textHeaderWrapper}>
        <Typography className={classNames.headerText}>{text}</Typography>
      </div>
    ),
    styles,
  ),
)

export const MultilineStatusCell = React.memo(
  withStyles(
    ({classes: classNames, status, leftAlign}) => (
      <div className={classNames.multilineTextWrapper}>
        <Typography className={cx(classNames.statusMultilineText, {[classNames.multilineLeftAlignText]: leftAlign})}>
          {status?.replace(/_/g, ' ')}
        </Typography>
      </div>
    ),
    styles,
  ),
)

export const TaskStatusCell = React.memo(
  withStyles(({classes: classNames, status}) => {
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
  }, styles),
)

export const RequestStatusCell = React.memo(
  withStyles(({classes: classNames, status, isChat, styles}) => {
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
          style={{...styles, color: colorStatus}}
        >
          {MyRequestStatusTranslate(status)}
        </Typography>
      </div>
    )
  }, styles),
)

export const MultilineRequestStatusCell = React.memo(
  withStyles(({classes: classNames, status, fontSize = '14px', languageTag}) => {
    const [statusTranslate, setStatusTranslate] = useState(MyRequestStatusTranslate(status))

    useEffect(() => {
      setStatusTranslate(MyRequestStatusTranslate(status))
    }, [languageTag])

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
          {statusTranslate}
        </Typography>
      </div>
    )
  }, styles),
)

export const TaskTypeCell = React.memo(
  withStyles(({classes: classNames, task}) => {
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
        <Typography className={classNames.operationTypeText}>{renderTaskDescription(task.operationType)}</Typography>
      </div>
    )
  }, styles),
)

export const TaskDescriptionCell = React.memo(
  withStyles(({classes: classNames, task}) => {
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
                  <img key={index + '+'} src="/assets/icons/+.svg" className={classNames.taskDescriptionIcon} />
                </div>
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
              <div key={index} className={classNames.renderBoxWrapper}>
                {renderBox(box, index)}
                <img key={index + '+'} src="/assets/icons/+.svg" className={classNames.taskDescriptionIcon} />
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
          <img src="/assets/icons/big-box.svg" className={classNames.bigBoxSvg} />
          <img src="/assets/icons/box-arrow.svg" className={classNames.boxArrowSvg} />

          <div className={classNames.gridBoxesWrapper}>
            {task.boxesBefore.map((el, i) => (
              <div key={i} className={classNames.gridBoxWrapper}>
                {el.amount > 1 && (
                  <div className={classNames.superboxWrapper}>
                    <img src="/assets/icons/cube.svg" />
                    <Typography className={classNames.imgNum}>{el.amount > 1 && ` x${el.amount}`}</Typography>
                  </div>
                )}
                <Grid container spacing={2} className={classNames.gridEditWrapper}>
                  {el.items.map((product, productIndex) => renderProductImages(product, productIndex))}
                </Grid>
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
          <img src="/assets/icons/box-edit.svg" className={classNames.boxEditSvg} />

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

        case TaskOperationType.EDIT_BY_STOREKEEPER:
          return <>{taskEditDescription()}</>
      }
    }

    return <div className={classNames.taskDescriptionScrollWrapper}>{renderTaskDescription(task.operationType)}</div>
  }, styles),
)

export const IdCell = React.memo(
  withStyles(
    ({id}) => (
      <React.Fragment>
        <Typography>{`id: ${id}`}</Typography>
      </React.Fragment>
    ),
    styles,
  ),
)

export const NoActiveBarcodeCell = React.memo(
  withStyles(
    ({classes: classNames, barCode}) => (
      <React.Fragment>
        <Typography className={classNames.noActivebarCode}>{barCode || '-'}</Typography>
      </React.Fragment>
    ),
    styles,
  ),
)

export const ShowBarcodeOrHscodeCell = React.memo(
  withStyles(
    ({classes: classNames, barCode, hsCode, handlers}) => (
      <div className={classNames.showButton}>
        <Button onClick={() => handlers.showBarcodeOrHscode(barCode, hsCode)}>{t(TranslationKey.View)}</Button>
      </div>
    ),
    styles,
  ),
)

export const FourMonthesStockCell = React.memo(
  withStyles(
    ({classes: classNames, handlers, params, value}) => (
      <div className={classNames.fourMonthesStockWrapper}>
        <Typography className={classNames.fourMonthesStockLabel}>{`${t(
          TranslationKey.Repurchase,
        )}: ${value}`}</Typography>

        <ChangeInputCell
          isInts
          row={params.row.originalData}
          text={params.row.fourMonthesStock}
          onClickSubmit={handlers.onClickSaveFourMonthsStock}
        />
      </div>
    ),
    styles,
  ),
)

export const CommentUsersCell = React.memo(
  withStyles(
    ({classes: classNames, handler, params}) => (
      <div className={classNames.CommentUsersCellWrapper}>
        <ChangeInputCommentCell id={params.row._id} text={params?.row?.note?.comment} onClickSubmit={handler} />
      </div>
    ),
    styles,
  ),
)

export const CommentSourceFilesCell = React.memo(
  withStyles(
    ({classes: classNames, handler, params}) => (
      <div className={classNames.CommentUsersCellWrapper}>
        <ChangeInputCommentCell id={params.row._id} text={params?.row?.note?.comment} onClickSubmit={handler} />
      </div>
    ),
    styles,
  ),
)

export const ActiveBarcodeCell = React.memo(
  withStyles(
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
  ),
)

export const ToFixedWithKgSignCell = React.memo(
  withStyles(
    ({classes: classNames, value, fix, amount}) => (
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
    ({classes: classNames, images}) => (
      <div className={classNames.smallRowImgWrapper}>
        <img alt="" className={classNames.img} src={getAmazonImageUrl(images[0])} />
      </div>
    ),
    styles,
  ),
)

export const ToFixedCell = React.memo(
  withStyles(
    ({classes: classNames, value, fix}) => (
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
    ({classes: classNames, value, fix, leftAlign}) => (
      <div className={classNames.multilineTextWrapper}>
        <Typography className={cx(classNames.multilineText, {[classNames.multilineLeftAlignText]: leftAlign})}>
          {!value ? (value === 0 ? 0 : '-') : toFixedWithDollarSign(value, fix)}
        </Typography>
      </div>
    ),
    styles,
  ),
)

export const SuccessActionBtnCell = React.memo(
  withStyles(
    ({classes: classNames, onClickOkBtn, bTnText, tooltipText, isFirstRow}) => (
      <div className={classNames.successActionBtnWrapper}>
        <Button success tooltipInfoContent={isFirstRow && tooltipText} onClick={onClickOkBtn}>
          {bTnText}
        </Button>
      </div>
    ),
    styles,
  ),
)

export const NormalActionBtnCell = React.memo(
  withStyles(
    ({classes: classNames, onClickOkBtn, bTnText, tooltipText, disabled, isFirstRow, smallActionBtn}) => (
      <div className={classNames.normalActionBtnWrapper}>
        <Button
          disabled={disabled}
          tooltipInfoContent={isFirstRow && tooltipText}
          variant="contained"
          color="primary"
          className={cx(classNames.actionBtn, {[classNames.smallActionBtn]: smallActionBtn})}
          onClick={onClickOkBtn}
        >
          {bTnText}
        </Button>
      </div>
    ),
    styles,
  ),
)

export const WarehouseMyTasksBtnsCell = React.memo(
  withStyles(
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
  ),
)

export const ClientTasksActionBtnsCell = React.memo(
  withStyles(({classes: classNames, row, handlers}) => {
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
  }, styles),
)

export const ClientNotificationsBtnsCell = React.memo(
  withStyles(
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
  ),
)

export const ProductMyRequestsBtnsCell =
  //  React.memo(
  withStyles(
    ({classes: classNames, row, handlers}) => (
      <div className={classNames.productMyRequestsBtnsWrapper}>
        <Button
          variant="contained"
          color="primary"
          className={classNames.productMyRequestsBtn}
          onClick={() => handlers.onClickOpenRequest(row)}
        >
          {t(TranslationKey['Open a request'])}
        </Button>
        <Button
          success
          disabled
          className={classNames.productMyRequestsBtn}
          // onClick={() => {
          //   handlers.onTriggerOpenRejectModal(row)
          // }}
        >
          {t(TranslationKey['Open result'])}
        </Button>
      </div>
    ),
    styles,
  )
// )

export const AdminUsersActionBtnsCell = React.memo(
  withStyles(
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
  ),
)

export const SuperboxQtyCell = React.memo(
  withStyles(
    ({classes: classNames, qty, superbox}) => (
      <div className={classNames.superBoxQtyWrapper}>
        <Typography>{qty * superbox}</Typography>
        {/* <Typography className={classNames.superboxTypo}>{` x ${superbox}`}</Typography> */}
      </div>
    ),
    styles,
  ),
)

export const OrderManyItemsCell = React.memo(
  withStyles(({classes: classNames, box, error, withoutSku}) => {
    const isEqualsItems = box.items.every(el => el.product._id === box.items[0].product._id)

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
        <Tooltip title={renderProductInfo()}>
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
    ({classes: classNames, value}) => (
      <React.Fragment>
        <Typography className={classNames.scrollingValue}>{value || '-'}</Typography>
      </React.Fragment>
    ),
    styles,
  ),
)

// export const ScrollingCell = React.memo( withStyles(({classes: classNames, value}) => (
//   <React.Fragment>
//     <Typography className={classNames.scrollingValue}>{value || '-'}</Typography>
//   </React.Fragment>
// ))

export const MultilineCell = React.memo(
  withStyles(
    ({classes: classNames, value}) => (
      <React.Fragment>
        <Typography className={classNames.multilineValue}>{value || '-'}</Typography>
      </React.Fragment>
    ),
    styles,
  ),
)

export const ManyItemsPriceCell = React.memo(
  withStyles(
    ({classes: classNames, params, withoutSku, withQuantity}) => {
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
    ({classes: classNames, item}) => (
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
    ({classes: classNames, box, boxFinalWeight}) => (
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

export const ScrollingLinkCell = React.memo(
  withStyles(
    ({classes: classNames, value}) => (
      <React.Fragment>
        <Link
          target="_blank"
          rel="noopener"
          href={checkAndMakeAbsoluteUrl(value)}
          className={classNames.scrollingValue}
        >
          <Typography>{value || '-'}</Typography>
        </Link>
      </React.Fragment>
    ),
    styles,
  ),
)

export const CopyAndEditLinkCell = React.memo(
  withStyles(({classes: classNames, link, isEdit, onChangeText}) => {
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
              classes={{input: classNames.changeInputComment}}
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
    }) => (
      <div className={classNames.editOrRemoveIconBtnsCell}>
        <div className={classNames.editOrRemoveIconBtnsSubCell}>
          {!isSave && (
            <div className={classNames.editOrRemoveBtnWrapper}>
              <Button
                tooltipInfoContent={isFirstRow && tooltipFirstButton}
                disabled={disableActionBtn}
                className={classNames.removeOrEditBtn}
                onClick={() => handlers?.onClickEditBtn(row)}
              >
                {isSubUsersTable ? t(TranslationKey['Assign permissions']) : <EditOutlinedIcon />}
              </Button>
              <Typography className={classNames.editOrRemoveBtnText}>{'Edit'}</Typography>
            </div>
          )}

          {isSave && (
            <div className={classNames.editOrRemoveBtnWrapper}>
              <Button
                tooltipInfoContent={isFirstRow && tooltipFirstButton}
                disabled={disableActionBtn}
                className={classNames.removeOrEditBtn}
                onClick={() => handlers.onClickSaveBtn(row)}
              >
                {isSubUsersTable ? t(TranslationKey['Assign permissions']) : <SaveOutlinedIcon />}
              </Button>
              <Typography className={classNames.editOrRemoveBtnText}>{t(TranslationKey.Save)}</Typography>
            </div>
          )}

          {handlers?.onTriggerArchive && (
            <div className={classNames.editOrRemoveBtnWrapper}>
              <Button
                success={isArchive}
                // tooltipInfoContent={isFirstRow && tooltipFirstButton}
                disabled={disableActionBtn}
                className={classNames.removeOrEditBtn}
                onClick={() => handlers?.onTriggerArchive(row)}
              >
                <img src={isArchive ? '/assets/icons/arrow-up.svg' : '/assets/icons/arrow-down.svg'} />
              </Button>
              <Typography className={classNames.editOrRemoveBtnText}>{isArchive ? 'Reveal' : 'Hide'}</Typography>
            </div>
          )}
        </div>

        {isArchive || isArchive === undefined ? (
          <div className={classNames.editOrRemoveBtnWrapper}>
            <Button
              danger
              tooltipInfoContent={isFirstRow && tooltipSecondButton}
              disabled={disableActionBtn}
              // className={classNames.rowCancelBtn}
              className={classNames.removeOrEditBtn}
              onClick={() => {
                handlers?.onClickRemoveBtn(row)
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </Button>
            <Typography className={classNames.editOrRemoveBtnText}>{'Delete'}</Typography>
          </div>
        ) : null}
      </div>
    ),
    styles,
  ),
)

export const BatchBoxesCell = React.memo(
  withStyles(({classes: classNames, boxes}) => {
    const renderProductInfo = (box, boxesLength) => (
      <div className={classNames.batchProductsWrapper}>
        {boxesLength > 1 ? (
          <Typography className={classNames.batchProductsBoxesLength}>{`x${boxesLength}`}</Typography>
        ) : null}

        <div className={classNames.batchProductsSubWrapper}>
          {box.items.map((item, itemIndex) => (
            <div key={itemIndex} className={classNames.order}>
              <img alt="" src={getAmazonImageUrl(item.image)} className={classNames.orderImg} />
              <div>
                <Typography className={classNames.batchProductTitle}>{item.amazonTitle}</Typography>
                <div className={classNames.copyAsin}>
                  <Typography className={classNames.orderText}>
                    <span className={classNames.orderTextSpan}>{t(TranslationKey.ASIN) + ': '}</span>
                    {item.asin}
                  </Typography>
                  {item.asin ? <CopyValue text={item.asin} /> : null}
                  <Typography className={classNames.orderText}>
                    {box.deliveryTotalPriceChanged - box.deliveryTotalPrice > 0 && itemIndex === 0 && (
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
            <span className={classNames.needPay}>
              {t(TranslationKey['The tariff is invalid or has been removed!'])}
            </span>
          )}
        </div>
      </div>
    )

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
      <div className={classNames.batchBoxesWrapper}>
        {filteredBoxes.map((boxes, i) => (
          <div key={i}>{renderProductInfo(boxes[0], boxes.length)}</div>
        ))}
      </div>
    )
  }, styles),
)

export const TrashCell = React.memo(
  withStyles(
    ({classes: classNames, onClick, tooltipText, isFirstRow}) => (
      <Button tooltipInfoContent={isFirstRow && tooltipText} className={classNames.trashWrapper}>
        <img className={classNames.trashImg} src="/assets/icons/trash.svg" alt="" onClick={onClick} />
      </Button>
    ),
    styles,
  ),
)

export const WarehouseBoxesBtnsCell = React.memo(
  withStyles(
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
  ),
)

export const DownloadAndCopyBtnsCell = React.memo(
  withStyles(
    ({classes: classNames, value, isFirstRow}) => (
      <>
        {value ? (
          <div className={classNames.shopsReportBtnsWrapper}>
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
  withStyles(({classes: classNames, box, volumeWeightCoefficient, curUser, handlers}) => {
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

        {box.amount > 1 ? (
          <Typography className={classNames.shortBoxDimensionsText}>{`${t(
            TranslationKey['Total final weight'],
          )}: ${toFixedWithKg(calcFinalWeightForBox(box, volumeWeightCoefficient) * box.amount, 2)}`}</Typography>
        ) : null}

        {/* {checkIsStorekeeper(UserRoleCodeMap[curUser]) ? (
          <Button
            disabled={box.isDraft || box.status !== BoxStatus.IN_STOCK}
            className={cx(classNames.shortBoxDimensionsButton, {
              [classNames.editPaddingButton]: !box.isDraft && finalWeight < 12,
            })}
            onClick={() => handlers.setDimensions(box)}
          >
            {t(TranslationKey.Set)}
          </Button>
        ) : null} */}
      </div>
    )
  }, styles),
)

export const RedFlagsCell = React.memo(
  withStyles(
    ({classes: classNames, flags}) => (
      <div className={classNames.redFlags}>
        <RedFlags activeFlags={flags} />
      </div>
    ),
    styles,
  ),
)
export const TagsCell = React.memo(
  withStyles(
    ({classes: classNames, tags}) => (
      <div className={classNames.tags}>
        <MultilineTextHeaderCell
          text={
            <>
              {tags?.map((el, index) => (
                <p key={el._id} className={classNames.tagItem}>
                  #{el.title}
                  {index !== tags.length - 1 && ', '}
                </p>
              ))}
            </>
          }
        />
      </div>
    ),
    styles,
  ),
)

// export const ShortBoxDimensions = React.memo( withStyles(
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
