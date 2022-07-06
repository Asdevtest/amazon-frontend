import React, {useState} from 'react'

import {Box, Container, Grid, IconButton, Typography, Link, NativeSelect} from '@material-ui/core'
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
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {checkIsClient, checkIsSupervisor, checkIsAdmin, checkIsResearcher} from '@utils/checks'
import {checkAndMakeAbsoluteUrl} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './fields-and-suppliers.style'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const FieldsAndSuppliers = observer(
  ({
    showActionBtns,
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
                    tooltipInfoContent={t(TranslationKey['Open the field to edit the link'])}
                    disabled={!checkIsClient(curUserRole)}
                    className={classNames.editButton}
                    onClick={() => setEdit(!edit)}
                  >
                    {t(TranslationKey.Edit)}
                  </Button>
                ) : (
                  <Button
                    success
                    tooltipInfoContent={t(TranslationKey['Saves a link to an Amazon product'])}
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
              tooltipInfoContent={t(TranslationKey['Amazon ID number'])}
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
              label={t(TranslationKey.ASIN)}
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
                            placeholder={t(TranslationKey.SKU)}
                            inputProps={{maxLength: 50}}
                            value={skuLine}
                            className={classNames.input}
                            onChange={e => setSkuLine(e.target.value.replace(/ /g, ''))}
                          />
                          <Button
                            disableElevation
                            tooltipInfoContent={t(
                              TranslationKey['Adds SKU to the card entered in the SKU field of the client'],
                            )}
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
                <Typography className={classNames.label}>{t(TranslationKey.FBA)}</Typography>
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
                <Typography className={classNames.label}>{'FBM'}</Typography>
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
              <Field
                tooltipInfoContent={t(TranslationKey['Choose a product strategy'])}
                label={t(TranslationKey['Product Strategy'])}
                inputComponent={
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
                }
              />
            </Box>
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
                    label={'Asins'}
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
              <Container disableGutters className={classNames.supplierContainer}>
                <div className={classNames.supplierButtonWrapper}>
                  <Button
                    tooltipInfoContent={t(TranslationKey['Add a new supplier to this product'])}
                    className={classNames.iconBtn}
                    onClick={() => onClickSupplierBtns('add')}
                  >
                    <AddIcon />
                  </Button>
                  <Typography className={classNames.supplierButtonText}>{t(TranslationKey['Add supplier'])}</Typography>
                </div>

                {selectedSupplier ? (
                  <>
                    <div className={classNames.supplierButtonWrapper}>
                      <Button
                        tooltipInfoContent={t(TranslationKey['Edit the selected supplier'])}
                        className={classNames.iconBtn}
                        onClick={() => onClickSupplierBtns('edit')}
                      >
                        <EditIcon />
                      </Button>
                      <Typography className={classNames.supplierButtonText}>
                        {t(TranslationKey['Edit a supplier'])}
                      </Typography>
                    </div>

                    {product.status < ProductStatusByKey[ProductStatus.COMPLETE_SUCCESS] && (
                      <div className={classNames.supplierButtonWrapper}>
                        <Button
                          tooltipInfoContent={t(TranslationKey['Delete the selected supplier'])}
                          className={clsx(classNames.iconBtn, classNames.iconBtnRemove)}
                          onClick={() => onClickSupplierBtns('delete')}
                        >
                          <DeleteIcon />
                        </Button>
                        <Typography className={classNames.supplierButtonText}>
                          {t(TranslationKey['Delete supplier'])}
                        </Typography>
                      </div>
                    )}

                    <div className={classNames.supplierButtonWrapper}>
                      <Button
                        tooltipInfoContent={
                          isSupplierAcceptRevokeActive
                            ? t(TranslationKey['Remove the current supplier'])
                            : t(TranslationKey['Select a supplier as the current supplier'])
                        }
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
                      </Button>
                      <Typography className={classNames.supplierButtonText}>
                        {isSupplierAcceptRevokeActive ? t(TranslationKey['Close edit']) : t(TranslationKey.Accept)}
                      </Typography>
                    </div>
                  </>
                ) : undefined}
              </Container>
            </div>
          ) : undefined}
        </div>
      </Grid>
    )
  },
)
