import { memo, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { MdOutlineEdit } from 'react-icons/md'

import { Box, Grid, Link, MenuItem, Radio, Select } from '@mui/material'

import { UserRole } from '@constants/keys/user-roles'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import {
  ProductStrategyStatus,
  mapProductStrategyStatusEnumToKey,
  productStrategyStatusesEnum,
} from '@constants/product/product-strategy-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { UserCell } from '@components/data-grid/data-grid-cells'
import { EditProductTags } from '@components/modals/edit-product-tags-modal'
import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { CopyValue } from '@components/shared/copy-value/copy-value'
import { CountrySelect } from '@components/shared/country-select/country-select'
import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { InterconnectedProducts } from '@components/shared/interconnected-products'
import { RedFlags } from '@components/shared/redFlags/red-flags'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'
import { DownloadRoundIcon } from '@components/shared/svg-icons'
import { TagList } from '@components/shared/tag-list'

import { checkIsBuyer, checkIsClient, checkIsResearcher, checkIsSupervisor } from '@utils/checks'
import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { checkAndMakeAbsoluteUrl } from '@utils/text'
import { t } from '@utils/translations'
import { downloadFileByLink } from '@utils/upload-files'

import '@typings/enums/button-style'
import { TariffModal } from '@typings/enums/tariff-modal'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './fields-and-suppliers.style'

const clientToEditStatuses = [
  ProductStatusByKey[ProductStatus.CREATED_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUCCESS],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_PAID_BY_CLIENT],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_SUPPLIER_WAS_NOT_FOUND],
  ProductStatusByKey[ProductStatus.FROM_CLIENT_COMPLETE_PRICE_WAS_NOT_ACCEPTABLE],
]

export const FieldsAndSuppliers = memo(props => {
  const {
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
    destinations,
    storekeepers,
    onTriggerOpenModal,
    onClickHsCode,
    onClickParseProductData,
  } = props

  const { classes: styles, cx } = useStyles()

  const [edit, setEdit] = useState(true)
  const [showEditProductTagsModal, setShowEditProductTagsModal] = useState(false)
  const [showSelectionStorekeeperAndTariffModal, setShowSelectionStorekeeperAndTariffModal] = useState(false)
  const [currentTariff, setCurrentTariff] = useState()

  const onChangeShop = shopId => {
    onChangeField?.('shopId')({ target: { value: shopId } })
  }

  const onChangeMarketPlace = marketplace => {
    onChangeField?.('marketPlaceCountryId')({ target: { value: marketplace._id } })
  }

  const { tariffName, tariffRate, tariffDestination } = useGetDestinationTariffInfo(
    destinations,
    storekeepers,
    currentTariff?.destinationId || product.mainTariffVariation?.destination._id,
    currentTariff?.storekeeperId || product.mainTariffVariation?.storekeeperTariffLogistics.storekeeperId,
    currentTariff?.logicsTariffId || product.mainTariffVariation?.storekeeperTariffLogistics._id,
    currentTariff?.variationTariffId || product.mainTariffVariation?._id,
  )

  const onChangeTariff = tariff => {
    onChangeField?.('mainTariffVariationId')({ target: { value: tariff.variationTariffId } })

    if (tariff.variationTariffId) {
      setCurrentTariff(tariff)
    } else {
      setCurrentTariff(undefined)
    }

    setShowSelectionStorekeeperAndTariffModal(false)
  }

  const isEditRedFlags =
    showActionBtns && (checkIsSupervisor(curUserRole) || checkIsResearcher(curUserRole) || checkIsClient(curUserRole))

  const disabledPrivateLabelFields = !(
    checkIsResearcher(curUserRole) ||
    (checkIsSupervisor(curUserRole) && showActionBtns) ||
    (checkIsClient(curUserRole) &&
      product?.isCreatedByClient &&
      clientToEditStatuses.includes(productBase.status) &&
      checkIsClient(curUserRole) &&
      !product?.archive)
  )
  const seoFileValue = product?.latestSeoFiles[0]
    ? getFileNameFromUrl(product?.latestSeoFiles[0]).name
    : t(TranslationKey['Not available'])

  const tariffForRender = (
    <p className={styles.tariffText}>
      <span>{tariffName}</span> / <span>{tariffDestination?.destination?.name}</span> / <span>{tariffRate} $</span>
    </p>
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
                {edit && product?.lamazon ? (
                  <Link
                    target="_blank"
                    rel="noopener"
                    href={checkAndMakeAbsoluteUrl(product?.lamazon)}
                    className={cx(styles.inputLink, { [styles.linkDecoration]: !edit || !product?.lamazon })}
                  >
                    <p className={styles.lamazonText}>{product?.lamazon}</p>
                  </Link>
                ) : (
                  <Input
                    disabled={edit}
                    classes={{
                      input: cx(
                        styles.inputLink,
                        { [styles.inputDisabled]: edit },
                        { [styles.linkOnEdit]: edit && product?.lamazon },
                      ),
                    }}
                    placeholder={!product?.lamazon ? t(TranslationKey['Enter link']) : ''}
                    value={product?.lamazon}
                    onChange={onChangeField?.('lamazon')}
                  />
                )}

                {product?.lamazon ? <CopyValue text={product?.lamazon} /> : null}
              </div>

              {!checkIsBuyer(curUserRole) ? (
                <CustomButton
                  disabled={curUserRole === UserRole.ADMIN}
                  onClick={() => {
                    // onClickParseProductData(ProductDataParser.AMAZON, product)
                    // onClickParseProductData(ProductDataParser.SELLCENTRAL, product)

                    onClickParseProductData(product)
                  }}
                >
                  Parse Product Data
                </CustomButton>
              ) : null}
            </div>

            <div className={styles.editButtonWrapper}>
              {checkIsClient(curUserRole) &&
                product?.isCreatedByClient &&
                !product?.archive &&
                clientToEditStatuses.includes(productBase.status) &&
                (edit ? (
                  <CustomButton disabled={!checkIsClient(curUserRole)} onClick={() => setEdit(!edit)}>
                    {t(TranslationKey.Edit)}
                  </CustomButton>
                ) : (
                  <CustomButton type="primary" disabled={!checkIsClient(curUserRole)} onClick={() => setEdit(!edit)}>
                    {t(TranslationKey.Save)}
                  </CustomButton>
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
                      product?.isCreatedByClient &&
                      clientToEditStatuses.includes(productBase.status) &&
                      checkIsClient(curUserRole) &&
                      !product?.archive
                    )
                  }
                  value={product?.asin}
                  inputProps={{ maxLength: 254 }}
                  className={cx(styles.inputAsin, {
                    [styles.inputDisabled]: !(
                      checkIsClient(curUserRole) &&
                      product?.isCreatedByClient &&
                      clientToEditStatuses.includes(productBase.status) &&
                      checkIsClient(curUserRole) &&
                      !product?.archive
                    ),
                    [styles.error]: formFieldsValidationErrors.asin,
                  })}
                  onChange={onChangeField?.('asin')}
                />
                {product?.asin ? <CopyValue text={product?.asin} /> : null}
              </div>
            }
          />

          {checkIsClient(curUserRole) && product?.isCreatedByClient && (
            <Field
              label={t(TranslationKey['SKU by Client'])}
              inputComponent={
                <div className={styles.subInputWrapper}>
                  <Input
                    disabled={!clientToEditStatuses.includes(productBase.status) || product?.archive}
                    placeholder={t(TranslationKey.SKU)}
                    inputProps={{ maxLength: 50 }}
                    value={product?.skuByClient}
                    className={styles.inputAsin}
                    onChange={e =>
                      onChangeField?.('skuByClient')({
                        target: { value: e.target.value ? e.target.value : '' },
                      })
                    }
                  />
                  {product?.skuByClient ? <CopyValue text={product?.skuByClient} /> : null}
                </div>
              }
            />
          )}

          <div className={styles.productCheckboxBoxesWrapper}>
            <p className={styles.label}>{t(TranslationKey['Delivery Method'])}</p>
            <div className={styles.productCheckboxBoxWrapper}>
              <Box className={styles.productCheckboxBox}>
                <Radio
                  disabled={
                    !(
                      checkIsSupervisor(curUserRole) ||
                      checkIsResearcher(curUserRole) ||
                      (checkIsClient(curUserRole) &&
                        product?.isCreatedByClient &&
                        clientToEditStatuses.includes(productBase.status) &&
                        checkIsClient(curUserRole) &&
                        !product?.archive)
                    )
                  }
                  classes={{ root: styles.radioRoot }}
                  checked={product?.fba}
                  onChange={() => onChangeField?.('fba')({ target: { value: !product?.fba } })}
                />
                <p className={styles.radioLabel}>{t(TranslationKey.FBA)}</p>
              </Box>

              <Box className={styles.productCheckboxBox}>
                <Radio
                  disabled={
                    !(
                      checkIsSupervisor(curUserRole) ||
                      checkIsResearcher(curUserRole) ||
                      (checkIsClient(curUserRole) &&
                        product?.isCreatedByClient &&
                        clientToEditStatuses.includes(productBase.status) &&
                        checkIsClient(curUserRole) &&
                        !product?.archive)
                    )
                  }
                  classes={{ root: styles.radioRoot }}
                  checked={!product?.fba}
                  onChange={() => onChangeField?.('fba')({ target: { value: !product?.fba } })}
                />
                <p className={styles.radioLabel}>{'FBM'}</p>
              </Box>
            </div>
          </div>

          <div className={styles.strategyWrapper}>
            <Field
              label={t(TranslationKey['Product Strategy'])}
              inputComponent={
                <Select
                  displayEmpty
                  disabled={
                    !(
                      checkIsResearcher(curUserRole) ||
                      (checkIsClient(curUserRole) &&
                        product?.isCreatedByClient &&
                        clientToEditStatuses.includes(productBase.status) &&
                        checkIsClient(curUserRole) &&
                        !product?.archive)
                    )
                  }
                  value={product?.strategyStatus}
                  className={styles.nativeSelect}
                  onChange={onChangeField?.('strategyStatus')}
                >
                  {Object.keys(productStrategyStatusesEnum).map((statusCode, statusIndex) => (
                    <MenuItem
                      key={statusIndex}
                      value={statusCode}
                      className={styles.strategyOption}
                      disabled={checkIsResearcher(curUserRole) && !user?.allowedStrategies.includes(Number(statusCode))}
                    >
                      {productStrategyStatusesEnum[statusCode]?.replace(/_/g, ' ')}
                    </MenuItem>
                  ))}
                </Select>
              }
            />
          </div>
        </div>

        {(showActionBtns || !!product?.tags?.length) && (
          <div className={styles.tagsWrapper}>
            <div className={styles.tagsTitleWrapper}>
              <p className={styles.subUsersTitle}>{t(TranslationKey['Product tags'])}</p>

              {showActionBtns && !checkIsSupervisor(curUserRole) && !checkIsBuyer(curUserRole) ? (
                <CustomButton icon={<MdOutlineEdit size={18} />} onClick={() => setShowEditProductTagsModal(true)} />
              ) : null}
            </div>

            <TagList selectedTags={product?.tags} />
          </div>
        )}

        {(isEditRedFlags || !!product?.redFlags?.length) && (
          <div>
            <div className={styles.subUsersTitleWrapper}>
              <p className={styles.subUsersTitle}>{t(TranslationKey['Red flags'])}</p>
            </div>
            <div className={cx(styles.redFlags, { [styles.redFlagsView]: !isEditRedFlags })}>
              <RedFlags
                isEditMode={isEditRedFlags}
                activeFlags={product?.redFlags}
                handleSaveFlags={flags => onChangeField?.('redFlags')({ target: { value: flags || [] } })}
              />
            </div>
          </div>
        )}

        <div className={styles.strategyAndSubUsersWrapper}>
          {Number(product?.strategyStatus) ===
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
                    value={product?.niche}
                    onChange={onChangeField?.('niche')}
                  />
                  <Field
                    disabled={disabledPrivateLabelFields}
                    inputProps={{ maxLength: 255 }}
                    containerClasses={styles.field}
                    inputClasses={styles.inputField}
                    label={'Asins'}
                    value={product?.asins}
                    onChange={onChangeField?.('asins')}
                  />

                  <div className={styles.fieldsSubWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 10 }}
                      containerClasses={styles.shortInput}
                      inputClasses={styles.shortInputClass}
                      label={t(TranslationKey['Average revenue'])}
                      value={product?.avgRevenue}
                      onChange={onChangeField?.('avgRevenue')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      containerClasses={styles.shortInput}
                      inputClasses={styles.shortInputClass}
                      inputProps={{ maxLength: 10 }}
                      label={t(TranslationKey['Average BSR'])}
                      value={product?.avgBSR}
                      onChange={onChangeField?.('avgBSR')}
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
                    value={product?.totalRevenue}
                    onChange={onChangeField?.('totalRevenue')}
                  />
                  <Field
                    disabled={disabledPrivateLabelFields}
                    inputProps={{ maxLength: 10 }}
                    label={t(TranslationKey.Coefficient)}
                    containerClasses={styles.field}
                    inputClasses={styles.inputField}
                    value={product?.coefficient}
                    onChange={onChangeField?.('coefficient')}
                  />

                  <div className={styles.fieldsSubWrapper}>
                    <Field
                      disabled={disabledPrivateLabelFields}
                      inputProps={{ maxLength: 10 }}
                      containerClasses={styles.shortInput}
                      inputClasses={styles.shortInputClass}
                      label={t(TranslationKey['Average Price'])}
                      value={product?.avgPrice}
                      onChange={onChangeField?.('avgPrice')}
                    />
                    <Field
                      disabled={disabledPrivateLabelFields}
                      containerClasses={styles.shortInput}
                      inputClasses={styles.shortInputClass}
                      inputProps={{ maxLength: 10 }}
                      label={t(TranslationKey['Average Review'])}
                      value={product?.avgReviews}
                      onChange={onChangeField?.('avgReviews')}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {(checkIsClient(curUserRole) || checkIsBuyer(curUserRole)) && product?.subUsers?.length ? (
            <div className={styles.subUsersWrapper}>
              <div className={styles.subUsersTitleWrapper}>
                <p className={styles.subUsersTitle}>{t(TranslationKey['Users with access to the product']) + ':'}</p>
              </div>
              <div className={styles.subUsersBodyWrapper}>
                <div className={styles.subUsersBody}>
                  {product?.subUsers.concat(product?.subUsersByShop)?.map((subUser, index) => (
                    <div key={index} className={styles.subUserBodyWrapper}>
                      <UserCell name={subUser?.name} id={subUser?._id} />
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
                {product?.parentProductId ? t(TranslationKey['Interconnected products']) : t(TranslationKey.Variations)}
              </p>

              {checkIsClient(curUserRole) && !product?.parentProductId && (
                <CustomButton
                  size="small"
                  icon={<FiPlus size={16} />}
                  onClick={() => onTriggerOpenModal('showBindProductModal')}
                />
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
          <CustomButton onClick={() => onTriggerOpenModal('showBindProductModal')}>
            <FiPlus size={16} />
            {t(TranslationKey['Add product linkage'])}
          </CustomButton>
        ) : null}

        <div className={styles.flexColumnBlock}>
          <div className={styles.seoContainer}>
            <Field
              disabled
              label={t(TranslationKey['SEO file'])}
              containerClasses={cx(styles.field, styles.seoField)}
              inputClasses={styles.inputField}
              value={seoFileValue}
            />

            {product?.latestSeoFiles[0] ? (
              <div className={styles.downloadButtonContainer}>
                <CustomButton
                  icon={<DownloadRoundIcon className={styles.downloadButtonIcon} />}
                  onClick={() => downloadFileByLink(product?.latestSeoFiles[0])}
                />
              </div>
            ) : null}
          </div>

          {(checkIsClient(curUserRole) || checkIsBuyer(curUserRole)) && (
            <div className={styles.flexWrap}>
              <CustomCheckbox
                disabled={checkIsBuyer(curUserRole)}
                checked={product?.transparency}
                onChange={e => onChangeField?.('transparency')(e.target.checked)}
              />
              <p>Transparency Codes</p>
            </div>
          )}
        </div>
      </Box>

      {checkIsBuyer(curUserRole) ? (
        <Field
          tooltipInfoContent={t(TranslationKey['Code for Harmonized System Product Identification'])}
          label={t(TranslationKey['HS code'])}
          labelClasses={styles.label}
          containerClasses={styles.hsFieldContainer}
          inputComponent={
            <CustomButton onClick={() => onClickHsCode(product?._id)}>{t(TranslationKey['HS code'])}</CustomButton>
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
                      product?.isCreatedByClient &&
                      clientToEditStatuses.includes(productBase.status) &&
                      checkIsClient(curUserRole) &&
                      !product?.archive)
                  )
                }
                customSubMainWrapper={styles.customSubMainWrapper}
                customSearchInput={styles.customSearchInput}
                data={[...shops]?.sort((a, b) => a?.name?.localeCompare(b?.name))}
                searchFields={['name']}
                selectedItemName={
                  shops?.find(shop => shop?._id === product?.shopId)?.name || t(TranslationKey['Select a store'])
                }
                onClickNotChosen={() => onChangeShop(null)}
                onClickSelect={el => onChangeShop(el._id)}
              />
            }
          />

          <CountrySelect defaultCountry={product.marketPlaceCountry} onChangeData={onChangeMarketPlace} />

          <div className={styles.tariffWrapper}>
            <div className={styles.tariffLabel}>
              <FaStar /> <p className={styles.spanLabelSmall}>{t(TranslationKey['Favorite tariff'])}</p>
            </div>
            <CustomButton
              type={tariffName ? 'default' : 'primary'}
              onClick={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
            >
              {tariffName ? tariffForRender : t(TranslationKey.Choose)}
            </CustomButton>
          </div>
        </div>
      ) : null}

      {showEditProductTagsModal ? (
        <EditProductTags
          openModal={showEditProductTagsModal}
          setOpenModal={() => setShowEditProductTagsModal(false)}
          productId={product?._id}
          handleUpdateRow={tags => onChangeField?.('tags')({ target: { value: tags } })}
        />
      ) : null}

      {showSelectionStorekeeperAndTariffModal ? (
        <SupplierApproximateCalculationsModal
          isTariffsSelect
          isGetAllStorekeepers
          tariffModalType={TariffModal.TARIFFS}
          openModal={showSelectionStorekeeperAndTariffModal}
          setOpenModal={() => setShowSelectionStorekeeperAndTariffModal(!showSelectionStorekeeperAndTariffModal)}
          onClickSubmit={onChangeTariff}
        />
      ) : null}
    </Grid>
  )
})
