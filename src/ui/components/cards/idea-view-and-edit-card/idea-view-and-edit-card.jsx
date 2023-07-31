/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import AddIcon from '@material-ui/icons/Add'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { IconButton, Link, Typography } from '@mui/material'

import { inchesCoefficient, sizesType } from '@constants/configs/sizes-settings'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { RequestSwitherType } from '@constants/requests/request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { TableSupplier } from '@components/product/table-supplier'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { PhotoCarousel } from '@components/shared/photo-carousel'
import { RadioButtons } from '@components/shared/radio-buttons/radio-buttons'
import { PlusIcon } from '@components/shared/svg-icons'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { roundSafely } from '@utils/calculation'
import {
  checkIsAdmin,
  checkIsBuyer,
  checkIsClient,
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsSupervisor,
} from '@utils/checks'
import { objectDeepCompare } from '@utils/object'
import { clearEverythingExceptNumbers, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './idea-view-and-edit-card.style'

import { IdeaRequestCard } from './idea-request-card'
import { IdeaProgressBar } from './progress-bar'
import { SourceProduct } from './source-product'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status.ts'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'

const radioBottonsSettings = [
  {
    label: t(TranslationKey['Supplier found']),
    value: ideaStatusByKey[ideaStatus.SUPPLIER_FOUND],
  },
  {
    label: t(TranslationKey['Supplier not found']),
    value: ideaStatusByKey[ideaStatus.SUPPLIER_NOT_FOUND],
  },
]

export const IdeaViewAndEditCard = observer(
  ({
    isModalView,
    curUser,
    inEdit,
    inCreate,
    idea,
    curIdea,
    selectedSupplier,
    currentProduct,
    onClickCancelBtn,
    onClickSaveBtn,
    onSetCurIdea,
    onEditIdea,
    onCreateProduct,
    onClickSupplierBtns,
    onClickSupplier,
    onClickCloseIdea,
    onClickAcceptButton,
    onClickRejectButton,
    onClickReoperButton,
    onClickResultButton,
    onClickLinkRequestButton,
    onClickCreateRequestButton,
    onClickOpenNewTab,
  }) => {
    const { classes: classNames } = useClassNames()

    const [linkLine, setLinkLine] = useState('')
    const [images, setImages] = useState([])
    const [showFullCard, setShowFullCard] = useState(false)

    const [formFields, setFormFields] = useState({})
    const [sizeSetting, setSizeSetting] = useState(sizesType.CM)
    const [showRequestType, setShowRequestType] = useState(RequestSwitherType.REQUESTS_ON_CHECK)
    const [requestsToRender, setRequestsToRender] = useState([])

    const isCurrentIdea = curIdea?._id === idea?._id

    useEffect(() => {
      if (showRequestType === RequestSwitherType.REQUESTS_ON_CHECK) {
        setRequestsToRender(formFields.requestsOnCheck)
      } else {
        setRequestsToRender(formFields.requestsOnFinished)
      }
    }, [showRequestType, formFields.requestsOnCheck, formFields.requestsOnFinished])

    const getShortIdea = () => ({
      _id: idea?._id,
      status: idea?.status,
      media: idea?.linksToMediaFiles?.length ? [...idea.linksToMediaFiles] : [],
      comments: idea?.comments || '',
      buyerComment: idea?.buyerComment || '',
      childProduct: idea?.childProduct || undefined,
      productLinks: idea?.productLinks || [],
    })

    const getFullIdea = () => ({
      ...curIdea,
      status: curIdea?.status,
      media: curIdea?.linksToMediaFiles?.length ? [...curIdea.linksToMediaFiles] : [],
      comments: curIdea?.comments || '',
      buyerComment: curIdea?.buyerComment || '',
      productName: curIdea?.productName || '',
      productLinks: curIdea?.productLinks || [],
      criteria: curIdea?.criteria || '',
      quantity: curIdea?.quantity || '',
      price: curIdea?.price || '',
      width: curIdea?.width || '',
      height: curIdea?.height || '',
      length: curIdea?.length || '',
      suppliers: curIdea?.suppliers || [],
      _id: curIdea?._id || undefined,
      parentProduct: curIdea?.parentProduct || undefined,
      childProduct: curIdea?.childProduct || undefined,
      requestsOnCheck: curIdea?.requestsOnCheck || [],
      requestsOnFinished: curIdea?.requestsOnFinished || [],
    })

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

    const setShowFullCardByCurIdea = async () => {
      if (isCurrentIdea) {
        setShowFullCard(!showFullCard)
      } else {
        await onSetCurIdea(idea)
        setShowFullCard(true)
      }
    }

    const onClickLinkBtn = () => {
      onChangeField('productLinks')({ target: { value: [...formFields.productLinks, linkLine] } })
      setLinkLine('')
    }

    const onRemoveLink = index => {
      const newArr = formFields?.productLinks?.filter((el, i) => i !== index)
      onChangeField('productLinks')({ target: { value: [...newArr] } })
    }

    useEffect(() => {
      if (inCreate) {
        setShowFullCard(true)
      } else if (isModalView) {
        setShowFullCard(true)
      } else if (!isCurrentIdea) {
        setShowFullCard(false)
      }

      setImages([])
    }, [curIdea?._id, inEdit])

    useEffect(() => {
      if (!curIdea) {
        setFormFields(getShortIdea())
      } else {
        isCurrentIdea && setFormFields(getFullIdea())
      }
    }, [curIdea, idea])

    const handleChange = newAlignment => {
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

    const disabledSubmit = objectDeepCompare(formFields, getFullIdea()) && !images.length

    const currentUserIsClient = checkIsClient(UserRoleCodeMap[curUser.role])
    const currentUserIsBuyer = checkIsBuyer(UserRoleCodeMap[curUser.role])
    const checkIsClientOrBuyer = currentUserIsClient || currentUserIsBuyer

    const isNewIdea = formFields?.status === ideaStatusByKey[ideaStatus.NEW]
    const isSupplierSearch = formFields?.status === ideaStatusByKey[ideaStatus.SUPPLIER_SEARCH]
    const isSupplierFound = formFields?.status === ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]
    const isSupplierNotFound = formFields?.status === ideaStatusByKey[ideaStatus.SUPPLIER_NOT_FOUND]
    const isCardCreating = formFields?.status === ideaStatusByKey[ideaStatus.CARD_CREATING]
    const isRejected = formFields?.status === ideaStatusByKey[ideaStatus.REJECTED]
    const isVerified = formFields?.status === ideaStatusByKey[ideaStatus.VERIFIED]

    const showAcceptButtonToClient =
      currentUserIsClient && !isNewIdea && !isSupplierSearch && !isSupplierNotFound && !isCardCreating && !isVerified

    const showRejectButton =
      isNewIdea ||
      formFields?.status === ideaStatusByKey[ideaStatus.ON_CHECK] ||
      formFields?.status === ideaStatusByKey[ideaStatus.SUPPLIER_SEARCH] ||
      isSupplierFound ||
      isSupplierNotFound

    const showCreateRequestButton =
      formFields?.status === ideaStatusByKey[ideaStatus.NEW] ||
      formFields?.status === ideaStatusByKey[ideaStatus.ON_CHECK] ||
      formFields?.status === ideaStatusByKey[ideaStatus.VERIFIED]

    const disableFields = idea && !(curIdea?._id === idea?._id && inEdit)
    const disableAcceptButton = isSupplierNotFound

    return (
      <div className={cx(classNames.root, { [classNames.modalRoot]: isModalView })}>
        <div className={classNames.headerWrapper}>
          <IdeaProgressBar currentStatus={formFields?.status} />

          <div className={classNames.sourcesProductWraper}>
            {formFields.childProduct && (
              <SourceProduct
                title={t(TranslationKey['Child product'])}
                img={formFields.childProduct?.images[0]}
                asin={formFields.childProduct?.asin}
                sku={formFields.childProduct?.skusByClient[0]}
              />
            )}
            {currentProduct && (
              <SourceProduct
                title={t(TranslationKey['Parent product'])}
                img={currentProduct.images[0]}
                asin={currentProduct.asin}
                sku={currentProduct.skusByClient[0]}
              />
            )}
          </div>
        </div>

        <div className={cx(classNames.contentWrapper, { [classNames.modalContentWrapper]: isModalView })}>
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

              {showFullCard && (
                <div className={classNames.requestsBlockWrapper}>
                  <div className={classNames.requestsControlWrapper}>
                    <p className={classNames.requestsBlockTitle}>{t(TranslationKey.Freelance)}</p>

                    <div className={classNames.requestsControlButtonsWrapper}>
                      <CustomSwitcher
                        bigSwitch
                        condition={showRequestType}
                        nameFirstArg={t(TranslationKey['On check'])}
                        nameSecondArg={t(TranslationKey.Realized)}
                        firstArgValue={RequestSwitherType.REQUESTS_ON_CHECK}
                        secondArgValue={RequestSwitherType.REQUESTS_ON_FINISHED}
                        changeConditionHandler={condition => setShowRequestType(condition)}
                      />

                      <Button disabled={!showCreateRequestButton} onClick={onClickLinkRequestButton}>
                        {t(TranslationKey['Link request'])}
                      </Button>
                    </div>
                  </div>

                  {(!!formFields.requestsOnCheck?.length || !!formFields.requestsOnFinished?.length) && (
                    <div className={classNames.requestsWrapper}>
                      {requestsToRender?.map((request, requestIndex) => (
                        <IdeaRequestCard
                          key={requestIndex}
                          requestType={request.typeTask}
                          requestId={request.humanFriendlyId}
                          requestStatus={request.status}
                          executor={request.executor}
                          proposals={request.proposals}
                          onClickResultButton={onClickResultButton}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={classNames.commentsWrapper}>
              <Field
                multiline
                disabled={disableFields || checkIsBuyer(UserRoleCodeMap[curUser.role])}
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
                disabled={disableFields || checkIsClient(UserRoleCodeMap[curUser.role])}
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
                value={formFields.buyerComment}
                onChange={onChangeField('buyerComment')}
              />
            </div>
          </div>

          {showFullCard && (
            <>
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
                          {(inEdit || inCreate) && (
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
                          )}
                          <div className={classNames.linksSubWrapper}>
                            {formFields?.productLinks?.length ? (
                              formFields?.productLinks?.map((el, index) => (
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

                        <CustomSwitcher
                          condition={sizeSetting}
                          nameFirstArg={'In'}
                          nameSecondArg={'Cm'}
                          firstArgValue={sizesType.INCHES}
                          secondArgValue={sizesType.CM}
                          changeConditionHandler={condition => handleChange(condition)}
                        />
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

              <div className={cx(classNames.middleBlock, { [classNames.fullMiddleBlock]: showFullCard })}>
                <Field
                  labelClasses={classNames.spanLabel}
                  label={t(TranslationKey.Suppliers)}
                  containerClasses={classNames.noMarginContainer}
                  inputComponent={
                    <>
                      {checkIsClientOrBuyer && (inEdit || inCreate) ? (
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
                          {selectedSupplier && (
                            <>
                              <div className={classNames.supplierButtonWrapper}>
                                <Button
                                  tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                                  className={classNames.iconBtn}
                                  onClick={() =>
                                    onClickSupplierBtns('edit', () =>
                                      onClickSaveBtn(calculateFieldsToSubmit(), [], true),
                                    )
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
                                    onClickSupplierBtns('delete', () =>
                                      onClickSaveBtn(calculateFieldsToSubmit(), [], true),
                                    )
                                  }
                                >
                                  <DeleteOutlineOutlinedIcon />
                                </Button>
                                <Typography className={classNames.supplierButtonText}>
                                  {t(TranslationKey['Delete supplier'])}
                                </Typography>
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <>
                          {(checkIsClientOrBuyer || checkIsSupervisor(UserRoleCodeMap[curUser.role])) && (
                            <div className={classNames.supplierButtonWrapper}>
                              <Button
                                disabled={!selectedSupplier}
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
                          )}
                        </>
                      )}
                    </>
                  }
                />

                <TableSupplier
                  product={formFields}
                  selectedSupplier={selectedSupplier}
                  onClickSupplier={onClickSupplier}
                />
              </div>
            </>
          )}

          {/* {(inCreate || !disableFields) && (
            <div className={classNames.addOrEditBtnsWrapper}>
              <Button
                success
                disabled={disabledSubmit}
                variant="contained"
                color="primary"
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
          )} */}
        </div>

        {!!idea && disableFields ? (
          <div className={classNames.existedIdeaBtnsWrapper}>
            {!isModalView ? (
              <div className={classNames.tablePanelSortWrapper} onClick={setShowFullCardByCurIdea}>
                <Typography className={classNames.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </Typography>

                {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
              </div>
            ) : (
              <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(currentProduct._id)} />
            )}

            {!checkIsAdmin(UserRoleCodeMap[curUser.role]) && (
              <div className={classNames.existedIdeaBtnsSubWrapper}>
                {currentUserIsBuyer && isSupplierSearch && (
                  <RadioButtons
                    radioBottonsSettings={radioBottonsSettings}
                    currentValue={formFields?.status}
                    onClickRadioButton={selectedStatus => onClickAcceptButton(formFields, selectedStatus)}
                  />
                )}

                {(isSupplierFound || isSupplierNotFound) && (
                  <p className={classNames.statusText}>
                    {isSupplierFound ? t(TranslationKey['Supplier found']) : t(TranslationKey['Supplier not found'])}
                  </p>
                )}

                {currentUserIsClient && isCurrentIdea && isCardCreating && (
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
                )}

                {currentUserIsClient && showCreateRequestButton && (
                  <Button
                    success
                    variant="contained"
                    className={classNames.actionButton}
                    onClick={onClickCreateRequestButton}
                  >
                    <PlusIcon className={classNames.plusIcon} />
                    {t(TranslationKey['Create a request'])}
                  </Button>
                )}

                {(showAcceptButtonToClient || (currentUserIsBuyer && isSupplierSearch)) && (
                  <Button
                    disabled={disableAcceptButton}
                    variant="contained"
                    color="primary"
                    onClick={() => onClickAcceptButton(formFields)}
                  >
                    {t(TranslationKey.Accept)}
                  </Button>
                )}

                {currentUserIsClient && isNewIdea && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      onClickAcceptButton(formFields)
                    }}
                  >
                    {t(TranslationKey['To check'])}
                  </Button>
                )}

                {currentUserIsClient && isRejected && (
                  <Button success variant="contained" onClick={() => onClickReoperButton(formFields._id)}>
                    {t(TranslationKey.Restore)}
                  </Button>
                )}

                {checkIsClientOrBuyer && (
                  <Button variant="contained" color="primary" onClick={() => onEditIdea(formFields)}>
                    {t(TranslationKey.Edit)}
                  </Button>
                )}

                {currentUserIsClient && isRejected && (
                  <Button danger variant="contained" onClick={() => onClickCloseIdea(formFields._id)}>
                    {t(TranslationKey.Close)}
                  </Button>
                )}

                {currentUserIsClient && showRejectButton && (
                  <Button danger variant="contained" onClick={() => onClickRejectButton(formFields._id)}>
                    {t(TranslationKey.Reject)}
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={classNames.addOrEditBtnsWrapper}>
            <Button
              success
              disabled={disabledSubmit}
              variant="contained"
              color="primary"
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
        )}
      </div>
    )
  },
)
