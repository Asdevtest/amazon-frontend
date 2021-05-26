import React from 'react'

import {Box, Container, Grid, Typography, Paper} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
import Carousel from 'react-material-ui-carousel'

import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './bottom-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const BottomCard = ({product, setProduct, onChangeField}) => {
  const classNames = useClassNames()

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item sm={7} xs={12}>
          <Paper className={classNames.cardPadding}>
            <Field onChange={onChangeField('bsr')} title={textConsts.bsr} value={product.bsr} />
            <Field onChange={onChangeField('buyBoxPrice')} title={textConsts.buyBoxPrice} value={product.buyBoxPrice} />
            <Field onChange={onChangeField('width')} title={textConsts.fieldWidth} value={product.width} />
            <Field onChange={onChangeField('height')} title={textConsts.fieldHeight} value={product.height} />
            <Field onChange={onChangeField('length')} title={textConsts.fieldLength} value={product.length} />
            <Field disabled onChange={onChangeField('minPrice')} title={textConsts.minPrice} value={product.minPrice} />
            <Field
              disabled
              onChange={onChangeField('supplier')}
              title={textConsts.fieldSupplier}
              value={product.supplier}
            />
            <Container className={classNames.checkboxContainer} disableGutters maxWidth={false}>
              <Typography className={(classNames.label, classNames.typoMarginRight)}>
                {textConsts.typoExpress}
              </Typography>

              <MuiCheckbox
                checked={product.express}
                className={classNames.checkbox}
                color="primary"
                onClick={() => {
                  setProduct({...product, express: !product.express})
                }}
              />
            </Container>
            <Field
              disabled
              onChange={onChangeField('maxDeliveryPrice')}
              title={textConsts.maxDeliveryPrice}
              value={product.maxDeliveryPrice}
            />
            <Field
              disabled
              onChange={onChangeField('refferalFee')}
              title={textConsts.refferalFee}
              value={product.refferalFee}
            />
            <Field onChange={onChangeField('fbaFee')} title={textConsts.fbaFee} value={product.fbaFee} />
            <Field disabled onChange={onChangeField('totalFba')} title={textConsts.totalFba} value={product.totalFba} />
            <Field
              onChange={onChangeField('recConsignmentQty')}
              title={textConsts.recConsignmentQty}
              value={product.recConsignmentQty}
            />
            <Field disabled onChange={onChangeField('revenue')} title={textConsts.revenue} value={product.revenue} />
            <Field disabled onChange={onChangeField('margin')} title={textConsts.fieldMargin} value={product.margin} />
            <Field disabled onChange={onChangeField('status')} title={textConsts.fieldStatus} value={product.status} />
          </Paper>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Paper className={classNames.rightCardWrapper}>
            <Carousel animation="slide" /* autoPlay={true}*/ timeout={500}>
              {product.images.map((el, index) => (
                <Box key={index} textAlign="center">
                  <img alt="" className={classNames.carouselBox} src={el} />
                </Box>
              ))}
            </Carousel>
          </Paper>
          <Paper className={classNames.cardPadding}>
            <Typography className={classNames.title}>{textConsts.descriptionOFGoods}</Typography>
            <Field disabled onChange={onChangeField('csCode')} title={textConsts.csCode} value={product.csCode} />
            <Field
              className={classNames.heightFieldAuto}
              disabled
              multiline
              onChange={onChangeField('summary')}
              rows={4}
              rowsMax={6}
              title={textConsts.summary}
              value={product.summary}
            />
            <Field
              className={classNames.heightFieldAuto}
              disabled
              multiline
              onChange={onChangeField('description')}
              rows={4}
              rowsMax={6}
              title={textConsts.description}
              value={product.description}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
