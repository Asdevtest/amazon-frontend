import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './table-body-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').buyerReadyToCheckBodyRow

export const TableBodyRow = observer(({item, itemIndex, handlers}) => {
  const classNames = useClassNames()
  return (
    <TableRow key={item.asin} hover>
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
      <TableCell className={classNames.indexCell}>
        <Button className={classNames.infoBtn} onClick={() => handlers.onClickTableRowBtn(item)}>
          {textConsts.goToWorkBtn}
        </Button>
      </TableCell>
    </TableRow>
  )
})
