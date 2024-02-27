import { memo } from 'react'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BindProductForm } from '@components/forms/bind-product-form'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { ParentProductIcon, VariationIcon } from '@components/shared/svg-icons'
import { ListSuppliers } from '@components/shared/tables/list-suppliers'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './top-card.style'

import { FieldsAndSuppliers } from './fields-and-suppliers'
import { RightSideComments } from './right-side-comments'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const TopCard = memo(
  ({
    user,
    imagesForLoad,
    showProgress,
    progressValue,
    curUserRole,
    onChangeField,
    actionStatus,
    product,
    productVariations,
    navigateToProduct,
    unbindProductHandler,
    storekeepersData,
    shops,
    modal,
    platformSettings,
    productBase,
    formFieldsValidationErrors,
    onClickParseProductData,
    onClickSetProductStatusBtn,
    handleProductActionButtons,
    onChangeImagesForLoad,
    acceptMessage,
    showAcceptMessage,
    showBindProductModal,
    productsToBind,
    onTriggerOpenModal,
    onClickGetProductsToBind,
    onClickHsCode,
    onClickNextButton,
    loadMorePermissionsDataHadler,
    onClickSubmitSearch,
    onClickSaveSupplierBtn,
    onSaveForceProductData,
  }) => {
    const { classes: styles, cx } = useStyles()

    const clientToEdit =
      checkIsClient(curUserRole) && product.isCreatedByClient && clientToEditStatuses.includes(productBase.status)

    const showActionBtns =
      (checkIsSupervisor(curUserRole) &&
        productBase.status !== ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP] &&
        productBase.status !== ProductStatusByKey[ProductStatus.BUYER_PICKED_PRODUCT] &&
        productBase.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
      (checkIsSupervisor(curUserRole) &&
        productBase.status >= ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
        productBase.status < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS] &&
        productBase.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT] &&
        productBase.status !== ProductStatusByKey[ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH]) ||
      (checkIsClient(curUserRole) && product.isCreatedByClient && clientToEditStatuses.includes(productBase.status)) ||
      (checkIsResearcher(curUserRole) &&
        productBase.status < ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR]) ||
      (checkIsBuyer(curUserRole) && productBase.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
      (checkIsBuyer(curUserRole) &&
        productBase.status > ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT] &&
        productBase.status < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS])

    const isChildProduct = product.parentProductId

    return (
      <>
        <div className={styles.mainCardWrapper}>
          <div className={styles.topPartCardWrapper}>
            <div className={styles.mainCard}>
              <div className={styles.variationWrapper}>
                {!isChildProduct ? (
                  <ParentProductIcon className={styles.parentVariation} />
                ) : (
                  <VariationIcon className={styles.variationIcon} />
                )}

                <p className={cx(styles.variationText, { [styles.parentVariation]: !isChildProduct })}>
                  {isChildProduct ? t(TranslationKey['Child product']) : t(TranslationKey['Parent product'])}
                </p>
              </div>
              <div className={styles.card}>
                {product.images.length ? (
                  <div className={styles.carouselWrapper}>
                    <SlideshowGallery
                      slidesToShow={5}
                      isEditable={clientToEdit}
                      files={imagesForLoad}
                      onChangeImagesForLoad={onChangeImagesForLoad}
                    />
                  </div>
                ) : undefined}

                {(checkIsResearcher(curUserRole) || checkIsClient(curUserRole) || checkIsSupervisor(curUserRole)) &&
                !product.archive &&
                showActionBtns ? (
                  <div className={styles.actionsWrapper}>
                    {(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole) || clientToEdit) && (
                      <div className={styles.imageFileInputWrapper}>
                        <UploadFilesInput
                          fullWidth
                          images={imagesForLoad}
                          setImages={onChangeImagesForLoad}
                          maxNumber={50}
                        />
                      </div>
                    )}
                  </div>
                ) : undefined}
              </div>
              <FieldsAndSuppliers
                user={user}
                showActionBtns={showActionBtns}
                formFieldsValidationErrors={formFieldsValidationErrors}
                curUserRole={curUserRole}
                product={product}
                productVariations={productVariations}
                navigateToProduct={navigateToProduct}
                unbindProductHandler={unbindProductHandler}
                shops={shops}
                productBase={productBase}
                onTriggerOpenModal={onTriggerOpenModal}
                onChangeField={onChangeField}
                onClickHsCode={onClickHsCode}
                onClickParseProductData={onClickParseProductData}
              />
            </div>
            <RightSideComments
              modal={modal}
              showActionBtns={showActionBtns}
              curUserRole={curUserRole}
              product={product}
              productBase={productBase}
              acceptMessage={acceptMessage}
              showAcceptMessage={showAcceptMessage}
              formFieldsValidationErrors={formFieldsValidationErrors}
              handleProductActionButtons={handleProductActionButtons}
              onClickSetProductStatusBtn={onClickSetProductStatusBtn}
              onChangeField={onChangeField}
            />
          </div>

          {!checkIsResearcher(curUserRole) && (
            <ListSuppliers
              formFields={product}
              platformSettings={platformSettings}
              storekeepers={storekeepersData}
              onClickSaveSupplier={onClickSaveSupplierBtn}
              onSaveProduct={onSaveForceProductData}
            />
          )}

          {showProgress && (
            <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
          )}

          {actionStatus === loadingStatuses.IS_LOADING && !showProgress ? <CircularProgressWithLabel /> : null}
        </div>

        {showBindProductModal && (
          <Modal
            noPadding
            openModal={showBindProductModal}
            setOpenModal={() => onTriggerOpenModal('showBindProductModal')}
          >
            <BindProductForm
              sourceProduct={product}
              productsToBind={productsToBind}
              loadMorePermissionsDataHadler={loadMorePermissionsDataHadler}
              onClickSubmitSearch={onClickSubmitSearch}
              onClickGetProductsToBind={onClickGetProductsToBind}
              onClickNextButton={onClickNextButton}
              onClickCancelButton={() => onTriggerOpenModal('showBindProductModal')}
            />
          </Modal>
        )}
      </>
    )
  },
)
