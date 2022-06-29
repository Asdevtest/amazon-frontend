import {Button, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {TranslationKey} from '@constants/translations/translation-key'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {styles} from './exchange-body-row.style'

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
    <TableCell className={classNames.alignCenter}>{item.fbaamount}</TableCell>
    <TableCell>
      <Button color="primary" onClick={() => handlers.onClickUsername()}>
        {item.createdBy.name}
      </Button>
    </TableCell>
    <TableCell>
      <Button color="primary" onClick={() => handlers.onClickUsername()}>
        {item.buyer ? item.buyer.name : 'N/A'}
      </Button>
    </TableCell>
    <TableCell>
      <Button
        success
        onClick={() => {
          handlers.onClickLaunchPrivateLabelBtn(item, itemIndex)
          handlers.onTriggerOpenModal('showConfirmPayModal')
        }}
      >
        {`${t(TranslationKey['Buy for'])} ${toFixedWithDollarSign(item.priceForClient, 2)}`}
      </Button>
    </TableCell>
  </TableRow>
)

export const ExchangeBodyRow = withStyles(styles)(ExchangeBodyRowRaw)
