import { Paper, Typography } from '@mui/material'

import { mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'

import { toFixedWithDollarSign } from '@utils/text'

import { useStyles } from './product-request-details.style'

export const ProductSearchRequestDetails = ({ request }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <Paper>
      <div className={styles.root}>
        <Typography variant="h3">{'productTitle'}</Typography>

        <Typography variant="h5">{`Заявка # ${request._id}`}</Typography>

        <div className={styles.requestDataWrapper}>
          <div className={styles.row}>
            <div className={styles.leftColumn}>
              <Typography className={styles.columnHead}>{'parameterFieldTypo'}</Typography>
            </div>
            <div className={styles.rightHeadColumn}>
              <Typography className={styles.columnHead}>{'valueFieldTypo'}</Typography>
            </div>
          </div>

          <div className={styles.defaultBlock}>
            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableBudgetField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{toFixedWithDollarSign(request.budget, 2)}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableTargetDateField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.deadline}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'Price of proposal'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.budget / request.amountOfProposals || 0}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'Amount of proposals'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.amountOfProposals || 0}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'Max amount of proposals'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.maxAmountOfProposals || 0}</Typography>
              </div>
            </div>
          </div>

          <div className={styles.defaultBlock}>
            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableStrategyField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{mapProductStrategyStatusEnum[request.strategy]}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableMonthlySalesField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.monthlySales}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableMinProductsField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.minProductInProposals}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableMinKeywordsField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.minKeywords}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableAmazonPriceField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{`from ${toFixedWithDollarSign(request.minAmazonPrice, 2)} to ${toFixedWithDollarSign(
                  request.maxAmazonPrice,
                  2,
                )}`}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableAverageBsrField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{`from ${request.minBSR} to ${request.maxBSR}`}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableAverageReviewsField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{`from ${request.minReviews} to ${request.maxReviews}`}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableAverageRevenueField'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{`from ${toFixedWithDollarSign(request.minRevenue, 2)} to ${toFixedWithDollarSign(
                  request.maxRevenue,
                  2,
                )}`}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'tableNotesField'}</Typography>
              </div>
              <div className={cx(styles.rightColumn, styles.clientComment)}>
                <Typography>{request.clientComment}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'formCheckboxForbidLabel'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.checkboxForbid ? 'ДА' : 'НЕТ'}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'formCheckboxNoPayLabel'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.checkboxNoPay ? 'ДА' : 'НЕТ'}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'formCheckboxNoCheckLabel'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.checkboxNoCheck ? 'ДА' : 'НЕТ'}</Typography>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <Typography>{'formCheckboxNoPurchasedProducts'}</Typography>
              </div>
              <div className={styles.rightColumn}>
                <Typography>{request.checkboxNoCheck ? 'ДА' : 'НЕТ'}</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}
