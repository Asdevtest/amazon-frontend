import { Avatar, Grid, Rating, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { UserLink } from '@components/user/user-link'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './appeals-list-card.style'

export const AppealsListCard = ({ onClickViewMore }) => {
  const { classes: styles } = useStyles()

  return (
    <Grid item className={styles.mainWrapper}>
      <div className={styles.cardWrapper}>
        <div className={styles.leftBlockWrapper}>
          <div>
            <div className={styles.cardTitleBlockHeaderWrapper}>
              <Typography className={styles.cardTitle}>{'Причина обращения'}</Typography>
              <Typography className={styles.cardDescription}>{'Текст обращения'}</Typography>
            </div>
          </div>
          <div>
            <PhotoAndFilesSlider
              files={[
                'http://www.rosphoto.com/images/u/articles/1510/7_5.jpg',
                'https://s0.rbk.ru/v6_top_pics/media/img/5/46/756038770746465.jpg',
              ]}
            />
          </div>
        </div>

        <div className={styles.middleBlockWrapper}>
          <div className={styles.subBlockWrapper}>
            <div className={styles.leftSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <Typography>{'Дата обращения'}</Typography>

                <Typography>{'2.08.22'}</Typography>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <Typography>{'Срок'}</Typography>

                <Typography>{'3.08.22'}</Typography>
              </div>
            </div>
            <div className={styles.rightSubBlockWrapper}>
              <div className={styles.timeItemInfoWrapper}>
                <Typography>{'Статус'}</Typography>

                <Typography>{'На проверке'}</Typography>
              </div>
              <div className={styles.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={styles.cardPrice}>{toFixedWithDollarSign(22, 2)}</Typography>
              </div>
            </div>
          </div>
          <div className={styles.timeOnReviewWrapper}>
            <Typography className={styles.timeOnReviewTitle}>{'Время на прием к рассмотрению'}</Typography>
            <Typography className={styles.timeOnReview}>{'24ч 00мин'}</Typography>
          </div>
          <div className={styles.footerWrapper}>
            <div className={styles.userInfoWrapper}>
              <Typography className={styles.userInfoName}>{t(TranslationKey.Client)}</Typography>
              <div className={styles.userInfo}>
                <Avatar src={''} className={styles.cardImg} />

                <div className={styles.nameWrapper}>
                  <UserLink blackText name={'Клиент'} userId={''} />

                  <Rating readOnly value={'5'} />
                </div>
              </div>
            </div>
            <Button
              // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
              variant="contained"
              color="primary"
              className={styles.actionButton}
              onClick={() => onClickViewMore()}
            >
              {t(TranslationKey['Open an appeal'])}
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}
