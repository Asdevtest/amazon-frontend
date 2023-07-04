/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded'
import SaveIcon from '@mui/icons-material/Save'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Divider, Grid, Link, Typography, IconButton, Select, InputAdornment, MenuItem } from '@mui/material'

import React, { useEffect, useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import { observer } from 'mobx-react'

import { inchesCoefficient, sizesType } from '@constants/configs/sizes-settings'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { ideaStatus, ideaStatusByCode, ideaStatusByKey, ideaStatusTranslate } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { TableSupplier } from '@components/product/table-supplier'
import { Button } from '@components/shared/buttons/button'
import { ToggleBtnGroup } from '@components/shared/buttons/toggle-btn-group/toggle-btn-group'
import { ToggleBtn } from '@components/shared/buttons/toggle-btn-group/toggle-btn/toggle-btn'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { PhotoCarousel } from '@components/shared/photo-carousel'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { roundSafely } from '@utils/calculation'
import {
  checkIsAdmin,
  checkIsBuyer,
  checkIsClient,
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsSupervisor,
} from '@utils/checks'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { clearEverythingExceptNumbers, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './idea-view-and-edit-card.style'
import { useHistory } from 'react-router-dom'
import { routsPathes } from '@constants/navigation/routs-pathes'

const allowOrderStatuses = [
  `${ideaStatusByKey[ideaStatus.ON_CHECK]}`,
  `${ideaStatusByKey[ideaStatus.VERIFIED]}`,
  `${ideaStatusByKey[ideaStatus.CLOSED]}`,
]

const disabledOrderStatuses = [
  /* `${ideaStatusByKey[ideaStatus.CLOSED]}` */
]

export const IdeaViewAndEditCard = observer(
  ({
    curUser,
    inEdit,
    inCreate,
    idea,
    curIdea,
    onRemove,
    selectedSupplier,
    onClickCancelBtn,
    onClickSaveBtn,
    onSetCurIdea,
    onEditIdea,
    onCreateProduct,
    onClickSupplierBtns,
    onClickSupplier,
    onClickSaveIcon,
  }) => {
    const { classes: classNames } = useClassNames()

    const history = useHistory()
    const isDisabledForAdmin = history.location.pathname === routsPathes.ADMIN_INVENTORY_PRODUCT

    const [linkLine, setLinkLine] = useState('')

    const [showFullCard, setShowFullCard] = useState(idea ? false : true)

    const [images, setImages] = useState([])

    const setShowFullCardByCurIdea = () => {
      if (curIdea?._id === idea?._id) {
        setShowFullCard(!showFullCard)
      } else {
        onSetCurIdea(idea)
        setShowFullCard(true)
      }
    }

    useEffect(() => {
      if (curIdea?._id !== idea?._id && !inEdit) {
        setShowFullCard(idea ? false : true)
      } else if (curIdea?._id === idea?._id && inEdit) {
        setShowFullCard(true)
      } else if (curIdea?._id !== idea?._id && inEdit) {
        setShowFullCard(false)
      }

      setImages([])
    }, [curIdea?._id, inEdit])

    const sourceFormFields = {
      status: idea?.status,

      media: idea?.media?.length ? [...idea.media] : [],
      comments: idea?.comments || '',
      productName: idea?.productName || '',
      productLinks: idea?.productLinks || [],
      criteria: idea?.criteria || '',
      quantity: idea?.quantity || '',
      price: idea?.price || '',

      width: idea?.width || '',
      height: idea?.height || '',
      length: idea?.length || '',

      suppliers: idea?.suppliers || [],
      _id: idea?._id || null,
    }

    const [formFields, setFormFields] = useState(sourceFormFields)

    useEffect(() => {
      setFormFields(sourceFormFields)
    }, [idea])

    const onChangeField = fieldName => event => {
      const newFormFields = { ...formFields }
      if (
        ['price', 'width', 'height', 'length'].includes(fieldName) &&
        !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2)
      ) {
        return
      } else if (fieldName === 'quantity') {
        newFormFields[fieldName] = clearEverythingExceptNumbers(event.target.value)
      } else {
        newFormFields[fieldName] = event.target.value
      }

      setFormFields(newFormFields)
    }

    const onClickLinkBtn = () => {
      onChangeField('productLinks')({ target: { value: [...formFields.productLinks, linkLine] } })

      setLinkLine('')
    }

    const onRemoveLink = index => {
      const newArr = formFields.productLinks.filter((el, i) => i !== index)

      onChangeField('productLinks')({ target: { value: [...newArr] } })
    }

    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)

    const handleChange = (event, newAlignment) => {
      setSizeSetting(newAlignment)

      if (newAlignment === sizesType.INCHES) {
        setFormFields({
          ...formFields,
          width: toFixed(formFields.width / inchesCoefficient, 4),
          height: toFixed(formFields.height / inchesCoefficient, 4),
          length: toFixed(formFields.length / inchesCoefficient, 4),
        })
      } else {
        setFormFields({
          ...formFields,
          width: toFixed(roundSafely(formFields.width * inchesCoefficient), 2),
          height: toFixed(roundSafely(formFields.height * inchesCoefficient), 2),
          length: toFixed(roundSafely(formFields.length * inchesCoefficient), 2),
        })
      }
    }

    const calculateFieldsToSubmit = () => {
      const res = {
        ...formFields,

        width:
          (sizeSetting === sizesType.INCHES ? roundSafely(formFields.width * inchesCoefficient) : formFields.width) ||
          0,
        height:
          (sizeSetting === sizesType.INCHES ? roundSafely(formFields.height * inchesCoefficient) : formFields.height) ||
          0,
        length:
          (sizeSetting === sizesType.INCHES ? roundSafely(formFields.length * inchesCoefficient) : formFields.length) ||
          0,
      }

      return res
    }

    const calculateFieldsToCreateProductSubmit = () => {
      const res = {
        ...formFields,

        width:
          (sizeSetting === sizesType.CM ? roundSafely(formFields.width / inchesCoefficient) : formFields.width) || 0,
        height:
          (sizeSetting === sizesType.CM ? roundSafely(formFields.height / inchesCoefficient) : formFields.height) || 0,
        length:
          (sizeSetting === sizesType.CM ? roundSafely(formFields.length / inchesCoefficient) : formFields.length) || 0,
      }

      return res
    }

    const disableFields = idea && !(curIdea?._id === idea?._id && inEdit)

    const disabledSubmit = JSON.stringify(formFields) === JSON.stringify(sourceFormFields)

    return (
      <Grid item className={classNames.mainWrapper}>
        <div className={classNames.headerWrapper}>
          <Typography variant="h5" className={classNames.ideaTitle}>
            {formFields.productName}
          </Typography>

          {!inCreate && !checkIsSupervisor(UserRoleCodeMap[curUser.role]) && (
            <div className={classNames.orderStatusWrapper}>
              <Typography variant="h5" className={classNames.label}>
                {t(TranslationKey['Order status']) + ':'}
              </Typography>
              <Field
                tooltipInfoContent={t(TranslationKey['Current idea status'])}
                value={formFields?.status}
                containerClasses={classNames.fieldWrapper}
                inputComponent={
                  <Select
                    variant="filled"
                    value={formFields.status}
                    disabled={isDisabledForAdmin}
                    classes={{
                      select: cx({
                        [classNames.orange]: `${formFields?.status}` === `${ideaStatusByKey[ideaStatus.ON_CHECK]}`,

                        [classNames.green]: `${formFields?.status}` === `${ideaStatusByKey[ideaStatus.VERIFIED]}`,

                        [classNames.red]: `${formFields?.status}` === `${ideaStatusByKey[ideaStatus.CLOSED]}`,
                      }),
                    }}
                    input={
                      <Input
                        startAdornment={
                          <InputAdornment position="start">
                            <FiberManualRecordRoundedIcon
                              className={cx({
                                [classNames.orange]:
                                  `${formFields?.status}` === `${ideaStatusByKey[ideaStatus.ON_CHECK]}`,

                                [classNames.green]:
                                  `${formFields?.status}` === `${ideaStatusByKey[ideaStatus.VERIFIED]}`,

                                [classNames.red]: `${formFields?.status}` === `${ideaStatusByKey[ideaStatus.CLOSED]}`,
                              })}
                            />
                          </InputAdornment>
                        }
                      />
                    }
                    onChange={onChangeField('status')}
                  >
                    {Object.keys({
                      ...getObjectFilteredByKeyArrayWhiteList(ideaStatusByCode, allowOrderStatuses),
                    }).map((statusCode, statusIndex) => (
                      <MenuItem
                        key={statusIndex}
                        value={statusCode}
                        className={cx(
                          cx(classNames.stantartSelect, {
                            [classNames.orange]: statusCode === `${ideaStatusByKey[ideaStatus.ON_CHECK]}`,

                            [classNames.green]: statusCode === `${ideaStatusByKey[ideaStatus.VERIFIED]}`,

                            [classNames.red]: statusCode === `${ideaStatusByKey[ideaStatus.CLOSED]}`,
                            [classNames.disableSelect]: disabledOrderStatuses.includes(statusCode),
                          }),
                        )}
                        disabled={disabledOrderStatuses.includes(statusCode)}
                      >
                        {ideaStatusTranslate(ideaStatusByCode[statusCode])}
                      </MenuItem>
                    ))}
                  </Select>
                }
              />
              <SaveIcon
                className={cx(classNames.saveIcon, {
                  [classNames.disableSelect]: `${idea?.status}` === `${formFields?.status}`,
                })}
                onClick={() => {
                  if (`${idea?.status}` !== `${formFields?.status}`) {
                    onClickSaveIcon(formFields)
                  }
                }}
              />
            </div>
          )}
        </div>

        <div className={classNames.cardWrapper}>
          <div className={classNames.cardBlockWrapper}>
            <div className={!disableFields ? classNames.leftSubBlockWrapper : classNames.leftDisSubBlockWrapper}>
              <div className={!disableFields ? classNames.photoWrapper : classNames.bigPhotoWrapper}>
                <PhotoCarousel files={formFields?.media} />
              </div>

              {!disableFields ? <UploadFilesInput images={images} setImages={setImages} maxNumber={50} /> : null}
            </div>
          </div>

          <Divider className={classNames.divider} orientation="vertical" />

          <div className={classNames.cardBlockWrapper}>
            <Field
              multiline
              disabled={disableFields}
              className={classNames.commentField}
              labelClasses={classNames.spanLabel}
              inputProps={{ maxLength: 255 }}
              minRows={6}
              maxRows={6}
              label={t(TranslationKey.Comments)}
              value={formFields.comments}
              onChange={onChangeField('comments')}
            />
          </div>
        </div>

        <div className={cx(classNames.middleBlock, { [classNames.fullMiddleBlock]: showFullCard })}>
          <Typography className={classNames.supplierSearchTitle}>
            {t(TranslationKey['Supplier search options'])}
          </Typography>

          <div className={classNames.cardWrapper}>
            <div className={classNames.cardBlockWrapper}>
              <div className={classNames.middleSubBlockWrapper}>
                <Field
                  disabled={disableFields}
                  labelClasses={classNames.spanLabel}
                  inputProps={{ maxLength: 130 }}
                  label={t(TranslationKey['Product name'])}
                  value={formFields.productName}
                  onChange={onChangeField('productName')}
                />
                <span className={cx(classNames.count, { [classNames.error]: formFields.productName.length > 128 })}>{`${
                  formFields.productName.length
                } ${t(TranslationKey.of)} 128 ${t(TranslationKey.characters)}`}</span>

                <Field
                  multiline
                  disabled={disableFields}
                  className={classNames.criterionsField}
                  inputProps={{ maxLength: 250 }}
                  minRows={9}
                  maxRows={9}
                  label={t(TranslationKey['Important criteria'])}
                  value={formFields.criteria}
                  onChange={onChangeField('criteria')}
                />
              </div>
            </div>

            <Divider className={classNames.divider} orientation="vertical" />

            <div className={classNames.cardBlockWrapper}>
              <Field
                labelClasses={classNames.spanLabel}
                label={t(TranslationKey.Links)}
                containerClasses={classNames.linksContainer}
                inputComponent={
                  <div className={classNames.linksWrapper}>
                    {inEdit || inCreate ? (
                      <div className={classNames.inputWrapper}>
                        <Input
                          disabled={disableFields}
                          placeholder={t(TranslationKey['Link to the product'])}
                          inputProps={{ maxLength: 510 }}
                          value={linkLine}
                          className={classNames.input}
                          onChange={e => setLinkLine(e.target.value)}
                        />
                        <Button
                          disableElevation
                          disabled={!linkLine || disableFields}
                          className={classNames.defaultBtn}
                          variant="contained"
                          color="primary"
                          onClick={onClickLinkBtn}
                        >
                          {t(TranslationKey.Add)}
                        </Button>
                      </div>
                    ) : null}
                    <div className={classNames.linksSubWrapper}>
                      {formFields.productLinks.length ? (
                        formFields.productLinks.map((el, index) => (
                          <div key={index} className={classNames.linkWrapper}>
                            <Link target="_blank" href={el} className={classNames.linkTextWrapper}>
                              <Typography className={classNames.linkText}>{`${index + 1}. ${el}`}</Typography>
                            </Link>

                            <div className={classNames.linksBtnsWrapper}>
                              <CopyValue text={el} />
                              {!disableFields && (
                                <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveLink(index)}>
                                  <DeleteOutlineOutlinedIcon className={classNames.deleteBtn} />
                                </IconButton>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <Typography className={classNames.noDataText}>{t(TranslationKey['No data'])}</Typography>
                      )}
                    </div>
                  </div>
                }
              />

              <div className={classNames.shortFieldsWrapper}>
                <div className={classNames.shortFieldsSubWrapper}>
                  <Field
                    disabled={disableFields}
                    inputProps={{ maxLength: 6 }}
                    labelClasses={classNames.spanLabel}
                    inputClasses={classNames.shortInput}
                    label={t(TranslationKey.Quantity)}
                    value={formFields.quantity}
                    onChange={onChangeField('quantity')}
                  />
                  <Field
                    disabled={disableFields}
                    inputProps={{ maxLength: 6 }}
                    labelClasses={classNames.spanLabel}
                    inputClasses={classNames.shortInput}
                    label={t(TranslationKey['Desired purchase price']) + ', $'}
                    value={formFields.price}
                    onChange={onChangeField('price')}
                  />
                </div>

                <div className={classNames.sizesWrapper}>
                  <div className={classNames.sizesSubWrapper}>
                    <Typography className={classNames.demensionsTitle}>{t(TranslationKey.Dimensions)}</Typography>

                    <ToggleBtnGroup exclusive size="small" color="primary" value={sizeSetting} onChange={handleChange}>
                      <ToggleBtn disabled={sizeSetting === sizesType.INCHES} value={sizesType.INCHES}>
                        {'In'}
                      </ToggleBtn>
                      <ToggleBtn disabled={sizeSetting === sizesType.CM} value={sizesType.CM}>
                        {'Cm'}
                      </ToggleBtn>
                    </ToggleBtnGroup>
                  </div>

                  <div className={classNames.sizesBottomWrapper}>
                    <Field
                      disabled={disableFields}
                      inputProps={{ maxLength: 6 }}
                      labelClasses={classNames.spanLabel}
                      inputClasses={classNames.sizesInput}
                      containerClasses={classNames.sizesContainer}
                      label={t(TranslationKey.Width)}
                      value={formFields.width}
                      onChange={onChangeField('width')}
                    />
                    <Field
                      disabled={disableFields}
                      inputProps={{ maxLength: 6 }}
                      labelClasses={classNames.spanLabel}
                      inputClasses={classNames.sizesInput}
                      containerClasses={classNames.sizesContainer}
                      label={t(TranslationKey.Height)}
                      value={formFields.height}
                      onChange={onChangeField('height')}
                    />
                    <Field
                      disabled={disableFields}
                      inputProps={{ maxLength: 6 }}
                      labelClasses={classNames.spanLabel}
                      inputClasses={classNames.sizesInput}
                      containerClasses={classNames.sizesContainer}
                      label={t(TranslationKey.Length)}
                      value={formFields.length}
                      onChange={onChangeField('length')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Field
            labelClasses={classNames.spanLabel}
            label={t(TranslationKey.Suppliers)}
            containerClasses={classNames.linksContainer}
            inputComponent={
              <>
                {(checkIsBuyer(UserRoleCodeMap[curUser.role]) || checkIsClient(UserRoleCodeMap[curUser.role])) &&
                (inEdit || inCreate) ? (
                  <div className={classNames.supplierActionsWrapper}>
                    <div className={classNames.supplierContainer}>
                      <div className={classNames.supplierButtonWrapper}>
                        <Button
                          className={classNames.iconBtn}
                          onClick={() =>
                            onClickSupplierBtns('add', () =>
                              onClickSaveBtn(calculateFieldsToSubmit(), inCreate ? images : [], true),
                            )
                          }
                        >
                          <AddIcon />
                        </Button>
                        <Typography className={classNames.supplierButtonText}>
                          {t(TranslationKey['Add supplier'])}
                        </Typography>
                      </div>
                      {selectedSupplier ? (
                        <>
                          <div className={classNames.supplierButtonWrapper}>
                            <Button
                              tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                              className={classNames.iconBtn}
                              onClick={() =>
                                onClickSupplierBtns('edit', () => onClickSaveBtn(calculateFieldsToSubmit(), [], true))
                              }
                            >
                              <EditOutlinedIcon />
                            </Button>
                            <Typography className={classNames.supplierButtonText}>
                              {t(TranslationKey['Edit a supplier'])}
                            </Typography>
                          </div>
                          <div className={classNames.supplierButtonWrapper}>
                            <Button
                              tooltipInfoContent={t(TranslationKey['Delete the selected supplier'])}
                              className={cx(classNames.iconBtn, classNames.iconBtnRemove)}
                              onClick={() =>
                                onClickSupplierBtns('delete', () => onClickSaveBtn(calculateFieldsToSubmit(), [], true))
                              }
                            >
                              <DeleteOutlineOutlinedIcon />
                            </Button>
                            <Typography className={classNames.supplierButtonText}>
                              {t(TranslationKey['Delete supplier'])}
                            </Typography>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div className={classNames.supplierActionsWrapper}>
                    <div className={classNames.supplierContainer}>
                      {checkIsBuyer(UserRoleCodeMap[curUser.role]) ||
                      checkIsClient(UserRoleCodeMap[curUser.role]) ||
                      checkIsSupervisor(UserRoleCodeMap[curUser.role]) ? (
                        <div className={classNames.supplierButtonWrapper}>
                          <Button
                            disabled={!selectedSupplier /* || selectedSupplier.name === 'access denied' */}
                            tooltipInfoContent={t(TranslationKey['Open the parameters supplier'])}
                            className={classNames.iconBtn}
                            onClick={() => onClickSupplierBtns('view')}
                          >
                            <VisibilityOutlinedIcon />
                          </Button>
                          <Typography className={classNames.supplierButtonText}>
                            {t(TranslationKey['Open the parameters supplier'])}
                          </Typography>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}

                <TableSupplier
                  product={formFields}
                  selectedSupplier={selectedSupplier}
                  onClickSupplier={onClickSupplier}
                />
              </>
            }
          />
        </div>

        {inCreate || !disableFields ? (
          <div className={classNames.addOrEditBtnsWrapper}>
            <Button
              success
              disabled={disabledSubmit}
              variant="contained"
              color="primary"
              className={classNames.actionButton}
              onClick={() => onClickSaveBtn(calculateFieldsToSubmit(), images)}
            >
              {t(TranslationKey.Save)}
            </Button>

            <Button
              variant="text"
              className={cx(classNames.actionButton, classNames.btnLeftMargin, classNames.cancelBtn)}
              onClick={() => onClickCancelBtn()}
            >
              {t(TranslationKey.Close)}
            </Button>
          </div>
        ) : null}

        {idea && disableFields ? (
          <div className={classNames.existedIdeaBtnsWrapper}>
            {!checkIsAdmin(UserRoleCodeMap[curUser.role]) ? (
              <div className={classNames.existedIdeaBtnsSubWrapper}>
                {checkIsClient(UserRoleCodeMap[curUser.role]) || checkIsBuyer(UserRoleCodeMap[curUser.role]) ? (
                  <>
                    {!checkIsBuyer(UserRoleCodeMap[curUser.role]) ? (
                      <Button
                        success
                        tooltipInfoContent={t(TranslationKey['A new product card will appear in the inventory'])}
                        variant="contained"
                        color="primary"
                        className={[classNames.actionButton]}
                        onClick={() => onCreateProduct(calculateFieldsToCreateProductSubmit(formFields))}
                      >
                        {t(TranslationKey['Create a product card'])}
                      </Button>
                    ) : (
                      <div className={classNames.emptyBlock} />
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      className={classNames.actionButton}
                      onClick={() => onEditIdea(idea)}
                    >
                      {t(TranslationKey.Edit)}
                    </Button>
                  </>
                ) : null}
                <div>
                  {checkIsClient(UserRoleCodeMap[curUser.role]) || checkIsBuyer(UserRoleCodeMap[curUser.role]) ? (
                    <Button
                      danger
                      variant="contained"
                      className={[classNames.actionButton, classNames.btnLeftMargin]}
                      onClick={() => {
                        onRemove(formFields._id)
                      }}
                    >
                      {t(TranslationKey.Remove)}
                    </Button>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className={classNames.existedIdeaBtnsSubWrapper} />
            )}

            <div className={classNames.tablePanelSortWrapper} onClick={setShowFullCardByCurIdea}>
              <Typography className={classNames.tablePanelViewText}>
                {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
              </Typography>

              {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
            </div>
          </div>
        ) : null}
      </Grid>
    )
  },
)
