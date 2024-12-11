import { Badge, Divider, Space, Spin } from 'antd'
import { FC, memo, useState } from 'react'
import { LuExternalLink } from 'react-icons/lu'
import { MdEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CountrySelect } from '@components/shared/country-select/country-select'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { CustomSwitch } from '@components/shared/custom-switch'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { CustomSelect } from '@components/shared/selects/custom-select'
import { ShopSelect } from '@components/shared/selects/shop-select/shop-select'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

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

  const badgeContent = t(TranslationKey[product?.parentProductId ? 'Child product' : 'Parent product'])

  if (!product) {
    return <Spin spinning size="large" className={styles.loading} />
  }

  const basicInfoTabsContent = {
    [BasicInfoConfig.PRODUCT_INFO]: (
      <div className={styles.productInfoWrapper}>
        <div className={styles.gridLayout}>
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
          <CustomSwitch medium label="Transparency codes" />
          <CustomInput
            label="SEO file"
            placeholder={product?.latestSeoFiles?.[0] ? '' : 'Not available'}
            value={getFileNameFromUrl(product?.latestSeoFiles?.[0])?.name}
          />
          <CustomButton type="primary">HS code</CustomButton>
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

        <Divider style={{ margin: 0 }} />

        <div className={styles.gridLayout}>
          <CountrySelect defaultValue={product?.marketPlaceCountry.shortTitle} />
          <ShopSelect />
          <CustomInput label="Status" value={product?.status} />
          <CustomInput label="Category" value={product?.category} />
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
    [BasicInfoConfig.PARAMETERS]: t(TranslationKey.Parameters),
    [BasicInfoConfig.SUPPLIERS]: t(TranslationKey.Suppliers),
    [BasicInfoConfig.DESCRIPTION]: (
      <div className={styles.flexRow}>
        <div className={cx(styles.root, styles.flexColumn)}>
          <CustomInput fullWidth label="Product header on Amazon" value={0} />
          <CustomTextarea autoHeight label="Details" value={0} rows={5} />
        </div>
        <div className={cx(styles.root, styles.flexRow)}>
          <CustomTextarea autoHeight label="Amazon Brief Description" value={0} rows={8} />
        </div>
      </div>
    ),
  }

  console.log('product', product)

  return (
    <div className={cx(styles.root, styles.flexColumn)}>
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

      <div>{basicInfoTabsContent[tab]}</div>
    </div>
  )
})
