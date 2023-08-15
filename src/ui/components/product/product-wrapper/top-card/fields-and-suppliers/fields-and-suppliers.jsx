import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { useState } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Box, Grid, Link, MenuItem, Radio, Select, Typography } from '@mui/material'

import { UserRole } from '@constants/keys/user-roles'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import {
  ProductStrategyStatus,
  mapProductStrategyStatusEnum,
  mapProductStrategyStatusEnumToKey,
} from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { GeneralModel } from '@models/general-model'

import { UserLinkCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { TagSelector } from '@components/product/product-wrapper/tag-selector/tag-selector'
import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { InterconnectedProducts } from '@components/shared/interconnected-products'
import { RedFlags } from '@components/shared/redFlags/red-flags'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './fields-and-suppliers.style'

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
    productVariations,
    navigateToProduct,
    unbindProductHandler,
    productBase,
    formFieldsValidationErrors,
    shops,
    onTriggerOpenModal,
    onClickHsCode,
    onClickParseProductData,
  }) => {
    const { classes: classNames } = useClassNames()

    const [edit, setEdit] = useState(true)

    const onChangeShop = shopId => {
      onChangeField('shopIds')({ target: { value: shopId ? [shopId] : [] } })
    }

    const isEditRedFlags =
      showActionBtns && (checkIsSupervisor(curUserRole) || checkIsResearcher(curUserRole) || checkIsClient(curUserRole))

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
                      className={cx(classNames.inputLink, { [classNames.linkDecoration]: !edit || !product.lamazon })}
                    >
                      <Typography className={classNames.lamazonText}>{product.lamazon}</Typography>
                    </Link>
                  ) : (
                    <Input
                      disabled={edit}
                      classes={{
                        input: cx(
                          classNames.inputLink,
                          { [classNames.inputDisabled]: edit },
                          { [classNames.linkOnEdit]: edit && product.lamazon },
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
                    disabled={curUserRole === UserRole.ADMIN}
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
                      onClick={() => setEdit(!edit)}
                    >
                      {t(TranslationKey.Edit)}
                    </Button>
                  ) : (
                    <Button
                      success
                      tooltipInfoContent={t(TranslationKey['Saves a link to an Amazon product'])}
                      disabled={!checkIsClient(curUserRole)}
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
                    inputProps={{ maxLength: 254 }}
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
                            inputProps={{ maxLength: 50 }}
                            value={product.skusByClient}
                            className={classNames.inputAsin}
                            onChange={e =>
                              onChangeField('skusByClient')({
                                target: { value: e.target.value ? [e.target.value] : [] },
                              })
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
                  <Radio
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
                    classes={{ root: classNames.radioRoot }}
                    checked={product.fba}
                    onChange={() => onChangeField('fba')({ target: { value: !product.fba } })}
                  />
                  <Typography className={classNames.radioLabel}>{t(TranslationKey.FBA)}</Typography>
                </Box>

                <Box className={classNames.productCheckboxBox}>
                  <Radio
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
                    classes={{ root: classNames.radioRoot }}
                    checked={!product.fba}
                    onChange={() => onChangeField('fba')({ target: { value: !product.fba } })}
                  />
                  <Typography className={classNames.radioLabel}>{'FBM'}</Typography>
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
                      onChange={onChangeField('strategyStatus')}
                    >
                      {Object.keys(mapProductStrategyStatusEnum).map((statusCode, statusIndex) => (
                        <MenuItem
                          key={statusIndex}
                          value={statusCode}
                          className={classNames.strategyOption}
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

          {(showActionBtns || !!product?.tags?.length) && (
            <Box maxWidth={300}>
              <div className={classNames.subUsersTitleWrapper}>
                <Typography className={classNames.subUsersTitle}>{t(TranslationKey['Product tags'])}</Typography>
              </div>
              <TagSelector
                isEditMode={showActionBtns}
                handleSaveTags={tags => onChangeField('tags')({ target: { value: tags } })}
                currentTags={product.tags}
                getTags={GeneralModel.getTagList}
                prefix="# "
                placeholder={'# ' + t(TranslationKey['Input tag'])}
              />
            </Box>
          )}

          {(isEditRedFlags || !!product?.redFlags?.length) && (
            <div>
              <div className={classNames.subUsersTitleWrapper}>
                <Typography className={classNames.subUsersTitle}>{t(TranslationKey['Red flags'])}</Typography>
              </div>
              <div className={cx(classNames.redFlags, { [classNames.redFlagsView]: !isEditRedFlags })}>
                <RedFlags
                  isEditMode={isEditRedFlags}
                  activeFlags={product.redFlags}
                  handleSaveFlags={flags => onChangeField('redFlags')({ target: { value: flags || [] } })}
                />
              </div>
            </div>
          )}

          <div className={classNames.strategyAndSubUsersWrapper}>
            {Number(product.strategyStatus) ===
              mapProductStrategyStatusEnumToKey[ProductStrategyStatus.PRIVATE_LABEL] && (
              <div>
                <div className={classNames.rightBlockWrapper}>
                  <div className={classNames.fieldsWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 255 }}
                      containerClasses={classNames.field}
                      inputClasses={classNames.inputField}
                      label={t(TranslationKey.Niche)}
                      value={product.niche}
                      onChange={onChangeField('niche')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 255 }}
                      containerClasses={classNames.field}
                      inputClasses={classNames.inputField}
                      label={'Asins'}
                      value={product.asins}
                      onChange={onChangeField('asins')}
                    />

                    <div className={classNames.fieldsSubWrapper}>
                      <Field
                        disabled={disabledPrivateLabelFields}
                        inputProps={{ maxLength: 10 }}
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
                        inputProps={{ maxLength: 10 }}
                        label={t(TranslationKey['Average BSR'])}
                        value={product.avgBSR}
                        onChange={onChangeField('avgBSR')}
                      />
                    </div>
                  </div>

                  <div className={classNames.fieldsWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 10 }}
                      label={t(TranslationKey['Total Revenue'])}
                      containerClasses={classNames.field}
                      inputClasses={classNames.inputField}
                      value={product.totalRevenue}
                      onChange={onChangeField('totalRevenue')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 10 }}
                      label={t(TranslationKey.Coefficient)}
                      containerClasses={classNames.field}
                      inputClasses={classNames.inputField}
                      value={product.coefficient}
                      onChange={onChangeField('coefficient')}
                    />

                    <div className={classNames.fieldsSubWrapper}>
                      <Field
                        disabled={disabledPrivateLabelFields}
                        inputProps={{ maxLength: 10 }}
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
                        inputProps={{ maxLength: 10 }}
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
                          customStyles={{ fontWeight: 600, marginLeft: 5 }}
                          maxNameWidth={100}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className={classNames.interconnectedProductsWrapper}>
            <div className={classNames.interconnectedProductsHeader}>
              <p className={classNames.subUsersTitle}>
                {product?.parentProductId ? t(TranslationKey['Interconnected products']) : t(TranslationKey.Variations)}
              </p>

              {!product?.parentProductId && (
                <Button className={classNames.plusButton} onClick={() => onTriggerOpenModal('showBindProductModal')}>
                  <AddIcon className={classNames.plusIcon} />
                </Button>
              )}
            </div>
            <div className={classNames.interconnectedProductsBodyWrapper}>
              {product?.parentProductId && (
                <InterconnectedProducts
                  isParent
                  showRemoveButton
                  variationProduct={{
                    _id: productVariations?._id,
                    asin: productVariations?.asin,
                    skusByClient: productVariations?.skusByClient,
                    images: productVariations?.images,
                    shopIds: productVariations?.shopIds,
                    amazonTitle: productVariations?.amazonTitle,
                  }}
                  navigateToProduct={navigateToProduct}
                  unbindProductHandler={unbindProductHandler}
                  productId={product?._id}
                />
              )}

              {productVariations?.childProducts?.map((variationProduct, variationProductIndex) => (
                <InterconnectedProducts
                  key={variationProductIndex}
                  showRemoveButton={!product?.parentProductId}
                  productId={product?._id}
                  variationProduct={variationProduct}
                  navigateToProduct={navigateToProduct}
                  unbindProductHandler={unbindProductHandler}
                />
              ))}
            </div>
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
              labelClasses={classNames.spanLabelSmall}
              containerClasses={classNames.allowedRoleContainer}
              inputComponent={
                <WithSearchSelect
                  grayBorder
                  blackSelectedItem
                  darkIcon
                  chosenItemNoHover
                  width={300}
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
                  customSubMainWrapper={classNames.customSubMainWrapper}
                  customSearchInput={classNames.customSearchInput}
                  data={[...shops]?.sort((a, b) => a?.name?.localeCompare(b?.name))}
                  searchFields={['name']}
                  selectedItemName={
                    shops?.find(shop => shop?._id === product?.shopIds[0])?.name || t(TranslationKey['Select a store'])
                  }
                  onClickNotChosen={() => onChangeShop('')}
                  onClickSelect={el => {
                    onChangeShop(el._id)
                  }}
                />
              }
            />
          </div>
        ) : null}
      </Grid>
    )
  },
)
