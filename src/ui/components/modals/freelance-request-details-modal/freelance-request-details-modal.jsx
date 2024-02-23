import { memo } from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { CustomTextEditor } from '@components/shared/custom-text-editor'
import { Modal } from '@components/shared/modal'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UserLink } from '@components/user/user-link'

import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

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
  const requestMedia = request?.media?.map(el => ({
    fileLink: el.fileLink,
    commentByPerformer: el.commentByPerformer,
    commentByClient: el.commentByClient,
    _id: el._id,
  }))

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
              <Typography className={cx(styles.headerText, styles.textBold)}>{request?.spec?.title}</Typography>
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
            <SlideshowGallery files={request?.product?.images} slidesToShow={3} />

            <div className={styles.category}>
              {request?.product.asin && (
                <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={request?.product.asin} />
              )}
              {request?.product.skuByClient && (
                <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={request?.product.skuByClient} />
              )}
              {request?.product.amazonTitle && (
                <Typography>{getShortenStringIfLongerThanCount(request?.product.amazonTitle, 40)}</Typography>
              )}
            </div>

            <div className={styles.category}>
              <Typography className={styles.categoryTitle}>{t(TranslationKey.Files)}</Typography>

              <SlideshowGallery files={requestMedia} slidesToShow={2} />
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
                  variant={ButtonVariant.OUTLINED}
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
