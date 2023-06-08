import {
  GridColumnMenu,
  GridColumnMenuContainer, // GridColumnMenuFilterItem,
  // GridColumnMenuSortItem,
  // GridColumnMenuHideItem,
  // GridColumnMenuColumnsItem,
} from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'

import {
  ClientOrderAllStatusesMenuItem,
  DestinationMenuItem,
  FromToDateMenuItem,
  InStockMenuItem,
  IsFormedMenuItem,
  IsNeedPurchaseFilterMenuItem,
  NormalFieldMenuItem,
  NumberFieldMenuItem,
  OrderStatusMenuItem,
  ObJectFieldMenuItem,
  OrderOrItemMenuItem,
  ProductMenuItem,
  IsHaveBarCodeFilterMenuItem,
  BoxestatusMenuItem,
  MyRequestsStatusMenuItem,
  FreelanceRequestType,
} from '../data-grid-menu-items/data-grid-menu-items'

export const DataGridCustomColumnMenuComponent = props => {
  const {
    hideMenu,
    colDef,
    isFormedData,
    orderStatusData,
    filterRequestStatus,
    onClickFilterBtn,
    onChangeFullFieldMenuItem,
    onClickAccept,
    isNeedPurchaseFilterData,
    isHaveBarCodeFilterData,
    ...other
  } = props

  // console.log('UPDATE')

  // console.log('currentColumn', currentColumn)
  // console.log('props', props)

  // const renderStandartItems = () => ( // стандартные
  //   <div>
  //     <GridColumnMenuSortItem column={currentColumn} onClick={hideMenu} />
  //     <GridColumnMenuFilterItem column={currentColumn} onClick={hideMenu} />
  //     <GridColumnMenuHideItem column={currentColumn} onClick={hideMenu} />
  //     <GridColumnMenuColumnsItem column={currentColumn} onClick={hideMenu} />
  //   </div>
  // )

  const currentColumn = colDef

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_IN_STOCK_IS_FORMED) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <IsFormedMenuItem
          isFormedData={isFormedData}
          data={props.sub}
          field={'sub'}
          filterRequestStatus={filterRequestStatus}
          columnKey={currentColumn.columnKey}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
        {/* {renderStandartItems()} пример*/}
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.INVENTORY_PURCHASE_QUANTITY) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <IsNeedPurchaseFilterMenuItem
          isNeedPurchaseFilterData={isNeedPurchaseFilterData}
          data={props}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.INVENTORY_BARCODE) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <IsHaveBarCodeFilterMenuItem isHaveBarCodeFilterData={isHaveBarCodeFilterData} />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.PRODUCT_ORDERS_STATUS) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <OrderStatusMenuItem orderStatusData={orderStatusData} />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.MY_REQUESTS_ORDERS_STATUS) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <MyRequestsStatusMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          columnKey={currentColumn.columnKey}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if ([columnnsKeys.buyer.MY_ORDERS_STATUS, columnnsKeys.client.ORDERS_STATUS].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ClientOrderAllStatusesMenuItem orderStatusData={orderStatusData} />
      </GridColumnMenuContainer>
    )
  }

  if (
    [
      columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS,
      columnnsKeys.client.INVENTORY_SHOPS,
      columnnsKeys.shared.OBJECT,
      columnnsKeys.shared.PAYMENTS,
    ].includes(currentColumn.columnKey)
  ) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ObJectFieldMenuItem
          addNullObj={[columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS, columnnsKeys.client.INVENTORY_SHOPS].includes(
            currentColumn.columnKey,
          )}
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.BOXES_STATUS) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <BoxestatusMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (
    [
      columnnsKeys.client.INVENTORY_STRATEGY_STATUS,
      columnnsKeys.client.INVENTORY_STATUS,
      columnnsKeys.client.FREELANCE_MY_REQUESTS,
      columnnsKeys.shared.STRING,
    ].includes(currentColumn.columnKey)
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
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
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
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
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
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
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
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if ([columnnsKeys.client.FREELANCE_REQUEST_TYPE].includes(currentColumn.columnKey)) {
    // eslint-disable-next-line no-unused-vars
    const { typeTask, ...rest } = other
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...rest}>
        <FreelanceRequestType
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  return <GridColumnMenu /* hideMenu={hideMenu} currentColumn={currentColumn} */ {...props} />
}
