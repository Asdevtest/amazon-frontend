import {
  GridColumnMenu,
  GridColumnMenuContainer, // GridFilterMenuItem,
  // SortGridMenuItems,
  // HideGridColMenuItem,
  // GridColumnsMenuItem,
} from '@mui/x-data-grid'

import {columnnsKeys} from '@constants/data-grid-columns-keys'

import {
  ClientOrderAllStatusesMenuItem,
  IsFormedMenuItem,
  IsNeedPurchaseFilterMenuItem,
  NormalFieldMenuItem, // OrderStatusMenuItem,
  ObJectFieldMenuItem,
} from '../data-grid-menu-items/data-grid-menu-items'

export const DataGridCustomColumnMenuComponent = props => {
  const {
    hideMenu,
    currentColumn,
    isFormedData,
    orderStatusData,
    /* shopsDataBase,  */ isNeedPurchaseFilterData,
    ...other
  } = props

  // console.log('UPDATE')

  // console.log('currentColumn', currentColumn)
  // console.log('props', props)

  // const renderStandartItems = () => ( // стандартные
  //   <div>
  //     <SortGridMenuItems column={currentColumn} onClick={hideMenu} />
  //     <GridFilterMenuItem column={currentColumn} onClick={hideMenu} />
  //     <HideGridColMenuItem column={currentColumn} onClick={hideMenu} />
  //     <GridColumnsMenuItem column={currentColumn} onClick={hideMenu} />
  //   </div>
  // )

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_IN_STOCK_IS_FORMED) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <IsFormedMenuItem isFormedData={isFormedData} />
        {/* {renderStandartItems()} пример*/}
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.INVENTORY_PURCHASE_QUANTITY) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <IsNeedPurchaseFilterMenuItem isNeedPurchaseFilterData={isNeedPurchaseFilterData} />
      </GridColumnMenuContainer>
    )
  }

  // if (currentColumn.columnKey === columnnsKeys.client.ORDERS_STATUS) {
  //   return (
  //     <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
  //       <OrderStatusMenuItem orderStatusData={orderStatusData} />
  //     </GridColumnMenuContainer>
  //   )
  // }

  if ([columnnsKeys.buyer.MY_ORDERS_STATUS, columnnsKeys.client.ORDERS_STATUS].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ClientOrderAllStatusesMenuItem orderStatusData={orderStatusData} />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ObJectFieldMenuItem data={props[currentColumn.field]} field={currentColumn.field} onClose={hideMenu} />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_ID) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <NormalFieldMenuItem data={props[currentColumn.field]} field={currentColumn.field} onClose={hideMenu} />
      </GridColumnMenuContainer>
    )
  }

  return <GridColumnMenu hideMenu={hideMenu} currentColumn={currentColumn} {...other} />
}
