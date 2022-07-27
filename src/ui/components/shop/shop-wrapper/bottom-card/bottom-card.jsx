import React from 'react'

import {Typography, Paper} from '@material-ui/core'
import {observer} from 'mobx-react'

// import {TranslationKey} from '@constants/translations/translation-key'
// import {Field} from '@components/field'
// import {toFixed} from '@utils/text'
// import {t} from '@utils/translations'
import {useClassNames} from './bottom-card.style'

export const BottomCard = observer(() => {
  const classNames = useClassNames()

  return (
    <React.Fragment>
      <div className={classNames.bottomCardsWrapper}>
        <div className={classNames.topWrapper}>
          <Paper className={classNames.detailsWrapper}>
            <Typography className={classNames.title}>{'Детали магазина'}</Typography>
            <Typography>
              {
                'Этот список предназначен для медийной рекламы и партнёрского бизнеса, созданного в июле 2010 года в нише продуктов питания и напитков. Бизнес состоит из двух сайтов WordPress, на которых размещён информационный контент, рецепты и руководства по покупке, связанные с темами кулинарии и образа жизни. Один из сайтов устарел и рано вошёл в популярную нишу, а у брендов более 3,7 млн ​​подписчиков в социальных сетях. Сайты привлекают значительный трафик из нескольких источников и росли из года в год за последние 6 месяцев.Этот бизнес приносит доход от медийной рекламы (86%) и партнерских отношений (14%). У большого сайта чуть более 3000 бесплатных подписчиков и более 100 платных подписчиков.Для первого веб-сайта трафик поступает в основном из социальных сетей (39,39%), обычного поиска (36,04%) и прямого (20%). В тройку лидеров по трафику входят США (80,19%), Канада (7,79%) и Великобритания (2,33%). Первые три страницы составляют 7,18% от общего трафика сайта, генерируя 3,56%, 1,95% и 1,67% от общего трафика.Для второго веб-сайта трафик поступает в основном из социальных сетей (81,45%), прямого (10,14%) и органического (6,49%). В тройку лидеров по трафику входят США (74,27%), Канада (8,38%) и Австралия (3,75%). Первые три страницы составляют 24,06% от общего трафика сайта, генерируя 13,95%, 5,1% и 5,01% от общего трафика.VA, писатели и видеографы помогают вести бизнес; писатели пишут два электронных письма в неделю; менеджер блога проводит SEO-исследования и публикует контент; Обмен в социальных сетях раньше обрабатывался виртуальными активами, но Продавец экспериментирует с обработкой обмена в социальных сетях самостоятельно.*Подтверждение оплаты для определенных статей доходов доступно только через 2-4 недели после периода, в котором они были заработаны, например, в случае доходов от партнеров, выплачиваемых через PayPal. Проверьте подтверждение доходов аффилированных лиц за предыдущие месяцы, чтобы сопоставить, как они были указаны в отчете о прибылях и убытках.'
              }
            </Typography>
          </Paper>
          <Paper className={classNames.featuresWrapper}>
            <Typography className={classNames.title}>{'Возможности'}</Typography>
          </Paper>
        </div>
        <div className={classNames.bottomWrapper}>
          <Paper className={classNames.bottomCardWrapper}>
            <Typography className={classNames.title}>{'Требуемая работа и навыки'}</Typography>
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <Typography className={classNames.title}>{'Поддержка продавца включает'}</Typography>
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <Typography className={classNames.title}>{'Причины продажи'}</Typography>
          </Paper>
          <Paper className={classNames.bottomCardWrapper}>
            <Typography className={classNames.title}>{'Дополнительная информация'}</Typography>
          </Paper>
        </div>
      </div>
    </React.Fragment>
  )
})
