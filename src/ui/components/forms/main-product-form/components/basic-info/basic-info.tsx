import { Badge } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './basic-info.style'

interface BasicInfoProps {
  product?: IProduct
}

export const BasicInfo: FC<BasicInfoProps> = memo(props => {
  const { product } = props
  const { classes: styles, cx } = useStyles()

  const badgeContent = t(TranslationKey[product?.parentProductId ? 'Child product' : 'Parent product'])

  return (
    <Badge.Ribbon placement="start" text={badgeContent}>
      <div className={styles.wrapper}>
        <div className={styles.flexRow}>
          <div className={styles.mediaBlock}>
            <SlideshowGallery files={product?.images || []} />
          </div>

          <div className={styles.infoBlock}>
            <CustomInput fullWidth size="large" label="ASIN" />
            <CustomInput fullWidth size="large" label="SKU" />
            <CustomInput fullWidth size="large" label="Amazon product link" />
            <div className={styles.flexRow}>
              <CustomButton type="primary">{t(TranslationKey.Edit)}</CustomButton>
              <CustomButton type="primary">Parse product data</CustomButton>
            </div>
          </div>

          <div className={styles.commentsBlock}>
            <div className={styles.commentsGrid}>
              <CustomTextarea label="Supervisor" rows={4} />
              <CustomTextarea label="Researcher" rows={4} />
              <CustomTextarea label="Buyer" rows={4} />
              <CustomTextarea label="Client" rows={4} />
            </div>
          </div>
        </div>

        <div className={styles.buttons}>
          <CustomButton danger type="primary">
            {t(TranslationKey.Delete)}
          </CustomButton>
          <CustomButton type="primary">{t(TranslationKey.Save)}</CustomButton>
          <CustomButton>{t(TranslationKey.Archive)}</CustomButton>
          <CustomButton>{t(TranslationKey.Close)}</CustomButton>
        </div>
      </div>
    </Badge.Ribbon>
  )
})
