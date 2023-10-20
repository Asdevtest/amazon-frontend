import { cx } from '@emotion/css'

import { Typography } from '@mui/material'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { FreelanceRequestDetailsModalControls } from '@components/modals/freelance-request-details-modal/freelance-request-details-modal-controls'
import { useFreelanceRequestDetailsModalStyles } from '@components/modals/freelance-request-details-modal/freelance-request-details-modal.styles'
import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

export const FreelanceRequestDetailsModal = props => {
  const {
    request,
    details,
    isOpenModal,
    handleOpenModal,
    onClickSuggest,
    onClickOpenNewTab,
    onClickPublishBtn,
    onClickEditBtn,
    onClickCancelBtn,
    onToggleUploadedToListing,
    isRequestOwner,
    onRecoverRequest,
    onClickAbortBtn,
  } = props
  const { classes: styles } = useFreelanceRequestDetailsModalStyles()
  const requestMedia = request?.media?.map(el => el.fileLink)
  const requestTitles = request?.media?.map(el => el.commentByPerformer)
  const requestComments = request?.media?.map(el => el.commentByClient)

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
          <PhotoAndFilesSlider
            withoutFiles
            isHideCounter
            showPreviews
            customSlideHeight={215}
            files={request?.product?.images}
          />
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
              <PhotoAndFilesSlider
                withoutFiles
                showPreviews
                files={requestMedia}
                photosTitles={requestTitles}
                photosComments={requestComments}
              />
            </div>
            <div className={cx(styles.filesList)}>
              <Typography>{t(TranslationKey.Files)}</Typography>
              <PhotoAndFilesSlider withoutPhotos files={requestMedia} />
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
      {/* <div className={styles.suggestDeal}> */}
      {/*   <OpenInNewTab onClickOpenNewTab={() => onClickOpenNewTab(request?._id)} /> */}

      {/*   {onClickSuggest ? <Button onClick={onClickSuggest}>{t(TranslationKey["Suggest a deal"])}</Button> : <div />} */}
      {/* </div> */}
      <FreelanceRequestDetailsModalControls
        isRequestOwner={isRequestOwner}
        request={request}
        onClickSuggest={onClickSuggest}
        onClickOpenNewTab={onClickOpenNewTab}
        onClickPublishBtn={onClickPublishBtn}
        onClickEditBtn={onClickEditBtn}
        onClickCancelBtn={onClickCancelBtn}
        onToggleUploadedToListing={onToggleUploadedToListing}
        onRecoverRequest={onRecoverRequest}
        onClickAbortBtn={onClickAbortBtn}
      />
    </Modal>
  )
}
