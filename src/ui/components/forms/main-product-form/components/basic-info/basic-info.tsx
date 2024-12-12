import { Badge, Divider, Space, Spin } from 'antd'
import { FC, memo, useState } from 'react'
import { LuExternalLink } from 'react-icons/lu'
import { MdEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { SupplierApproximateCalculationsModal } from '@components/modals/supplier-approximate-calculations'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { CustomSwitch } from '@components/shared/custom-switch'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { RedFlags } from '@components/shared/redFlags/red-flags'
import { CountrySelect } from '@components/shared/selects/country-select/country-select'
import { CustomSelect } from '@components/shared/selects/custom-select'
import { ShopSelect } from '@components/shared/selects/shop-select/shop-select'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { ListSuppliers } from '@components/shared/tables/list-suppliers'
import { TagList } from '@components/shared/tag-list'
import { UploadFilesInput } from '@components/shared/upload-files-input'
import { UsersList } from '@components/shared/users-list'

import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { t } from '@utils/translations'

import { TariffModal } from '@typings/enums/tariff-modal'
import { IProduct } from '@typings/models/products/product'

import { useGetDestinationTariffInfo } from '@hooks/use-get-destination-tariff-info'

import { useStyles } from './basic-info.style'

import { BasicInfoConfig, basicInfoTabsOptions, productStrategyStatus } from './basic-info.config'

interface BasicInfoProps {
  onClose: () => void
  product?: IProduct
}

export const BasicInfo: FC<BasicInfoProps> = memo(props => {
  const { onClose, product } = props
  const { classes: styles, cx } = useStyles()
  const [images, setImages] = useState(product?.images || [])
  const [tab, setTab] = useState(BasicInfoConfig.PRODUCT_INFO)
  const [showTariffModal, setShowTariffModal] = useState(false)

  const badgeContent = t(TranslationKey[product?.parentProductId ? 'Child product' : 'Parent product'])

  const { tariffName, tariffRate, tariffDestination } = useGetDestinationTariffInfo(
    [], // TODO
    [], // TODO
    product?.mainTariffVariation?.destination._id, // TODO
    product?.mainTariffVariation?.storekeeperTariffLogistics?.storekeeperId, // TODO
    product?.mainTariffVariation?.storekeeperTariffLogistics?._id, // TODO
    product?.mainTariffVariation?._id, // TODO
  )

  if (!product) {
    return <Spin spinning size="large" className={styles.loading} />
  }

  const tariffForRender = (
    <p className={styles.tariffText}>
      <span>{tariffName}</span> / <span>{tariffDestination?.destination?.name}</span> / <span>{tariffRate} $</span>
    </p>
  )

  const basicInfoTabsContent = {
    [BasicInfoConfig.PRODUCT_INFO]: (
      <div className={cx(styles.tabHeight, styles.productInfoWrapper)}>
        <div className={cx(styles.gridLayout, styles.productInfo)}>
          <CustomSelect
            label="Product Strategy"
            value={product?.strategyStatus}
            options={Object.keys(productStrategyStatus).map(key => ({
              value: productStrategyStatus[key],
              label: key.replace(/_/g, ' '),
            }))}
          />
          <CustomRadioButton
            label="Delivery Method"
            options={[
              { label: 'FBA', value: true },
              { label: 'FBM', value: false },
            ]}
            value={product?.fba}
          />
          <CountrySelect defaultValue={product?.marketPlaceCountry?.title} />
          <ShopSelect />
          <CustomInput label="Status" value={product?.status} />
        </div>

        <div className={cx(styles.gridLayout, styles.privatesColumns)}>
          <CustomInput label="Niche" value={'Niche'} />
          <CustomInput label="Total revenue" value={'Total revenue'} />
          <CustomInput label="ASINs" value={'ASINs'} />
          <CustomInput label="Coefficient" value={'Coefficient'} />
          <CustomInput label="Avg Revenue" value={'Avg Revenue'} />
          <CustomInput label="Avg BSR" value={'Avg BSR'} />
          <CustomInput label="Avg Price" value={'Avg Price'} />
          <CustomInput label="Avg Review" value={'Avg Review'} />
        </div>

        <Divider className={styles.divider} />

        <div className={styles.gridLayout}>
          <CustomInput label="Category" />
          <CustomInput label="Amazon price" value={product?.amazon} />
          <CustomInput label="FBA fees" value={product?.fbafee} />
          <CustomInput label="Referral fee" value={product?.reffee} />
          <CustomInput label="Min purchase price" value={product?.minpurchase} />
          <CustomInput label="Total FBA" value={0} />
          <CustomInput label="Profit" value={product?.profit} />
          <CustomInput label="BSR" value={product?.bsr} />
          <CustomInput label="Recommended batch" value={product?.fbaamount} />
          <CustomInput label="Margin" value={product?.margin} />
          <Space.Compact>
            <CustomInput label="Width" value={product?.width} />
            <CustomInput label="Height" value={product?.height} />
            <CustomInput label="Length" value={product?.length} />
          </Space.Compact>
          <CustomInput label="Weight" value={product?.weight} />
        </div>
      </div>
    ),
    [BasicInfoConfig.PARAMETERS]: (
      <div className={cx(styles.tabHeight, styles.flexRow)}>
        <div style={{ width: '100%' }}>
          <CustomInput
            label="SEO file"
            placeholder={product?.latestSeoFiles?.[0] ? '' : 'Not available'}
            value={getFileNameFromUrl(product?.latestSeoFiles?.[0])?.name}
          />
        </div>
        <TagList tags={product?.tags} productId={product?._id} />
        <RedFlags editMode withSearch withTitle flags={product?.redFlags} />
        <div style={{ width: '100%' }} className={styles.flexColumn}>
          <div className={cx(styles.flexRow, styles.alignEnd)}>
            <CustomSwitch medium label="Transparency codes" />
            <CustomButton type="primary">HS code</CustomButton>
          </div>

          <CustomButton
            block
            type={tariffName ? 'default' : 'primary'}
            onClick={() => setShowTariffModal(!showTariffModal)}
          >
            {tariffName ? tariffForRender : t(TranslationKey['Select tariff'])}
          </CustomButton>

          <UsersList
            title="Access to product"
            users={[...(product?.subUsers || []), ...(product?.subUsersByShop || [])]}
            wrapperClassName={styles.usersList}
          />
        </div>
      </div>
    ),
    [BasicInfoConfig.SUPPLIERS]: (
      <div className={cx(styles.tabHeight)}>
        <ListSuppliers
          formFields={product}
          onClickSaveSupplier={() => {}}
          onSaveProduct={() => {}}
          onRemoveSupplier={() => {}}
        />
      </div>
    ),
    [BasicInfoConfig.DESCRIPTION]: (
      <div className={cx(styles.tabHeight, styles.flexRow)}>
        <div className={cx(styles.fullWidth, styles.flexColumn)}>
          <CustomInput fullWidth label="Product header on Amazon" />
          <CustomTextarea autoHeight label="Details" />
        </div>
        <div className={cx(styles.fullWidth, styles.flexColumn)}>
          <CustomTextarea autoHeight label="Amazon Brief Description" />
        </div>
      </div>
    ),
  }

  console.log('product', product)

  return (
    <>
      <div className={cx(styles.fullWidth, styles.flexColumn)}>
        <Badge.Ribbon placement="start" text={badgeContent}>
          <div className={cx(styles.container, styles.flexColumn)}>
            <div className={styles.flexRow}>
              <div className={cx(styles.mediaBlock, styles.flexColumn, styles.spaceBetween)}>
                <div className={cx(styles.flexRow, styles.justifyCenter)}>
                  <SlideshowGallery files={product?.images || []} />
                </div>

                <UploadFilesInput minimized images={images} setImages={setImages} />

                <div className={cx(styles.flexRow, styles.alignEnd)}>
                  <CustomInput fullWidth disabled size="large" label="Amazon product link" value={product?.lamazon} />
                  <div className={styles.flexRow}>
                    <CustomButton ghost size="large" type="primary" icon={<MdEdit />} />
                    <CustomButton ghost size="large" type="primary">
                      Parse product data
                    </CustomButton>
                  </div>
                </div>
              </div>

              <div className={cx(styles.commentsBlock, styles.flexColumn, styles.spaceBetween)}>
                {/* <div className={cx(styles.flexRow, styles.alignCenter)}>
                <Tooltip title={4.5}>
                  <Rate disabled allowHalf value={4.5} />
                </Tooltip>
                <CustomButton type="link" size="small">
                  {t(TranslationKey.Reviews)}
                </CustomButton>
              </div> */}

                <div className={styles.commentsGrid}>
                  <CustomTextarea autoHeight disabled label="Supervisor" rows={6} value={product?.checkednotes} />
                  <CustomTextarea autoHeight disabled label="Researcher" rows={6} value={product?.icomment} />
                  <CustomTextarea autoHeight disabled label="Buyer" rows={6} value={product?.buyersComment} />
                  <CustomTextarea autoHeight disabled label="Client" rows={6} value={product?.clientComment} />
                </div>

                <div className={styles.flexRow}>
                  <CustomInput fullWidth disabled size="large" label="ASIN" value={product?.asin} />
                  <CustomInput fullWidth disabled size="large" label="SKU" value={product?.skuByClient} />
                </div>
              </div>
            </div>

            <div className={styles.buttons}>
              <CustomButton
                ghost
                size="large"
                type="primary"
                icon={<LuExternalLink />}
                className={styles.externalLinkButton}
              />
              <CustomButton danger size="large" type="primary">
                {t(TranslationKey.Delete)}
              </CustomButton>
              <CustomButton size="large" type="primary">
                {t(TranslationKey.Save)}
              </CustomButton>
              <CustomButton ghost size="large" type="primary">
                {t(TranslationKey.Archive)}
              </CustomButton>
              <CustomButton size="large" onClick={onClose}>
                {t(TranslationKey.Close)}
              </CustomButton>
            </div>
          </div>
        </Badge.Ribbon>

        <CustomRadioButton
          block
          size="large"
          options={basicInfoTabsOptions}
          value={tab}
          onChange={e => setTab(e.target.value)}
        />

        <div className={styles.tabContent}>{basicInfoTabsContent[tab]}</div>
      </div>

      {showTariffModal ? (
        <SupplierApproximateCalculationsModal
          isTariffsSelect
          isGetAllStorekeepers
          tariffModalType={TariffModal.TARIFFS}
          openModal={showTariffModal}
          setOpenModal={() => setShowTariffModal(!showTariffModal)}
          onClickSubmit={() => {}}
        />
      ) : null}
    </>
  )
})
