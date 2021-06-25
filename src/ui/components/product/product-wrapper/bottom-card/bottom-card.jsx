import React from 'react'

import {Container, Grid, Typography, Paper} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
import {observer} from 'mobx-react'

import {ProductStatusByCode} from '@constants/product-status'
import {texts} from '@constants/texts'

import {Field} from '@components/field'

import {checkIsBuyer, checkIsResearcher, checkIsSupervisor} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './bottom-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const BottomCard = observer(({curUserRole, product, onChangeField}) => {
  const classNames = useClassNames()
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item sm={7} xs={12}>
          <Paper className={classNames.cardPadding}>
            <Field
              disabled
              label={textConsts.category}
              value={product.category || ''}
              onChange={onChangeField('category')}
            />
            <Field
              disabled={!(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole))}
              label={textConsts.bsr}
              value={product.bsr || ''}
              onChange={onChangeField('bsr')}
            />
            <Field
              disabled={!(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole))}
              label={textConsts.amazonPrice}
              value={product.amazon || ''}
              onChange={onChangeField('amazon')}
            />
            <Field
              disabled={!(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole))}
              label={textConsts.fieldWidth}
              value={product.width || ''}
              onChange={onChangeField('width')}
            />
            <Field
              disabled={!(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole))}
              label={textConsts.fieldHeight}
              value={product.height || ''}
              onChange={onChangeField('height')}
            />
            <Field
              disabled={!(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole))}
              label={textConsts.fieldLength}
              value={product.length || ''}
              onChange={onChangeField('length')}
            />
            <Field
              disabled={!(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole))}
              label={textConsts.fieldWeight}
              value={product.weight || ''}
              onChange={onChangeField('weight')}
            />
            <Container disableGutters className={classNames.checkboxContainer} maxWidth={false}>
              <Typography className={(classNames.label, classNames.typoMarginRight)}>
                {textConsts.typoExpress}
              </Typography>

              <MuiCheckbox
                checked={product.express}
                className={classNames.checkbox}
                color="primary"
                disabled={!(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole))}
                onChange={onChangeField('express')}
              />
            </Container>
            <Field
              disabled
              label={textConsts.minpurchase}
              value={product.minpurchase || ''}
              onChange={onChangeField('minpurchase')}
            />
            <Field
              disabled
              label={textConsts.maxDeliveryPrice}
              value={product.maxDelivery || ''}
              onChange={onChangeField('maxDelivery')}
            />
            <Field
              disabled
              label={textConsts.refferalFee}
              value={product.reffee || ''}
              onChange={onChangeField('reffee')}
            />
            <Field
              disabled={!(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole))}
              label={textConsts.fbaFee}
              value={product.fbafee || ''}
              onChange={onChangeField('fbafee')}
            />
            <Field
              disabled
              label={textConsts.totalFba}
              value={product.totalFba || ''}
              onChange={onChangeField('totalFba')}
            />
            <Field
              disabled={
                !(checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole) || checkIsBuyer(curUserRole))
              }
              label={textConsts.recommendedBatch}
              value={product.fbaamount || ''}
              onChange={onChangeField('fbaamount')}
            />
            <Field
              disabled
              label={textConsts.revenue}
              value={product.profit || ''}
              onChange={onChangeField('profit')}
            />
            <Field
              disabled
              label={textConsts.fieldMargin}
              value={product.margin || ''}
              onChange={onChangeField('margin')}
            />
            <Field
              disabled
              label={textConsts.fieldStatus}
              value={ProductStatusByCode[product.status]}
              onChange={onChangeField('status')}
            />
          </Paper>
        </Grid>
        <Grid item sm={5} xs={12}>
          <Paper className={classNames.cardPadding}>
            <Typography className={classNames.title}>{textConsts.descriptionOFGoods}</Typography>
            <Field disabled label={textConsts.csCode} value={product.amazonTitle || ''} />
            <Field
              disabled
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={textConsts.summary}
              value={product.amazonDescription || ''}
            />
            <Field
              disabled
              multiline
              className={classNames.heightFieldAuto}
              rows={4}
              rowsMax={6}
              label={textConsts.description}
              value={product.amazonDetail || ''}
            />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
})
