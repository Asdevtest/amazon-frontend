import Rating from '@mui/material/Rating'

import React, {useState} from 'react'

import {Typography, Avatar} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {
  RequestProposalStatus,
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {BigImagesModal} from '@components/modals/big-images-modal'
import {UserLink} from '@components/user-link'

import {checkIsImageLink} from '@utils/checks'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './owner-request-proposals-card.style'

export const OwnerRequestProposalsCard = ({
  item,
  onClickContactWithExecutor,

  onClickOrderProposal,
  onClickRejectProposal,
}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  return (
    <div className={classNames.cardMainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.userInfoMainWrapper}>
          <div className={classNames.cardContentWrapper}>
            <div className={classNames.cardSubContentWrapper}>
              <div className={classNames.userWrapper}>
                <div className={classNames.userInfoWrapper}>
                  <Avatar src={getUserAvatarSrc(item.proposal.createdBy._id)} className={classNames.cardImg} />

                  <div className={classNames.userNameWrapper}>
                    <UserLink blackText name={item.proposal.createdBy.name} userId={item.proposal.createdBy._id} />
                    <div className={classNames.reviewWrapper}>
                      <UserLink name={t(TranslationKey.Reviews)} userId={item.proposal.createdBy._id} />
                      <Rating disabled className={classNames.userRating} value={item.proposal.createdBy.rating} />
                    </div>
                  </div>
                </div>

                <Typography className={classNames.successDeals}>{`${t(
                  TranslationKey['The number of total successful transactions:'],
                )} n/a`}</Typography>

                <div className={classNames.timeInfoWrapper}>
                  <div className={classNames.timeItemInfoWrapper}>
                    <Typography className={classNames.cardTime}>
                      {t(TranslationKey['Time to complete']) + ':'}
                    </Typography>

                    <Typography className={classNames.cardTimeValue}>
                      {minsToTime(item.proposal.execution_time)}
                    </Typography>
                  </div>

                  <div className={classNames.timeItemInfoWrapper}>
                    <Typography className={classNames.cardPrice}>{t(TranslationKey['Total price']) + ':'}</Typography>

                    <Typography className={classNames.cardPriceValue}>
                      {toFixedWithDollarSign(item.proposal.price, 2)}
                    </Typography>
                  </div>
                </div>
              </div>
              <Typography className={classNames.proposalDescription}>{item.proposal.comment}</Typography>
            </div>
            {item.proposal.linksToMediaFiles.length ? (
              <div className={classNames.photoWrapper}>
                <Carousel autoPlay={false} timeout={100} animation="fade">
                  {item.proposal.linksToMediaFiles
                    ?.filter(el => checkIsImageLink(el))
                    .map((el, index) => (
                      <div key={index} className={classNames.photoSubWrapper}>
                        <img
                          alt=""
                          className={classNames.imgBox}
                          src={el}
                          onClick={() => {
                            setShowImageModal(!showImageModal)
                            setBigImagesOptions({images: item.proposal.linksToMediaFiles, imgIndex: index})
                          }}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className={classNames.cardFooter}>
        <div className={classNames.statusField}>
          <span
            className={classNames.circleIndicator}
            style={{backgroundColor: RequestProposalStatusColor(item.proposal.status)}}
          />
          <Typography>{RequestProposalStatusTranslate(item.proposal.status)}</Typography>
        </div>

        <div>
          {item.proposal.status === RequestProposalStatus.CREATED ||
          item.proposal.status === RequestProposalStatus.OFFER_CONDITIONS_CORRECTED ? (
            <>
              <Button
                variant="contained"
                color="primary"
                className={clsx(classNames.actionButton, classNames.cancelBtn)}
                onClick={() => onClickRejectProposal(item.proposal._id)}
              >
                {t(TranslationKey.Reject)}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={clsx(classNames.actionButton, classNames.successBtn)}
                onClick={() => onClickOrderProposal(item.proposal._id, item.proposal.price)}
              >
                {`${t(TranslationKey['Order for'])} ${toFixedWithDollarSign(item.proposal.price)}`}
              </Button>
            </>
          ) : undefined}

          <Button
            variant="contained"
            color="primary"
            className={classNames.actionButton}
            onClick={() => onClickContactWithExecutor(item.proposal)}
          >
            {t(TranslationKey['Contact the performer'])}
          </Button>
        </div>
      </div>

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  )
}
