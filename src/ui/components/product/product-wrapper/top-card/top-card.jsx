/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import {Box, Grid, Paper, Typography, Alert} from '@mui/material'

import React, {useState} from 'react'

import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
// import DeleteIcon from '@material-ui/icons/Delete'
// import EditIcon from '@material-ui/icons/Edit'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsAdmin, checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor} from '@utils/checks'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {t} from '@utils/translations'

import {TableSupplier} from '../../table-supplier'
import {FieldsAndSuppliers} from './fields-and-suppliers'
import {RightSideComments} from './right-side-comments'
import {useClassNames} from './top-card.style'

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
  }) => {
    const {classes: classNames} = useClassNames()

    const [showImageModal, setShowImageModal] = useState(false)

    const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

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
                      <Carousel animation="slide" timeout={50}>
                        {product.images.map((imageHash, index) => (
                          <Box key={index} textAlign="center" className={classNames.carouselImageWrapper}>
                            <img
                              alt=""
                              className={classNames.carouselImage}
                              src={getAmazonImageUrl(imageHash, true)}
                              onClick={() => {
                                setShowImageModal(!showImageModal)
                                setBigImagesOptions({images: product.images, imgIndex: index})
                              }}
                            />
                          </Box>
                        ))}
                      </Carousel>
                    </div>
                  ) : undefined}
                </Box>
                {(checkIsResearcher(curUserRole) || checkIsClient(curUserRole) || checkIsSupervisor(curUserRole)) &&
                !product.archive &&
                showActionBtns ? (
                  <div className={classNames.actionsWrapper}>
                    <Box className={classNames.parseButtonsWrapper}>
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
                    </Box>
                    {(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole) || clientToEdit) && (
                      <div className={classNames.imageFileInputWrapper}>
                        <UploadFilesInput
                          images={imagesForLoad}
                          setImages={onChangeImagesForLoad}
                          maxNumber={50}
                          // acceptType={['jpg', 'gif', 'png', 'jpeg', 'pdf']}
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
            ) ? (
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
                        user.masterUser === selectedSupplier?.createdBy?._id) &&
                        checkIsBuyer(curUserRole)) ||
                      selectedSupplier.name !== 'access denied' ? (
                        <>
                          {checkIsAdmin(curUserRole) || checkIsSupervisor(curUserRole) ? (
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
                          disabled={!selectedSupplier || selectedSupplier.name === 'access denied'}
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
                      user.masterUser === selectedSupplier?.createdBy?._id) &&
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

          <TableSupplier product={product} selectedSupplier={selectedSupplier} onClickSupplier={onClickSupplier} />

          {showProgress && (
            <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading Photos...'])} />
          )}
        </Paper>

        <BigImagesModal
          openModal={showImageModal}
          setOpenModal={() => setShowImageModal(!showImageModal)}
          images={bigImagesOptions.images}
          imgIndex={bigImagesOptions.imgIndex}
        />
      </React.Fragment>
    )
  },
)
