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
  DestinationMenuItem,
  FromToDateMenuItem,
  InStockMenuItem,
  IsFormedMenuItem,
  IsNeedPurchaseFilterMenuItem,
  NormalFieldMenuItem,
  NumberFieldMenuItem, // OrderStatusMenuItem,
  ObJectFieldMenuItem,
  OrderOrItemMenuItem,
  ProductMenuItem,
} from '../data-grid-menu-items/data-grid-menu-items'

export const DataGridCustomColumnMenuComponent = props => {
  const {
    hideMenu,
    currentColumn,
    isFormedData,
    orderStatusData,
    filterRequestStatus,
    onClickFilterBtn,
    onChangeFullFieldMenuItem,
    onClickObjectFieldMenuItem,
    onClickNormalFieldMenuItem,
    onClickAccept,
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

  if (
    [columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS, columnnsKeys.client.INVENTORY_SHOPS].includes(
      currentColumn.columnKey,
    )
  ) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ObJectFieldMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onClickObjectFieldMenuItem={onClickObjectFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (
    [columnnsKeys.client.INVENTORY_STRATEGY_STATUS, columnnsKeys.client.INVENTORY_STATUS].includes(
      currentColumn.columnKey,
    )
  ) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <NormalFieldMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          columnKey={currentColumn.columnKey}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onClickNormalFieldMenuItem={onClickNormalFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (
    [columnnsKeys.client.WAREHOUSE_IN_STOCK_PRODUCT, columnnsKeys.client.INVENTORY_PRODUCT].includes(
      currentColumn.columnKey,
    )
  ) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ProductMenuItem
          data={props}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickNormalFieldMenuItem={onClickNormalFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <OrderOrItemMenuItem
          data={props}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickNormalFieldMenuItem={onClickNormalFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <DestinationMenuItem
          data={props}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickObjectFieldMenuItem={onClickObjectFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if ([columnnsKeys.shared.DATE].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <FromToDateMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onClickNormalFieldMenuItem={onClickNormalFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if ([columnnsKeys.client.WAREHOUSE_ID, columnnsKeys.shared.QUANTITY].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <NumberFieldMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onClickNormalFieldMenuItem={onClickNormalFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if ([columnnsKeys.client.INVENTORY_IN_STOCK].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <InStockMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onClickNormalFieldMenuItem={onClickNormalFieldMenuItem}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  return <GridColumnMenu hideMenu={hideMenu} currentColumn={currentColumn} {...other} />
}
