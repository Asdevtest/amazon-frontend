import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import React from 'react'

import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = observer(({item, itemIndex, handlers}) => {
  const {classes: classNames} = useClassNames()
  return (
    <TableRow key={item.asin} hover>
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
      <TableCell className={classNames.indexCell}>
        <div className={classNames.infoBtnWrapper}>
          <Button
            tooltipInfoContent={t(TranslationKey['Assign the task of finding a supplier to Bayer'])}
            className={classNames.infoBtn}
            onClick={() => handlers.onClickTableRowBtn(item)}
          >
            {t(TranslationKey['Get to work'])}
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
})
