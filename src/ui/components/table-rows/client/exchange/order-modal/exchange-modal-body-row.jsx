import {NativeSelect, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {Input} from '@components/input'

import {isNumber} from '@utils/is-number'

import {styles} from './exchange-modal-body-row.style'

const ExchangeModalBodyRowRaw = ({item, qty, managerIndex, handlers, ...restProps}) => {
  const classNames = restProps.classes

  const ImgCell = imgSrc => <img alt="" className={classNames.imgCell} src={imgSrc} />

  const ManagersCell = managers => (
    <>
      <NativeSelect input={<Input />} value={managerIndex} onChange={e => handlers.onChangeManager(e)}>
        {managers.map((manager, index) => (
          <option key={index} value={index}>
            {manager}
          </option>
        ))}
      </NativeSelect>
    </>
  )
  const QtyCell = () => (
    <Input className={classNames.input} type="number" value={qty} onChange={e => handlers.onChangeModalQty(e)} />
  )

  const PrivateLabelPriceCell = price => <span className={classNames.privateLabelPrice}>{`$${price}`}</span>

  const renderCell = (key, value) => {
    switch (key) {
      case 'categoryImg':
        return ImgCell(value)
      case 'managers':
        return ManagersCell(value)
      case 'privateLabelPrice':
        return PrivateLabelPriceCell(value)
      case 'qty':
        return QtyCell(value)
      default:
        return value
    }
  }

  return (
    <TableRow>
      {Object.entries(item).map(([key, value], index) => (
        <TableCell key={index + `${key}-${value}`} className={clsx({[classNames.alignRight]: isNumber(value)})}>
          {renderCell(key, value)}
        </TableCell>
      ))}
    </TableRow>
  )
}

export const ExchangeModalBodyRow = withStyles(styles)(ExchangeModalBodyRowRaw)
