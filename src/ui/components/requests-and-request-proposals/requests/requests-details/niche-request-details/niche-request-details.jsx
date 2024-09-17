import { Paper } from '@mui/material'

import { toFixedWithDollarSign } from '@utils/text'

import { useStyles } from './niche-request-details.style'

export const NicheSearchRequestDetails = ({ request }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <Paper>
      <div className={styles.root}>
        <h3>{'nicheTitle'}</h3>

        <h5>{`Заявка # ${request._id}`}</h5>

        <div className={styles.requestDataWrapper}>
          <div className={styles.row}>
            <div className={styles.leftColumn}>
              <p className={styles.columnHead}>{'parameterFieldTypo'}</p>
            </div>
            <div className={styles.rightHeadColumn}>
              <p className={styles.columnHead}>{'valueFieldTypo'}</p>
            </div>
          </div>

          <div className={styles.defaultBlock}>
            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableBudgetField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{toFixedWithDollarSign(request.budget, 2)}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableTargetDateField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{request.deadline}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'Price of proposal'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{request.budget / request.amountOfProposals || 0}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'Amount of proposals'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{request.amountOfProposals || 0}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'Max amount of proposals'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{request.maxAmountOfProposals || 0}</p>
              </div>
            </div>
          </div>

          <div className={styles.defaultBlock}>
            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableMonthlySalesField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{request.monthlySales}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableMinProductsField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{request.minProductInProposals}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableMinKeywordsField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{request.minKeywords}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableAmazonPriceField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{`from ${toFixedWithDollarSign(request.minAmazonPrice, 2)} to ${toFixedWithDollarSign(
                  request.maxAmazonPrice,
                  2,
                )}`}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableAverageBsrField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{`from ${request.minBSR} to ${request.maxBSR}`}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableAverageReviewsField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{`from ${request.minReviews} to ${request.maxReviews}`}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableAverageRevenueField'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{`from ${toFixedWithDollarSign(request.minRevenue, 2)} to ${toFixedWithDollarSign(
                  request.maxRevenue,
                  2,
                )}`}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'tableNotesField'}</p>
              </div>
              <div className={cx(styles.rightColumn, styles.clientComment)}>
                <p>{request.clientComment}</p>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.leftColumn}>
                <p>{'formCheckboxFindSupplier'}</p>
              </div>
              <div className={styles.rightColumn}>
                <p>{request.checkboxForbid ? 'ДА' : 'НЕТ'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}
