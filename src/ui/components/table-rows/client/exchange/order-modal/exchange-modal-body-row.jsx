import {NativeSelect, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {Input} from '@components/input'

import {toFixed, toFixedWithDollarSign} from '@utils/text'

import {styles} from './exchange-modal-body-row.style'

const ExchangeModalBodyRowRaw = ({product, orderFields, setOderField, classes: classNames}) => (
  <TableRow>
    <TableCell>
      <img alt="" className={classNames.imgCell} src={product.images} />
    </TableCell>
    <TableCell>{product.material}</TableCell>
    <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(product.amazon)}</TableCell>
    <TableCell className={classNames.alignRight}>{product.amount}</TableCell>
    <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(product.amazon)}</TableCell>
    <TableCell className={classNames.alignRight}>{toFixed(product.weight, 2)}</TableCell>
    <TableCell className={classNames.alignRight}>{product.bsr}</TableCell>
    <TableCell className={classNames.alignRight}>{product.reviews}</TableCell>
    <TableCell className={classNames.alignRight}>{product.revenue}</TableCell>
    <TableCell className={classNames.alignRight}>{product.createdby.name}</TableCell>
    <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(product.boxprice)}</TableCell>
    <TableCell>
      <NativeSelect input={<Input />} value={orderFields.manager} onChange={setOderField('manager')}>
        {['test1', 'test2'].map((manager, index) => (
          <option key={index} value={index}>
            {manager}
          </option>
        ))}
      </NativeSelect>
    </TableCell>
    <TableCell>
      <Input className={classNames.input} type="number" value={orderFields.amount} onChange={setOderField('amount')} />
    </TableCell>
  </TableRow>
)

export const ExchangeModalBodyRow = withStyles(styles)(ExchangeModalBodyRowRaw)
