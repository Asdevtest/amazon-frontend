import { Radio } from 'antd'
import { Observer } from 'mobx-react-lite'

import { GridCellParams, GridRowModel } from '@mui/x-data-grid-premium'

import { ProductCell } from '@components/data-grid/data-grid-cells'

import { IStockGood } from '@typings/models/seller-boards/stock-good'
import { IGridColumn } from '@typings/shared/grid-column'

interface IStockGoodsColumns {
  selectedProduct: () => void
  onSelectProduct: (selection: IStockGood) => void
}

export const stockGoodsColumns = ({ selectedProduct, onSelectProduct }: IStockGoodsColumns) => {
  const columns: IGridColumn[] = [
    {
      field: 'radio',
      headerName: '',
      width: 40,
      renderCell: ({ row }: GridRowModel) => {
        return (
          <Observer>
            {() => <Radio checked={row._id === selectedProduct()} onChange={() => onSelectProduct(row)} />}
          </Observer>
        )
      },
      filterable: false,
      sortable: false,
    },
    {
      field: 'asin',
      headerName: '',
      renderCell: (params: GridCellParams) => (
        <ProductCell
          image={params.row?.images?.[0]}
          title={params.row.amazonTitle}
          asin={params.row.asin}
          sku={params.row.skuByClient}
        />
      ),
      flex: 1,
      sortable: false,
      filterable: false,
    },
  ]

  return columns
}
