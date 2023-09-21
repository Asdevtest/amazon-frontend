import { FC, useState } from 'react'

import { freelanceRequestTypeByCode, freelanceRequestTypeTranslate } from '@constants/statuses/freelance-request-type'
import { TranslationKey } from '@constants/translations/translation-key'

import { AnnouncementModal } from '@components/modals/announcement-modal/announcement-modal'
import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { IService, linksToMediaFilesInterface } from '@typings/master-user'

import { useClassNames } from './service-exchange-list-card.style'

interface CreatedByInterface {
  _id: string
  name: string
}

interface RequestsInterface {
  _id: string
  title: string
  humanFriendlyId: number
  price: number
  status: string
  timeoutAt: string
  createdBy: CreatedByInterface
  updatedAt: string
}

interface ServiceExchangeCardListProps {
  service: IService
  choose: boolean
  order: boolean
  pathname: string
  onClickThumbnail: (data: { images: Array<string | linksToMediaFilesInterface>; imgIndex: number }) => void
  onClickButton: (data: IService) => void
}

export const ServiceExchangeCardList: FC<ServiceExchangeCardListProps> = props => {
  const { service, choose, order, pathname, onClickThumbnail, onClickButton } = props

  const { classes: classNames } = useClassNames()

  const detailDescription =
    service.type === 0
      ? t(TranslationKey.Universal)
      : freelanceRequestTypeTranslate(freelanceRequestTypeByCode[service.type])
  const buttonContent = choose
    ? t(TranslationKey.Choose)
    : order
    ? t(TranslationKey['To order'])
    : t(TranslationKey.Open)

  const isNotMyServices = pathname !== '/freelancer/freelance/my-services'

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }

  return (
    <>
      <div className={classNames.cardWrapper}>
        <PhotoAndFilesSlider
          withoutFiles
          files={service.linksToMediaFiles}
          mainClasses={!service.linksToMediaFiles.length ? classNames.photosWrapper : ''}
        />

        <div className={classNames.titleAndDescriptionWrapper}>
          <p className={classNames.cardTitle}>{service.title}</p>

          <p className={classNames.cardDescription}>{service.description}</p>
        </div>

        <div className={classNames.detailsAndButtonWrapper}>
          {isNotMyServices ? (
            <div className={classNames.detailsWrapper}>
              <div className={classNames.detailsSubWrapper}>
                <p className={classNames.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
                <p className={classNames.detailDescription}>{detailDescription}</p>
              </div>

              <div className={classNames.detailsSubWrapper}>
                <p className={classNames.detailTitle}>{t(TranslationKey.Performer) + ':'}</p>
                <UserLink
                  blackText
                  withAvatar
                  ratingSize="small"
                  name={service.createdBy.name}
                  userId={service.createdBy._id}
                  rating={service.createdBy.rating}
                  customAvatarStyles={{ width: 30, height: 30 }}
                  customStyles={{ fontSize: 14, lineHeight: '17px' }}
                  customRatingClass={{ fontSize: 13, opacity: 1 }}
                />
              </div>
            </div>
          ) : (
            <div className={classNames.detailsWrapperAll}>
              <div className={classNames.detailsSubWrapperAll}>
                <p className={classNames.detailTitle}>{t(TranslationKey['Number of requests']) + ':'}</p>
                <p className={classNames.detailDescription}>{service.requests.length}</p>
              </div>
              <div className={classNames.detailsSubWrapperAll}>
                <p className={classNames.detailTitle}>{t(TranslationKey['Service type']) + ':'}</p>
                <p className={classNames.detailDescription}>{detailDescription}</p>
              </div>
            </div>
          )}

          <div className={classNames.buttonWrapper}>
            <Button success={choose || order} className={classNames.openBtn} onClick={() => onClickButton(service)}>
              {buttonContent}
            </Button>
          </div>
        </div>
      </div>

      <AnnouncementModal
        isOpenModal={isOpenModal}
        service={service}
        choose={choose}
        order={order}
        onOpenModal={handleToggleModal}
        onClickButton={() => onClickButton(service)}
      />
    </>
  )
}
