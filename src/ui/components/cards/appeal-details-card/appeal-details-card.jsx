import { Avatar } from 'antd'

import { Grid, Rating } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { UserLink } from '@components/user/user-link'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './appeal-details-card.style'

export const AppealDetailsCard = () => {
  const { classes: styles } = useStyles()

  return (
    <Grid item className={styles.mainWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.leftBlockWrapper}>
          <div>
            <p>{'Обращение от клиента Вася'}</p>
            <div className={styles.cardTitleBlockHeaderWrapper}>
              <p className={styles.cardTitle}>{'Причина обращения'}</p>
              <p className={styles.cardDescription}>{'Текст обращения'}</p>
            </div>
          </div>
          <SlideshowGallery
            files={[
              'http://www.rosphoto.com/images/u/articles/1510/7_5.jpg',
              'https://s0.rbk.ru/v6_top_pics/media/img/5/46/756038770746465.jpg',
            ]}
          />
          <div className={styles.timeOnReviewWrapper}>
            <p className={styles.timeOnReviewTitle}>{'Жалоба должна быть принята к рассмотрению в течение 48 часов'}</p>
            <p className={styles.timeOnReview}>{'24ч 00мин'}</p>
          </div>
        </div>

        <div className={styles.middleBlockWrapper}>
          <div className={styles.subBlockWrapper}>
            <div className={styles.leftSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <p>{'Дата обращения'}</p>

                <p>{'2.08.22'}</p>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <p>{'Срок'}</p>

                <p>{'3.08.22'}</p>
              </div>
            </div>
            <div className={styles.rightSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <p>{'Статус'}</p>

                <p>{'На проверке'}</p>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <p>{t(TranslationKey['Total price'])}</p>

                <p className={styles.cardPrice}>{toFixedWithDollarSign(22, 2)}</p>
              </div>
            </div>
          </div>

          <div className={styles.usersInfoBlockWrapper}>
            <div className={styles.userInfoWrapper}>
              <p className={styles.userInfoName}>{t(TranslationKey.Client)}</p>
              <div className={styles.userInfo}>
                <Avatar src={''} className={styles.cardImg} />

                <div className={styles.nameWrapper}>
                  <UserLink blackText name={'Вася'} userId={''} />
                  <Rating readOnly value={'5'} />
                </div>
              </div>
            </div>
            <div className={styles.userInfoWrapper}>
              <p className={styles.userInfoName}>{t(TranslationKey.Performer)}</p>
              <div className={styles.userInfo}>
                <Avatar src={''} className={styles.cardImg} />

                <div className={styles.nameWrapper}>
                  <UserLink blackText name={'Исполнитель'} userId={''} />
                  <Rating readOnly value={'5'} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footerWrapper}>
            <p className={styles.timeOnReviewTitle}>{'Время на рассмотрение с момента принятия 48 часов'}</p>
            <Button styleType={ButtonStyle.SUCCESS}>{'Принять к рассмотрению'}</Button>
          </div>
        </div>
      </div>
      <div className={styles.chatWrapper}>
        <p className={styles.inProcess}>{'Тут будет чат'}</p>
      </div>
    </Grid>
  )
}
