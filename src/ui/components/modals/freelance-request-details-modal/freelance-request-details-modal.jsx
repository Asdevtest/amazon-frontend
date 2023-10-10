import { cx } from '@emotion/css'

import { Typography } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { useFreelanceRequestDetailsModalStyles } from '@components/modals/freelance-request-details-modal/freelance-request-details-modal.styles'
import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Modal } from '@components/shared/modal'
import { OpenInNewTab } from '@components/shared/open-in-new-tab'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

export const FreelanceRequestDetailsModal = props => {
  const { request, details, isOpenModal, handleOpenModal, onClickSuggest, onClickOpenNewTab } = props
  const { classes: styles } = useFreelanceRequestDetailsModalStyles()

  return (
    <Modal
      fullWidth
      maxWidth={1229}
      openModal={isOpenModal}
      dialogContextClassName={styles.wrapper}
      setOpenModal={handleOpenModal}
    >
      <div className={styles.header}>
        <div className={styles.headerDetails}>
          <Typography>
            {t(TranslationKey.ID)}: {request?.humanFriendlyId}
          </Typography>
          <Typography className={styles.title}>
            <span>{getShortenStringIfLongerThanCount(request?.title, 55)}</span>
          </Typography>
        </div>
        <div className={styles.headerDetails}>
          <Typography className={styles.headerText}>
            {t(TranslationKey['Request type'])}:{' '}
            <span>{freelanceRequestTypeTranslate(freelanceRequestTypeByCode[request?.typeTask])}</span>
          </Typography>
          <Typography className={styles.headerText}>
            {t(TranslationKey['Request creator'])}:
            <UserLink
              blackText
              withAvatar
              readOnlyRating
              name={request?.createdBy?.name}
              userId={request?.createdBy?._id}
              rating={request?.createdBy?.rating}
              ratingSize={'small'}
              customRatingClass={{ opacity: 1 }}
            />
          </Typography>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.productInfo}>
          <Typography className={styles.categoryTitle}>{t(TranslationKey.Product)}</Typography>
          {request?.product.images && (
            <div className={styles.productImages}>
              <PhotoAndFilesCarousel
                withoutFiles
                mediumSlider
                isHideCounter
                files={request?.product.images}
                customAvatarStyles={{ width: '211px', height: '215px !important' }}
                customImgStyles={{ width: '100%', height: '100%' }}
              />
            </div>
          )}
          <div className={styles.category}>
            {request?.product.asin && (
              <AsinOrSkuLink withCopyValue withAttributeTitle="asin" asin={request?.product.asin} />
            )}
            {request?.product.amazonTitle && (
              <Typography>{getShortenStringIfLongerThanCount(request?.product.amazonTitle, 40)}</Typography>
            )}
          </div>

          <div className={styles.category}>
            <Typography className={styles.categoryTitle}>{t(TranslationKey.Files)}</Typography>
            <div className={styles.filesItem}>
              <Typography>{t(TranslationKey.Photos)}</Typography>
              <PhotoAndFilesSlider withoutFiles files={request?.media} />
            </div>
            <div className={cx(styles.filesList)}>
              <Typography>{t(TranslationKey.Files)}</Typography>
              <PhotoAndFilesSlider withoutPhotos files={request?.media} />
            </div>
          </div>
        </div>

        <div className={styles.requestInfo}>
          <div className={styles.category}>
            <Typography className={styles.categoryTitle}>{t(TranslationKey['Request terms'])}</Typography>
            <RequestTermsList request={request} />
          </div>

          {details?.conditions && (
            <div className={styles.category}>
              <Typography className={styles.categoryTitle}>{t(TranslationKey.Description)}</Typography>
              <CustomTextEditor
                readOnly
                editorMaxHeight={styles.editorWrapper}
                conditions={details?.conditions}
                changeConditions={undefined}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.suggestDeal}>
        <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(request?._id)} />

        {onClickSuggest ? <Button onClick={onClickSuggest}>{t(TranslationKey['Suggest a deal'])}</Button> : <div />}
      </div>
    </Modal>
  )
}
