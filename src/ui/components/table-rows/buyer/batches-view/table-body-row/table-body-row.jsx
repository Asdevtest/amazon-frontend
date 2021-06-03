import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'

export const TableBodyRow = ({item, rowIndex, handlers}) => (
  <TableRow
    selected={handlers.selected}
    onClick={() => handlers.onSelected(rowIndex)}
    onDoubleClick={() => handlers.onDoubleClick(rowIndex)}
  >
    {/* Метод Евгения, пока будем использовать фиксированные клетки 
      {Object.entries(item).map(([ key, value ], index) => (
      <TableCell
        key={`${index}${key}-${value}`}
        // className={clsx({ [classNames.alignRight]: isNumber(value) })}
      >
        {value}
      </TableCell>
    ))} */}

    <TableCell>{item.clientId}</TableCell>
    <TableCell>{item.status}</TableCell>
    <TableCell>{item.created}</TableCell>
    <TableCell>{item.updated}</TableCell>
    <TableCell>{item.destination}</TableCell>
    <TableCell>{item.deliveryMethod}</TableCell>
    <TableCell>{item.trackId}</TableCell>
  </TableRow>
)
