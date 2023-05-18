/* eslint-disable no-unused-vars */
import { cx } from '@emotion/css'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { Box, Grid, Paper, Typography, Alert } from '@mui/material'

import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import { observer } from 'mobx-react'

import { ProductDataParser } from '@constants/product/product-data-parser'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ImageEditForm } from '@components/forms/image-edit-form'
import { BigImagesModal } from '@components/modals/big-images-modal'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { CustomCarousel } from '@components/shared/custom-carousel/custom-carousel'
import { Modal } from '@components/shared/modal'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { checkIsAdmin, checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'
import { downloadFileByLink } from '@utils/upload-files'

import { TableSupplier } from '../../table-supplier'
import { FieldsAndSuppliers } from './fields-and-suppliers'
import { RightSideComments } from './right-side-comments'
import { useClassNames } from './top-card.style'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const TopCard = observer(
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
    shops,

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
    onClickHsCode,
  }) => {
    const { classes: classNames } = useClassNames()

    const [showImageModal, setShowImageModal] = useState(false)

    const [bigImagesOptions, setBigImagesOptions] = useState({ images: [], imgIndex: 0 })

    const [imageEditOpen, setImageEditOpen] = useState(false)

    const clientToEdit =
      checkIsClient(curUserRole) && product.isCreatedByClient && clientToEditStatuses.includes(productBase.status)

    const isSupplierAcceptRevokeActive =
      selectedSupplier && product.currentSupplierId && product.currentSupplierId === selectedSupplier._id

    const onClickRemoveImageObj = imageIndex => {
      const newArr = imagesForLoad.filter((el, i) => i !== imageIndex)

      onChangeImagesForLoad(newArr)
      setBigImagesOptions(() => ({
        ...bigImagesOptions,
        imgIndex: bigImagesOptions.imgIndex - 1 < 0 ? 0 : bigImagesOptions.imgIndex - 1,
        images: newArr,
      }))

      if (!newArr.length) {
        setShowImageModal(false)
      }
    }

    const onUploadFile = imageIndex => async evt => {
      if (evt.target.files.length === 0) {
        return
      } else {
        const filesArr = Array.from(evt.target.files)

        evt.preventDefault()

        const readyFilesArr = filesArr.map(el => ({
          data_url: URL.createObjectURL(el),
          file: new File([el], el.name?.replace(/ /g, ''), {
            type: el.type,
            lastModified: el.lastModified,
          }),
        }))

        // setImagesData(() => imagesData.map(el => (el._id === imageId ? {...el, image: readyFilesArr[0]} : el)))

        onChangeImagesForLoad(imagesForLoad.map((el, i) => (i === imageIndex ? readyFilesArr[0] : el)))
        setBigImagesOptions(() => ({
          ...bigImagesOptions,
          images: imagesForLoad.map((el, i) => (i === imageIndex ? readyFilesArr[0] : el)),
        }))
      }
    }

    const onClickMakeMainImageObj = (imageIndex, image) => {
      onChangeImagesForLoad([image, ...imagesForLoad.filter((el, i) => i !== imageIndex)])
      setBigImagesOptions(() => ({
        ...bigImagesOptions,
        imgIndex: 0,
        images: [image, ...imagesForLoad.filter((el, i) => i !== imageIndex)],
      }))
    }

    const onClickEditImage = () => {
      setImageEditOpen(!imageEditOpen)
    }

    const onClickEditImageSubmit = image => {
      // bigImagesOptions.images[bigImagesOptions.imgIndex]

      onChangeImagesForLoad(imagesForLoad.map((el, i) => (i === bigImagesOptions.imgIndex ? image : el)))
      setBigImagesOptions(() => ({
        ...bigImagesOptions,
        images: imagesForLoad.map((el, i) => (i === bigImagesOptions.imgIndex ? image : el)),
      }))
    }

    const bigImagesModalControls = (imageIndex, image) => (
      <>
        {(checkIsResearcher(curUserRole) || checkIsClient(curUserRole) || checkIsSupervisor(curUserRole)) &&
          !product.archive &&
          showActionBtns && (
            <>
              <>
                {imageIndex === 0 ? (
                  <div className={cx(classNames.imagesModalBtn, classNames.activeMainIcon)}>
                    <StarOutlinedIcon />
                  </div>
                ) : (
                  <Button
                    disabled={imageIndex === 0}
                    // success={imageIndex === 0}
                    className={cx(classNames.imagesModalBtn)}
                    onClick={() => onClickMakeMainImageObj(imageIndex, image)}
                  >
                    <StarOutlinedIcon />
                  </Button>
                )}
              </>
              <Button className={cx(classNames.imagesModalBtn)} onClick={() => onClickEditImage()}>
                <ModeOutlinedIcon />
              </Button>

              <Button className={cx(classNames.imagesModalBtn)}>
                <AutorenewIcon />
                <input
                  type={'file'}
                  className={classNames.pasteInput}
                  defaultValue={''}
                  onChange={onUploadFile(imageIndex)}
                />
              </Button>

              <Button
                danger
                className={cx(classNames.imagesModalBtn)}
                onClick={() => onClickRemoveImageObj(imageIndex)}
              >
                <DeleteOutlineOutlinedIcon />
              </Button>
            </>
          )}
      </>
    )

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

    return (
      <React.Fragment>
        <Paper className={classNames.mainCardWrapper}>
          <Grid container spacing={2}>
            <Grid container item sm={7} xs={12}>
              <Grid item xs={12}>
                <Box>
                  {product.images && product.images.length ? (
                    <div className={classNames.carouselWrapper}>
                      <CustomCarousel>
                        {(checkIsBuyer(curUserRole) || checkIsAdmin(curUserRole) ? product.images : imagesForLoad).map(
                          (imageHash, index) => (
                            <img
                              key={index}
                              alt=""
                              className={classNames.carouselImage}
                              // src={getAmazonImageUrl(imageHash, true)}

                              src={
                                typeof imageHash === 'string'
                                  ? getAmazonImageUrl(imageHash, true)
                                  : imageHash?.file.type.includes('image')
                                  ? imageHash?.data_url
                                  : '/assets/icons/file.png'
                              }
                              onClick={() => {
                                setShowImageModal(!showImageModal)
                                setBigImagesOptions({
                                  images:
                                    checkIsBuyer(curUserRole) || checkIsAdmin(curUserRole)
                                      ? product.images
                                      : imagesForLoad,
                                  imgIndex: index,
                                })
                              }}
                            />
                          ),
                        )}
                      </CustomCarousel>
                    </div>
                  ) : undefined}
                </Box>
                {(checkIsResearcher(curUserRole) || checkIsClient(curUserRole) || checkIsSupervisor(curUserRole)) &&
                !product.archive &&
                showActionBtns ? (
                  <div className={classNames.actionsWrapper}>
                    {/* <Box className={classNames.parseButtonsWrapper}>
                      <React.Fragment>
                        <Button
                          tooltipInfoContent={t(
                            TranslationKey[
                              'Fills the card with the necessary information from the Amazon page by ASIN'
                            ],
                          )}
                          className={classNames.buttonParseAmazon}
                          onClick={() => onClickParseProductData(ProductDataParser.AMAZON, product)}
                        >
                          {'Parse Amazon'}
                        </Button>
                        <Button
                          tooltipInfoContent={t(
                            TranslationKey['Fills the card with the necessary information from Seller Central by ASIN'],
                          )}
                          className={classNames.buttonParseAmazon}
                          onClick={() => onClickParseProductData(ProductDataParser.SELLCENTRAL, product)}
                        >
                          {'Parse Seller central'}
                        </Button>
                      </React.Fragment>
                    </Box> */}
                    {(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole) || clientToEdit) && (
                      <div className={classNames.imageFileInputWrapper}>
                        <UploadFilesInput
                          images={imagesForLoad}
                          setImages={onChangeImagesForLoad}
                          // maxNumber={50 - product.images?.length < 0 ? 0 : 50 - product.images?.length}
                          // acceptType={['jpg', 'gif', 'png', 'jpeg', 'pdf']}
                          maxNumber={50}
                        />
                      </div>
                    )}
                  </div>
                ) : undefined}
                {actionStatus === loadingStatuses.success || actionStatus === loadingStatuses.failed ? (
                  <Alert
                    className={classNames.alert}
                    elevation={0}
                    severity={actionStatus === loadingStatuses.success ? 'success' : 'error'}
                  >
                    {actionStatus === loadingStatuses.success
                      ? t(TranslationKey['Request processed'])
                      : alertFailedText || t(TranslationKey['Fields not filled in'])}
                  </Alert>
                ) : undefined}
              </Grid>
              <FieldsAndSuppliers
                user={user}
                showActionBtns={showActionBtns}
                formFieldsValidationErrors={formFieldsValidationErrors}
                curUserRole={curUserRole}
                product={product}
                shops={shops}
                productBase={productBase}
                selectedSupplier={selectedSupplier}
                onChangeField={onChangeField}
                onClickSupplierBtns={onClickSupplierBtns}
                onClickSupplier={onClickSupplier}
                onClickHsCode={onClickHsCode}
                onClickParseProductData={onClickParseProductData}
              />
            </Grid>
            <RightSideComments
              showActionBtns={showActionBtns}
              curUserRole={curUserRole}
              product={product}
              productBase={productBase}
              acceptMessage={acceptMessage}
              formFieldsValidationErrors={formFieldsValidationErrors}
              handleProductActionButtons={handleProductActionButtons}
              onClickSetProductStatusBtn={onClickSetProductStatusBtn}
              onChangeField={onChangeField}
            />
          </Grid>

          {!checkIsResearcher(curUserRole) && (
            <>
              <div className={classNames.suppliersWrapper}>
                <Typography variant="h6" className={classNames.supplierTitle}>
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
                  <div className={classNames.supplierActionsWrapper}>
                    <div className={classNames.supplierContainer}>
                      <div className={classNames.supplierButtonWrapper}>
                        <Button
                          tooltipInfoContent={t(TranslationKey['Add a new supplier to this product'])}
                          className={classNames.iconBtn}
                          onClick={() => onClickSupplierBtns('add')}
                        >
                          <AddIcon />
                        </Button>
                        <Typography className={classNames.supplierButtonText}>
                          {t(TranslationKey['Add supplier'])}
                        </Typography>
                      </div>

                      {selectedSupplier ? (
                        <>
                          {((user?._id === selectedSupplier?.createdBy?._id ||
                            user?.masterUser?._id === selectedSupplier?.createdBy?._id) &&
                            checkIsBuyer(curUserRole)) ||
                          selectedSupplier.name !== 'access denied' ? (
                            <>
                              {checkIsAdmin(curUserRole) ||
                              checkIsSupervisor(curUserRole) ||
                              (checkIsClient(curUserRole) && user?._id !== selectedSupplier.createdBy?._id) ? (
                                <div className={classNames.supplierButtonWrapper}>
                                  <Button
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
                              {!(checkIsClient(curUserRole) && user?._id !== selectedSupplier.createdBy?._id) ? (
                                <div className={classNames.supplierButtonWrapper}>
                                  <Button
                                    tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                                    className={classNames.iconBtn}
                                    onClick={() => onClickSupplierBtns('edit')}
                                  >
                                    <EditOutlinedIcon />
                                  </Button>
                                  <Typography className={classNames.supplierButtonText}>
                                    {t(TranslationKey['Edit a supplier'])}
                                  </Typography>
                                </div>
                              ) : null}

                              {product.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS] && (
                                <div className={classNames.supplierButtonWrapper}>
                                  <Button
                                    tooltipInfoContent={t(TranslationKey['Delete the selected supplier'])}
                                    className={cx(classNames.iconBtn, classNames.iconBtnRemove)}
                                    onClick={() => onClickSupplierBtns('delete')}
                                  >
                                    <DeleteOutlineOutlinedIcon />
                                  </Button>
                                  <Typography className={classNames.supplierButtonText}>
                                    {t(TranslationKey['Delete supplier'])}
                                  </Typography>
                                </div>
                              )}
                            </>
                          ) : null}

                          {showActionBtns ? (
                            <div className={classNames.supplierButtonWrapper}>
                              <Button
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

                          {showActionBtns ? (
                            <div className={classNames.supplierButtonWrapper}>
                              <Button
                                tooltipInfoContent={
                                  isSupplierAcceptRevokeActive
                                    ? t(TranslationKey['Remove the current supplier'])
                                    : t(TranslationKey['Select a supplier as the current supplier'])
                                }
                                className={cx(classNames.iconBtn, classNames.iconBtnAccept, {
                                  [classNames.iconBtnAcceptRevoke]: isSupplierAcceptRevokeActive,
                                })}
                                onClick={() =>
                                  isSupplierAcceptRevokeActive
                                    ? onClickSupplierBtns('acceptRevoke')
                                    : onClickSupplierBtns('accept')
                                }
                              >
                                {isSupplierAcceptRevokeActive ? <AcceptRevokeIcon /> : <AcceptIcon />}
                              </Button>
                              <Typography className={classNames.supplierButtonText}>
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
                  <div className={classNames.supplierActionsWrapper}>
                    <div className={classNames.supplierContainer}>
                      {/* {selectedSupplier && selectedSupplier.name !== 'access denied' ? ( */}
                      <>
                        {checkIsAdmin(curUserRole) || checkIsSupervisor(curUserRole) || checkIsClient(curUserRole) ? (
                          <div className={classNames.supplierButtonWrapper}>
                            <Button
                              disabled={!selectedSupplier /* || selectedSupplier.name === 'access denied'*/}
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
                        {(user?._id === selectedSupplier?.createdBy?._id ||
                          user?.masterUser?._id === selectedSupplier?.createdBy?._id) &&
                        checkIsBuyer(curUserRole) ? (
                          <div className={classNames.supplierButtonWrapper}>
                            <Button
                              disabled={!selectedSupplier || selectedSupplier.name === 'access denied'}
                              tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                              className={classNames.iconBtn}
                              onClick={() => onClickSupplierBtns('edit')}
                            >
                              <EditOutlinedIcon />
                            </Button>
                            <Typography className={classNames.supplierButtonText}>
                              {t(TranslationKey['Edit a supplier'])}
                            </Typography>
                          </div>
                        ) : null}
                      </>
                      {/* ) : undefined} */}
                    </div>
                  </div>
                )}
              </div>

              <TableSupplier
                // isClient
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

          {actionStatus === loadingStatuses.isLoading && !showProgress ? <CircularProgressWithLabel /> : null}
        </Paper>

        <BigImagesModal
          showPreviews
          openModal={showImageModal}
          setOpenModal={() => setShowImageModal(!showImageModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
          setImageIndex={imgIndex => setBigImagesOptions(() => ({ ...bigImagesOptions, imgIndex }))}
          controls={bigImagesModalControls}
        />

        <Modal openModal={imageEditOpen} setOpenModal={() => setImageEditOpen(!imageEditOpen)}>
          <ImageEditForm
            item={bigImagesOptions.images[bigImagesOptions.imgIndex]}
            setOpenModal={() => setImageEditOpen(!imageEditOpen)}
            onSave={onClickEditImageSubmit}
          />
        </Modal>

        {/* <Modal openModal={showImageModal} setOpenModal={() => setShowImageModal(!showImageModal)}>
          <CustomImageGallery images={bigImagesOptions.images} imgIndex={bigImagesOptions.imgIndex} />
        </Modal> */}
      </React.Fragment>
    )
  },
)
