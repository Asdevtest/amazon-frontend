import React from 'react'

import {Box, Grid, Paper} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'

import {checkIsResearcher} from '@utils/checks'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {FieldsAndSuppliers} from './fields-and-suppliers'
import {RightSideComments} from './right-side-comments'
import {useClassNames} from './top-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const TopCard = observer(
  ({
    suppliers,
    curUserRole,
    onChangeField,
    actionStatus,
    product,
    onClickSupplierBtns,
    selectedSupplier,
    formFieldsValidationErrors,
    onClickSupplier,
    onClickParseProductData,
    onClickSetProductStatusBtn,
    handleProductActionButtons,
  }) => {
    const classNames = useClassNames()
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
                {checkIsResearcher(curUserRole) ? (
                  <Box className={classNames.parseButtonsWrapper}>
                    <Button
                      className={classNames.buttonParseAmazon}
                      onClick={() => onClickParseProductData(ProductDataParser.AMAZON, product)}
                    >
                      {textConsts.buttonParseAmazon}
                    </Button>
                    <Button onClick={() => onClickParseProductData(ProductDataParser.SELLCENTRAL, product)}>
                      {textConsts.buttonParseSellcentrall}
                    </Button>
                  </Box>
                ) : undefined}
                {actionStatus === loadingStatuses.success || actionStatus === loadingStatuses.failed ? (
                  <Alert
                    className={classNames.alert}
                    elevation={0}
                    severity={actionStatus === loadingStatuses.success ? 'success' : 'error'}
                  >
                    {actionStatus === loadingStatuses.success ? textConsts.alertSuccess : textConsts.alertFailed}
                  </Alert>
                ) : undefined}
              </Grid>
              <FieldsAndSuppliers
                curUserRole={curUserRole}
                product={product}
                suppliers={suppliers}
                selectedSupplier={selectedSupplier}
                onChangeField={onChangeField}
                onClickSupplierBtns={onClickSupplierBtns}
                onClickSupplier={onClickSupplier}
              />
            </Grid>
            <RightSideComments
              curUserRole={curUserRole}
              product={product}
              formFieldsValidationErrors={formFieldsValidationErrors}
              handleProductActionButtons={handleProductActionButtons}
              onClickSetProductStatusBtn={onClickSetProductStatusBtn}
              onChangeField={onChangeField}
            />
          </Grid>
        </Paper>
      </React.Fragment>
    )
  },
)
