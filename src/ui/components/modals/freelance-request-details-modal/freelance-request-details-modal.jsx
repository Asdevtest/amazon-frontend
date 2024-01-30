import { memo } from 'react'

import { Typography } from '@mui/material'

import { freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Modal } from '@components/shared/modal'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { checkIsMediaFileLink } from '@utils/checks'
import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './freelance-request-details-modal.style'

import { FreelanceRequestDetailsModalControls } from './freelance-request-details-modal-controls'

export const FreelanceRequestDetailsModal = memo(props => {
  const {
    userInfo,
    request,
    details,
    requestProposals,
    isAcceptedProposals,
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
    onClickMarkAsCompletedBtn,
    onClickResultBtn,
  } = props
  const { classes: styles, cx } = useStyles()
  const requestMedia = request?.media?.filter(el => checkIsMediaFileLink(el.fileLink))
  const requestPhotos = requestMedia?.map(el => el.fileLink)
  const requestTitles = requestMedia?.map(el => el.commentByPerformer)
  const requestComments = requestMedia?.map(el => el.commentByClient)
  const requestDocuments = request?.media.map(el => el.fileLink)

  return (
    <Modal openModal={isOpenModal} setOpenModal={handleOpenModal}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerDetails}>
            <Typography>
              {t(TranslationKey.ID)}: {request?.humanFriendlyId}
            </Typography>
            <Typography className={styles.textBold}>
              <span>{getShortenStringIfLongerThanCount(request?.title, 55)}</span>
            </Typography>
          </div>
          <div className={styles.headerDetails}>
            <div className={styles.flexContainer}>
              <Typography className={styles.headerText}>{t(TranslationKey['Request type'])}</Typography>
              <Typography className={cx(styles.headerText, styles.textBold)}>
                {freelanceRequestTypeTranslate(request?.spec?.title)}
              </Typography>
            </div>

            <div className={styles.flexContainer}>
              <Typography className={styles.headerText}>{t(TranslationKey['Request creator'])}:</Typography>
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
            </div>
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
                <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={request?.product.asin} />
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
                  customSlideHeight={75}
                  files={requestPhotos}
                  photosTitles={requestTitles}
                  photosComments={requestComments}
                />
              </div>
              <div className={styles.filesList}>
                <Typography>{t(TranslationKey.Files)}</Typography>
                <PhotoAndFilesSlider withoutPhotos customSlideHeight={75} files={requestDocuments} />
              </div>
            </div>
          </div>

          <div className={styles.requestInfo}>
            <div className={styles.requestInfoWrapper}>
              <div className={styles.category}>
                <Typography className={styles.categoryTitle}>{t(TranslationKey['Request terms'])}</Typography>
                <RequestTermsList request={request} />
              </div>

              {details?.conditions && (
                <div className={styles.category}>
                  <Typography className={styles.categoryTitle}>{t(TranslationKey.Description)}</Typography>
                  <CustomTextEditor readOnly editorClassName={styles.editorWrapper} value={details?.conditions} />
                </div>
              )}
            </div>

            <div className={styles.buttonsWrapper}>
              <Button disabled={!requestProposals} onClick={() => onClickResultBtn(request)}>
                {t(TranslationKey.Result)}
              </Button>

              {isRequestOwner && (
                <Button
                  border
                  outlined
                  className={styles.listingButton}
                  onClick={() => onToggleUploadedToListing(request?._id, request?.uploadedToListing)}
                >
                  <Checkbox checked={request?.uploadedToListing} className={styles.listingButton}>
                    <p className={styles.listingText}>{t(TranslationKey['Uploaded by on listing'])}</p>
                  </Checkbox>
                </Button>
              )}
            </div>
          </div>
        </div>

        <FreelanceRequestDetailsModalControls
          userInfo={userInfo}
          isRequestOwner={isRequestOwner}
          isAcceptedProposals={isAcceptedProposals}
          request={request}
          onClickSuggest={onClickSuggest}
          onClickOpenNewTab={onClickOpenNewTab}
          onClickPublishBtn={onClickPublishBtn}
          onClickEditBtn={onClickEditBtn}
          onClickCancelBtn={onClickCancelBtn}
          onRecoverRequest={onRecoverRequest}
          onClickAbortBtn={onClickAbortBtn}
          onClickMarkAsCompletedBtn={onClickMarkAsCompletedBtn}
        />
      </div>
    </Modal>
  )
})
