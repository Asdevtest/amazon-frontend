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
            <Field title={textConsts.bsr} value={product.bsr} onChange={onChangeField('bsr')} />
            <Field title={textConsts.buyBoxPrice} value={product.buyBoxPrice} onChange={onChangeField('buyBoxPrice')} />
            <Field title={textConsts.fieldWidth} value={product.width} onChange={onChangeField('width')} />
            <Field title={textConsts.fieldHeight} value={product.height} onChange={onChangeField('height')} />
            <Field title={textConsts.fieldLength} value={product.length} onChange={onChangeField('length')} />
            <Field disabled title={textConsts.minPrice} value={product.minPrice} onChange={onChangeField('minPrice')} />
            <Field
              disabled
              title={textConsts.fieldSupplier}
              value={product.supplier}
              onChange={onChangeField('supplier')}
            />
            <Container disableGutters className={classNames.checkboxContainer} maxWidth={false}>
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
              title={textConsts.maxDeliveryPrice}
              value={product.maxDeliveryPrice}
              onChange={onChangeField('maxDeliveryPrice')}
            />
            <Field
              disabled
              title={textConsts.refferalFee}
              value={product.refferalFee}
              onChange={onChangeField('refferalFee')}
            />
            <Field title={textConsts.fbaFee} value={product.fbaFee} onChange={onChangeField('fbaFee')} />
            <Field disabled title={textConsts.totalFba} value={product.totalFba} onChange={onChangeField('totalFba')} />
            <Field
              title={textConsts.recConsignmentQty}
              value={product.recConsignmentQty}
              onChange={onChangeField('recConsignmentQty')}
            />
            <Field disabled title={textConsts.revenue} value={product.revenue} onChange={onChangeField('revenue')} />
            <Field disabled title={textConsts.fieldMargin} value={product.margin} onChange={onChangeField('margin')} />
            <Field disabled title={textConsts.fieldStatus} value={product.status} onChange={onChangeField('status')} />
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
            <Field disabled title={textConsts.csCode} value={product.csCode} onChange={onChangeField('csCode')} />
            <Field
              disabled
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              title={textConsts.summary}
              value={product.summary}
              onChange={onChangeField('summary')}
            />
            <Field
              disabled
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              title={textConsts.description}
              value={product.description}
              onChange={onChangeField('description')}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
