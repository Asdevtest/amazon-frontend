import { Avatar, Grid } from '@mui/material'
import Rating from '@mui/material/Rating'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Text } from '@components/shared/text'
import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { minsToTime, toFixedWithDollarSign } from '@utils/text'
import { throttle } from '@utils/throttle'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './vacant-deals-list-card.style'

export const VacantDealsListCard = ({ onClickViewMore, showDetails, onClickGetToWorkModal, item }) => {
  const { classes: styles } = useStyles()

  return (
    <Grid item className={styles.mainWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.leftBlockWrapper}>
          <div className={styles.usersInfoBlockWrapper}>
            <div className={styles.userInfoWrapper}>
              <p className={styles.userInfoName}>{t(TranslationKey.Client)}</p>
              <div className={styles.userInfo}>
                <Avatar src={getUserAvatarSrc(item?.request?.createdBy?._id)} className={styles.cardImg} />

                <div className={styles.nameWrapper}>
                  <UserLink blackText name={item?.request?.createdBy?.name} userId={item?.request?.createdBy?._id} />

                  <Rating readOnly value={item?.request?.createdBy?.rating} />
                </div>
              </div>
            </div>
            <div className={styles.userInfoWrapper}>
              <p className={styles.userInfoName}>{t(TranslationKey.Performer)}</p>
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
              <p className={styles.cardTitle}>{item.title}</p>
              <p className={styles.cardDescription}>{item.comment}</p>
            </div>
          </div>
        </div>

        <div className={styles.middleBlockWrapper}>
          <div className={styles.subBlockWrapper}>
            <div className={styles.leftSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <p className={styles.text}>{t(TranslationKey['Time to complete'])}</p>

                <p className={styles.text}>{minsToTime(item.execution_time)}</p>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <p className={styles.text}>{t(TranslationKey.Status)}</p>

                <Text text={MyRequestStatusTranslate(item.status)} color={colorByStatus(item.status)} />
              </div>
            </div>
            <div className={styles.rightSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <p className={styles.text}>{t(TranslationKey.Deadline)}</p>

                <p className={styles.text}>{formatNormDateTime(item.timeoutAt)}</p>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <p className={styles.text}>{t(TranslationKey['Total price'])}</p>

                <p className={styles.cardPrice}>{toFixedWithDollarSign(item.price, 2)}</p>
              </div>
            </div>
          </div>
          <div className={!showDetails ? styles.buttonsWrapper : styles.buttonWrapper}>
            {!showDetails && (
              <Button
                styleType={ButtonStyle.SUCCESS}
                onClick={() => throttle(onClickGetToWorkModal(item._id, item.requestId))}
              >
                {t(TranslationKey['Get to work'])}
              </Button>
            )}

            <Button onClick={() => onClickViewMore(item.requestId, item._id)}>
              {t(TranslationKey['Open a deal'])}
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}
