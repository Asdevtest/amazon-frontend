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
    <TableCell>{item.material}</TableCell>
    <TableCell>{toFixedWithDollarSign(item.amazon)}</TableCell>
    <TableCell>{toFixedWithDollarSign(item.delivery)}</TableCell>
    <TableCell>{toFixedWithDollarSign(item.amazon)}</TableCell>
    <TableCell>{item.fbaamount}</TableCell>
    <TableCell>{item.weight}</TableCell>
    <TableCell>{item.bsr}</TableCell>
    {/* что за поле */}
    <TableCell>{item.avgReviews}</TableCell>
    <TableCell>{toFixedWithDollarSign(item.profit)}</TableCell>
    <TableCell>
      <Button color="primary" onClick={() => handlers.onClickUsername()}>
        {item.createdby.name}
      </Button>
      {/* что за поле */}
      <StarRating rating={item.createdby.fba} />
    </TableCell>
    {/* что за поле */}
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
        {`${textConsts.priceBtn} ${toFixedWithDollarSign(item.amazon)}`}
      </Button>
    </TableCell>
  </TableRow>
)

export const ExchangeBodyRow = withStyles(styles)(ExchangeBodyRowRaw)
