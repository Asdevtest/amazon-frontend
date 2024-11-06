import { Skeleton } from 'antd'
import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { Dimensions } from '@components/shared/dimensions'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { NoPhotoIcon } from '@components/shared/svg-icons'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './box.style'

import { Items } from '../items'

import { Fields } from './fields'
import { TrackNumber } from './track-number'

interface BoxProps {
  isEdit: boolean
  isBuyer: boolean
  isClient: boolean
  formFields?: IBox
  onChangeField: (field: keyof IBox) => (event: ChangeEvent<HTMLInputElement>) => void
  onChangeTrackNumberFile: (files: string[]) => void
}

export const Box: FC<BoxProps> = memo(props => {
  const { isEdit, isBuyer, isClient, formFields, onChangeField, onChangeTrackNumberFile } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      {formFields ? (
        <div className={styles.flexContainer}>
          <Items formFields={formFields} />

          <div className={cx(styles.info, styles.flexContainer)}>
            <SlideshowGallery hiddenPreviews files={formFields?.images || []} slidesToShow={2} />

            <Dimensions data={formFields} title={t(TranslationKey['Sizes from storekeeper'])} />

            <div className={styles.checkboxes}>
              <div className={styles.checkboxContainer}>
                <Checkbox disabled className={styles.checkbox} checked={formFields?.isFormed} />
                {formFields?.sub ? (
                  <img
                    src={getUserAvatarSrc(formFields?.sub._id)}
                    alt="user"
                    className={styles.userIcon}
                    title={formFields?.sub.name}
                  />
                ) : (
                  <NoPhotoIcon className={styles.userIcon} />
                )}
                <p className={styles.text}>{t(TranslationKey.Formed)}</p>
              </div>

              <TrackNumber
                isClient={isClient}
                isEdit={isEdit}
                formFields={formFields}
                onChangeField={onChangeField}
                onChangeTrackNumberFile={onChangeTrackNumberFile}
              />

              <div className={styles.checkboxContainer}>
                <Checkbox
                  disabled
                  className={styles.checkbox}
                  checked={formFields?.isShippingLabelAttachedByStorekeeper}
                />
                <p className={styles.text}>{t(TranslationKey['Shipping label was glued to the warehouse'])}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton.Node active className={styles.skeleton} />
      )}

      <Fields
        formFields={formFields}
        isClient={isClient}
        isBuyer={isBuyer}
        isEdit={isEdit}
        onChangeField={onChangeField}
      />
    </div>
  )
})
