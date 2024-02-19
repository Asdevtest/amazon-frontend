import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { IconButton, Link, Typography } from '@mui/material'

import { inchesCoefficient, unitsOfChangeOptions } from '@constants/configs/sizes-settings'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { RequestSwitherType } from '@constants/requests/request-type.ts'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status.ts'
import { TranslationKey } from '@constants/translations/translation-key'

import { TableSupplier } from '@components/product/table-supplier'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { RadioButtons } from '@components/shared/radio-buttons/radio-buttons'
import { PlusIcon } from '@components/shared/svg-icons'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { deepArrayCompare } from '@utils/array'
import { roundSafely } from '@utils/calculation'
import {
  checkIsAdmin,
  checkIsBuyer,
  checkIsClient,
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsSupervisor,
  checkIsValidProposalStatusToShowResoult,
} from '@utils/checks'
import { objectDeepCompare } from '@utils/object'
import { clearEverythingExceptNumbers, parseTextString, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './idea-view-and-edit-card.style'

import { IdeaRequestCard } from './idea-request-card'
import { IdeaProgressBar } from './progress-bar'
import { SourceProduct } from './source-product'

export const IdeaViewAndEditCard = observer(
  ({
    isModalView,
    languageTag,
    curUser,
    inEdit,
    inCreate,
    idea,
    curIdea,
    selectedIdea,
    selectedSupplier,
    currentProduct,
    platformSettings,
    // onClickSupplierApproximateCalculations,
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
    onClickOpenProduct,
    onClickToOrder,
    onClickRequestId,
    onClickUnbindButton,
  }) => {
    const { classes: styles, cx } = useStyles()

    const linkListRef = useRef(null)

    const [linkLine, setLinkLine] = useState('')
    const [showFullCard, setShowFullCard] = useState(false)

    const [formFields, setFormFields] = useState({})

    const [sizeSetting, setSizeSetting] = useState(unitsOfChangeOptions.EU)
    const [showRequestType, setShowRequestType] = useState(
      curIdea?.status >= 18 ? RequestSwitherType.REQUESTS_ON_FINISHED : RequestSwitherType.REQUESTS_ON_CHECK,
    )
    const [requestsToRender, setRequestsToRender] = useState([])
    const [supplierFound, setSupplierFound] = useState(undefined)
    const [images, setImages] = useState(formFields?.media || [])

    useEffect(() => {
      if (formFields?.media) {
        setImages(formFields?.media)
      }
    }, [formFields?.media])

    const isCurrentIdea = curIdea?._id === idea?._id

    const radioBottonsSettings = [
      {
        label: () => t(TranslationKey['Supplier found']),
        value: ideaStatusByKey[ideaStatus.SUPPLIER_FOUND],
        disabled: !formFields?.suppliers?.length,
      },
      {
        label: () => t(TranslationKey['Supplier not found']),
        value: ideaStatusByKey[ideaStatus.SUPPLIER_NOT_FOUND],
      },
    ]

    useEffect(() => {
      if (showRequestType === RequestSwitherType.REQUESTS_ON_CHECK) {
        setRequestsToRender(formFields.requestsOnCheck)
      } else {
        setRequestsToRender(formFields.requestsOnFinished)
      }
    }, [showRequestType, formFields.requestsOnCheck, formFields.requestsOnFinished])

    useEffect(() => {
      if (formFields?.productLinks?.length > 2 && linkListRef?.current) {
        linkListRef.current.scrollTo(0, linkListRef.current.scrollHeight)
      }
    }, [formFields.productLinks])

    const getShortIdea = () => ({
      ...idea,
      _id: idea?._id,
      status: idea?.status,
      media: idea?.linksToMediaFiles?.length ? [...idea.linksToMediaFiles] : [],
      comments: parseTextString(idea?.comments) || '',
      buyerComment: parseTextString(idea?.buyerComment) || '',
      childProduct: idea?.childProduct || undefined,
      productLinks: idea?.productLinks || [],
      criteria: idea?.criteria || '',
      variation: idea?.variation || '',
      productName: idea?.productName || '',
      suppliers: idea?.suppliers || [],
      approximatePrice: idea?.approximatePrice || 0,
      fbaFee: idea?.fbaFee || 0,
    })

    const getFullIdea = () => ({
      ...curIdea,
      status: curIdea?.status,
      media: curIdea?.linksToMediaFiles?.length ? [...curIdea.linksToMediaFiles] : [],
      comments: parseTextString(curIdea?.comments) || '',
      buyerComment: parseTextString(curIdea?.buyerComment) || '',
      productName: curIdea?.productName || '',
      productLinks: curIdea?.productLinks || [],
      criteria: curIdea?.criteria || '',
      quantity: curIdea?.quantity || 0,
      price: curIdea?.price || 0,
      width: curIdea?.width || 0,
      height: curIdea?.height || 0,
      length: curIdea?.length || 0,
      suppliers: curIdea?.suppliers || [],
      _id: curIdea?._id || undefined,
      parentProduct: curIdea?.parentProduct || undefined,
      childProduct: curIdea?.childProduct || undefined,
      requestsOnCheck: curIdea?.requestsOnCheck || [],
      requestsOnFinished: curIdea?.requestsOnFinished || [],
      approximatePrice: idea?.approximatePrice || 0,
      fbaFee: idea?.fbaFee || 0,
    })

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
      onChangeField('productLinks')({ target: { value: [...formFields.productLinks, linkLine] } })
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
    }, [curIdea?._id, inEdit])

    useEffect(() => {
      if (!isCurrentIdea) {
        setFormFields(getShortIdea())
      } else {
        setFormFields(getFullIdea())
      }
    }, [curIdea, idea, languageTag])

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
          width: toFixed(formFields.width / multiplier, 2) || 0,
          height: toFixed(formFields.height / multiplier, 2) || 0,
          length: toFixed(formFields.length / multiplier, 2) || 0,
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
            ? roundSafely(formFields.width * inchesCoefficient)
            : formFields.width) || 0,
        height:
          (sizeSetting === unitsOfChangeOptions.US
            ? roundSafely(formFields.height * inchesCoefficient)
            : formFields.height) || 0,
        length:
          (sizeSetting === unitsOfChangeOptions.US
            ? roundSafely(formFields.length * inchesCoefficient)
            : formFields.length) || 0,
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
            ? roundSafely(formFields.width / inchesCoefficient)
            : formFields.width) || 0,
        height:
          (sizeSetting === unitsOfChangeOptions.EU
            ? roundSafely(formFields.height / inchesCoefficient)
            : formFields.height) || 0,
        length:
          (sizeSetting === unitsOfChangeOptions.EU
            ? roundSafely(formFields.length / inchesCoefficient)
            : formFields.length) || 0,
      }

      return res
    }

    const disabledSubmit =
      (objectDeepCompare(formFields, getFullIdea()) && deepArrayCompare(images, formFields?.media || [])) ||
      !formFields.productName

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
      !(isCardCreating && !formFields.childProduct && formFields.variation) &&
      !(isAddingAsin && (formFields?.variation ? !formFields?.childProduct?.barCode : !currentProduct?.barCode))

    const showRejectButton = isNewIdea || isOnCheck || isSupplierSearch || isSupplierFound || isSupplierNotFound

    const showCreateRequestButton = isNewIdea || isOnCheck || isVerified || isAddingAsin

    const disableFields = idea && !(curIdea?._id === idea?._id && inEdit)
    const disableAcceptButton = isSupplierNotFound
    const disableButtonAfterSupplierNotFound = formFields?.status > ideaStatusByKey[ideaStatus.SUPPLIER_NOT_FOUND]
    const isSupplierCreatedByCurrentUser =
      curUser?._id === selectedSupplier?.createdBy?._id || curUser?.masterUser?._id === selectedSupplier?.createdBy?._id

    // const boxPropertiesIsFull =
    //   selectedSupplier?.boxProperties?.amountInBox &&
    //   selectedSupplier?.boxProperties?.boxLengthCm &&
    //   selectedSupplier?.boxProperties?.boxWidthCm &&
    //   selectedSupplier?.boxProperties?.boxHeightCm &&
    //   selectedSupplier?.boxProperties?.boxWeighGrossKg

    // const boxPropertiesIsFullAndMainsValues =
    //   boxPropertiesIsFull &&
    //   selectedSupplier.amount &&
    //   selectedSupplier.minlot &&
    //   selectedSupplier.priceInYuan &&
    //   selectedSupplier.price

    return (
      <div className={cx(styles.root, isModalView && styles.rootModal)}>
        <div className={styles.headerWrapper}>
          <IdeaProgressBar
            showStatusDuration={isModalView && curIdea}
            currentStatus={formFields?.status}
            ideaData={formFields}
          />

          <div className={styles.sourcesProductWraper}>
            {formFields.childProduct && (
              <SourceProduct
                showOpenInNewTabIcon
                title={t(TranslationKey['Child product'])}
                img={formFields.childProduct?.images?.[0]}
                asin={formFields.childProduct?.asin}
                sku={formFields.childProduct?.skuByClient}
                onClickShareIcon={() => onClickOpenProduct(formFields.childProduct?._id)}
              />
            )}
            {(currentProduct || formFields.parentProduct) && (
              <SourceProduct
                showOpenInNewTabIcon
                title={t(TranslationKey['Parent product'])}
                img={formFields.parentProduct?.images?.[0] || currentProduct?.images?.[0]}
                asin={formFields.parentProduct?.asin || currentProduct?.asin}
                sku={formFields.parentProduct?.skuByClient || currentProduct?.skuByClient}
                onClickShareIcon={() => onClickOpenProduct(formFields.parentProduct?._id || currentProduct?._id)}
              />
            )}
          </div>
        </div>

        <div className={cx(styles.contentWrapper, { [styles.modalContentWrapper]: isModalView })}>
          <div className={cx(styles.cardWrapper, { [styles.fullCardWpapper]: showFullCard })}>
            <div className={styles.mediaBlock}>
              {!inCreate && (
                <div className={styles.photoCarouselWrapper}>
                  <PhotoAndFilesSlider
                    showPreviews
                    withoutFiles
                    bigSlider
                    isEditable={inEdit}
                    files={images}
                    onChangeImagesForLoad={setImages}
                  />
                </div>
              )}

              {!disableFields && (
                <UploadFilesInput
                  fullWidth
                  withoutDragAndDropTitle
                  dragAndDropBtnHeight={59}
                  images={images}
                  setImages={setImages}
                  maxNumber={50 - formFields?.media?.length}
                />
              )}

              {showFullCard && currentUserIsClient && (
                <div className={styles.requestsBlockWrapper}>
                  <div className={styles.requestsControlWrapper}>
                    <p className={styles.requestsBlockTitle}>{t(TranslationKey.Freelance)}</p>

                    <div className={styles.requestsControlButtonsWrapper}>
                      <div className={styles.switcherWrapper}>
                        <CustomSwitcher
                          switchMode={'medium'}
                          condition={showRequestType}
                          switcherSettings={[
                            { label: () => t(TranslationKey['On check']), value: RequestSwitherType.REQUESTS_ON_CHECK },
                            { label: () => t(TranslationKey.Realized), value: RequestSwitherType.REQUESTS_ON_FINISHED },
                          ]}
                          changeConditionHandler={setShowRequestType}
                        />
                      </div>

                      <Button disabled={!showCreateRequestButton} onClick={() => onClickLinkRequestButton(idea)}>
                        {t(TranslationKey['Link request'])}
                      </Button>
                    </div>
                  </div>

                  {(!!formFields.requestsOnCheck?.length || !!formFields.requestsOnFinished?.length) && (
                    <div className={styles.requestsWrapper}>
                      {requestsToRender?.map((request, requestIndex) => (
                        <IdeaRequestCard
                          key={requestIndex}
                          requestTitle={request?.spec?.title}
                          requestId={request.humanFriendlyId}
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
              <Field
                multiline
                disabled={disableFields || currentUserIsBuyer}
                className={styles.сlientСomment}
                containerClasses={styles.noMarginContainer}
                labelClasses={styles.spanLabel}
                inputProps={{ maxLength: 255 }}
                label={t(TranslationKey['Client comments'])}
                value={formFields.comments}
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
                value={formFields.buyerComment}
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
                <Typography className={styles.supplierSearchTitle}>
                  {t(TranslationKey['Supplier search options'])}
                </Typography>

                <div className={cx(styles.cardWrapper, { [styles.fullCardWpapper]: showFullCard })}>
                  <div className={styles.nameAndInfoProductWrapper}>
                    <Field
                      disabled={disableFields}
                      label={`${t(TranslationKey['Product name'])}*`}
                      inputProps={{ maxLength: 130 }}
                      value={formFields.productName}
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
                      value={formFields.criteria}
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
                              <Button
                                disabled={!linkLine || disableFields}
                                className={styles.defaultBtn}
                                onClick={onClickLinkBtn}
                              >
                                {t(TranslationKey.Add)}
                              </Button>
                            </div>
                          )}
                          <div ref={linkListRef} className={styles.linksSubWrapper}>
                            {formFields?.productLinks?.length ? (
                              formFields?.productLinks?.map((el, index) => (
                                <div key={index} className={styles.linkWrapper}>
                                  <Link target="_blank" href={el} className={styles.linkTextWrapper}>
                                    <Typography className={styles.linkText}>{`${index + 1}. ${el}`}</Typography>
                                  </Link>

                                  <div className={styles.linksBtnsWrapper}>
                                    <CopyValue text={el} />
                                    {!disableFields && (
                                      <IconButton
                                        className={styles.deleteBtnWrapper}
                                        onClick={() => onRemoveLink(index)}
                                      >
                                        <DeleteOutlineOutlinedIcon className={styles.deleteBtn} />
                                      </IconButton>
                                    )}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <Typography className={styles.noDataText}>{t(TranslationKey['No data'])}</Typography>
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
                        value={formFields.quantity}
                        onChange={onChangeField('quantity')}
                      />
                      <Field
                        disabled={disableFields}
                        inputProps={{ maxLength: 6 }}
                        labelClasses={styles.spanLabel}
                        inputClasses={styles.shortInput}
                        containerClasses={cx(styles.noMarginContainer, styles.mediumSizeContainer)}
                        label={t(TranslationKey['Desired purchase price']) + ', $'}
                        value={formFields.price}
                        className={styles.oneLineField}
                        onChange={onChangeField('price')}
                      />
                    </div>

                    <div className={styles.shortFieldsSubWrapper}>
                      <div className={styles.sizesWrapper}>
                        <div className={styles.sizesSubWrapper}>
                          <p className={styles.spanLabel}>{t(TranslationKey.Dimensions)}</p>

                          <div>
                            <CustomSwitcher
                              condition={sizeSetting}
                              switcherSettings={[
                                { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                                { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
                              ]}
                              changeConditionHandler={condition => handleChange(condition)}
                            />
                          </div>
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
                            value={formFields.width}
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
                            value={formFields.height}
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
                            value={formFields.length}
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
                          value={formFields.fbaFee}
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
                          value={formFields.approximatePrice}
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
            <Field
              labelClasses={cx(styles.spanLabel, styles.labelWithMargin)}
              label={t(TranslationKey.Suppliers)}
              containerClasses={styles.noMarginContainer}
              inputComponent={
                <div className={styles.supplierActionsWrapper}>
                  {selectedSupplier && (checkIsClientOrBuyer || checkIsSupervisor(userRole)) && (
                    <div className={styles.supplierButtonWrapper}>
                      <Button
                        disabled={!selectedSupplier}
                        tooltipInfoContent={t(TranslationKey['Open the parameters supplier'])}
                        className={styles.iconBtn}
                        onClick={() => onClickSupplierBtns('view', undefined, formFields?._id)}
                      >
                        <VisibilityOutlinedIcon />
                      </Button>
                      <Typography className={styles.supplierButtonText}>
                        {t(TranslationKey['Open the parameters supplier'])}
                      </Typography>
                    </div>
                  )}

                  <div className={styles.supplierButtonWrapper}>
                    <Button
                      disabled={!formFields.productName || disableButtonAfterSupplierNotFound || !checkIsClientOrBuyer}
                      className={styles.iconBtn}
                      onClick={() =>
                        onClickSupplierBtns(
                          'add',
                          () => onClickSaveBtn(calculateFieldsToSubmit(), inCreate ? images : [], true),
                          formFields?._id,
                        )
                      }
                    >
                      <AddIcon />
                    </Button>
                    <Typography className={styles.supplierButtonText}>{t(TranslationKey['Add supplier'])}</Typography>
                  </div>
                  {selectedSupplier && (
                    <>
                      <div className={styles.supplierButtonWrapper}>
                        <Button
                          tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                          disabled={disableButtonAfterSupplierNotFound || !isSupplierCreatedByCurrentUser}
                          className={styles.iconBtn}
                          onClick={() =>
                            onClickSupplierBtns(
                              'edit',
                              () => onClickSaveBtn(calculateFieldsToSubmit(), [], true),
                              formFields?._id,
                            )
                          }
                        >
                          <EditOutlinedIcon />
                        </Button>
                        <Typography className={styles.supplierButtonText}>
                          {t(TranslationKey['Edit a supplier'])}
                        </Typography>
                      </div>
                      <div className={styles.supplierButtonWrapper}>
                        <Button
                          tooltipInfoContent={t(TranslationKey['Delete the selected supplier'])}
                          className={cx(styles.iconBtn, styles.iconBtnRemove)}
                          disabled={disableButtonAfterSupplierNotFound || !isSupplierCreatedByCurrentUser}
                          onClick={() =>
                            onClickSupplierBtns(
                              'delete',
                              () => onClickSaveBtn(calculateFieldsToSubmit(), [], true),
                              formFields?._id,
                            )
                          }
                        >
                          <DeleteOutlineOutlinedIcon />
                        </Button>
                        <Typography className={styles.supplierButtonText}>
                          {t(TranslationKey['Delete supplier'])}
                        </Typography>
                      </div>
                    </>
                  )}
                </div>
              }
            />

            <TableSupplier
              product={formFields}
              selectedSupplier={selectedSupplier}
              platformSettings={platformSettings}
              onClickSupplier={onClickSupplier}
            />
          </div>
        </div>

        {!!idea && disableFields ? (
          <div className={styles.existedIdeaBtnsWrapper}>
            {!isModalView ? (
              <div className={styles.tablePanelSortWrapper} onClick={setShowFullCardByCurIdea}>
                <Typography className={styles.tablePanelViewText}>
                  {showFullCard ? t(TranslationKey.Hide) : t(TranslationKey.Details)}
                </Typography>

                {!showFullCard ? <ArrowDropDownIcon color="primary" /> : <ArrowDropUpIcon color="primary" />}
              </div>
            ) : (
              <OpenInNewTab
                onClickOpenNewTab={() =>
                  onClickOpenNewTab(formFields?.parentProduct?._id || currentProduct?._id, formFields?._id)
                }
              />
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

                    <Button
                      type={ButtonType.SUCCESS}
                      disabled={!supplierFound}
                      className={styles.actionButton}
                      onClick={() => onClickAcceptButton(formFields, supplierFound)}
                    >
                      {t(TranslationKey.Save)}
                    </Button>
                  </div>
                )}

                {(isSupplierFound || isSupplierNotFound) && (
                  <p className={cx(styles.statusText, { [styles.supplierNotFoundText]: isSupplierNotFound })}>
                    {isSupplierFound ? t(TranslationKey['Supplier found']) : t(TranslationKey['Supplier not found'])}
                  </p>
                )}

                {currentUserIsClient && isCurrentIdea && isCardCreating && (
                  <Button
                    type={ButtonType.SUCCESS}
                    tooltipInfoContent={t(TranslationKey['A new product card will appear in the inventory'])}
                    disabled={idea.childProduct}
                    className={[styles.actionButton]}
                    onClick={() => onCreateProduct(calculateFieldsToCreateProductSubmit(formFields))}
                  >
                    {t(TranslationKey['Create a product card'])}
                  </Button>
                )}

                {currentUserIsClient && showCreateRequestButton && (
                  <Button
                    type={ButtonType.SUCCESS}
                    className={styles.actionButton}
                    onClick={() => onClickCreateRequestButton(formFields)}
                  >
                    <PlusIcon className={styles.plusIcon} />
                    {t(TranslationKey['Create a request'])}
                  </Button>
                )}

                {showAcceptButtonToClient /* || (currentUserIsBuyer && isSupplierSearch) */ && (
                  <Button
                    type={ButtonType.SUCCESS}
                    disabled={disableAcceptButton}
                    onClick={() => onClickAcceptButton(formFields)}
                  >
                    {t(TranslationKey.Accept)}
                  </Button>
                )}

                {currentUserIsClient && isVerified && (
                  <Button type={ButtonType.SUCCESS} onClick={() => onClickToOrder(formFields)}>
                    {t(TranslationKey['To order'])}
                  </Button>
                )}

                {currentUserIsClient && isNewIdea && (
                  <Button
                    onClick={() => {
                      onClickAcceptButton(formFields)
                    }}
                  >
                    {t(TranslationKey['To check'])}
                  </Button>
                )}

                {currentUserIsClient && isRejected && (
                  <Button type={ButtonType.DANGER} onClick={() => onClickCloseIdea(formFields._id)}>
                    {t(TranslationKey['Close idea'])}
                  </Button>
                )}

                {currentUserIsClient && isRejected && (
                  <Button type={ButtonType.SUCCESS} onClick={() => onClickReoperButton(formFields._id)}>
                    {t(TranslationKey.Restore)}
                  </Button>
                )}

                {checkIsClientOrBuyer && !isClosed && (
                  <Button onClick={() => onEditIdea(formFields)}>{t(TranslationKey.Edit)}</Button>
                )}

                {currentUserIsClient && showRejectButton && (
                  <Button type={ButtonType.DANGER} onClick={() => onClickRejectButton(formFields._id)}>
                    {t(TranslationKey.Reject)}
                  </Button>
                )}

                {isModalView && (
                  <Button
                    variant={ButtonVariant.OUTLINED}
                    className={cx(styles.actionButton, styles.cancelBtn)}
                    onClick={() => onClickCancelBtn()}
                  >
                    {t(TranslationKey.Close)}
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className={styles.addOrEditBtnsWrapper}>
            <Button
              disabled={disabledSubmit}
              type={ButtonType.SUCCESS}
              onClick={() => onClickSaveBtn(calculateFieldsToSubmit(), images)}
            >
              {t(TranslationKey.Save)}
            </Button>

            <Button
              variant={ButtonVariant.OUTLINED}
              className={cx(styles.actionButton, styles.btnLeftMargin, styles.cancelBtn)}
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
