import React from 'react'

import {Box, Grid, Typography, Button} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {productStatusButtonsConfigs} from '@constants/product-status-buttons-configs'
import {texts} from '@constants/texts'

import {ErrorButton} from '@components/buttons/error-button'
import {Field} from '@components/field'

import {checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {ProductStatusButtons} from './product-status-buttons'
import {useClassNames} from './right-side-comments.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

const withoutStatus = true

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const RightSideComments = observer(
  ({
    curUserRole,
    onChangeField,
    product,
    productBase,
    onClickSetProductStatusBtn,
    handleProductActionButtons,
    formFieldsValidationErrors,
  }) => {
    const classNames = useClassNames()
    const productStatusButtonsConfig =
      productStatusButtonsConfigs[curUserRole] && productStatusButtonsConfigs[curUserRole](productBase.status)

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
          {showActionBtns && (
            <ProductStatusButtons
              product={product}
              productStatus={product?.status}
              buttonsConfig={productStatusButtonsConfig}
              onClickButton={onClickSetProductStatusBtn}
              onClickSaveWithoutStatusChange={
                checkIsResearcher(curUserRole) || checkIsSupervisor(curUserRole)
                  ? () => handleProductActionButtons('accept', withoutStatus)
                  : undefined
              }
            />
          )}
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

          <Field
            multiline
            disabled={!checkIsClient(curUserRole) || !clientToEditStatuses.includes(productBase.status)}
            className={clsx(classNames.heightFieldAuto, {
              // [classNames.errorActive]: formFieldsValidationErrors.icomment,
            })}
            inputProps={{maxLength: 1000}}
            rows={4}
            rowsMax={6}
            label={textConsts.fieldClient}
            value={product.clientComment}
            onChange={onChangeField('clientComment')}
          />

          {showActionBtns ? (
            <div className={classNames.buttonsWrapper}>
              <Button
                className={classNames.buttonNormal}
                color="primary"
                variant="contained"
                onClick={() => handleProductActionButtons('accept', false)}
              >
                {checkIsClient(curUserRole) ? textConsts.buttonSave : textConsts.buttonAccept}
              </Button>
              <ErrorButton
                className={clsx(classNames.buttonNormal, {
                  [classNames.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
                })}
                variant="contained"
                onClick={() => handleProductActionButtons('cancel')}
              >
                {checkIsClient(curUserRole) ? textConsts.buttonClose : textConsts.buttonCancel}
              </ErrorButton>

              {checkIsResearcher(curUserRole) || (checkIsClient(curUserRole) && !product.archive) ? (
                <ErrorButton
                  className={classNames.buttonDelete}
                  variant="contained"
                  onClick={() => handleProductActionButtons('delete')}
                >
                  {textConsts.buttonDelete}
                </ErrorButton>
              ) : undefined}

              {checkIsClient(curUserRole) && product.archive && (
                <Button
                  className={classNames.restoreBtn}
                  color="primary"
                  variant="contained"
                  onClick={() => handleProductActionButtons('restore')}
                >
                  {textConsts.restoreBtn}
                </Button>
              )}
            </div>
          ) : (
            <div className={classNames.buttonsWrapper}>
              <ErrorButton
                className={clsx(classNames.buttonNormal, {
                  [classNames.buttonNormalNoMargin]: !checkIsResearcher(curUserRole),
                })}
                variant="contained"
                onClick={() => handleProductActionButtons('cancel')}
              >
                {textConsts.buttonClose}
              </ErrorButton>
            </div>
          )}
        </Box>
      </Grid>
    )
  },
)
