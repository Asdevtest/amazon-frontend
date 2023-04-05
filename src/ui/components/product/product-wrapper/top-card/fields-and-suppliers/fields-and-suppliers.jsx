/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import ClearIcon from '@mui/icons-material/Clear'
import {Box, Grid, Typography, Link, Select, MenuItem, Checkbox, ListItemText, Tooltip} from '@mui/material'
import MuiCheckbox from '@mui/material/Checkbox'

import React, {useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {ProductDataParser} from '@constants/product-data-parser'
import {ProductStatusByKey, ProductStatus} from '@constants/product-status'
import {
  mapProductStrategyStatusEnum,
  mapProductStrategyStatusEnumToKey,
  ProductStrategyStatus,
} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {CopyValue} from '@components/copy-value/copy-value'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {checkIsClient, checkIsSupervisor, checkIsResearcher, checkIsBuyer} from '@utils/checks'
import {checkAndMakeAbsoluteUrl, getShortenStringIfLongerThanCount} from '@utils/text'
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
    user,
    showActionBtns,
    curUserRole,
    onChangeField,
    product,
    productBase,
    formFieldsValidationErrors,
    shops,
    onClickHsCode,
    onClickParseProductData,
  }) => {
    const {classes: classNames} = useClassNames()

    const [edit, setEdit] = useState(true)

    const onChangeShop = e => {
      onChangeField('shopIds')({target: {value: e.target.value ? [e.target.value] : []}})
    }

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
            <>
              <div className={classNames.linkAndButtonWrapper}>
                <div className={classNames.copyLink}>
                  {edit && product.lamazon ? (
                    <Link
                      target="_blank"
                      rel="noopener"
                      href={checkAndMakeAbsoluteUrl(product.lamazon)}
                      className={cx(classNames.inputLink, {[classNames.linkDecoration]: !edit || !product.lamazon})}
                    >
                      <Typography className={classNames.lamazonText}>{product.lamazon}</Typography>
                    </Link>
                  ) : (
                    <Input
                      disabled={edit}
                      classes={{
                        input: cx(
                          classNames.inputLink,
                          {[classNames.inputDisabled]: edit},
                          {[classNames.linkOnEdit]: edit && product.lamazon},
                        ),
                      }}
                      placeholder={!product.lamazon ? t(TranslationKey['Enter link']) : ''}
                      value={product.lamazon}
                      onChange={onChangeField('lamazon')}
                    />
                  )}

                  {product.lamazon ? <CopyValue text={product.lamazon} /> : null}
                </div>

                {!checkIsBuyer(curUserRole) ? (
                  <Button
                    tooltipInfoContent={t(TranslationKey['Fills the card with the necessary information'])}
                    className={classNames.buttonParseAmazon}
                    onClick={() => {
                      // onClickParseProductData(ProductDataParser.AMAZON, product)
                      // onClickParseProductData(ProductDataParser.SELLCENTRAL, product)

                      onClickParseProductData(product)
                    }}
                  >
                    {'Parse Product Data'}
                  </Button>
                ) : null}
              </div>

              <div className={classNames.editButtonWrapper}>
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
            </>
          }
        />

        <Box className={classNames.productFieldBox}>
          <div>
            <Field
              tooltipInfoContent={t(TranslationKey['Amazon ID number'])}
              error={formFieldsValidationErrors.asin}
              label={t(TranslationKey.ASIN)}
              inputComponent={
                <div className={classNames.subInputWrapper}>
                  <Input
                    disabled={
                      !(
                        checkIsClient(curUserRole) &&
                        product.isCreatedByClient &&
                        clientToEditStatuses.includes(productBase.status) &&
                        checkIsClient(curUserRole) &&
                        !product.archive
                      )
                    }
                    value={product.asin}
                    inputProps={{maxLength: 254}}
                    className={cx(classNames.inputAsin, {
                      [classNames.inputDisabled]: !(
                        checkIsClient(curUserRole) &&
                        product.isCreatedByClient &&
                        clientToEditStatuses.includes(productBase.status) &&
                        checkIsClient(curUserRole) &&
                        !product.archive
                      ),
                    })}
                    onChange={onChangeField('asin')}
                  />
                  {product.asin ? <CopyValue text={product.asin} /> : null}
                </div>
              }
            />

            {checkIsClient(curUserRole) && product.isCreatedByClient && (
              <Field
                label={t(TranslationKey['SKU by Client'])}
                inputComponent={
                  <div>
                    {checkIsClient(curUserRole) &&
                      product.isCreatedByClient &&
                      !product.archive &&
                      clientToEditStatuses.includes(productBase.status) && (
                        <div className={classNames.subInputWrapper}>
                          <Input
                            placeholder={t(TranslationKey.SKU)}
                            inputProps={{maxLength: 50}}
                            value={product.skusByClient}
                            className={classNames.inputAsin}
                            onChange={e =>
                              onChangeField('skusByClient')({target: {value: e.target.value ? [e.target.value] : []}})
                            }
                          />
                          {product.skusByClient[0] ? <CopyValue text={product.skusByClient[0]} /> : null}
                        </div>
                      )}
                  </div>
                }
              />
            )}

            <div className={classNames.productCheckboxBoxesWrapper}>
              <Typography className={classNames.label}>{t(TranslationKey['Delivery Method'])}</Typography>
              <div className={classNames.productCheckboxBoxWrapper}>
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
            </div>

            <Box mt={3} className={classNames.strategyWrapper}>
              <div>
                <Field
                  tooltipInfoContent={t(TranslationKey['Choose a product strategy'])}
                  label={t(TranslationKey['Product Strategy'])}
                  inputComponent={
                    <Select
                      displayEmpty
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
                      input={<Input className={classNames.nativeSelect} />}
                      onChange={onChangeField('strategyStatus')}
                    >
                      <MenuItem value={''} className={classNames.strategyOption}>
                        <em>{t(TranslationKey['not selected'])}</em>
                      </MenuItem>
                      {Object.keys(mapProductStrategyStatusEnum).map((statusCode, statusIndex) => (
                        <MenuItem
                          key={statusIndex}
                          value={statusCode}
                          className={cx(classNames.strategyOption, {
                            [classNames.disabledOption]:
                              checkIsResearcher(curUserRole) && !user?.allowedStrategies.includes(Number(statusCode)),
                          })}
                          disabled={
                            checkIsResearcher(curUserRole) && !user?.allowedStrategies.includes(Number(statusCode))
                          }
                        >
                          {mapProductStrategyStatusEnum[statusCode]?.replace(/_/g, ' ')}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                />
              </div>
            </Box>
          </div>
          <div className={classNames.strategyAndSubUsersWrapper}>
            {Number(product.strategyStatus) ===
              mapProductStrategyStatusEnumToKey[ProductStrategyStatus.PRIVATE_LABEL] && (
              <div>
                <div className={classNames.rightBlockWrapper}>
                  <div className={classNames.fieldsWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{maxLength: 255}}
                      containerClasses={classNames.field}
                      inputClasses={classNames.inputField}
                      label={t(TranslationKey.Niche)}
                      value={product.niche}
                      onChange={onChangeField('niche')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{maxLength: 255}}
                      containerClasses={classNames.field}
                      inputClasses={classNames.inputField}
                      label={'Asins'}
                      value={product.asins}
                      onChange={onChangeField('asins')}
                    />

                    <div className={classNames.fieldsSubWrapper}>
                      <Field
                        disabled={disabledPrivateLabelFields}
                        inputProps={{maxLength: 10}}
                        containerClasses={classNames.shortInput}
                        inputClasses={classNames.shortInputClass}
                        label={t(TranslationKey['Average revenue'])}
                        value={product.avgRevenue}
                        onChange={onChangeField('avgRevenue')}
                      />
                      <Field
                        disabled={disabledPrivateLabelFields}
                        containerClasses={classNames.shortInput}
                        inputClasses={classNames.shortInputClass}
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
                      containerClasses={classNames.field}
                      inputClasses={classNames.inputField}
                      value={product.totalRevenue}
                      onChange={onChangeField('totalRevenue')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{maxLength: 10}}
                      label={t(TranslationKey.Coefficient)}
                      containerClasses={classNames.field}
                      inputClasses={classNames.inputField}
                      value={product.coefficient}
                      onChange={onChangeField('coefficient')}
                    />

                    <div className={classNames.fieldsSubWrapper}>
                      <Field
                        disabled={disabledPrivateLabelFields}
                        inputProps={{maxLength: 10}}
                        containerClasses={classNames.shortInput}
                        inputClasses={classNames.shortInputClass}
                        label={t(TranslationKey['Average Price'])}
                        value={product.avgPrice}
                        onChange={onChangeField('avgPrice')}
                      />
                      <Field
                        disabled={disabledPrivateLabelFields}
                        containerClasses={classNames.shortInput}
                        inputClasses={classNames.shortInputClass}
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
            {checkIsClient(curUserRole) && product.subUsers?.length ? (
              <div className={classNames.subUsersWrapper}>
                <div className={classNames.subUsersTitleWrapper}>
                  <Typography className={classNames.subUsersTitle}>
                    {t(TranslationKey['Users with access to the product']) + ':'}
                  </Typography>
                </div>
                <div className={classNames.subUsersBodyWrapper}>
                  <div className={classNames.subUsersBody}>
                    {product?.subUsers?.map((subUser, index) => (
                      <div key={index} className={classNames.subUserBodyWrapper}>
                        <UserLinkCell
                          withAvatar
                          name={subUser?.name}
                          userId={subUser?._id}
                          customStyles={{fontWeight: 600, marginLeft: 5}}
                          maxNameWidth={100}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Box>

        {checkIsBuyer(curUserRole) ? (
          <Field
            tooltipInfoContent={t(TranslationKey['Code for Harmonized System Product Identification'])}
            label={t(TranslationKey['HS code'])}
            labelClasses={classNames.label}
            inputComponent={
              <Button className={classNames.hsCodeBtn} onClick={() => onClickHsCode(product._id)}>
                {t(TranslationKey['HS code'])}
              </Button>
            }
          />
        ) : null}
        {checkIsClient(curUserRole) ? (
          <div className={classNames.shopsWrapper}>
            <Field
              label={t(TranslationKey.Shop)}
              containerClasses={classNames.allowedRoleContainer}
              inputComponent={
                <div className={classNames.shopsFieldWrapper}>
                  <Select
                    displayEmpty
                    disabled={
                      !(
                        shops.length ||
                        (checkIsClient(curUserRole) &&
                          product.isCreatedByClient &&
                          clientToEditStatuses.includes(productBase.status) &&
                          checkIsClient(curUserRole) &&
                          !product.archive)
                      )
                    }
                    value={product.shopIds[0] || null}
                    input={<Input className={classNames.nativeSelect} />}
                    className={classNames.nativeSelect}
                    onChange={onChangeShop}
                  >
                    <MenuItem value={null} className={classNames.strategyOption}>
                      <em>{t(TranslationKey['not selected'])}</em>
                    </MenuItem>
                    {shops.map((shop, index) => (
                      <MenuItem key={index} value={shop._id} className={classNames.shopOption}>
                        <Tooltip title={shop.name}>
                          <div className={classNames.menuItemWrapper}>
                            <ListItemText
                              primary={getShortenStringIfLongerThanCount(shop.name, 17)}
                              className={classNames.shopName}
                            />
                          </div>
                        </Tooltip>
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              }
            />
          </div>
        ) : null}
      </Grid>
    )
  },
)
