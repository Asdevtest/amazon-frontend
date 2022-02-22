import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {Button} from '@components/buttons/button'

import {toFixed, toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './owner-request-proposals-card.style'

export const OwnerRequestProposalsCard = ({item}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.cardMainWrapper}>
      <div className={classNames.cardWrapper}>
        <div className={classNames.userInfoMainWrapper}>
          <div className={classNames.userWrapper}>
            <div className={classNames.userInfoWrapper}>
              <img src="/assets/img/no-photo.jpg" className={classNames.cardImg} />

              <div className={classNames.userNameWrapper}>
                <Typography>{'Екатерина П.'}</Typography>

                <Typography>{'Отзывы'}</Typography>
              </div>

              <Typography className={classNames.userRating}>{'4.9'}</Typography>
            </div>

            <Typography className={classNames.successDeals}>{`Количество общих успешных сделок: 12`}</Typography>
          </div>

          <Typography className={classNames.proposalDescription}>
            {
              'Добрый вечер,готов приступить к работе.Для начала скажите какой сайт вам нужен?Тот который можно купить под себя или тот на котором вы сможете продавать товары.Если второй вариант есть целая площадка в которой вы можете себя зарегистрировать как ФОП'
            }
          </Typography>
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
    </div>
  )
}
