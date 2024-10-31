import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { MdArrowDropDown, MdArrowDropUp, MdDeleteOutline } from 'react-icons/md'

import { IconButton, Link } from '@mui/material'

import { inchesCoefficient, unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status.ts'
import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value/copy-value'
import { CustomButton } from '@components/shared/custom-button'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'
import { RadioButtons } from '@components/shared/radio-buttons/radio-buttons'
import { SizeSwitcher } from '@components/shared/size-switcher'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { ListSuppliers } from '@components/shared/tables/list-suppliers'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { deepArrayCompare } from '@utils/array'
import { roundSafely } from '@utils/calculation'
import {
  checkIsAdmin,
  checkIsBuyer,
  checkIsClient,
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsValidProposalStatusToShowResoult,
} from '@utils/checks'
import { objectDeepCompare } from '@utils/object'
import { checkAndMakeAbsoluteUrl, clearEverythingExceptNumbers, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { RequestSwitherType } from '@typings/enums/request/request-type'

import { useStyles } from './idea-view-and-edit-card.style'

import { IdeaRequestCard } from './idea-request-card'
import { IdeaProgressBar } from './progress-bar'
import { SourceProduct } from './source-product'

export const IdeaViewAndEditCard = observer(
  ({
    isModalView,
    curUser,
    inEdit,
    inCreate,
    idea,
    selectedIdea,
    currentProduct,
    onClickCancelBtn,
    onClickSaveBtn,
    onSetCurIdea,
    onEditIdea,
    onCreateProduct,
    onClickSaveSupplierBtn,
    onClickCloseIdea,
    onClickAcceptButton,
    onClickRejectButton,
    onClickReoperButton,
    onClickResultButton,
    onClickLinkRequestButton,
    onClickCreateRequestButton,
    onClickOpenNewTab,
    onClickOpenProduct,
    onClickToOrder,
    onClickRequestId,
    onClickUnbindButton,
    onRemoveSupplier,
  }) => {
    const { classes: styles, cx } = useStyles()

    const linkListRef = useRef(null)

    const [linkLine, setLinkLine] = useState('')
    const [showFullCard, setShowFullCard] = useState(false)

    const [formFields, setFormFields] = useState(undefined)

    const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)
    const [showRequestType, setShowRequestType] = useState(
      idea?.status >= 18 ? RequestSwitherType.REQUESTS_ON_FINISHED : RequestSwitherType.REQUESTS_ON_CHECK,
    )
    const [requestsToRender, setRequestsToRender] = useState([])
    const [supplierFound, setSupplierFound] = useState(undefined)
    const [images, setImages] = useState(formFields?.media || [])

    useEffect(() => {
      if (formFields?.media) {
        setImages(formFields?.media)
      }
    }, [formFields?.media])

    const isCurrentIdea = idea?._id === idea?._id

    const radioBottonsSettings = [
      {
        label: 'Supplier found',
        value: ideaStatusByKey[ideaStatus.SUPPLIER_FOUND],
        disabled: !formFields?.suppliers?.length,
      },
      {
        label: 'Supplier not found',
        value: ideaStatusByKey[ideaStatus.SUPPLIER_NOT_FOUND],
      },
    ]

    useEffect(() => {
      if (showRequestType === RequestSwitherType.REQUESTS_ON_CHECK) {
        setRequestsToRender(formFields?.requestsOnCheck)
      } else {
        setRequestsToRender(formFields?.requestsOnFinished)
      }
    }, [showRequestType, formFields?.requestsOnCheck, formFields?.requestsOnFinished])

    useEffect(() => {
      if (formFields?.productLinks?.length > 2 && linkListRef?.current) {
        linkListRef.current.scrollTo(0, linkListRef.current.scrollHeight)
      }
    }, [formFields?.productLinks])

    const getShortIdea = () => ({
      ...idea,
      _id: idea?._id,
      status: idea?.status,
      media: idea?.linksToMediaFiles?.length ? [...idea.linksToMediaFiles] : [],
      comments: idea?.comments || '',
      buyerComment: idea?.buyerComment || '',
      childProduct: idea?.childProduct || undefined,
      productLinks: idea?.productLinks || [],
      criteria: idea?.criteria || '',
      variation: idea?.variation || '',
      productName: idea?.productName || '',
      suppliers: idea?.suppliers || [],
      approximatePrice: idea?.approximatePrice || 0,
      fbaFee: idea?.fbaFee || 0,
    })

    const getFullIdea = () => {
      const multiplier = sizeSetting === unitsOfChangeOptions.US ? inchesCoefficient : 1

      return {
        ...idea,
        status: idea?.status,
        media: idea?.linksToMediaFiles?.length ? idea?.linksToMediaFiles : [],
        comments: idea?.comments || '',
        buyerComment: idea?.buyerComment || '',
        productName: idea?.productName || '',
        productLinks: idea?.productLinks || [],
        criteria: idea?.criteria || '',
        quantity: idea?.quantity || 0,
        price: idea?.price || 0,
        width: toFixed(idea?.width / multiplier, 2) || 0,
        height: toFixed(idea?.height / multiplier, 2) || 0,
        length: toFixed(idea?.length / multiplier, 2) || 0,
        suppliers: idea?.suppliers || [],
        _id: idea?._id || undefined,
        childProduct: idea?.childProduct || undefined,
        requestsOnCheck: idea?.requestsOnCheck || [],
        requestsOnFinished: idea?.requestsOnFinished || [],
        approximatePrice: idea?.approximatePrice || 0,
        fbaFee: idea?.fbaFee || 0,
      }
    }

    const onChangeField = fieldName => event => {
      const newFormFields = { ...formFields }
      if (
        ['price', 'width', 'height', 'length', 'fbaFee', 'approximatePrice'].includes(fieldName) &&
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
      onChangeField('productLinks')({
        target: {
          value: [...(formFields?.productLinks ?? []), linkLine],
        },
      })
      setLinkLine('')
    }

    const onRemoveLink = index => {
      const newArr = formFields?.productLinks?.filter((el, i) => i !== index)
      onChangeField('productLinks')({ target: { value: [...newArr] } })
    }

    useEffect(() => {
      if (isCurrentIdea && (inCreate || isModalView || inEdit)) {
        setShowFullCard(true)
      } else if (!isCurrentIdea) {
        setShowFullCard(false)
      }

      setImages([])
    }, [idea?._id, inEdit])

    useEffect(() => {
      if (!isCurrentIdea && !inCreate) {
        setFormFields(getShortIdea())
      } else {
        setFormFields(getFullIdea())
        // setShowFullCard(true) // 10527
      }
    }, [idea])

    useEffect(() => {
      if (selectedIdea === idea?._id) {
        setShowFullCardByCurIdea()
      }
    }, [])

    const handleChange = newAlignment => {
      if (newAlignment !== sizeSetting) {
        const multiplier = newAlignment === unitsOfChangeOptions.US ? inchesCoefficient : 1 / inchesCoefficient

        setFormFields({
          ...formFields,
          width: toFixed(formFields?.width / multiplier, 2) || 0,
          height: toFixed(formFields?.height / multiplier, 2) || 0,
          length: toFixed(formFields?.length / multiplier, 2) || 0,
        })

        setSizeSetting(newAlignment)
      }
    }

    const calculateFieldsToSubmit = () => {
      const res = {
        ...formFields,

        approximatePrice: formFields?.approximatePrice || 0,
        fbaFee: formFields?.fbaFee || 0,
        width:
          (sizeSetting === unitsOfChangeOptions.US
            ? roundSafely(formFields?.width * inchesCoefficient)
            : formFields?.width) || 0,
        height:
          (sizeSetting === unitsOfChangeOptions.US
            ? roundSafely(formFields?.height * inchesCoefficient)
            : formFields?.height) || 0,
        length:
          (sizeSetting === unitsOfChangeOptions.US
            ? roundSafely(formFields?.length * inchesCoefficient)
            : formFields?.length) || 0,
        media: images,
      }

      return res
    }

    const calculateFieldsToCreateProductSubmit = () => {
      const res = {
        ...formFields,

        approximatePrice: formFields?.approximatePrice || 0,
        fbaFee: formFields?.fbaFee || 0,
        width:
          (sizeSetting === unitsOfChangeOptions.EU
            ? roundSafely(formFields?.width / inchesCoefficient)
            : formFields?.width) || 0,
        height:
          (sizeSetting === unitsOfChangeOptions.EU
            ? roundSafely(formFields?.height / inchesCoefficient)
            : formFields?.height) || 0,
        length:
          (sizeSetting === unitsOfChangeOptions.EU
            ? roundSafely(formFields?.length / inchesCoefficient)
            : formFields?.length) || 0,
      }

      return res
    }

    const disabledSubmit =
      (objectDeepCompare(formFields, getFullIdea()) && deepArrayCompare(images, formFields?.media || [])) ||
      !formFields?.productName

    const userRole = UserRoleCodeMap[curUser.role]
    const currentUserIsClient = checkIsClient(userRole)
    const currentUserIsBuyer = checkIsBuyer(userRole)
    const checkIsClientOrBuyer = currentUserIsClient || currentUserIsBuyer

    const isNewIdea = formFields?.status === ideaStatusByKey[ideaStatus.NEW]
    const isOnCheck = formFields?.status === ideaStatusByKey[ideaStatus.ON_CHECK]
    const isSupplierSearch = formFields?.status === ideaStatusByKey[ideaStatus.SUPPLIER_SEARCH]
    const isSupplierFound = formFields?.status === ideaStatusByKey[ideaStatus.SUPPLIER_FOUND]
    const isSupplierNotFound = formFields?.status === ideaStatusByKey[ideaStatus.SUPPLIER_NOT_FOUND]
    const isCardCreating = formFields?.status === ideaStatusByKey[ideaStatus.CARD_CREATING]
    const isAddingAsin = formFields?.status === ideaStatusByKey[ideaStatus.ADDING_ASIN]
    const isRejected = formFields?.status === ideaStatusByKey[ideaStatus.REJECTED]
    const isVerified = formFields?.status === ideaStatusByKey[ideaStatus.VERIFIED]
    const isClosed = formFields?.status === ideaStatusByKey[ideaStatus.CLOSED]

    const showAcceptButtonToClient =
      currentUserIsClient &&
      !isNewIdea &&
      !isSupplierSearch &&
      !isSupplierNotFound &&
      !isVerified &&
      !isClosed &&
      !isRejected &&
      !(isCardCreating && !formFields?.childProduct && formFields?.variation) &&
      !(isAddingAsin && (formFields?.variation ? !formFields?.childProduct?.barCode : !currentProduct?.barCode))

    const showRejectButton = isNewIdea || isOnCheck || isSupplierSearch || isSupplierFound || isSupplierNotFound

    const showCreateRequestButton = isNewIdea || isOnCheck || isVerified || isAddingAsin

    const disableFields = idea && !(idea?._id === idea?._id && inEdit)
    const disableAcceptButton = isSupplierNotFound

    return (
      <div className={styles.root}>
        <div className={styles.headerWrapper}>
          <IdeaProgressBar
            showStatusDuration={isModalView && idea}
            currentStatus={formFields?.status}
            ideaData={formFields}
          />

          <div className={styles.sourcesProductWraper}>
            {formFields?.childProduct && (
              <SourceProduct
                showOpenInNewTabIcon
                title={t(TranslationKey['Child product'])}
                img={formFields?.childProduct?.images?.[0]}
                asin={formFields?.childProduct?.asin}
                sku={formFields?.childProduct?.skuByClient}
                onClickShareIcon={() => onClickOpenProduct(formFields?.childProduct?._id)}
              />
            )}
            {currentProduct && (
              <SourceProduct
                showOpenInNewTabIcon
                title={t(TranslationKey['Parent product'])}
                img={currentProduct?.images?.[0]}
                asin={currentProduct?.asin}
                sku={currentProduct?.skuByClient}
                onClickShareIcon={() => onClickOpenProduct(currentProduct?._id)}
              />
            )}
          </div>
        </div>

        <div className={cx(styles.contentWrapper, { [styles.modalContentWrapper]: isModalView })}>
          <div className={cx(styles.cardWrapper, { [styles.fullCardWpapper]: showFullCard })}>
            <div className={styles.mediaBlock}>
              <div className={styles.gallery}>
                {!inCreate && (
                  <SlideshowGallery
                    slidesToShow={5}
                    isEditable={inEdit}
                    files={images}
                    onChangeImagesForLoad={setImages}
                  />
                )}
              </div>

              {!disableFields && (
                <UploadFilesInput withoutTitles dragAndDropButtonHeight={60} images={images} setImages={setImages} />
              )}

              {showFullCard && currentUserIsClient && (
                <div className={styles.requestsBlockWrapper}>
                  <div className={styles.requestsControlWrapper}>
                    <p className={styles.requestsBlockTitle}>{t(TranslationKey.Freelance)}</p>

                    <div className={styles.requestsControlButtonsWrapper}>
                      <div className={styles.switcherWrapper}>
                        <CustomRadioButton
                          size="large"
                          options={[
                            { label: t(TranslationKey['On check']), value: RequestSwitherType.REQUESTS_ON_CHECK },
                            { label: t(TranslationKey.Realized), value: RequestSwitherType.REQUESTS_ON_FINISHED },
                          ]}
                          value={showRequestType}
                          onChange={e => setShowRequestType(e.target.value)}
                        />
                      </div>

                      <CustomButton disabled={!showCreateRequestButton} onClick={() => onClickLinkRequestButton(idea)}>
                        {t(TranslationKey['Link request'])}
                      </CustomButton>
                    </div>
                  </div>

                  {(!!formFields?.requestsOnCheck?.length || !!formFields?.requestsOnFinished?.length) && (
                    <div className={styles.requestsWrapper}>
                      {requestsToRender?.map((request, requestIndex) => (
                        <IdeaRequestCard
                          key={requestIndex}
                          requestTitle={request?.spec?.title}
                          requestId={request.xid}
                          requestStatus={request.status}
                          executor={request.executor}
                          proposals={request.proposals}
                          disableSeeResultButton={
                            !request?.proposals?.some(proposal =>
                              checkIsValidProposalStatusToShowResoult(proposal.status),
                            )
                          }
                          onClickRequestId={() => onClickRequestId(request._id)}
                          onClickResultButton={() => onClickResultButton(request)}
                          onClickUnbindButton={() => onClickUnbindButton(request._id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className={styles.commentsWrapper}>
              {idea ? (
                <p className={styles.ideaID}>
                  {t(TranslationKey['Idea ID'])}
                  <span className={styles.idText}>{`: ${idea?.xid}`}</span>
                </p>
              ) : null}

              <Field
                multiline
                disabled={disableFields || currentUserIsBuyer}
                className={styles.сlientСomment}
                containerClasses={styles.noMarginContainer}
                labelClasses={styles.spanLabel}
                inputProps={{ maxLength: 255 }}
                label={t(TranslationKey['Client comments'])}
                value={formFields?.comments}
                sx={{
                  '& .MuiInputBase-inputMultiline': {
                    height: '100% !important',
                    width: '100% !important',
                  },
                }}
                onChange={onChangeField('comments')}
              />

              <Field
                multiline
                disabled={disableFields || currentUserIsClient}
                label={t(TranslationKey['Buyer comments'])}
                labelClasses={styles.spanLabel}
                className={styles.buyerComment}
                containerClasses={styles.noMarginContainer}
                inputProps={{ maxLength: 255 }}
                value={formFields?.buyerComment}
                sx={{
                  '& .MuiInputBase-inputMultiline': {
                    height: '100% !important',
                    width: '100% !important',
                  },
                }}
                onChange={onChangeField('buyerComment')}
              />
            </div>
          </div>

          {showFullCard && (
            <>
              <div className={cx(styles.middleBlock, { [styles.fullMiddleBlock]: showFullCard })}>
                <p className={styles.supplierSearchTitle}>{t(TranslationKey['Supplier search options'])}</p>

                <div className={cx(styles.cardWrapper, { [styles.fullCardWpapper]: showFullCard })}>
                  <div className={styles.nameAndInfoProductWrapper}>
                    <Field
                      disabled={disableFields}
                      label={`${t(TranslationKey['Product name'])}*`}
                      inputProps={{ maxLength: 130 }}
                      value={formFields?.productName}
                      labelClasses={styles.spanLabel}
                      containerClasses={styles.noMarginContainer}
                      className={styles.oneLineField}
                      onChange={onChangeField('productName')}
                    />

                    <Field
                      multiline
                      minRows={10}
                      maxRows={10}
                      disabled={disableFields}
                      labelClasses={styles.spanLabel}
                      className={styles.criterionsField}
                      containerClasses={styles.noMarginContainer}
                      inputProps={{ maxLength: 250 }}
                      label={t(TranslationKey['Important criteria'])}
                      value={formFields?.criteria}
                      onChange={onChangeField('criteria')}
                    />
                  </div>

                  <div className={styles.linksAndDimensionsWrapper}>
                    <Field
                      labelClasses={styles.spanLabel}
                      label={t(TranslationKey.Links)}
                      containerClasses={styles.noMarginContainer}
                      className={styles.oneLineField}
                      inputComponent={
                        <div className={styles.linksWrapper}>
                          {(inEdit || inCreate) && (
                            <div className={styles.inputWrapper}>
                              <Input
                                disabled={disableFields}
                                placeholder={t(TranslationKey['Link to the product'])}
                                inputProps={{ maxLength: 510 }}
                                value={linkLine}
                                className={styles.input}
                                onChange={e => setLinkLine(e.target.value)}
                              />
                              <CustomButton disabled={!linkLine || disableFields} onClick={onClickLinkBtn}>
                                {t(TranslationKey.Add)}
                              </CustomButton>
                            </div>
                          )}
                          <div ref={linkListRef} className={styles.linksSubWrapper}>
                            {formFields?.productLinks?.length ? (
                              formFields?.productLinks?.map((el, index) => (
                                <div key={index} className={styles.linkWrapper}>
                                  <Link
                                    target="_blank"
                                    href={checkAndMakeAbsoluteUrl(el)}
                                    className={styles.linkTextWrapper}
                                  >
                                    <p className={styles.linkText}>{`${index + 1}. ${el}`}</p>
                                  </Link>

                                  <div className={styles.linksBtnsWrapper}>
                                    <CopyValue text={el} />
                                    {!disableFields && (
                                      <IconButton
                                        className={styles.deleteBtnWrapper}
                                        onClick={() => onRemoveLink(index)}
                                      >
                                        <MdDeleteOutline size={20} className={styles.deleteBtn} />
                                      </IconButton>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className={styles.noDataText}>{t(TranslationKey['No data'])}</p>
                            )}
                          </div>
                        </div>
                      }
                    />

                    <div className={styles.shortFieldsSubWrapper}>
                      <Field
                        disabled={disableFields}
                        inputProps={{ maxLength: 6 }}
                        labelClasses={styles.spanLabel}
                        inputClasses={styles.shortInput}
                        className={styles.oneLineField}
                        containerClasses={cx(styles.noMarginContainer, styles.mediumSizeContainer)}
                        label={t(TranslationKey.Quantity)}
                        value={formFields?.quantity}
                        onChange={onChangeField('quantity')}
                      />
                      <Field
                        disabled={disableFields}
                        inputProps={{ maxLength: 6 }}
                        labelClasses={styles.spanLabel}
                        inputClasses={styles.shortInput}
                        containerClasses={cx(styles.noMarginContainer, styles.mediumSizeContainer)}
                        label={t(TranslationKey['Desired purchase price']) + ', $'}
                        value={formFields?.price}
                        className={styles.oneLineField}
                        onChange={onChangeField('price')}
                      />
                    </div>

                    <div className={styles.shortFieldsSubWrapper}>
                      <div className={styles.sizesWrapper}>
                        <div className={styles.sizesSubWrapper}>
                          <p className={styles.spanLabel}>{t(TranslationKey.Dimensions)}</p>
                          <SizeSwitcher condition={sizeSetting} onChangeCondition={handleChange} />
                        </div>

                        <div className={styles.sizesBottomWrapper}>
                          <Field
                            disabled={disableFields}
                            inputProps={{ maxLength: 6 }}
                            labelClasses={styles.spanLabel}
                            inputClasses={styles.sizesInput}
                            className={styles.oneLineField}
                            containerClasses={cx(styles.sizesContainer, styles.noMarginContainer)}
                            label={t(TranslationKey.Width)}
                            value={formFields?.width}
                            onChange={onChangeField('width')}
                          />
                          <Field
                            disabled={disableFields}
                            inputProps={{ maxLength: 6 }}
                            labelClasses={styles.spanLabel}
                            inputClasses={styles.sizesInput}
                            className={styles.oneLineField}
                            containerClasses={cx(styles.sizesContainer, styles.noMarginContainer)}
                            label={t(TranslationKey.Height)}
                            value={formFields?.height}
                            onChange={onChangeField('height')}
                          />
                          <Field
                            disabled={disableFields}
                            inputProps={{ maxLength: 6 }}
                            labelClasses={styles.spanLabel}
                            inputClasses={styles.sizesInput}
                            className={styles.oneLineField}
                            containerClasses={cx(styles.sizesContainer, styles.noMarginContainer)}
                            label={t(TranslationKey.Length)}
                            value={formFields?.length}
                            onChange={onChangeField('length')}
                          />
                        </div>
                      </div>

                      <div className={styles.approximateCalculationFieldsWrapper}>
                        <Field
                          label={t(TranslationKey['Referral fee, $'])}
                          disabled={disableFields}
                          inputProps={{ maxLength: 6 }}
                          labelClasses={styles.spanLabel}
                          inputClasses={styles.approximateCalculationInput}
                          className={styles.oneLineField}
                          containerClasses={cx(styles.approximateCalculationInput, styles.noMarginContainer)}
                          value={formFields?.fbaFee}
                          onChange={onChangeField('fbaFee')}
                        />

                        <Field
                          label={t(TranslationKey['Approximate price'])}
                          disabled={disableFields}
                          inputProps={{ maxLength: 6 }}
                          labelClasses={styles.spanLabel}
                          inputClasses={styles.approximateCalculationInput}
                          className={styles.oneLineField}
                          containerClasses={cx(styles.approximateCalculationInput, styles.noMarginContainer)}
                          value={formFields?.approximatePrice}
                          onChange={onChangeField('approximatePrice')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className={styles.fullMiddleBlock}>
            {formFields ? (
              <ListSuppliers
                isIdea
                formFields={formFields}
                isNotProductNameForIdea={formFields?.productName.length === 0} // for disable add supplier button
                onClickSaveSupplier={({ ...rest }) =>
                  onClickSaveSupplierBtn({ ...rest, ideaFormFields: calculateFieldsToSubmit() })
                }
                onRemoveSupplier={onRemoveSupplier}
                // onSaveProduct={onClickSupplierBtns}
              />
            ) : null}
          </div>
        </div>

        {!!idea && disableFields ? (
          <div className={styles.existedIdeaBtnsWrapper}>
            {!isModalView ? (
              <div className={styles.tablePanelSortWrapper} onClick={setShowFullCardByCurIdea}>
                <p className={styles.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </p>

                {!showFullCard ? (
                  <MdArrowDropDown size={22} className={styles.icon} />
                ) : (
                  <MdArrowDropUp size={22} className={styles.icon} />
                )}
              </div>
            ) : (
              <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(currentProduct?._id, formFields?._id)} />
            )}

            {!checkIsAdmin(userRole) && (
              <div className={styles.existedIdeaBtnsSubWrapper}>
                {currentUserIsBuyer && isSupplierSearch && (
                  <div className={styles.supplierFoundWrapper}>
                    <RadioButtons
                      radioBottonsSettings={radioBottonsSettings}
                      currentValue={supplierFound}
                      onClickRadioButton={selectedStatus => setSupplierFound(selectedStatus)}
                    />

                    <CustomButton
                      type="primary"
                      disabled={!supplierFound}
                      onClick={() => onClickAcceptButton(formFields, supplierFound)}
                    >
                      {t(TranslationKey.Save)}
                    </CustomButton>
                  </div>
                )}

                {(isSupplierFound || isSupplierNotFound) && (
                  <p className={cx(styles.statusText, { [styles.supplierNotFoundText]: isSupplierNotFound })}>
                    {isSupplierFound ? t(TranslationKey['Supplier found']) : t(TranslationKey['Supplier not found'])}
                  </p>
                )}

                {currentUserIsClient && isCurrentIdea && isCardCreating && (
                  <CustomButton
                    type="primary"
                    disabled={idea.childProduct}
                    onClick={() => onCreateProduct(calculateFieldsToCreateProductSubmit(formFields))}
                  >
                    {t(TranslationKey['Create a product card'])}
                  </CustomButton>
                )}

                {currentUserIsClient && showCreateRequestButton && (
                  <CustomButton
                    type="primary"
                    icon={<FiPlus size={16} />}
                    onClick={() => onClickCreateRequestButton(formFields)}
                  >
                    {t(TranslationKey['Create request'])}
                  </CustomButton>
                )}

                {showAcceptButtonToClient /* || (currentUserIsBuyer && isSupplierSearch) */ && (
                  <CustomButton
                    type="primary"
                    disabled={disableAcceptButton}
                    onClick={() => onClickAcceptButton(formFields)}
                  >
                    {t(TranslationKey.Accept)}
                  </CustomButton>
                )}

                {currentUserIsClient && isVerified && (
                  <CustomButton type="primary" onClick={() => onClickToOrder(formFields)}>
                    {t(TranslationKey['To order'])}
                  </CustomButton>
                )}

                {currentUserIsClient && isNewIdea && (
                  <CustomButton onClick={() => onClickAcceptButton(formFields)}>
                    {t(TranslationKey['To check'])}
                  </CustomButton>
                )}

                {currentUserIsClient && isRejected && (
                  <CustomButton danger type="primary" onClick={() => onClickCloseIdea(formFields?._id)}>
                    {t(TranslationKey['Close idea'])}
                  </CustomButton>
                )}

                {currentUserIsClient && isRejected && (
                  <CustomButton type="primary" onClick={() => onClickReoperButton(formFields?._id)}>
                    {t(TranslationKey.Restore)}
                  </CustomButton>
                )}

                {checkIsClientOrBuyer && !isClosed && (
                  <CustomButton onClick={() => onEditIdea(formFields)}>{t(TranslationKey.Edit)}</CustomButton>
                )}

                {currentUserIsClient && showRejectButton && (
                  <CustomButton danger type="primary" onClick={() => onClickRejectButton(formFields?._id)}>
                    {t(TranslationKey.Reject)}
                  </CustomButton>
                )}

                {isModalView && (
                  <CustomButton onClick={() => onClickCancelBtn()}>{t(TranslationKey.Close)}</CustomButton>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.addOrEditBtnsWrapper}>
            <CustomButton
              type="primary"
              disabled={disabledSubmit}
              onClick={() => onClickSaveBtn(calculateFieldsToSubmit(), images)}
            >
              {t(TranslationKey.Save)}
            </CustomButton>

            <CustomButton onClick={() => onClickCancelBtn()}>{t(TranslationKey.Close)}</CustomButton>
          </div>
        )}
      </div>
    )
  },
)
