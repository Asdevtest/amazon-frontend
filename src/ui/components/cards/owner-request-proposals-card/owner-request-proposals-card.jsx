import Rating from '@mui/material/Rating'

import React, {useState} from 'react'

import {Typography, Avatar} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {Button} from '@components/buttons/button'
import {UserLinkCell} from '@components/data-grid-cells/data-grid-cells'
import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './owner-request-proposals-card.style'

export const OwnerRequestProposalsCard = ({
  item,
  onClickContactWithExecutor,
  onClickAcceptProposal,
  onClickRejectProposal,
}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  return (
    <div className={classNames.cardMainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.userInfoMainWrapper}>
          <div className={classNames.userWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Avatar src={getUserAvatarSrc(item.proposal.createdBy._id)} className={classNames.cardImg} />

              <div className={classNames.userNameWrapper}>
                <UserLinkCell name={item.proposal.createdBy.name} userId={item.proposal.createdBy._id} />

                <UserLinkCell name={'Отзывы'} userId={item.proposal.createdBy._id} />
              </div>

              <Rating disabled className={classNames.userRating} value={item.proposal.createdBy.rating} />
            </div>

            <Typography className={classNames.successDeals}>{`Количество общих успешных сделок: n/a`}</Typography>
          </div>

          <div className={classNames.proposalDescriptionWrapper}>
            <Typography className={classNames.proposalDescription}>{item.proposal.comment}</Typography>

            {item.proposal.linksToMediaFiles.length ? (
              <div className={classNames.photoWrapper}>
                <Field
                  multiline
                  inputComponent={
                    <Carousel autoPlay={false} timeout={100} animation="fade">
                      {item.proposal.linksToMediaFiles.map((el, index) => (
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
                  }
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className={classNames.timeInfoWrapper}>
          <div className={classNames.timeItemInfoWrapper}>
            <Typography className={classNames.cardTime}>{`Время на выполнение: `}</Typography>

            <Typography>{minsToTime(item.proposal.execution_time)}</Typography>
          </div>

          <div className={classNames.timeItemInfoWrapper}>
            <Typography className={classNames.cardPrice}>{'Стоимость'}</Typography>

            <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.proposal.price, 2)}</Typography>
          </div>
        </div>
      </div>

      <div className={classNames.cardFooter}>
        <Typography>{item.proposal.status}</Typography>

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
                {'Отклонить'}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={clsx(classNames.actionButton, classNames.successBtn)}
                onClick={() => onClickAcceptProposal(item.proposal._id)}
              >
                {`Заказать за ${toFixedWithDollarSign(item.proposal.price)}`}
              </Button>
            </>
          ) : undefined}

          <Button
            variant="contained"
            color="primary"
            className={classNames.actionButton}
            onClick={() => onClickContactWithExecutor(item.proposal)}
          >
            {'Связаться с исполнителем'}
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
