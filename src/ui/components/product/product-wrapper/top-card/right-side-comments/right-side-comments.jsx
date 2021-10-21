import React from 'react'

import {Box, Grid, Typography, Button} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {productStatusButtonsConfigs} from '@constants/product-status-buttons-configs'
import {texts} from '@constants/texts'

import {ErrorButton} from '@components/buttons/error-button'
import {Field} from '@components/field'

import {checkIsBuyer, checkIsResearcher, checkIsSupervisor} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ProductStatusButtons} from './product-status-buttons'
import {useClassNames} from './right-side-comments.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

const withoutStatus = true

export const RightSideComments = observer(
  ({
    curUserRole,
    onChangeField,
    product,
    onClickSetProductStatusBtn,
    handleProductActionButtons,
    formFieldsValidationErrors,
  }) => {
    const classNames = useClassNames()
    const productStatusButtonsConfig =
      productStatusButtonsConfigs[curUserRole] && productStatusButtonsConfigs[curUserRole](product.status)
    return (
      <Grid item sm={5} xs={12}>
        <Box className={classNames.rightBoxComments}>
          <Typography className={classNames.title}>{textConsts.typographyComments}</Typography>
          <Field
            multiline
            disabled={!checkIsResearcher(curUserRole)}
            error={formFieldsValidationErrors.icomment}
            className={clsx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.icomment,
            })}
            inputProps={{maxLength: 1000}}
            rows={4}
            rowsMax={6}
            label={textConsts.fieldResearcher}
            value={product.icomment}
            onChange={onChangeField('icomment')}
          />
          <ProductStatusButtons
            productStatus={product.status}
            buttonsConfig={productStatusButtonsConfig}
            onClickButton={onClickSetProductStatusBtn}
            onClickSaveWithoutStatusChange={
              checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole)
                ? () => handleProductActionButtons('accept', withoutStatus)
                : undefined
            }
          />
          <Field
            multiline
            disabled={!checkIsSupervisor(curUserRole)}
            error={formFieldsValidationErrors.checkednotes}
            className={clsx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.checkednotes,
            })}
            inputProps={{maxLength: 1000}}
            rows={4}
            rowsMax={6}
            label={textConsts.fieldSoperviser}
            value={product.checkednotes}
            onChange={onChangeField('checkednotes')}
          />
          <Field
            multiline
            disabled={!checkIsBuyer(curUserRole)}
            error={formFieldsValidationErrors.buyersComment}
            className={clsx(classNames.heightFieldAuto, {
              [classNames.errorActive]: formFieldsValidationErrors.buyersComment,
            })}
            inputProps={{maxLength: 1000}}
            rows={4}
            rowsMax={6}
            label={textConsts.fieldBuyer}
            value={product.buyersComment}
            onChange={onChangeField('buyersComment')}
          />
          {(checkIsResearcher(curUserRole) &&
            product.status < ProductStatusByKey[ProductStatus.CHEKED_BY_SUPERVISOR]) ||
          (checkIsBuyer(curUserRole) && product.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS]) ||
          checkIsSupervisor(curUserRole) ? (
            <div className={classNames.buttonsWrapper}>
              <Button
                className={classNames.buttonNormal}
                color="primary"
                variant="contained"
                onClick={() => handleProductActionButtons('accept')}
              >
                {textConsts.buttonAccept}
              </Button>
              <ErrorButton
                className={clsx(classNames.buttonNormal, {
                  [classNames.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
                })}
                variant="contained"
                onClick={() => handleProductActionButtons('cancel')}
              >
                {textConsts.buttonCancel}
              </ErrorButton>

              {checkIsResearcher(curUserRole) ? (
                <ErrorButton
                  className={classNames.buttonDelete}
                  variant="contained"
                  onClick={() => handleProductActionButtons('delete')}
                >
                  {textConsts.buttonDelete}
                </ErrorButton>
              ) : undefined}
            </div>
          ) : undefined}
        </Box>
      </Grid>
    )
  },
)
