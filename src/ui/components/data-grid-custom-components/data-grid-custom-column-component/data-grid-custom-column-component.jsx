import {
  GridColumnMenu,
  GridColumnMenuContainer, // GridFilterMenuItem,
  // SortGridMenuItems,
  // HideGridColMenuItem,
  // GridColumnsMenuItem,
} from '@mui/x-data-grid'

import {IsFormedMenuItem, OrderStatusMenuItem, ShopMenuItem} from '../data-grid-menu-items/data-grid-menu-items'

export const DataGridCustomColumnMenuComponent = props => {
  const {hideMenu, currentColumn, isFormedData, orderStatusData, shopsDataBase, ...other} = props

  // const renderStandartItems = () => (
  //   <div>
  //     <SortGridMenuItems column={currentColumn} onClick={hideMenu} />
  //     <GridFilterMenuItem column={currentColumn} onClick={hideMenu} />
  //     <HideGridColMenuItem column={currentColumn} onClick={hideMenu} />
  //     <GridColumnsMenuItem column={currentColumn} onClick={hideMenu} />
  //   </div>
  // )

  if (currentColumn.field === 'isFormed') {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <IsFormedMenuItem isFormedData={isFormedData} />
        {/* {renderStandartItems()} */}
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.field === 'orderStatus') {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <OrderStatusMenuItem orderStatusData={orderStatusData} />
        {/* {renderStandartItems()} */}
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.field === 'shops') {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ShopMenuItem shopsDataBase={shopsDataBase} />
        {/* {renderStandartItems()} */}
      </GridColumnMenuContainer>
    )
  }

  return <GridColumnMenu hideMenu={hideMenu} currentColumn={currentColumn} {...other} />
}
