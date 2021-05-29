import {Button, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {isNumber} from '@utils/is-number'

import {styles} from './exchange-requests-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').exchangeRequestsBodyRow

const ExchangeRequestsBodyRowRaw = ({item, itemIndex, handlers, ...restProps}) => {
  const classNames = restProps.classes

  const BudgetCell = price => <>{'$' + price.toFixed(2)}</>

  const renderCell = (key, value) => {
    switch (key) {
      case 'budget':
        return BudgetCell(value)

      default:
        return value
    }
  }

  return (
    <TableRow>
      <TableCell>{itemIndex + 1}</TableCell>
      {Object.entries(item).map(([key, value], index) => (
        <TableCell key={`${index}${key}-${value}`} className={clsx({[classNames.alignRight]: isNumber(value)})}>
          {renderCell(key, value)}
        </TableCell>
      ))}
      <TableCell>
        <Button color="primary" onClick={() => handlers.edit(itemIndex)}>
          {textConsts.editBtn}
        </Button>
      </TableCell>
      <TableCell>
        <Button disableElevation color="primary" variant="contained" onClick={() => handlers.close(itemIndex)}>
          {textConsts.closeBtn}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export const ExchangeRequestsBodyRow = withStyles(styles)(ExchangeRequestsBodyRowRaw)
