import { Fragment, memo } from 'react'

import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Alert, Paper, Typography } from '@mui/material'

import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { ACCESS_DENIED } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { BindProductForm } from '@components/forms/bind-product-form'
import { SupplierApproximateCalculationsForm } from '@components/forms/supplier-approximate-calculations-form'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { ParentProductIcon, VariationIcon } from '@components/shared/svg-icons'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsAdmin, checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './top-card.style'

import { TableSupplier } from '../../table-supplier'

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
    alertFailedText,
    curUserRole,
    onChangeField,
    actionStatus,
    product,
    productVariations,
    navigateToProduct,
    unbindProductHandler,
    showSupplierApproximateCalculationsModal,
    storekeepersData,
    volumeWeightCoefficient,
    onClickSupplierApproximateCalculations,
    shops,
    modal,
    platformSettings,
    productBase,
    onClickSupplierBtns,
    selectedSupplier,
    formFieldsValidationErrors,
    onClickSupplier,
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
  }) => {
    const { classes: styles, cx } = useStyles()

    const clientToEdit =
      checkIsClient(curUserRole) && product.isCreatedByClient && clientToEditStatuses.includes(productBase.status)

    const isSupplierAcceptRevokeActive =
      selectedSupplier && product.currentSupplierId && product.currentSupplierId === selectedSupplier._id

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
      // checkIsBuyer(curUserRole)
      (checkIsBuyer(curUserRole) && productBase.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
      (checkIsBuyer(curUserRole) &&
        productBase.status > ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT] &&
        productBase.status < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS])

    const isChildProduct = product.parentProductId

    const boxPropertiesIsFull =
      selectedSupplier?.boxProperties?.amountInBox &&
      selectedSupplier?.boxProperties?.boxLengthCm &&
      selectedSupplier?.boxProperties?.boxWidthCm &&
      selectedSupplier?.boxProperties?.boxHeightCm &&
      selectedSupplier?.boxProperties?.boxWeighGrossKg

    const boxPropertiesIsFullAndMainsValues =
      boxPropertiesIsFull &&
      selectedSupplier.amount &&
      selectedSupplier.minlot &&
      selectedSupplier.priceInYuan &&
      selectedSupplier.price

    return (
      <Fragment>
        <Paper className={styles.mainCardWrapper}>
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
                {actionStatus === loadingStatuses.SUCCESS || actionStatus === loadingStatuses.FAILED ? (
                  <Alert
                    className={styles.alert}
                    elevation={0}
                    severity={actionStatus === loadingStatuses.SUCCESS ? 'success' : 'error'}
                  >
                    {actionStatus === loadingStatuses.SUCCESS
                      ? t(TranslationKey['Request processed'])
                      : alertFailedText || t(TranslationKey['Fields not filled in'])}
                  </Alert>
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
                selectedSupplier={selectedSupplier}
                onTriggerOpenModal={onTriggerOpenModal}
                onChangeField={onChangeField}
                onClickSupplierBtns={onClickSupplierBtns}
                onClickSupplier={onClickSupplier}
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
            <>
              <div className={styles.suppliersWrapper}>
                <Typography variant="h6" className={styles.supplierTitle}>
                  {t(TranslationKey['List of suppliers'])}
                </Typography>

                {!(
                  !showActionBtns ||
                  (checkIsClient(curUserRole) && product.archive) ||
                  (checkIsClient(curUserRole) && !product.isCreatedByClient) ||
                  (checkIsClient(curUserRole) && !clientToEditStatuses.includes(productBase.status)) ||
                  checkIsSupervisor(curUserRole) ||
                  checkIsAdmin(curUserRole) ||
                  (checkIsResearcher(curUserRole) &&
                    productBase.status === ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP])
                ) || checkIsBuyer(curUserRole) ? (
                  <div className={styles.supplierActionsWrapper}>
                    <div className={styles.supplierContainer}>
                      {checkIsSupervisor(curUserRole) || checkIsClient(curUserRole) || checkIsBuyer(curUserRole) ? (
                        <div className={styles.calculationBtnWrapper}>
                          <Button
                            tooltipAttentionContent={
                              !boxPropertiesIsFullAndMainsValues && t(TranslationKey['Not enough data'])
                            }
                            disabled={!boxPropertiesIsFullAndMainsValues}
                            variant="contained"
                            color="primary"
                            onClick={onClickSupplierApproximateCalculations}
                          >
                            {t(TranslationKey['View an oriented calculation'])}
                          </Button>
                        </div>
                      ) : null}

                      <div className={styles.supplierButtonWrapper}>
                        <Button
                          tooltipInfoContent={t(TranslationKey['Add a new supplier to this product'])}
                          className={styles.iconBtn}
                          onClick={() => onClickSupplierBtns('add')}
                        >
                          <AddIcon />
                        </Button>
                        <Typography className={styles.supplierButtonText}>
                          {t(TranslationKey['Add supplier'])}
                        </Typography>
                      </div>

                      {selectedSupplier ? (
                        <>
                          {((user?._id === selectedSupplier?.createdBy?._id ||
                            user?.masterUser?._id === selectedSupplier?.createdBy?._id) &&
                            checkIsBuyer(curUserRole)) ||
                          selectedSupplier.name !== ACCESS_DENIED ? (
                            <>
                              {!(checkIsClient(curUserRole) && user?._id !== selectedSupplier.createdBy?._id) ? (
                                <div className={styles.supplierButtonWrapper}>
                                  <Button
                                    tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                                    className={styles.iconBtn}
                                    onClick={() => onClickSupplierBtns('edit')}
                                  >
                                    <EditOutlinedIcon />
                                  </Button>
                                  <Typography className={styles.supplierButtonText}>
                                    {t(TranslationKey['Edit a supplier'])}
                                  </Typography>
                                </div>
                              ) : null}

                              {product.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS] && (
                                <div className={styles.supplierButtonWrapper}>
                                  <Button
                                    danger
                                    tooltipInfoContent={t(TranslationKey['Delete the selected supplier'])}
                                    className={cx(styles.iconBtn, styles.iconBtnRemove)}
                                    onClick={() => onClickSupplierBtns('delete')}
                                  >
                                    <DeleteOutlineOutlinedIcon />
                                  </Button>
                                  <Typography className={styles.supplierButtonText}>
                                    {t(TranslationKey['Delete supplier'])}
                                  </Typography>
                                </div>
                              )}
                            </>
                          ) : null}

                          {showActionBtns ? (
                            <div className={styles.supplierButtonWrapper}>
                              <Button
                                tooltipInfoContent={t(TranslationKey['Open the parameters supplier'])}
                                className={styles.iconBtn}
                                onClick={() => onClickSupplierBtns('view')}
                              >
                                <VisibilityOutlinedIcon />
                              </Button>
                              <Typography className={styles.supplierButtonText}>
                                {t(TranslationKey['Open the parameters supplier'])}
                              </Typography>
                            </div>
                          ) : null}

                          {showActionBtns ? (
                            <div className={styles.supplierButtonWrapper}>
                              <Button
                                danger={isSupplierAcceptRevokeActive}
                                success={!isSupplierAcceptRevokeActive}
                                tooltipInfoContent={
                                  isSupplierAcceptRevokeActive
                                    ? t(TranslationKey['Remove the current supplier'])
                                    : t(TranslationKey['Select a supplier as the current supplier'])
                                }
                                className={cx(styles.iconBtn, {
                                  [styles.iconBtnAcceptRevoke]: isSupplierAcceptRevokeActive,
                                })}
                                onClick={() =>
                                  isSupplierAcceptRevokeActive
                                    ? onClickSupplierBtns('acceptRevoke')
                                    : onClickSupplierBtns('accept')
                                }
                              >
                                {isSupplierAcceptRevokeActive ? <AcceptRevokeIcon /> : <AcceptIcon />}
                              </Button>
                              <Typography className={styles.supplierButtonText}>
                                {isSupplierAcceptRevokeActive
                                  ? t(TranslationKey['Remove the main supplier status'])
                                  : t(TranslationKey['Make the supplier the main'])}
                              </Typography>
                            </div>
                          ) : null}
                        </>
                      ) : undefined}
                    </div>
                  </div>
                ) : (
                  <div className={styles.supplierActionsWrapper}>
                    <div className={styles.supplierContainer}>
                      {checkIsSupervisor(curUserRole) || checkIsClient(curUserRole) || checkIsBuyer(curUserRole) ? (
                        <div className={styles.calculationBtnWrapper}>
                          <Button
                            tooltipAttentionContent={
                              !boxPropertiesIsFullAndMainsValues && t(TranslationKey['Not enough data'])
                            }
                            disabled={!boxPropertiesIsFullAndMainsValues}
                            variant="contained"
                            color="primary"
                            onClick={onClickSupplierApproximateCalculations}
                          >
                            {t(TranslationKey['View an oriented calculation'])}
                          </Button>
                        </div>
                      ) : null}

                      {checkIsAdmin(curUserRole) || checkIsSupervisor(curUserRole) || checkIsClient(curUserRole) ? (
                        <div className={styles.supplierButtonWrapper}>
                          <Button
                            disabled={!selectedSupplier}
                            tooltipInfoContent={t(TranslationKey['Open the parameters supplier'])}
                            className={styles.iconBtn}
                            onClick={() => onClickSupplierBtns('view')}
                          >
                            <VisibilityOutlinedIcon />
                          </Button>
                          <Typography className={styles.supplierButtonText}>
                            {t(TranslationKey['Open the parameters supplier'])}
                          </Typography>
                        </div>
                      ) : null}

                      {(user?._id === selectedSupplier?.createdBy?._id ||
                        user?.masterUser?._id === selectedSupplier?.createdBy?._id) &&
                      checkIsBuyer(curUserRole) ? (
                        <div className={styles.supplierButtonWrapper}>
                          <Button
                            disabled={!selectedSupplier || selectedSupplier.name === ACCESS_DENIED}
                            tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                            className={styles.iconBtn}
                            onClick={() => onClickSupplierBtns('edit')}
                          >
                            <EditOutlinedIcon />
                          </Button>
                          <Typography className={styles.supplierButtonText}>
                            {t(TranslationKey['Edit a supplier'])}
                          </Typography>
                        </div>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>

              <TableSupplier
                // isClient
                platformSettings={platformSettings}
                product={product}
                productBaseData={productBase}
                selectedSupplier={selectedSupplier}
                onClickSupplier={onClickSupplier}
              />
            </>
          )}

          {showProgress && (
            <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
          )}

          {actionStatus === loadingStatuses.IS_LOADING && !showProgress ? <CircularProgressWithLabel /> : null}
        </Paper>

        <Modal
          openModal={showSupplierApproximateCalculationsModal}
          setOpenModal={() => onTriggerOpenModal('showSupplierApproximateCalculationsModal')}
        >
          <SupplierApproximateCalculationsForm
            product={product}
            supplier={selectedSupplier}
            volumeWeightCoefficient={volumeWeightCoefficient}
            storekeepers={storekeepersData}
            onClose={() => onTriggerOpenModal('showSupplierApproximateCalculationsModal')}
          />
        </Modal>

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
      </Fragment>
    )
  },
)
