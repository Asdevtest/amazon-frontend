

import Typography from '@mui/material/Typography'

import { requestPriority } from '@constants/requests/request-priority'
import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { OrderCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { RequestTermsList } from '@components/requests-and-request-proposals/requests/request-terms-list'
import { Button } from '@components/shared/buttons/button'
import { UserLink } from '@components/user/user-link'

import { getDistanceBetweenDatesInSeconds } from '@utils/date-time'
import { t } from '@utils/translations'
import { translateProposalsLeftMessage } from '@utils/validation'

import { useStyles } from './vacant-request-list-card.style'

export const VacantRequestListCard = ({ item, onClickViewMore, onDoubleClick, isFirst }) => {
  const { classes: styles, cx } = useStyles()

  const getCardClassName = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS) {
      return styles.redBackground
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS * 2) {
      return styles.yellowBackground
    }
  }

  /* const getDeadlineColor = timeoutAt => {
    if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS) {
      return styles.redColor
    } else if (getDistanceBetweenDatesInSeconds(timeoutAt) <= ONE_DAY_IN_SECONDS * 2) {
      return styles.yellowColor
    }
  } */

  return (
    <div
      className={cx(styles.cardWrapper, getCardClassName(item.timeoutAt))}
      onDoubleClick={() => onDoubleClick(item._id)}
    >
      <div className={styles.cardTitleBlockWrapper}>
        <div className={styles.cardTitleBlockHeaderWrapper}>
          <div className={styles.titleWrapper}>
            <Typography className={styles.cardTitle}>{item.title}</Typography>
            <Typography className={styles.cardTitle}>{`/ ${t(TranslationKey.ID)} ${item.humanFriendlyId}`}</Typography>
          </div>
          <div className={styles.requestInfoWrapper}>
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

            <div className={styles.productInfo}>
              <OrderCell withoutSku imageSize={'small'} product={item.product} />
            </div>
          </div>
        </div>
        <div className={styles.cardTitleBlockFooterWrapper}>
          <Typography className={styles.cardSubTitle}>
            {translateProposalsLeftMessage(
              item?.maxAmountOfProposals - item?.countProposalsByStatuses?.acceptedProposals,
              item?.maxAmountOfProposals,
            )}
          </Typography>
          {/* <Typography className={styles.cardSubTitle}> */}
          {/*   {t(TranslationKey.Updated)}: <span>{formatNormDateTimeWithParseISO(item.updatedAt)}</span> */}
          {/* </Typography> */}
        </div>
      </div>

      <div className={styles.requestTermsWrapper}>
        <RequestTermsList request={item} />
      </div>

      <div className={styles.controls}>
        <div className={styles.buttonWrapper}>
          <div className={styles.priorityWrapper}>
            {Number(item?.priority) === requestPriority.urgentPriority && (
              <img className={styles.priorityIcon} src="/assets/icons/fire.svg" />
            )}
          </div>
          <Button
            tooltipInfoContent={isFirst && t(TranslationKey['Open detailed information about the request'])}
            variant="contained"
            color="primary"
            className={styles.actionButton}
            onClick={() => onClickViewMore(item._id)}
          >
            {t(TranslationKey.Details)}
          </Button>
        </div>
      </div>
    </div>
  )
}
