import {cx} from '@emotion/css'
import {Button, Checkbox, TableCell, TableRow} from '@mui/material'

import {withStyles} from 'tss-react/mui'

import {TranslationKey} from '@constants/translations/translation-key'

import {isNumber} from '@utils/is-number'
import {t} from '@utils/translations'

import {styles} from './exchange-requests-body-row.style'

const ExchangeRequestsBodyRowRaw = ({item, itemIndex, handlers, selectedRequests, ...restProps}) => {
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
      <TableCell>
        <Checkbox
          color="primary"
          checked={selectedRequests.includes(itemIndex)}
          onChange={() => handlers.onSelectRequest(item, itemIndex)}
        />
      </TableCell>
      {Object.entries(item).map(([key, value], index) => (
        <TableCell key={`${index}${key}-${value}`} className={cx({[classNames.alignRight]: isNumber(value)})}>
          {renderCell(key, value)}
        </TableCell>
      ))}
      <TableCell>
        <Button disableElevation color="primary" variant="contained" onClick={() => handlers.edit(itemIndex)}>
          {t(TranslationKey.Edit)}
        </Button>
      </TableCell>
      <TableCell>
        <Button disableElevation onClick={() => handlers.close(itemIndex)}>
          {t(TranslationKey.Close)}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export const ExchangeRequestsBodyRow = withStyles(ExchangeRequestsBodyRowRaw, styles)
