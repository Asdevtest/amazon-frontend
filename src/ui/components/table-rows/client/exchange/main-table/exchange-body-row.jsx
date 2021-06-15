import {Button, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button'
import {StarRating} from '@components/star-rating'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {styles} from './exchange-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').exchangeBodyRow

const ExchangeBodyRowRaw = ({item, itemIndex, handlers, classes: classNames}) => (
  <TableRow>
    <TableCell>
      <img alt="" className={classNames.imgCell} src={item.image} />
    </TableCell>
    <TableCell>{item.category}</TableCell>
    <TableCell>{toFixedWithDollarSign(item.price)}</TableCell>
    <TableCell>{item.amount}</TableCell>
    <TableCell>{item.avgPrice}</TableCell>
    <TableCell>{item.recommendedBatch}</TableCell>
    <TableCell>{item.weight}</TableCell>
    <TableCell>{item.avgBsr}</TableCell>
    <TableCell>{item.avgReviews}</TableCell>
    <TableCell>{item.avgRevenue}</TableCell>
    <TableCell>
      <Button color="primary" onClick={() => handlers.onClickUsername()}>
        {item.researcher.username}
      </Button>
      <StarRating rating={item.researcher.rating} />
    </TableCell>
    <TableCell>{item.startPrice}</TableCell>
    <TableCell>
      <SuccessButton onClick={() => handlers.onClickLaunchPrivateLabelBtn(item, itemIndex)}>
        {textConsts.launchBtn}
      </SuccessButton>
    </TableCell>
    <TableCell>
      <Button
        disableElevation
        color="primary"
        variant="contained"
        onClick={() => handlers.onClickBuyProductBtn(item, itemIndex)}
      >
        {textConsts.priceBtn}
      </Button>
    </TableCell>
  </TableRow>
)

export const ExchangeBodyRow = withStyles(styles)(ExchangeBodyRowRaw)
