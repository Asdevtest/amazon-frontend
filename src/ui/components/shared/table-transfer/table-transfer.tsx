import { Table, Transfer } from 'antd'
import type { TableColumnsType, TransferProps } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'

import { useStyles } from './table-transfer.styles'

interface TableTransferProps extends TransferProps {
  leftColumns: TableColumnsType
  rightColumns: TableColumnsType
  tableHeight?: number
}

export const TableTransfer = ({ leftColumns, rightColumns, tableHeight = 500, ...restProps }: TableTransferProps) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.transferWrapper}>
      <Transfer {...restProps}>
        {({
          direction,
          filteredItems,
          onItemSelectAll,
          onItemSelect,
          selectedKeys: listSelectedKeys,
          disabled: listDisabled,
        }) => {
          const columns = direction === 'left' ? leftColumns : rightColumns
          const rowSelection: TableRowSelection = {
            onSelectAll(selected, selectedRows) {
              const treeSelectedKeys = selectedRows.map(({ key }) => key)
              onItemSelectAll(treeSelectedKeys, selected)
            },
            onSelect({ key }, selected) {
              onItemSelect(key, selected)
            },
            selectedRowKeys: listSelectedKeys,
          }

          return (
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={filteredItems}
              size="small"
              scroll={{ y: tableHeight }}
              onRow={({ key }) => ({
                onClick: () => {
                  if (listDisabled) return
                  onItemSelect(key, !listSelectedKeys.includes(key))
                },
              })}
            />
          )
        }}
      </Transfer>
    </div>
  )
}
