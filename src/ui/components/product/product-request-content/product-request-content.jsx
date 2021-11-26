import React from 'react'

import {Typography, Paper} from '@material-ui/core'
import clsx from 'clsx'

import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './product-request-content.style'

// import {Table} from '@components/table'
const textConsts = getLocalizedTexts(texts, 'en').productSearchRequestContent

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
              <Typography className={classNames.columnHead}>{textConsts.parameterFieldTypo}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography className={classNames.columnHead}>{textConsts.valueFieldTypo}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableStrategyField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{mapProductStrategyStatusEnum[request.strategy]}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableMonthlySalesField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.monthlySales}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableBudgetField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{toFixedWithDollarSign(request.budget, 2)}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableMinProductsField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.minProductInProposals}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableMinKeywordsField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.minKeywords}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableAmazonPriceField}</Typography>
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
              <Typography>{textConsts.tableAverageBsrField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{`from ${request.minBSR} to ${request.maxBSR}`}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableAverageReviewsField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{`from ${request.minReviews} to ${request.maxReviews}`}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableAverageRevenueField}</Typography>
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
              <Typography>{textConsts.tableNotesField}</Typography>
            </div>
            <div className={clsx(classNames.rightColumn, classNames.clientComment)}>
              <Typography>{request.clientComment}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableTargetDateField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.deadline}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableForbidProductField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.checkboxForbid ? 'ДА' : 'НЕТ'}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableForbidNicheField}</Typography>
            </div>
            <div className={classNames.rightColumn}>
              <Typography>{request.checkboxNoPay ? 'ДА' : 'НЕТ'}</Typography>
            </div>
          </div>

          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography>{textConsts.tableExaminationQualityField}</Typography>
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
