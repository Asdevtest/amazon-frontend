import { cx } from '@emotion/css'

import { Paper, Typography } from '@mui/material'

import { mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'

import { toFixedWithDollarSign } from '@utils/text'

import { useClassNames } from './product-request-details.style'

export const ProductSearchRequestDetails = ({ request }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Paper>
      <div className={classNames.root}>
        <Typography variant="h3">{'productTitle'}</Typography>

        <Typography variant="h5">{`Заявка # ${request._id}`}</Typography>

        <div className={classNames.requestDataWrapper}>
          <div className={classNames.row}>
            <div className={classNames.leftColumn}>
              <Typography className={classNames.columnHead}>{'parameterFieldTypo'}</Typography>
            </div>
            <div className={classNames.rightHeadColumn}>
              <Typography className={classNames.columnHead}>{'valueFieldTypo'}</Typography>
            </div>
          </div>

          <div className={classNames.defaultBlock}>
            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableBudgetField'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{toFixedWithDollarSign(request.budget, 2)}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableTargetDateField'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.deadline}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'Price of proposal'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.budget / request.amountOfProposals || 0}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'Amount of proposals'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.amountOfProposals || 0}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'Max amount of proposals'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.maxAmountOfProposals || 0}</Typography>
              </div>
            </div>
          </div>

          <div className={classNames.defaultBlock}>
            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableStrategyField'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{mapProductStrategyStatusEnum[request.strategy]}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableMonthlySalesField'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.monthlySales}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableMinProductsField'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.minProductInProposals}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableMinKeywordsField'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.minKeywords}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableAmazonPriceField'}</Typography>
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
                <Typography>{'tableAverageBsrField'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{`from ${request.minBSR} to ${request.maxBSR}`}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableAverageReviewsField'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{`from ${request.minReviews} to ${request.maxReviews}`}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'tableAverageRevenueField'}</Typography>
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
                <Typography>{'tableNotesField'}</Typography>
              </div>
              <div className={cx(classNames.rightColumn, classNames.clientComment)}>
                <Typography>{request.clientComment}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'formCheckboxForbidLabel'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.checkboxForbid ? 'ДА' : 'НЕТ'}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'formCheckboxNoPayLabel'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.checkboxNoPay ? 'ДА' : 'НЕТ'}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'formCheckboxNoCheckLabel'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.checkboxNoCheck ? 'ДА' : 'НЕТ'}</Typography>
              </div>
            </div>

            <div className={classNames.row}>
              <div className={classNames.leftColumn}>
                <Typography>{'formCheckboxNoPurchasedProducts'}</Typography>
              </div>
              <div className={classNames.rightColumn}>
                <Typography>{request.checkboxNoCheck ? 'ДА' : 'НЕТ'}</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}
