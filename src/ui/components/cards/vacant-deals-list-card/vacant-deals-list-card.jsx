import Rating from '@mui/material/Rating'

import React from 'react'

import {Avatar, Grid, Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
// import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'
import {UserLink} from '@components/user-link'

// import {formatNormDateTime, formatNormDateTimeWithParseISO} from '@utils/date-time'
// import {getUserAvatarSrc} from '@utils/get-user-avatar'
// import {minsToTime, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

// import {translateProposalsLeftMessage} from '@utils/validation'
import {useClassNames} from './vacant-deals-list-card.style'

export const VacantDealsListCard = ({onClickViewMore}) => {
  const classNames = useClassNames()

  return (
    <Grid item className={classNames.mainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.leftBlockWrapper}>
          <div className={classNames.usersInfoBlockWrapper}>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Client)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={''} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink blackText name={'Pete'} userId={'2'} />

                  <Rating disabled value={'3'} />
                </div>
              </div>
            </div>
            <div className={classNames.userInfoWrapper}>
              <Typography className={classNames.userInfoName}>{t(TranslationKey.Performer)}</Typography>
              <div className={classNames.userInfo}>
                <Avatar src={''} className={classNames.cardImg} />

                <div className={classNames.nameWrapper}>
                  <UserLink blackText name={'Pete'} userId={'2'} />

                  <Rating disabled value={'3'} />
                </div>
              </div>
            </div>
          </div>
          <div className={classNames.cardTitleBlockWrapper}>
            <div className={classNames.cardTitleBlockHeaderWrapper}>
              <Typography className={classNames.cardTitle}>{'Вакантная сделка'}</Typography>
              <Typography className={classNames.cardDescription}>{'Описание вакантной сделки'}</Typography>
            </div>
          </div>
        </div>

        <div className={classNames.middleBlockWrapper}>
          <div className={classNames.subBlockWrapper}>
            <div className={classNames.leftSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Time to complete'])}</Typography>

                <Typography>{'Уже поздно'}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Status)}</Typography>

                <Typography className={classNames.statusText}>{'Возьми в работу'}</Typography>
              </div>
            </div>
            <div className={classNames.rightSubBlockWrapper}>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey.Deadline)}</Typography>

                <Typography>{'Уже поздно'}</Typography>
              </div>
              <div className={classNames.timeItemInfoWrapper}>
                <Typography>{t(TranslationKey['Total price'])}</Typography>

                <Typography className={classNames.cardPrice}>{'666ye'}</Typography>
              </div>
            </div>
          </div>
          <div className={classNames.buttonWrapper}>
            <Button
              success
              // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
              variant="contained"
              color="primary"
              className={classNames.actionButton}
              onClick={() => onClickViewMore('2')}
            >
              {t(TranslationKey['Get to work'])}
            </Button>
            <Button
              // tooltipInfoContent={t(TranslationKey['Open detailed information about the request'])}
              variant="contained"
              color="primary"
              className={classNames.actionButton}
              onClick={() => onClickViewMore('2')}
            >
              {t(TranslationKey['Open a deal'])}
            </Button>
          </div>
        </div>
      </div>
    </Grid>
  )
}
