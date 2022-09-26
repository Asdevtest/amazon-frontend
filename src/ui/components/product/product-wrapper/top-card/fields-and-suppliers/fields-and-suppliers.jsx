import ClearIcon from '@mui/icons-material/Clear'

import React, {useEffect, useState} from 'react'

import {Box, Grid, Typography, Link, NativeSelect, Select, MenuItem, Checkbox, ListItemText} from '@material-ui/core'
import MuiCheckbox from '@material-ui/core/Checkbox'
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
import {CopyValue} from '@components/copy-value/copy-value'
import {Field} from '@components/field'
import {Input} from '@components/input'

import {checkIsClient, checkIsSupervisor, checkIsResearcher} from '@utils/checks'
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
  ({user, showActionBtns, curUserRole, onChangeField, product, productBase, formFieldsValidationErrors, shops}) => {
    const classNames = useClassNames()

    const [edit, setEdit] = useState(true)

    const [clearSelect, setClearSelect] = useState(true)
    const [selectedItem, setSelectedItem] = useState(null)

    const shopsNames = checkIsClient(curUserRole) && shops.map(shop => shop.name)
    const currentShop = checkIsClient(curUserRole) && shops.filter(shop => product.shopIds.includes(shop._id))

    const [currentShops, setCurrentShops] = useState([])
    const [currentShopsIds, setCurrentShopsIds] = useState([])

    useEffect(() => {
      setCurrentShops(currentShop)
      setCurrentShopsIds(product.shopIds)
    }, [shops])

    useEffect(() => {
      checkIsClient(curUserRole) && onChangeField('shopIds')({target: {value: [...currentShopsIds]}})
    }, [currentShopsIds])

    useEffect(() => {
      !selectedItem && shops?.length ? setClearSelect(true) : setClearSelect(false)
    }, [selectedItem, shops])

    const onChangeShopNamesField = () => {
      setClearSelect(true)
      selectedItem && setCurrentShops(prev => [...new Set([...prev, selectedItem])])
      selectedItem && setCurrentShopsIds(prev => [...new Set([...prev, selectedItem._id])])
    }

    const onRemoveShop = (name, id) => {
      setSelectedItem(null)
      setCurrentShops(currentShops.filter(shop => shop.name !== name))
      currentShopsIds && setCurrentShopsIds(currentShopsIds.filter(shopId => shopId !== id))
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
            <div>
              <div className={classNames.copyLink}>
                <Link
                  suppressContentEditableWarning
                  contentEditable={!edit || !product.lamazon}
                  target="_blank"
                  rel="noopener"
                  href={checkAndMakeAbsoluteUrl(product.lamazon)}
                  className={clsx({[classNames.linkDecoration]: !edit || !product.lamazon})}
                >
                  <Input
                    disabled={edit}
                    classes={{input: clsx(classNames.inputLink, {[classNames.linkOnEdit]: edit && product.lamazon})}}
                    placeholder={!product.lamazon ? t(TranslationKey['Enter link']) : ''}
                    value={product.lamazon}
                    onChange={onChangeField('lamazon')}
                  />
                </Link>
                {product.lamazon ? <CopyValue text={product.lamazon} /> : null}
              </div>

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
                    className={classNames.inputAsin}
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
              <div>
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
                      <option value={''}>{t(TranslationKey['not selected'])}</option>
                      {Object.keys(mapProductStrategyStatusEnum).map((statusCode, statusIndex) => (
                        <option
                          key={statusIndex}
                          value={statusCode}
                          className={clsx({
                            [classNames.disabledOption]:
                              checkIsResearcher(curUserRole) && !user?.allowedStrategies.includes(Number(statusCode)),
                          })}
                          disabled={
                            checkIsResearcher(curUserRole) && !user?.allowedStrategies.includes(Number(statusCode))
                          }
                        >
                          {mapProductStrategyStatusEnum[statusCode]?.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </NativeSelect>
                  }
                />
              </div>
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
        {checkIsClient(curUserRole) ? (
          <div className={classNames.shopsWrapper}>
            <Field
              label={t(TranslationKey.Shop)}
              containerClasses={classNames.allowedRoleContainer}
              inputComponent={
                <div className={classNames.shopsFieldWrapper}>
                  <Select
                    value={shops?.length ? shopsNames : t(TranslationKey['No stores'])}
                    disabled={!shops.length}
                    renderValue={() =>
                      clearSelect
                        ? t(TranslationKey['Select a store'])
                        : !shopsNames.length
                        ? t(TranslationKey['No stores'])
                        : selectedItem?.name
                    }
                    className={classNames.shopsSelect}
                    onChange={e => setSelectedItem(e.target.value)}
                    // onClick={() => setClearSelect(false)}
                  >
                    {shops.map((shop, index) => (
                      <MenuItem
                        key={index}
                        disabled={currentShops.includes(shop)}
                        value={shop}
                        className={classNames.selectMenu}
                      >
                        <Checkbox color="primary" checked={currentShops.includes(shop)} />
                        <ListItemText primary={shop.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  <Button disabled={!shops.length} onClick={onChangeShopNamesField}>
                    {t(TranslationKey.Add)}
                  </Button>
                </div>
              }
            />
            <div className={classNames.selectedShopsWrapper}>
              {currentShops.map((shop, index) => (
                <div key={index} className={classNames.selectedShop}>
                  <Typography className={classNames.selectedShopText}>{shop.name}</Typography>
                  <ClearIcon
                    className={classNames.removeShopButton}
                    onClick={() => onRemoveShop(shop.name, shop._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Grid>
    )
  },
)
