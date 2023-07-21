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
import { getObjectFilteredByKeyArrayWhiteList, objectDeepCompare } from '@utils/object'
import { clearEverythingExceptNumbers, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './idea-view-and-edit-card.style'
import { useHistory } from 'react-router-dom'
import { routsPathes } from '@constants/navigation/routs-pathes'
import { IdeaProgressBar } from './progress-bar'
import { SourceProduct } from './source-product'

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

    const disabledSubmit = objectDeepCompare(formFields, sourceFormFields)

    console.log('idea', idea)
    console.log('curIdea', curIdea)

    return (
      <div className={classNames.root}>
        <div className={classNames.headerWrapper}>
          <IdeaProgressBar />

          <SourceProduct />
          {/* <Typography variant="h5" className={classNames.ideaTitle}>
            {formFields.productName}
          </Typography> */}
        </div>

        <div className={cx(classNames.cardWrapper, { [classNames.fullCardWpapper]: showFullCard })}>
          <div className={classNames.mediaBlock}>
            {!inCreate && (
              <div className={classNames.photoCarouselWrapper}>
                <PhotoCarousel files={formFields?.media} />
              </div>
            )}

            {!disableFields && (
              <UploadFilesInput
                fullWidth
                withoutDragAndDropTitle
                dragAndDropBtnHeight={59}
                images={images}
                setImages={setImages}
                maxNumber={50}
              />
            )}
          </div>

          <div className={classNames.commentsWrapper}>
            <Field
              multiline
              // disabled={disableFields}
              className={classNames.сlientСomment}
              containerClasses={classNames.noMarginContainer}
              labelClasses={classNames.spanLabel}
              inputProps={{ maxLength: 255 }}
              sx={{
                '.MuiInputBase-inputMultiline': {
                  height: '100% !important',
                  width: '100% !important',
                },
              }}
              label={t(TranslationKey['Client commentary'])}
              value={formFields.comments}
              onChange={onChangeField('comments')}
            />

            <Field
              multiline
              // disabled={disableFields}
              label={t(TranslationKey['Buyer comments'])}
              labelClasses={classNames.spanLabel}
              className={classNames.buyerComment}
              containerClasses={classNames.noMarginContainer}
              inputProps={{ maxLength: 255 }}
              sx={{
                '.MuiInputBase-inputMultiline': {
                  height: '100% !important',
                  width: '100% !important',
                },
              }}
              value={formFields.comments}
              onChange={onChangeField('comments')}
            />
          </div>
        </div>

        {showFullCard && (
          <div className={cx(classNames.middleBlock, { [classNames.fullMiddleBlock]: showFullCard })}>
            <Typography className={classNames.supplierSearchTitle}>
              {t(TranslationKey['Supplier search options'])}
            </Typography>

            <div className={cx(classNames.cardWrapper, { [classNames.fullCardWpapper]: showFullCard })}>
              <div className={classNames.nameAndInfoProductWrapper}>
                <Field
                  disabled={disableFields}
                  label={t(TranslationKey['Product name'])}
                  inputProps={{ maxLength: 130 }}
                  value={formFields.productName}
                  labelClasses={classNames.spanLabel}
                  containerClasses={classNames.noMarginContainer}
                  className={classNames.oneLineField}
                  onChange={onChangeField('productName')}
                />

                <Field
                  multiline
                  disabled={disableFields}
                  labelClasses={classNames.spanLabel}
                  className={classNames.criterionsField}
                  containerClasses={classNames.noMarginContainer}
                  inputProps={{ maxLength: 250 }}
                  sx={{
                    '.MuiInputBase-inputMultiline': {
                      height: '100% !important',
                      width: '100% !important',
                    },
                  }}
                  label={t(TranslationKey['Important criteria'])}
                  value={formFields.criteria}
                  onChange={onChangeField('criteria')}
                />
              </div>

              <div className={classNames.linksAndDimensionsWrapper}>
                <Field
                  labelClasses={classNames.spanLabel}
                  label={t(TranslationKey.Links)}
                  containerClasses={classNames.noMarginContainer}
                  className={classNames.oneLineField}
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
                                  <IconButton
                                    className={classNames.deleteBtnWrapper}
                                    onClick={() => onRemoveLink(index)}
                                  >
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

                <div className={classNames.shortFieldsSubWrapper}>
                  <Field
                    disabled={disableFields}
                    inputProps={{ maxLength: 6 }}
                    labelClasses={classNames.spanLabel}
                    inputClasses={classNames.shortInput}
                    className={classNames.oneLineField}
                    containerClasses={cx(classNames.noMarginContainer, classNames.mediumSizeContainer)}
                    label={t(TranslationKey.Quantity)}
                    value={formFields.quantity}
                    onChange={onChangeField('quantity')}
                  />
                  <Field
                    disabled={disableFields}
                    inputProps={{ maxLength: 6 }}
                    labelClasses={classNames.spanLabel}
                    inputClasses={classNames.shortInput}
                    containerClasses={cx(classNames.noMarginContainer, classNames.mediumSizeContainer)}
                    label={t(TranslationKey['Desired purchase price']) + ', $'}
                    value={formFields.price}
                    className={classNames.oneLineField}
                    onChange={onChangeField('price')}
                  />
                </div>

                <div className={classNames.sizesWrapper}>
                  <div className={classNames.sizesSubWrapper}>
                    <p className={classNames.spanLabel}>{t(TranslationKey.Dimensions)}</p>

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
                      className={classNames.oneLineField}
                      containerClasses={cx(classNames.sizesContainer, classNames.noMarginContainer)}
                      label={t(TranslationKey.Width)}
                      value={formFields.width}
                      onChange={onChangeField('width')}
                    />
                    <Field
                      disabled={disableFields}
                      inputProps={{ maxLength: 6 }}
                      labelClasses={classNames.spanLabel}
                      inputClasses={classNames.sizesInput}
                      className={classNames.oneLineField}
                      containerClasses={cx(classNames.sizesContainer, classNames.noMarginContainer)}
                      label={t(TranslationKey.Height)}
                      value={formFields.height}
                      onChange={onChangeField('height')}
                    />
                    <Field
                      disabled={disableFields}
                      inputProps={{ maxLength: 6 }}
                      labelClasses={classNames.spanLabel}
                      inputClasses={classNames.sizesInput}
                      className={classNames.oneLineField}
                      containerClasses={cx(classNames.sizesContainer, classNames.noMarginContainer)}
                      label={t(TranslationKey.Length)}
                      value={formFields.length}
                      onChange={onChangeField('length')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showFullCard && (
          <div className={cx(classNames.middleBlock, { [classNames.fullMiddleBlock]: showFullCard })}>
            <Field
              labelClasses={classNames.spanLabel}
              label={t(TranslationKey.Suppliers)}
              containerClasses={classNames.noMarginContainer}
              inputComponent={
                <>
                  {(checkIsBuyer(UserRoleCodeMap[curUser.role]) || checkIsClient(UserRoleCodeMap[curUser.role])) &&
                  (inEdit || inCreate) ? (
                    <div className={classNames.supplierActionsWrapper}>
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
                  ) : (
                    <div className={classNames.supplierActionsWrapper}>
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
                  )}
                </>
              }
            />

            <TableSupplier product={formFields} selectedSupplier={selectedSupplier} onClickSupplier={onClickSupplier} />
          </div>
        )}

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
            <div className={classNames.tablePanelSortWrapper} onClick={setShowFullCardByCurIdea}>
              <Typography className={classNames.tablePanelViewText}>
                {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
              </Typography>

              {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
            </div>

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
          </div>
        ) : null}
      </div>
    )
  },
)
