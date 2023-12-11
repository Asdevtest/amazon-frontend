import { memo, useState } from 'react'

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
import { TagSelector } from '@components/product/product-wrapper/tag-selector'
import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { InterconnectedProducts } from '@components/shared/interconnected-products'
import { RedFlags } from '@components/shared/redFlags/red-flags'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { PlusIcon } from '@components/shared/svg-icons'

import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './fields-and-suppliers.style'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const FieldsAndSuppliers = memo(
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
    const { classes: styles, cx } = useStyles()

    const [edit, setEdit] = useState(true)

    const onChangeShop = shopId => {
      onChangeField('shopId')({ target: { value: shopId } })
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
              <div className={styles.linkAndButtonWrapper}>
                <div className={styles.copyLink}>
                  {edit && product.lamazon ? (
                    <Link
                      target="_blank"
                      rel="noopener"
                      href={checkAndMakeAbsoluteUrl(product.lamazon)}
                      className={cx(styles.inputLink, { [styles.linkDecoration]: !edit || !product.lamazon })}
                    >
                      <Typography className={styles.lamazonText}>{product.lamazon}</Typography>
                    </Link>
                  ) : (
                    <Input
                      disabled={edit}
                      classes={{
                        input: cx(
                          styles.inputLink,
                          { [styles.inputDisabled]: edit },
                          { [styles.linkOnEdit]: edit && product.lamazon },
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
                    className={styles.buttonParseAmazon}
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

              <div className={styles.editButtonWrapper}>
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

        <Box className={styles.productFieldBox}>
          <div>
            <Field
              tooltipInfoContent={t(TranslationKey['Amazon ID number'])}
              error={formFieldsValidationErrors.asin}
              label={t(TranslationKey.ASIN)}
              inputComponent={
                <div className={styles.subInputWrapper}>
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
                    className={cx(styles.inputAsin, {
                      [styles.inputDisabled]: !(
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
                  <div className={styles.subInputWrapper}>
                    <Input
                      disabled={!clientToEditStatuses.includes(productBase.status) || product.archive}
                      placeholder={t(TranslationKey.SKU)}
                      inputProps={{ maxLength: 50 }}
                      value={product.skuByClient}
                      className={styles.inputAsin}
                      onChange={e =>
                        onChangeField('skuByClient')({
                          target: { value: e.target.value ? e.target.value : '' },
                        })
                      }
                    />
                    {product.skuByClient ? <CopyValue text={product.skuByClient} /> : null}
                  </div>
                }
              />
            )}

            <div className={styles.productCheckboxBoxesWrapper}>
              <Typography className={styles.label}>{t(TranslationKey['Delivery Method'])}</Typography>
              <div className={styles.productCheckboxBoxWrapper}>
                <Box className={styles.productCheckboxBox}>
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
                    classes={{ root: styles.radioRoot }}
                    checked={product.fba}
                    onChange={() => onChangeField('fba')({ target: { value: !product.fba } })}
                  />
                  <Typography className={styles.radioLabel}>{t(TranslationKey.FBA)}</Typography>
                </Box>

                <Box className={styles.productCheckboxBox}>
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
                    classes={{ root: styles.radioRoot }}
                    checked={!product.fba}
                    onChange={() => onChangeField('fba')({ target: { value: !product.fba } })}
                  />
                  <Typography className={styles.radioLabel}>{'FBM'}</Typography>
                </Box>
              </div>
            </div>

            <Box mt={3} className={styles.strategyWrapper}>
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
                      className={styles.nativeSelect}
                      onChange={onChangeField('strategyStatus')}
                    >
                      {Object.keys(mapProductStrategyStatusEnum).map((statusCode, statusIndex) => (
                        <MenuItem
                          key={statusIndex}
                          value={statusCode}
                          className={styles.strategyOption}
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
              <div className={styles.subUsersTitleWrapper}>
                <Typography className={styles.subUsersTitle}>{t(TranslationKey['Product tags'])}</Typography>
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
              <div className={styles.subUsersTitleWrapper}>
                <Typography className={styles.subUsersTitle}>{t(TranslationKey['Red flags'])}</Typography>
              </div>
              <div className={cx(styles.redFlags, { [styles.redFlagsView]: !isEditRedFlags })}>
                <RedFlags
                  isEditMode={isEditRedFlags}
                  activeFlags={product.redFlags}
                  handleSaveFlags={flags => onChangeField('redFlags')({ target: { value: flags || [] } })}
                />
              </div>
            </div>
          )}

          <div className={styles.strategyAndSubUsersWrapper}>
            {Number(product.strategyStatus) ===
              mapProductStrategyStatusEnumToKey[ProductStrategyStatus.PRIVATE_LABEL] && (
              <div>
                <div className={styles.rightBlockWrapper}>
                  <div className={styles.fieldsWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 255 }}
                      containerClasses={styles.field}
                      inputClasses={styles.inputField}
                      label={t(TranslationKey.Niche)}
                      value={product.niche}
                      onChange={onChangeField('niche')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 255 }}
                      containerClasses={styles.field}
                      inputClasses={styles.inputField}
                      label={'Asins'}
                      value={product.asins}
                      onChange={onChangeField('asins')}
                    />

                    <div className={styles.fieldsSubWrapper}>
                      <Field
                        disabled={disabledPrivateLabelFields}
                        inputProps={{ maxLength: 10 }}
                        containerClasses={styles.shortInput}
                        inputClasses={styles.shortInputClass}
                        label={t(TranslationKey['Average revenue'])}
                        value={product.avgRevenue}
                        onChange={onChangeField('avgRevenue')}
                      />
                      <Field
                        disabled={disabledPrivateLabelFields}
                        containerClasses={styles.shortInput}
                        inputClasses={styles.shortInputClass}
                        inputProps={{ maxLength: 10 }}
                        label={t(TranslationKey['Average BSR'])}
                        value={product.avgBSR}
                        onChange={onChangeField('avgBSR')}
                      />
                    </div>
                  </div>

                  <div className={styles.fieldsWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 10 }}
                      label={t(TranslationKey['Total Revenue'])}
                      containerClasses={styles.field}
                      inputClasses={styles.inputField}
                      value={product.totalRevenue}
                      onChange={onChangeField('totalRevenue')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 10 }}
                      label={t(TranslationKey.Coefficient)}
                      containerClasses={styles.field}
                      inputClasses={styles.inputField}
                      value={product.coefficient}
                      onChange={onChangeField('coefficient')}
                    />

                    <div className={styles.fieldsSubWrapper}>
                      <Field
                        disabled={disabledPrivateLabelFields}
                        inputProps={{ maxLength: 10 }}
                        containerClasses={styles.shortInput}
                        inputClasses={styles.shortInputClass}
                        label={t(TranslationKey['Average Price'])}
                        value={product.avgPrice}
                        onChange={onChangeField('avgPrice')}
                      />
                      <Field
                        disabled={disabledPrivateLabelFields}
                        containerClasses={styles.shortInput}
                        inputClasses={styles.shortInputClass}
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
            {(checkIsClient(curUserRole) || checkIsBuyer(curUserRole)) && product.subUsers?.length ? (
              <div className={styles.subUsersWrapper}>
                <div className={styles.subUsersTitleWrapper}>
                  <Typography className={styles.subUsersTitle}>
                    {t(TranslationKey['Users with access to the product']) + ':'}
                  </Typography>
                </div>
                <div className={styles.subUsersBodyWrapper}>
                  <div className={styles.subUsersBody}>
                    {product?.subUsers?.map((subUser, index) => (
                      <div key={index} className={styles.subUserBodyWrapper}>
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

          {product?.parentProductId || !!productVariations?.childProducts?.length ? (
            <div className={styles.interconnectedProductsWrapper}>
              <div
                className={cx(styles.interconnectedProductsHeader, {
                  [styles.interconnectedProductsHeaderPadding]:
                    (product?.parentProductId && productVariations?.childProducts?.length >= 4) ||
                    (!product?.parentProductId && productVariations?.childProducts?.length >= 5),
                })}
              >
                <p className={styles.subUsersTitle}>
                  {product?.parentProductId
                    ? t(TranslationKey['Interconnected products'])
                    : t(TranslationKey.Variations)}
                </p>

                {checkIsClient(curUserRole) && !product?.parentProductId && (
                  <Button className={styles.plusButton} onClick={() => onTriggerOpenModal('showBindProductModal')}>
                    <AddIcon className={styles.plusIcon} />
                  </Button>
                )}
              </div>
              <div className={styles.interconnectedProductsBodyWrapper}>
                {product?.parentProductId && (
                  <InterconnectedProducts
                    isParent
                    showRemoveButton={checkIsClient(curUserRole)}
                    variationProduct={{
                      _id: productVariations?._id,
                      asin: productVariations?.asin,
                      skuByClient: productVariations?.skuByClient,
                      images: productVariations?.images,
                      shopId: productVariations?.shopId,
                      amazonTitle: productVariations?.amazonTitle,
                    }}
                    navigateToProduct={navigateToProduct}
                    unbindProductHandler={unbindProductHandler}
                    productId={product?._id}
                  />
                )}

                {productVariations?.childProducts
                  ?.filter(variationProduct => variationProduct?._id !== product?._id)
                  .map((variationProduct, variationProductIndex) => (
                    <InterconnectedProducts
                      key={variationProductIndex}
                      showRemoveButton={!product?.parentProductId && checkIsClient(curUserRole)}
                      productId={product?._id}
                      variationProduct={variationProduct}
                      navigateToProduct={navigateToProduct}
                      unbindProductHandler={unbindProductHandler}
                    />
                  ))}
              </div>
            </div>
          ) : checkIsClient(curUserRole) ? (
            <Button className={styles.bindProductButton} onClick={() => onTriggerOpenModal('showBindProductModal')}>
              <PlusIcon className={styles.plusIcon} />
              {t(TranslationKey['Add product linkage'])}
            </Button>
          ) : null}

          <Checkbox checked={product.transparency} onChange={e => onChangeField('transparency')(e.target.checked)}>
            {'Transparency codes'}
          </Checkbox>
        </Box>

        {checkIsBuyer(curUserRole) ? (
          <Field
            tooltipInfoContent={t(TranslationKey['Code for Harmonized System Product Identification'])}
            label={t(TranslationKey['HS code'])}
            labelClasses={styles.label}
            containerClasses={styles.hsFieldContainer}
            inputComponent={
              <Button className={styles.hsCodeBtn} onClick={() => onClickHsCode(product._id)}>
                {t(TranslationKey['HS code'])}
              </Button>
            }
          />
        ) : null}
        {checkIsClient(curUserRole) ? (
          <div className={styles.shopsWrapper}>
            <Field
              label={t(TranslationKey.Shop)}
              labelClasses={styles.spanLabelSmall}
              containerClasses={styles.allowedRoleContainer}
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
                  customSubMainWrapper={styles.customSubMainWrapper}
                  customSearchInput={styles.customSearchInput}
                  data={[...shops]?.sort((a, b) => a?.name?.localeCompare(b?.name))}
                  searchFields={['name']}
                  selectedItemName={
                    shops?.find(shop => shop?._id === product?.shopId)?.name || t(TranslationKey['Select a store'])
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
