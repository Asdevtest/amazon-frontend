import { Avatar, Grid, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'

import { TranslationKey } from '@constants/translations/translation-key'

import { RequestStatusCell } from '@components/data-grid/data-grid-cells/data-grid-cells'
import { Button } from '@components/shared/buttons/button'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './vacant-deals-list-card.style'

export const VacantDealsListCard = ({ onClickViewMore, showDetails, onClickGetToWorkModal, item }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.leftBlockWrapper}>
          <div className={classNames.usersInfoBlockWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Client)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={getUserAvatarSrc(item?.request?.createdBy?._id)} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink blackText name={item?.request?.createdBy?.name} userId={item?.request?.createdBy?._id} />

                  <Rating readOnly value={item?.request?.createdBy?.rating} />
                </div>
              </div>
            </div>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Performer)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={getUserAvatarSrc(item?.createdBy?._id)} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink blackText name={item?.createdBy?.name} userId={item?.createdBy?._id} />

                  <Rating readOnly value={item?.createdBy?.rating} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={classNames.cardTitleBlockHeaderWrapper}>
              <Typography className={classNames.cardTitle}>{item.title}</Typography>
              <Typography className={classNames.cardDescription}>{item.comment}</Typography>
            </div>
          </div>
        </div>

        <div className={classNames.middleBlockWrapper}>
          <div className={classNames.subBlockWrapper}>
            <div className={classNames.leftSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography className={classNames.text}>{t(TranslationKey['Time to complete'])}</Typography>

                <Typography className={classNames.text}>{minsToTime(item.execution_time)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography className={classNames.text}>{t(TranslationKey.Status)}</Typography>

                <RequestStatusCell status={item.status} />
              </div>
            </div>
            <div className={classNames.rightSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography className={classNames.text}>{t(TranslationKey.Deadline)}</Typography>

                <Typography className={classNames.text}>{formatNormDateTime(item.timeoutAt)}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography className={classNames.text}>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={classNames.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>
              </div>
            </div>
          </div>
          <div className={!showDetails ? classNames.buttonsWrapper : classNames.buttonWrapper}>
            {!showDetails && (
              <Button
                success
                // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={classNames.actionButton}
                onClick={() => onClickGetToWorkModal(item._id, item.requestId)}
              >
                {t(TranslationKey['Get to work'])}
              </Button>
            )}

            <Button
              // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
              variant="contained"
              color="primary"
              className={classNames.actionButton}
              onClick={() => onClickViewMore(item.requestId, item._id)}
            >
              {t(TranslationKey['Open a deal'])}
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}
