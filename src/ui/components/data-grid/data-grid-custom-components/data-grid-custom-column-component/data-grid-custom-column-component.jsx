import { GridColumnMenu, GridColumnMenuContainer } from '@mui/x-data-grid'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import {
  BatchShippingDateCellMenuItem,
  BatchTrackingCellMenuItem,
  BoxestatusMenuItem,
  ClientOrderAllStatusesMenuItem,
  CreatedByMenuItem,
  DateDetailsMenuItem,
  DestinationMenuItem,
  FreelanceRequestType,
  FreelancerToWorkConfirmationMenuItem,
  FromToDateMenuItem,
  IdeaShopsFieldMenuItem,
  InStockMenuItem,
  IsFormedMenuItem,
  IsHaveBarCodeFilterMenuItem,
  IsNeedPurchaseFilterMenuItem,
  MyRequestsStatusMenuItem,
  NormalFieldMenuItem,
  NumberFieldMenuItem,
  ObJectFieldMenuItem,
  OnListingCellMenuItem,
  OrderOrItemMenuItem,
  OrderStatusMenuItem,
  PriorityMenuItem,
  ProductMenuItem,
  RedFlagsCellMenuItem,
  SecondsCellMenuItem,
  ToPayCellMenuItem,
  YesNoCellMenuItem,
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

  if (currentColumn.columnKey === columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <FreelancerToWorkConfirmationMenuItem
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
    [
      columnnsKeys.client.MY_ORDERS_PRIORITY,
      columnnsKeys.client.FREELANCE_REQUESTS_PRIORITY,
      columnnsKeys.buyer.ORDERS_PRIORITY,
    ].includes(currentColumn.columnKey)
  ) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <PriorityMenuItem
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
    [
      columnnsKeys.client.FREELANCE_REQUESTS_CREATED_BY,
      columnnsKeys.freelancer.FREELANCE_PROPOSALS_CREATED_BY,
    ].includes(currentColumn.columnKey)
  ) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <CreatedByMenuItem
          data={props}
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

  if ([columnnsKeys.buyer.MY_ORDERS_STATUS].includes(currentColumn.columnKey)) {
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
      columnnsKeys.shared.TAGS,
    ].includes(currentColumn.columnKey)
  ) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ObJectFieldMenuItem
          addNullObj={[
            columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS,
            columnnsKeys.client.INVENTORY_SHOPS,
            columnnsKeys.shared.TAGS,
          ].includes(currentColumn.columnKey)}
          nullObjName={[columnnsKeys.shared.TAGS].includes(currentColumn.columnKey) && t(TranslationKey.Empty)}
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

  if ([columnnsKeys.client.IDEA_SHOPS].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <IdeaShopsFieldMenuItem
          addNullObj={[columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS, columnnsKeys.client.INVENTORY_SHOPS].includes(
            currentColumn.columnKey,
          )}
          data={props}
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

  if (currentColumn.columnKey === columnnsKeys.shared.RED_FLAGS) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <RedFlagsCellMenuItem
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
      columnnsKeys.client.FREELANCE_REQUEST_TYPE_MY,
      columnnsKeys.client.ORDERS_STATUS,
      columnnsKeys.client.IDEAS_STATUS,
      columnnsKeys.buyer.MY_PRODUCTS_STATUS,
      columnnsKeys.shared.TASK_COMPLEXITY,
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
          field={currentColumn.field}
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

  if ([columnnsKeys.shared.DATE_DETAILS].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <DateDetailsMenuItem
          field={currentColumn.field}
          data={props}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if ([columnnsKeys.shared.BATCHES_PRODUCTS].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ProductMenuItem
          withoutSku
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

  if ([columnnsKeys.shared.BATCHES_SHIPPING_DATE].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <BatchShippingDateCellMenuItem
          data={props}
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

  if ([columnnsKeys.shared.BATCHES_TRACKING].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <BatchTrackingCellMenuItem
          data={props}
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

  if ([columnnsKeys.shared.SECONDS].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <SecondsCellMenuItem
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

  if (currentColumn.columnKey === columnnsKeys.buyer.TO_PAY) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <ToPayCellMenuItem
          data={props}
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

  if (currentColumn.columnKey === columnnsKeys.client.FREELANCER_REQUEST_LISTING) {
    const { ...rest } = other

    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...rest}>
        <OnListingCellMenuItem
          data={props}
          // field={currentColumn.field}
          // filterRequestStatus={filterRequestStatus}
          // onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          // onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          // onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.YES_NO) {
    const { ...rest } = other

    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...rest}>
        <YesNoCellMenuItem data={props} field={currentColumn.field} onClose={hideMenu} />
      </GridColumnMenuContainer>
    )
  }

  return <GridColumnMenu /* hideMenu={hideMenu} currentColumn={currentColumn} */ {...props} />
}
