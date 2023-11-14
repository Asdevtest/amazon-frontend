import { cx } from '@emotion/css'
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
import { clearEverythingExceptNumbers, toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './idea-view-and-edit-card.style'

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
    const { classes: classNames } = useClassNames()

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

    const getFullIdea = () => ({
      ...curIdea,
      status: curIdea?.status,
      media: curIdea?.linksToMediaFiles?.length ? [...curIdea.linksToMediaFiles] : [],
      comments: curIdea?.comments || '',
      buyerComment: curIdea?.buyerComment || '',
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

    return (
      <div className={classNames.root}>
        <div className={classNames.headerWrapper}>
          <IdeaProgressBar
            showStatusDuration={isModalView && curIdea}
            currentStatus={formFields?.status}
            ideaData={formFields}
          />

          <div className={classNames.sourcesProductWraper}>
            {formFields.childProduct && (
              <SourceProduct
                showOpenInNewTabIcon
                title={t(TranslationKey['Child product'])}
                img={formFields.childProduct?.images?.[0]}
                asin={formFields.childProduct?.asin}
                sku={formFields.childProduct?.skusByClient?.[0]}
                onClickShareIcon={() => onClickOpenProduct(formFields.childProduct?._id)}
              />
            )}
            {(currentProduct || formFields.parentProduct) && (
              <SourceProduct
                showOpenInNewTabIcon
                title={t(TranslationKey['Parent product'])}
                img={formFields.parentProduct?.images?.[0] || currentProduct?.images?.[0]}
                asin={formFields.parentProduct?.asin || currentProduct?.asin}
                sku={formFields.parentProduct?.skusByClient?.[0] || currentProduct?.skusByClient?.[0]}
                onClickShareIcon={() => onClickOpenProduct(formFields.parentProduct?._id || currentProduct?._id)}
              />
            )}
          </div>
        </div>

        <div className={cx(classNames.contentWrapper, { [classNames.modalContentWrapper]: isModalView })}>
          <div className={cx(classNames.cardWrapper, { [classNames.fullCardWpapper]: showFullCard })}>
            <div className={classNames.mediaBlock}>
              {!inCreate && (
                <div className={classNames.photoCarouselWrapper}>
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
                <div className={classNames.requestsBlockWrapper}>
                  <div className={classNames.requestsControlWrapper}>
                    <p className={classNames.requestsBlockTitle}>{t(TranslationKey.Freelance)}</p>

                    <div className={classNames.requestsControlButtonsWrapper}>
                      <div className={classNames.switcherWrapper}>
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
                    <div className={classNames.requestsWrapper}>
                      {requestsToRender?.map((request, requestIndex) => (
                        <IdeaRequestCard
                          key={requestIndex}
                          requestType={request.typeTask}
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

            <div className={classNames.commentsWrapper}>
              <Field
                multiline
                disabled={disableFields || currentUserIsBuyer}
                className={classNames.сlientСomment}
                containerClasses={classNames.noMarginContainer}
                labelClasses={classNames.spanLabel}
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
                labelClasses={classNames.spanLabel}
                className={classNames.buyerComment}
                containerClasses={classNames.noMarginContainer}
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
              <div className={cx(classNames.middleBlock, { [classNames.fullMiddleBlock]: showFullCard })}>
                <Typography className={classNames.supplierSearchTitle}>
                  {t(TranslationKey['Supplier search options'])}
                </Typography>

                <div className={cx(classNames.cardWrapper, { [classNames.fullCardWpapper]: showFullCard })}>
                  <div className={classNames.nameAndInfoProductWrapper}>
                    <Field
                      disabled={disableFields}
                      label={`${t(TranslationKey['Product name'])}*`}
                      inputProps={{ maxLength: 130 }}
                      value={formFields.productName}
                      labelClasses={classNames.spanLabel}
                      containerClasses={classNames.noMarginContainer}
                      className={classNames.oneLineField}
                      onChange={onChangeField('productName')}
                    />

                    <Field
                      multiline
                      minRows={10}
                      maxRows={10}
                      disabled={disableFields}
                      labelClasses={classNames.spanLabel}
                      className={classNames.criterionsField}
                      containerClasses={classNames.noMarginContainer}
                      inputProps={{ maxLength: 250 }}
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
                          <div ref={linkListRef} className={classNames.linksSubWrapper}>
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

                    <div className={classNames.shortFieldsSubWrapper}>
                      <div className={classNames.sizesWrapper}>
                        <div className={classNames.sizesSubWrapper}>
                          <p className={classNames.spanLabel}>{t(TranslationKey.Dimensions)}</p>

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

                      <div className={classNames.approximateCalculationFieldsWrapper}>
                        <Field
                          label={t(TranslationKey['Referral fee, $'])}
                          disabled={disableFields}
                          inputProps={{ maxLength: 6 }}
                          labelClasses={classNames.spanLabel}
                          inputClasses={classNames.approximateCalculationInput}
                          className={classNames.oneLineField}
                          containerClasses={cx(classNames.approximateCalculationInput, classNames.noMarginContainer)}
                          value={formFields.fbaFee}
                          onChange={onChangeField('fbaFee')}
                        />

                        <Field
                          label={t(TranslationKey['Approximate price'])}
                          disabled={disableFields}
                          inputProps={{ maxLength: 6 }}
                          labelClasses={classNames.spanLabel}
                          inputClasses={classNames.approximateCalculationInput}
                          className={classNames.oneLineField}
                          containerClasses={cx(classNames.approximateCalculationInput, classNames.noMarginContainer)}
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

          <div className={classNames.fullMiddleBlock}>
            <Field
              labelClasses={cx(classNames.spanLabel, classNames.labelWithMargin)}
              label={t(TranslationKey.Suppliers)}
              containerClasses={classNames.noMarginContainer}
              inputComponent={
                <div className={classNames.supplierActionsWrapper}>
                  {selectedSupplier && (checkIsClientOrBuyer || checkIsSupervisor(userRole)) && (
                    <div className={classNames.supplierButtonWrapper}>
                      <Button
                        disabled={!selectedSupplier}
                        tooltipInfoContent={t(TranslationKey['Open the parameters supplier'])}
                        className={classNames.iconBtn}
                        onClick={() => onClickSupplierBtns('view', undefined, formFields?._id)}
                      >
                        <VisibilityOutlinedIcon />
                      </Button>
                      <Typography className={classNames.supplierButtonText}>
                        {t(TranslationKey['Open the parameters supplier'])}
                      </Typography>
                    </div>
                  )}

                  <div className={classNames.supplierButtonWrapper}>
                    <Button
                      disabled={!formFields.productName || disableButtonAfterSupplierNotFound || !checkIsClientOrBuyer}
                      className={classNames.iconBtn}
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
                    <Typography className={classNames.supplierButtonText}>
                      {t(TranslationKey['Add supplier'])}
                    </Typography>
                  </div>
                  {selectedSupplier && (
                    <>
                      <div className={classNames.supplierButtonWrapper}>
                        <Button
                          tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                          disabled={disableButtonAfterSupplierNotFound || !isSupplierCreatedByCurrentUser}
                          className={classNames.iconBtn}
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
                        <Typography className={classNames.supplierButtonText}>
                          {t(TranslationKey['Edit a supplier'])}
                        </Typography>
                      </div>
                      <div className={classNames.supplierButtonWrapper}>
                        <Button
                          tooltipInfoContent={t(TranslationKey['Delete the selected supplier'])}
                          className={cx(classNames.iconBtn, classNames.iconBtnRemove)}
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
                        <Typography className={classNames.supplierButtonText}>
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
          <div className={classNames.existedIdeaBtnsWrapper}>
            {!isModalView ? (
              <div className={classNames.tablePanelSortWrapper} onClick={setShowFullCardByCurIdea}>
                <Typography className={classNames.tablePanelViewText}>
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
              <div className={classNames.existedIdeaBtnsSubWrapper}>
                {currentUserIsBuyer && isSupplierSearch && (
                  <div className={classNames.supplierFoundWrapper}>
                    <RadioButtons
                      radioBottonsSettings={radioBottonsSettings}
                      currentValue={supplierFound}
                      onClickRadioButton={selectedStatus => setSupplierFound(selectedStatus)}
                    />

                    <Button
                      success
                      disabled={!supplierFound}
                      variant="contained"
                      color="primary"
                      className={classNames.actionButton}
                      onClick={() => onClickAcceptButton(formFields, supplierFound)}
                    >
                      {t(TranslationKey.Save)}
                    </Button>
                  </div>
                )}

                {(isSupplierFound || isSupplierNotFound) && (
                  <p className={cx(classNames.statusText, { [classNames.supplierNotFoundText]: isSupplierNotFound })}>
                    {isSupplierFound ? t(TranslationKey['Supplier found']) : t(TranslationKey['Supplier not found'])}
                  </p>
                )}

                {currentUserIsClient && isCurrentIdea && isCardCreating && (
                  <Button
                    success
                    tooltipInfoContent={t(TranslationKey['A new product card will appear in the inventory'])}
                    variant="contained"
                    color="primary"
                    disabled={idea.childProduct}
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
                    onClick={() => onClickCreateRequestButton(formFields)}
                  >
                    <PlusIcon className={classNames.plusIcon} />
                    {t(TranslationKey['Create a request'])}
                  </Button>
                )}

                {showAcceptButtonToClient /* || (currentUserIsBuyer && isSupplierSearch) */ && (
                  <Button
                    success
                    disabled={disableAcceptButton}
                    variant="contained"
                    color="primary"
                    onClick={() => onClickAcceptButton(formFields)}
                  >
                    {t(TranslationKey.Accept)}
                  </Button>
                )}

                {currentUserIsClient && isVerified && (
                  <Button success variant="contained" onClick={() => onClickToOrder(formFields)}>
                    {t(TranslationKey['To order'])}
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
                  <Button danger variant="contained" onClick={() => onClickCloseIdea(formFields._id)}>
                    {t(TranslationKey['Close idea'])}
                  </Button>
                )}

                {currentUserIsClient && isRejected && (
                  <Button success variant="contained" onClick={() => onClickReoperButton(formFields._id)}>
                    {t(TranslationKey.Restore)}
                  </Button>
                )}

                {checkIsClientOrBuyer && !isClosed && (
                  <Button variant="contained" color="primary" onClick={() => onEditIdea(formFields)}>
                    {t(TranslationKey.Edit)}
                  </Button>
                )}

                {currentUserIsClient && showRejectButton && (
                  <Button danger variant="contained" onClick={() => onClickRejectButton(formFields._id)}>
                    {t(TranslationKey.Reject)}
                  </Button>
                )}

                {isModalView && (
                  <Button
                    variant="text"
                    className={cx(classNames.actionButton, classNames.cancelBtn)}
                    onClick={() => onClickCancelBtn()}
                  >
                    {t(TranslationKey.Close)}
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
