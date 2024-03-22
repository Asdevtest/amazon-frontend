import { MultilineTextHeaderCell } from '../multiline-text-header-cell/multiline-text-header-cell'

import { TreeDataGroupingCell, TreeDataGroupingCellProps } from './tree-data-grouping-cell'

export const groupingColDef = (getDataHandler: (productId: string, isDelete?: boolean | undefined) => boolean) => {
  return {
    headerName: 'Hierarchy',
    renderHeader: () => <MultilineTextHeaderCell text="Hierarchy" />,
    renderCell: (params: TreeDataGroupingCellProps) => (
      <TreeDataGroupingCell {...params} onClickButton={getDataHandler} />
    ),
    width: 100,
  }
}
