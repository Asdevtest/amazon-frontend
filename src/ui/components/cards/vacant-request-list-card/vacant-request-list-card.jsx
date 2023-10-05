import { cx } from '@emotion/css'

import Typography from '@mui/material/Typography'

import { requestPriority } from '@constants/requests/request-priority'
import { TranslationKey } from '@constants/translations/translation-key'

import { OrderCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { Button } from '@components/shared/buttons/button'
import { UserLink } from '@components/user/user-link'

import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useClassNames } from './vacant-request-list-card.style'

export const VacantRequestListCard = ({ item, onClickViewMore, onDoubleClick, isFirst }) => {
  const { classes: classNames } = useClassNames()

  const getCardClassName = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 86400) {
      return classNames.redBackground
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 172800) {
      return classNames.yellowBackground
    }
  }

  /* const getDeadlineColor = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 86400) {
      return classNames.redColor
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= 172800) {
      return classNames.yellowColor
    }
  } */

  return (
    <div
      className={cx(classNames.cardWrapper, getCardClassName(item.timeoutAt))}
      onDoubleClick={() => onDoubleClick(item._id)}
    >
      <div className={classNames.cardTitleBlockWrapper}>
        <div className={classNames.cardTitleBlockHeaderWrapper}>
          <div className={classNames.titleWrapper}>
            <Typography className={classNames.cardTitle}>{item.title}</Typography>
            <Typography className={classNames.cardTitle}>{`/ ${t(TranslationKey.ID)} ${
              item.humanFriendlyId
            }`}</Typography>
          </div>
          <div className={classNames.requestInfoWrapper}>
            <UserLink
              blueText
              withAvatar
              ratingSize="large"
              name={item?.createdBy?.name}
              userId={item?.createdBy?._id}
              rating={item?.createdBy?.rating}
              customAvatarStyles={{ width: 60, height: 60 }}
              customStyles={{ fontSize: 18, lineHeight: '30px' }}
              customRatingClass={{ fontSize: 24, opacity: 1 }}
            />

            <div className={classNames.productInfo}>
              <OrderCell withoutSku imageSize={'small'} product={item.product} />
            </div>
          </div>
        </div>
        <div className={classNames.cardTitleBlockFooterWrapper}>
          <Typography className={classNames.cardSubTitle}>
            {translateProposalsLeftMessage(
              item?.maxAmountOfProposals - item?.countProposalsByStatuses?.acceptedProposals,
              item?.maxAmountOfProposals,
            )}
          </Typography>
          {/* <Typography className={classNames.cardSubTitle}> */}
          {/*   {t(TranslationKey.Updated)}: <span>{formatNormDateTimeWithParseISO(item.updatedAt)}</span> */}
          {/* </Typography> */}
        </div>
      </div>

      <div className={classNames.requestTermsWrapper}>
        <RequestTermsList request={item} />
      </div>

      <div className={classNames.controls}>
        <div className={classNames.buttonWrapper}>
          <div className={classNames.priorityWrapper}>
            {Number(item?.priority) === requestPriority.urgentPriority && (
              <img className={classNames.priorityIcon} src="/assets/icons/fire.svg" />
            )}
          </div>
          <Button
            tooltipInfoContent={isFirst && t(TranslationKey['Open detailed information about the request'])}
            variant="contained"
            color="primary"
            className={classNames.actionButton}
            onClick={() => onClickViewMore(item._id)}
          >
            {t(TranslationKey.Details)}
          </Button>
        </div>
      </div>
    </div>
  )
}
