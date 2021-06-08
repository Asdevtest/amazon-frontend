import React from 'react'

import {Box, Container, Grid, Typography, Paper} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
import {observer} from 'mobx-react'
import Carousel from 'react-material-ui-carousel'

import {ProductStatus} from '@constants/product-status'
import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './bottom-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const BottomCard = observer(({product, onChangeField}) => {
  const classNames = useClassNames()
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item sm={7} xs={12}>
          <Paper className={classNames.cardPadding}>
            <Field label={textConsts.bsr} value={product.bsr} onChange={onChangeField('bsr')} />
            <Field label={textConsts.buyBoxPrice} value={product.buyBoxPrice} onChange={onChangeField('buyBoxPrice')} />
            <Field label={textConsts.fieldWidth} value={product.width} onChange={onChangeField('width')} />
            <Field label={textConsts.fieldHeight} value={product.height} onChange={onChangeField('height')} />
            <Field label={textConsts.fieldLength} value={product.length} onChange={onChangeField('length')} />
            <Field disabled label={textConsts.minPrice} value={product.minPrice} onChange={onChangeField('minPrice')} />
            <Field
              disabled
              label={textConsts.fieldSupplier}
              value={product.supplier}
              onChange={onChangeField('supplier')}
            />
            <Container disableGutters className={classNames.checkboxContainer} maxWidth={false}>
              <Typography className={(classNames.label, classNames.typoMarginRight)}>
                {textConsts.typoExpress}
              </Typography>

              <MuiCheckbox
                value={product.express}
                className={classNames.checkbox}
                color="primary"
                onClick={() => {
                  onChangeField('express', !product.express)
                }}
              />
            </Container>
            <Field
              disabled
              label={textConsts.maxDeliveryPrice}
              value={product.maxDeliveryPrice}
              onChange={onChangeField('maxDeliveryPrice')}
            />
            <Field
              disabled
              label={textConsts.refferalFee}
              value={product.refferalFee}
              onChange={onChangeField('refferalFee')}
            />
            <Field label={textConsts.fbaFee} value={product.fbafee} onChange={onChangeField('fbafee')} />
            <Field disabled label={textConsts.totalFba} value={product.totalFba} onChange={onChangeField('totalFba')} />
            <Field
              label={textConsts.recConsignmentQty}
              value={product.recConsignmentQty}
              onChange={onChangeField('recConsignmentQty')}
            />
            <Field disabled label={textConsts.revenue} value={product.revenue} onChange={onChangeField('revenue')} />
            <Field disabled label={textConsts.fieldMargin} value={product.margin} onChange={onChangeField('margin')} />
            <Field
              disabled
              label={textConsts.fieldStatus}
              value={ProductStatus[product.status]}
              onChange={onChangeField('status')}
            />
          </Paper>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Paper className={classNames.rightCardWrapper}>
            <Carousel animation="slide" /* autoPlay={true}*/ timeout={500}>
              {product.images &&
                product.images.map((el, index) => (
                  <Box key={index} textAlign="center">
                    <img alt="" className={classNames.carouselBox} src={el} />
                  </Box>
                ))}
            </Carousel>
          </Paper>
          <Paper className={classNames.cardPadding}>
            <Typography className={classNames.title}>{textConsts.descriptionOFGoods}</Typography>
            <Field disabled label={textConsts.csCode} value={product.csCode} onChange={onChangeField('csCode')} />
            <Field
              disabled
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={textConsts.summary}
              value={product.summary}
              onChange={onChangeField('summary')}
            />
            <Field
              disabled
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={textConsts.description}
              value={product.description}
              onChange={onChangeField('description')}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
})
