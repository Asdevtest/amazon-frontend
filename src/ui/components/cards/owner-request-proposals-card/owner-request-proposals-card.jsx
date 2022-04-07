import Rating from '@mui/material/Rating'

import React, {useState} from 'react'

import {Typography, Avatar} from '@material-ui/core'
import clsx from 'clsx'
import Carousel from 'react-material-ui-carousel'

import {Button} from '@components/buttons/button'
import {Field} from '@components/field/field'
import {BigImagesModal} from '@components/modals/big-images-modal'

import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {toFixed, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './owner-request-proposals-card.style'

export const OwnerRequestProposalsCard = ({item}) => {
  const classNames = useClassNames()

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [], imgIndex: 0})

  console.log('item', item)

  return (
    <div className={classNames.cardMainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.userInfoMainWrapper}>
          <div className={classNames.userWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Avatar src={getUserAvatarSrc(item.proposal.createdBy._id)} className={classNames.cardImg} />

              <div className={classNames.userNameWrapper}>
                <Typography>{item.proposal.createdBy.name}</Typography>

                <Typography>{'Отзывы'}</Typography>
              </div>

              <Rating disabled className={classNames.userRating} value={item.proposal.createdBy.rating} />
            </div>

            <Typography className={classNames.successDeals}>{`Количество общих успешных сделок: n/a`}</Typography>
          </div>

          <div className={classNames.proposalDescriptionWrapper}>
            <Typography className={classNames.proposalDescription}>{item.details.comment}</Typography>

            {item.details.linksToMediaFiles.length ? (
              <div className={classNames.photoWrapper}>
                <Field
                  multiline
                  containerClasses={classNames.conditionsFieldWrapper}
                  inputComponent={
                    <Carousel autoPlay={false} timeout={100} animation="fade">
                      {item.details.linksToMediaFiles.map((el, index) => (
                        <div key={index}>
                          <img
                            alt=""
                            className={classNames.imgBox}
                            src={el}
                            onClick={() => {
                              setShowImageModal(!showImageModal)
                              setBigImagesOptions({images: item.details.linksToMediaFiles, imgIndex: index})
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

            <Typography>{`${toFixed(item.proposal.execution_time / 60, 2)} часов `}</Typography>
          </div>

          <div className={classNames.timeItemInfoWrapper}>
            <Typography className={classNames.cardPrice}>{'Стоимость'}</Typography>

            <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.proposal.price, 2)}</Typography>
          </div>
        </div>
      </div>

      <div className={classNames.cardFooter}>
        <Typography>{'Ожидает выбора'}</Typography>

        <div>
          <Button variant="contained" color="primary" className={clsx(classNames.actionButton, classNames.cancelBtn)}>
            {'Отклонить'}
          </Button>
          <Button variant="contained" color="primary" className={clsx(classNames.actionButton, classNames.successBtn)}>
            {`Заказать за ${toFixedWithDollarSign(item.proposal.price)}`}
          </Button>

          <Button variant="contained" color="primary" className={classNames.actionButton}>
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
