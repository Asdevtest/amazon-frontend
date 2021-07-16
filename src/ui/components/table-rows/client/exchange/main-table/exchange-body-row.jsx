import {Button, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {texts} from '@constants/texts'

import {SuccessButton} from '@components/buttons/success-button'

import {calcProductPrice} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed, toFixedWithDollarSign} from '@utils/text'

import {styles} from './exchange-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').exchangeBodyRow

const ExchangeBodyRowRaw = ({item, itemIndex, handlers, classes: classNames}) => (
  <TableRow>
    <TableCell>
      <img
        alt=""
        className={classNames.imgCell}
        src={item.images && item.images[0] && getAmazonImageUrl(item.images[0])}
      />
    </TableCell>
    <TableCell>{item.category}</TableCell>
    <TableCell>{toFixedWithDollarSign(item.amazon)}</TableCell>
    <TableCell>{toFixed(item.weight, 2)}</TableCell>
    <TableCell>{item.bsr}</TableCell>
    <TableCell>
      <Button color="primary" onClick={() => handlers.onClickUsername()}>
        {item.createdby.name}
      </Button>
    </TableCell>
    <TableCell>
      <SuccessButton
        onClick={() => {
          handlers.onClickLaunchPrivateLabelBtn(item, itemIndex)
          handlers.onTriggerOpenModal('showConfirmPayModal')
        }}
      >
        {`${textConsts.byForBtn} ${toFixedWithDollarSign(calcProductPrice(item))}`}
      </SuccessButton>
    </TableCell>
  </TableRow>
)

export const ExchangeBodyRow = withStyles(styles)(ExchangeBodyRowRaw)
