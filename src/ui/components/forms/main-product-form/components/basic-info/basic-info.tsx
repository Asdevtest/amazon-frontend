import { Badge, Spin } from 'antd'
import { FC, memo, useState } from 'react'
import { LuExternalLink } from 'react-icons/lu'
import { MdEdit } from 'react-icons/md'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomRadioButton } from '@components/shared/custom-radio-button'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UploadFilesInput } from '@components/shared/upload-files-input'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './basic-info.style'

interface BasicInfoProps {
  onClose: () => void
  product?: IProduct
}

export const BasicInfo: FC<BasicInfoProps> = memo(props => {
  const { onClose, product } = props
  const { classes: styles, cx } = useStyles()
  const [images, setImages] = useState(product?.images || [])

  const badgeContent = t(TranslationKey[product?.parentProductId ? 'Child product' : 'Parent product'])

  if (!product) {
    return <Spin spinning size="large" className={styles.loading} />
  }

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
        options={[
          { label: t(TranslationKey['Product information']), value: '1' },
          { label: t(TranslationKey.Parameters), value: '2' },
          { label: t(TranslationKey.Suppliers), value: '3' },
          { label: t(TranslationKey.Description), value: '4' },
        ]}
        value={'1'}
        onChange={() => {}}
      />

      <div>CONTENT</div>
    </div>
  )
})
