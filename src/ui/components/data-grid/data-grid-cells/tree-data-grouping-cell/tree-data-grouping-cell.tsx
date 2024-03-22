import { FC, memo, useEffect, useRef } from 'react'

import { ButtonProps } from '@mui/material'
import { GridRenderCellParams, useGridApiContext } from '@mui/x-data-grid-premium'

import { Button } from '@components/shared/button'
import { ArrowDownIcon, ArrowUpIcon } from '@components/shared/svg-icons'

import { useStyles } from './tree-data-grouping-cell.style'

export interface TreeDataGroupingCellProps extends GridRenderCellParams {
  onClickButton: (productId: string, isDelete?: boolean) => boolean
}

export const TreeDataGroupingCell: FC<TreeDataGroupingCellProps> = memo(props => {
  const { classes: styles } = useStyles()

  const status = useRef(false)

  const apiRef = useGridApiContext()
  const { id, field, rowNode, row } = props

  const handleClick: ButtonProps['onClick'] = async event => {
    if (rowNode.type === 'group' && rowNode.childrenExpanded) {
      apiRef.current.setRowChildrenExpansion(id, false)
      apiRef.current.setCellFocus(id, field)
      status.current = false
      props?.onClickButton(props?.row?._id, true)
    } else {
      const isDataExist = await props?.onClickButton(props?.row?._id)

      if (isDataExist) {
        status.current = true
      }
    }

    event.stopPropagation()
  }

  useEffect(() => {
    if (rowNode.type === 'group' && !rowNode.childrenExpanded && rowNode.children?.length > 0 && status.current) {
      apiRef.current.setRowChildrenExpansion(id, true)
      apiRef.current.setCellFocus(id, field)
    }
  }, [rowNode])

  return (
    <div className={styles.wrapper}>
      {rowNode.parent === 'auto-generated-group-node-root' && row?.hasChildren ? (
        <Button iconButton onClick={handleClick}>
          {!status.current ? <ArrowDownIcon /> : <ArrowUpIcon />}
        </Button>
      ) : (
        '-'
      )}
    </div>
  )
})
