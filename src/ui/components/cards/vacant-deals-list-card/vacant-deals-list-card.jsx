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

import { useStyles } from './vacant-deals-list-card.style'

export const VacantDealsListCard = ({ onClickViewMore, showDetails, onClickGetToWorkModal, item }) => {
  const { classes: styles } = useStyles()

  return (
    <Grid item className={styles.mainWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.leftBlockWrapper}>
          <div className={styles.usersInfoBlockWrapper}>
            <div className={styles.userInfoWrapper}>
              <Typography className={styles.userInfoName}>{t(TranslationKey.Client)}</Typography>
              <div className={styles.userInfo}>
                <Avatar src={getUserAvatarSrc(item?.request?.createdBy?._id)} className={styles.cardImg} />

                <div className={styles.nameWrapper}>
                  <UserLink blackText name={item?.request?.createdBy?.name} userId={item?.request?.createdBy?._id} />

                  <Rating readOnly value={item?.request?.createdBy?.rating} />
                </div>
              </div>
            </div>
            <div className={styles.userInfoWrapper}>
              <Typography className={styles.userInfoName}>{t(TranslationKey.Performer)}</Typography>
              <div className={styles.userInfo}>
                <Avatar src={getUserAvatarSrc(item?.createdBy?._id)} className={styles.cardImg} />

                <div className={styles.nameWrapper}>
                  <UserLink blackText name={item?.createdBy?.name} userId={item?.createdBy?._id} />

                  <Rating readOnly value={item?.createdBy?.rating} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className={styles.cardTitleBlockHeaderWrapper}>
              <Typography className={styles.cardTitle}>{item.title}</Typography>
              <Typography className={styles.cardDescription}>{item.comment}</Typography>
            </div>
          </div>
        </div>

        <div className={styles.middleBlockWrapper}>
          <div className={styles.subBlockWrapper}>
            <div className={styles.leftSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <Typography className={styles.text}>{t(TranslationKey['Time to complete'])}</Typography>

                <Typography className={styles.text}>{minsToTime(item.execution_time)}</Typography>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <Typography className={styles.text}>{t(TranslationKey.Status)}</Typography>

                <RequestStatusCell status={item.status} />
              </div>
            </div>
            <div className={styles.rightSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <Typography className={styles.text}>{t(TranslationKey.Deadline)}</Typography>

                <Typography className={styles.text}>{formatNormDateTime(item.timeoutAt)}</Typography>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <Typography className={styles.text}>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={styles.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</Typography>
              </div>
            </div>
          </div>
          <div className={!showDetails ? styles.buttonsWrapper : styles.buttonWrapper}>
            {!showDetails && (
              <Button
                success
                // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
                variant="contained"
                color="primary"
                className={styles.actionButton}
                onClick={() => onClickGetToWorkModal(item._id, item.requestId)}
              >
                {t(TranslationKey['Get to work'])}
              </Button>
            )}

            <Button
              // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
              variant="contained"
              color="primary"
              className={styles.actionButton}
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
