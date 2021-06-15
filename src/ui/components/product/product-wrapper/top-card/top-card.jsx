import React from 'react'

import {Box, Grid, Paper} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {observer} from 'mobx-react'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'

import {checkIsResearcher} from '@utils/checks'
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
                {actionStatus === loadingStatuses.success ? (
                  <Alert className={classNames.alert} elevation={0} severity="success">
                    {textConsts.alertSuccess}
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
