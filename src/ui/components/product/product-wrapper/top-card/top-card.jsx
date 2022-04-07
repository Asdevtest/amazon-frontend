import React from 'react'

import {Box, Grid, Paper} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {UploadFilesInput} from '@components/upload-files-input'

import {checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor} from '@utils/checks'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {FieldsAndSuppliers} from './fields-and-suppliers'
import {TableSupplier} from './fields-and-suppliers/table-supplier'
import {RightSideComments} from './right-side-comments'
import {useClassNames} from './top-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const TopCard = observer(
  ({
    imagesForLoad,
    showProgress,
    progressValue,
    alertFailedText,
    curUserRole,
    onChangeField,
    actionStatus,
    product,
    productBase,
    onClickSupplierBtns,
    selectedSupplier,
    formFieldsValidationErrors,
    onClickSupplier,
    onClickParseProductData,
    onClickSetProductStatusBtn,
    handleProductActionButtons,
    onChangeImagesForLoad,
  }) => {
    const classNames = useClassNames()

    const clientToEdit =
      checkIsClient(curUserRole) && product.isCreatedByClient && clientToEditStatuses.includes(productBase.status)

    const showActionBtns =
      (checkIsSupervisor(curUserRole) &&
        productBase.status !== ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP] &&
        checkIsSupervisor(curUserRole) &&
        productBase.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
      (checkIsSupervisor(curUserRole) &&
        productBase.status >= ProductStatusByKey[ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR] &&
        productBase.status < ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS]) ||
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
                      <Carousel animation="slide" /* autoPlay={true}*/ timeout={500}>
                        {product.images.map((imageHash, index) => (
                          <Box key={index} textAlign="center" className={classNames.carouselImageWrapper}>
                            <img alt="" className={classNames.carouselImage} src={getAmazonImageUrl(imageHash)} />
                          </Box>
                        ))}
                      </Carousel>
                    </div>
                  ) : undefined}
                </Box>
                {(checkIsResearcher(curUserRole) || checkIsClient(curUserRole) || checkIsSupervisor(curUserRole)) &&
                !product.archive &&
                showActionBtns ? (
                  <Box className={classNames.parseButtonsWrapper}>
                    <React.Fragment>
                      <Button
                        className={classNames.buttonParseAmazon}
                        onClick={() => onClickParseProductData(ProductDataParser.AMAZON, product)}
                      >
                        {textConsts.buttonParseAmazon}
                      </Button>
                      <Button
                        className={classNames.buttonParseAmazon}
                        onClick={() => onClickParseProductData(ProductDataParser.SELLCENTRAL, product)}
                      >
                        {textConsts.buttonParseSellcentrall}
                      </Button>
                    </React.Fragment>

                    {(checkIsResearcher(curUserRole) || clientToEdit) && (
                      <div className={classNames.imageFileInputWrapper}>
                        <UploadFilesInput
                          images={imagesForLoad}
                          setImages={onChangeImagesForLoad}
                          maxNumber={50}
                          acceptType={['jpg', 'gif', 'png']}
                        />
                      </div>
                    )}
                  </Box>
                ) : undefined}
                {actionStatus === loadingStatuses.success || actionStatus === loadingStatuses.failed ? (
                  <Alert
                    className={classNames.alert}
                    elevation={0}
                    severity={actionStatus === loadingStatuses.success ? 'success' : 'error'}
                  >
                    {actionStatus === loadingStatuses.success
                      ? textConsts.alertSuccess
                      : alertFailedText || textConsts.alertFailed}
                  </Alert>
                ) : undefined}
              </Grid>
              <FieldsAndSuppliers
                formFieldsValidationErrors={formFieldsValidationErrors}
                curUserRole={curUserRole}
                product={product}
                productBase={productBase}
                selectedSupplier={selectedSupplier}
                onChangeField={onChangeField}
                onClickSupplierBtns={onClickSupplierBtns}
                onClickSupplier={onClickSupplier}
              />
            </Grid>
            <RightSideComments
              curUserRole={curUserRole}
              product={product}
              productBase={productBase}
              formFieldsValidationErrors={formFieldsValidationErrors}
              handleProductActionButtons={handleProductActionButtons}
              onClickSetProductStatusBtn={onClickSetProductStatusBtn}
              onChangeField={onChangeField}
            />
          </Grid>

          <TableSupplier product={product} selectedSupplier={selectedSupplier} onClickSupplier={onClickSupplier} />

          {showProgress && <CircularProgressWithLabel value={progressValue} title={textConsts.circularProgressTitle} />}
        </Paper>
      </React.Fragment>
    )
  },
)
