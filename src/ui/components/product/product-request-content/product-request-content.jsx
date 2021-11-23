import React from 'react'

import {Typography, Paper} from '@material-ui/core'
import clsx from 'clsx'

import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'

import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './product-request-content.style'

// import {Table} from '@components/table'

export const ProductSearchRequestContent = ({request}) => {
  const classNames = useClassNames()

  // const [collapsed, setCollapsed] = useState(false)
  // const [deliveryType, setDeliveryType] = useState(false)

  return (
    <Paper>
      <div className={classNames.root}>
        <Typography variant="h5">{`Заявка # ${request._id}`}</Typography>

        <div className={classNames.requestDataWrapper}>
          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography className={classNames.columnHead}>{'Параметр'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography className={classNames.columnHead}>{'Значение'}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Strategy'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{mapProductStrategyStatusEnum[request.strategy]}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Monthly Sales'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.monthlySales}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Budget'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{toFixedWithDollarSign(request.budget, 2)}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Min products'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.minProductInProposals}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Min keywords'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.minKeywords}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Amazone price'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{`from ${toFixedWithDollarSign(request.minAmazonPrice, 2)} to ${toFixedWithDollarSign(
                request.maxAmazonPrice,
                2,
              )}`}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Average BSR'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{`from ${request.minBSR} to ${request.maxBSR}`}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Average reviews'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{`from ${request.minReviews} to ${request.maxReviews}`}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Average revenue'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{`from ${toFixedWithDollarSign(request.minRevenue, 2)} to ${toFixedWithDollarSign(
                request.maxRevenue,
                2,
              )}`}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Notes'}</Typography>
            </div>
            <div className={clsx(classNames.rightColumn, classNames.clientComment)}>
              <Typography>{request.clientComment}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{'Target date'}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.deadline}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>
                {`Запрещено добавлять товары которые когда либо были проданы либо 
                опубликованы на площадке по данной стратегии`}
              </Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.checkboxForbid ? 'ДА' : 'НЕТ'}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>
                {` Запрещено добавлять ниши которые когда либо были проданы либо опубликованы 
                на площадке по данной стратегии`}
              </Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.checkboxNoPay ? 'ДА' : 'НЕТ'}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{`Сотрудники платформы будут участвовать в проверке качества предложения`}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.checkboxNoCheck ? 'ДА' : 'НЕТ'}</Typography>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}
