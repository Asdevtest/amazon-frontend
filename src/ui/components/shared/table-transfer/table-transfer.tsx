import { Table, Transfer } from 'antd'
import type { TransferProps } from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'

interface TableTransferProps extends TransferProps<any> {
  leftColumns: any[]
  rightColumns: any[]
}

export const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: TableTransferProps) => (
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

      const rowSelection: TableRowSelection<any> = {
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
          style={{ height: 600 }}
          scroll={{ y: 500 }}
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
)
