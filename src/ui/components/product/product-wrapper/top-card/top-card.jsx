import React from 'react'

import {Box, Grid, Paper} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Alert} from '@components/alert'
import {Button} from '@components/button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {FieldsAndSuppliers} from './fields-and-suppliers'
import {RightSideComments} from './right-side-comments'
import {useClassNames} from './top-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const TopCard = ({onChangeField, product, setProduct, onClick, suppliers, selected, onClickSupplier}) => {
  const classNames = useClassNames()

  return (
    <React.Fragment>
      <Paper className={classNames.mainCardWrapper}>
        <Grid container spacing={2}>
          <Grid container item sm={7} xs={12}>
            <Grid item xs={12}>
              <Box className={classNames.parseButtonsWrapper}>
                <Button className={classNames.buttonParseAmazon}>{textConsts.buttonParseAmazon}</Button>
                <Button>{textConsts.buttonParseSellcentrall}</Button>
              </Box>
              <Alert className={classNames.alert} elevation={0} title={textConsts.alertSuccess} type={'success'} />
            </Grid>
            <FieldsAndSuppliers
              onChangeField={onChangeField}
              onClick={onClick}
              onClickSupplier={onClickSupplier}
              product={product}
              selected={selected}
              setProduct={setProduct}
              suppliers={suppliers}
            />
          </Grid>
          <RightSideComments onChangeField={onChangeField} product={product} />
        </Grid>
      </Paper>
    </React.Fragment>
  )
}
