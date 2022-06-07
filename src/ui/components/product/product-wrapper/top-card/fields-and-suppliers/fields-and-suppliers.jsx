import React, {useState} from 'react'

import {Box, Container, Grid, IconButton, Typography, Link, InputLabel, NativeSelect} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
import AddIcon from '@material-ui/icons/Add'
import AcceptIcon from '@material-ui/icons/Check'
import AcceptRevokeIcon from '@material-ui/icons/Clear'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ProductStatusByKey, ProductStatus} from '@constants/product-status'
import {
  mapProductStrategyStatusEnum,
  mapProductStrategyStatusEnumToKey,
  ProductStrategyStatus,
} from '@constants/product-strategy-status'
import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {checkIsClient, checkIsSupervisor, checkIsAdmin, checkIsResearcher, checkIsBuyer} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './fields-and-suppliers.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const FieldsAndSuppliers = observer(
  ({
    curUserRole,
    onChangeField,
    product,
    productBase,
    onClickSupplierBtns,
    selectedSupplier,
    formFieldsValidationErrors,
  }) => {
    const classNames = useClassNames()

    const [skuLine, setSkuLine] = useState('')
    const [edit, setEdit] = useState(true)

    const onClickSkuBtn = () => {
      onChangeField('skusByClient')({target: {value: [...product.skusByClient, skuLine.toUpperCase()]}})

      setSkuLine('')
    }

    const onRemoveSku = index => {
      const newArr = product.skusByClient.filter((el, i) => i !== index)

      onChangeField('skusByClient')({target: {value: [...newArr]}})
    }

    const isSupplierAcceptRevokeActive =
      selectedSupplier && product.currentSupplierId && product.currentSupplierId === selectedSupplier._id

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

    const disabledPrivateLabelFields = !(
      checkIsResearcher(curUserRole) ||
      (checkIsSupervisor(curUserRole) && showActionBtns) ||
      (checkIsClient(curUserRole) &&
        product.isCreatedByClient &&
        clientToEditStatuses.includes(productBase.status) &&
        checkIsClient(curUserRole) &&
        !product.archive)
    )

    return (
      <Grid item xs={12}>
        <Field
          disabled
          label={t(TranslationKey['Amazon product link'])}
          inputComponent={
            <div>
              <Link
                contentEditable={!edit || !product.lamazon}
                target="_blank"
                rel="noopener"
                href={checkAndMakeAbsoluteUrl(product.lamazon)}
              >
                <Input
                  disabled={edit}
                  classes={{input: clsx({[classNames.link]: edit})}}
                  placeholder={!product.lamazon && t(TranslationKey['Enter link'])}
                  value={product.lamazon}
                  onChange={onChangeField('lamazon')}
                />
              </Link>

              {checkIsClient(curUserRole) &&
                product.isCreatedByClient &&
                !product.archive &&
                clientToEditStatuses.includes(productBase.status) &&
                (edit ? (
                  <Button
                    disabled={!checkIsClient(curUserRole)}
                    className={classNames.editButton}
                    onClick={() => setEdit(!edit)}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>
                ) : (
                  <Button
                    success
                    disabled={!checkIsClient(curUserRole)}
                    className={classNames.editButton}
                    onClick={() => setEdit(!edit)}
                  >
                    {t(TranslationKey.Save)}
                  </Button>
                ))}
            </div>
          }
        />

        <Box className={classNames.productFieldBox}>
          <div>
            <Field
              disabled={
                !(
                  checkIsClient(curUserRole) &&
                  product.isCreatedByClient &&
                  clientToEditStatuses.includes(productBase.status) &&
                  checkIsClient(curUserRole) &&
                  !product.archive
                )
              }
              inputProps={{maxLength: 254}}
              error={formFieldsValidationErrors.asin}
              label={textConsts.fieldAsin}
              value={product.asin}
              onChange={onChangeField('asin')}
            />

            {checkIsClient(curUserRole) && product.isCreatedByClient && (
              <Field
                label={t(TranslationKey['SKU by Client'])}
                inputComponent={
                  <div>
                    {product.skusByClient.length ? (
                      <Grid container className={classNames.skuItemsWrapper}>
                        {product.skusByClient.map((item, index) => (
                          <Grid key={index} item className={classNames.skuItemWrapper}>
                            <Typography className={classNames.skuItemTitle}>{item}</Typography>

                            {checkIsClient(curUserRole) &&
                              product.isCreatedByClient &&
                              clientToEditStatuses.includes(productBase.status) && (
                                <IconButton className={classNames.deleteBtnWrapper} onClick={() => onRemoveSku(index)}>
                                  <DeleteIcon className={classNames.deleteBtn} />
                                </IconButton>
                              )}
                          </Grid>
                        ))}
                      </Grid>
                    ) : null}

                    {checkIsClient(curUserRole) &&
                      product.isCreatedByClient &&
                      !product.archive &&
                      clientToEditStatuses.includes(productBase.status) && (
                        <div className={classNames.inputWrapper}>
                          <Input
                            placeholder={textConsts.skuHolder}
                            inputProps={{maxLength: 50}}
                            value={skuLine}
                            className={classNames.input}
                            onChange={e => setSkuLine(e.target.value.replace(/ /g, ''))}
                          />
                          <Button
                            disableElevation
                            disabled={skuLine === ''}
                            className={classNames.defaultBtn}
                            variant="contained"
                            color="primary"
                            onClick={onClickSkuBtn}
                          >
                            {t(TranslationKey.Add)}
                          </Button>
                        </div>
                      )}
                  </div>
                }
              />
            )}

            <Typography className={classNames.label}>{t(TranslationKey['Delivery Method'])}</Typography>

            <div className={classNames.productCheckboxBoxesWrapper}>
              <Box className={classNames.productCheckboxBox}>
                <Typography className={classNames.label}>{textConsts.checkboxFba}</Typography>
                <MuiCheckbox
                  disabled={
                    !(
                      checkIsSupervisor(curUserRole) ||
                      checkIsResearcher(curUserRole) ||
                      (checkIsClient(curUserRole) &&
                        product.isCreatedByClient &&
                        clientToEditStatuses.includes(productBase.status) &&
                        checkIsClient(curUserRole) &&
                        !product.archive)
                    )
                  }
                  color="primary"
                  checked={product.fba}
                  onClick={() => onChangeField('fba')({target: {value: !product.fba}})}
                />
              </Box>

              <Box className={classNames.productCheckboxBox}>
                <Typography className={classNames.label}>{textConsts.checkboxFbm}</Typography>
                <MuiCheckbox
                  disabled={
                    !(
                      checkIsSupervisor(curUserRole) ||
                      checkIsResearcher(curUserRole) ||
                      (checkIsClient(curUserRole) &&
                        product.isCreatedByClient &&
                        clientToEditStatuses.includes(productBase.status) &&
                        checkIsClient(curUserRole) &&
                        !product.archive)
                    )
                  }
                  color="primary"
                  checked={!product.fba}
                  onClick={() => onChangeField('fba')({target: {value: !product.fba}})}
                />
              </Box>
            </div>

            <Box mt={3} className={classNames.strategyWrapper}>
              <InputLabel className={classNames.strategyLabel}>{t(TranslationKey['Product Strategy'])}</InputLabel>

              <NativeSelect
                disabled={
                  !(
                    checkIsResearcher(curUserRole) ||
                    (checkIsClient(curUserRole) &&
                      product.isCreatedByClient &&
                      clientToEditStatuses.includes(productBase.status) &&
                      checkIsClient(curUserRole) &&
                      !product.archive)
                  )
                }
                value={product.strategyStatus}
                className={classNames.nativeSelect}
                input={<Input />}
                onChange={onChangeField('strategyStatus')}
              >
                <option>{'none'}</option>
                {Object.keys(mapProductStrategyStatusEnum)
                  .filter(el => el > 0)
                  .map((statusCode, statusIndex) => (
                    <option key={statusIndex} value={statusCode}>
                      {mapProductStrategyStatusEnum[statusCode]}
                    </option>
                  ))}
              </NativeSelect>
            </Box>

            <div className={classNames.suppliersWrapper}>
              <Typography variant="h6" className={classNames.supplierTitle}>
                {t(TranslationKey['List of suppliers'])}
              </Typography>

              {!(
                !showActionBtns ||
                (checkIsClient(curUserRole) && product.archive) ||
                (checkIsClient(curUserRole) && !product.isCreatedByClient) ||
                (checkIsClient(curUserRole) && !clientToEditStatuses.includes(productBase.status)) ||
                checkIsSupervisor(curUserRole) ||
                checkIsAdmin(curUserRole) ||
                (checkIsResearcher(curUserRole) &&
                  productBase.status === ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP])
              ) ? (
                <div className={classNames.supplierActionsWrapper}>
                  <Typography variant="h6" className={classNames.supplierActionsTitle}>
                    {t(TranslationKey.Actions)}
                  </Typography>
                  <Container disableGutters className={classNames.supplierContainer}>
                    <IconButton className={classNames.iconBtn} onClick={() => onClickSupplierBtns('add')}>
                      <AddIcon />
                    </IconButton>
                    {selectedSupplier ? (
                      <>
                        <IconButton className={classNames.iconBtn} onClick={() => onClickSupplierBtns('edit')}>
                          <EditIcon />
                        </IconButton>

                        {product.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS] && (
                          <IconButton
                            className={clsx(classNames.iconBtn, classNames.iconBtnRemove)}
                            onClick={() => onClickSupplierBtns('delete')}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}

                        <IconButton
                          className={clsx(classNames.iconBtn, classNames.iconBtnAccept, {
                            [classNames.iconBtnAcceptRevoke]: isSupplierAcceptRevokeActive,
                          })}
                          onClick={() =>
                            isSupplierAcceptRevokeActive
                              ? onClickSupplierBtns('acceptRevoke')
                              : onClickSupplierBtns('accept')
                          }
                        >
                          {isSupplierAcceptRevokeActive ? <AcceptRevokeIcon /> : <AcceptIcon />}
                        </IconButton>
                      </>
                    ) : undefined}
                  </Container>
                </div>
              ) : undefined}
            </div>
          </div>

          {Number(product.strategyStatus) ===
            mapProductStrategyStatusEnumToKey[ProductStrategyStatus.PRIVATE_LABEL] && (
            <div>
              <div className={classNames.rightBlockWrapper}>
                <div className={classNames.fieldsWrapper}>
                  <Field
                    disabled={disabledPrivateLabelFields}
                    inputProps={{maxLength: 255}}
                    label={t(TranslationKey.Niche)}
                    value={product.niche}
                    onChange={onChangeField('niche')}
                  />
                  <Field
                    disabled={disabledPrivateLabelFields}
                    inputProps={{maxLength: 255}}
                    label={textConsts.asins}
                    value={product.asins}
                    onChange={onChangeField('asins')}
                  />

                  <div className={classNames.fieldsSubWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{maxLength: 10}}
                      containerClasses={classNames.shortInput}
                      label={t(TranslationKey['Average revenue'])}
                      value={product.avgRevenue}
                      onChange={onChangeField('avgRevenue')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      containerClasses={classNames.shortInput}
                      inputProps={{maxLength: 10}}
                      label={t(TranslationKey['Average BSR'])}
                      value={product.avgBSR}
                      onChange={onChangeField('avgBSR')}
                    />
                  </div>
                </div>

                <div className={classNames.fieldsWrapper}>
                  <Field
                    disabled={disabledPrivateLabelFields}
                    inputProps={{maxLength: 10}}
                    label={t(TranslationKey['Total Revenue'])}
                    value={product.totalRevenue}
                    onChange={onChangeField('totalRevenue')}
                  />
                  <Field
                    disabled={disabledPrivateLabelFields}
                    inputProps={{maxLength: 10}}
                    label={t(TranslationKey.Coefficient)}
                    value={product.coefficient}
                    onChange={onChangeField('coefficient')}
                  />

                  <div className={classNames.fieldsSubWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{maxLength: 10}}
                      containerClasses={classNames.shortInput}
                      label={t(TranslationKey['Average Price'])}
                      value={product.avgPrice}
                      onChange={onChangeField('avgPrice')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      containerClasses={classNames.shortInput}
                      inputProps={{maxLength: 10}}
                      label={t(TranslationKey['Average Review'])}
                      value={product.avgReviews}
                      onChange={onChangeField('avgReviews')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Grid>
    )
  },
)
