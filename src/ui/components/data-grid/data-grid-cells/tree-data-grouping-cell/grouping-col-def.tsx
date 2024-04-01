import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { MultilineTextHeaderCell } from '../multiline-text-header-cell/multiline-text-header-cell'

import { TreeDataGroupingCell, TreeDataGroupingCellProps } from './tree-data-grouping-cell'

export const groupingColDef = (getDataHandler: (productId: string, isDelete?: boolean | undefined) => boolean) => {
  return {
    headerName: t(TranslationKey.Hierarchy),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Hierarchy)} />,
    renderCell: (params: TreeDataGroupingCellProps) => (
      <TreeDataGroupingCell {...params} onClickButton={getDataHandler} />
    ),
    width: 100,
  }
}
