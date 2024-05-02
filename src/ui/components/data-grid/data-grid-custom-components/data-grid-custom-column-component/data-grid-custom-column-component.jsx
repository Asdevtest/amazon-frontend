import { GridColumnMenu } from '@mui/x-data-grid'

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
import { NumbersColumnMenu } from '../data-grid-menu-items/numbers-column-menu/numbers-column-menu'

import { CustomMenuContainer } from './components'

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
    isHaveBarCodeFilterData,
  } = props

  const currentColumn = colDef

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_IN_STOCK_IS_FORMED) {
    return (
      <CustomMenuContainer {...props}>
        <IsFormedMenuItem
          isFormedData={isFormedData}
          data={props.sub}
          field="sub"
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          columnKey={currentColumn.columnKey}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.INVENTORY_PURCHASE_QUANTITY) {
    return (
      <CustomMenuContainer {...props}>
        <IsNeedPurchaseFilterMenuItem
          isNeedPurchaseFilterData={
            currentColumn?.field === 'purchaseQuantity' ? props.isNeedPurchaseFilterData : props.isNeedRefillFilterData
          }
          data={props}
          defaultOption={currentColumn?.defaultOption}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.INVENTORY_BARCODE) {
    return (
      <CustomMenuContainer {...props}>
        <IsHaveBarCodeFilterMenuItem isHaveBarCodeFilterData={isHaveBarCodeFilterData} />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.PRODUCT_ORDERS_STATUS) {
    return (
      <CustomMenuContainer {...props}>
        <OrderStatusMenuItem orderStatusData={orderStatusData} />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.MY_REQUESTS_ORDERS_STATUS) {
    return (
      <CustomMenuContainer {...props}>
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
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.freelancer.FREELANCE_REQUESTS_CONFIRMATION) {
    return (
      <CustomMenuContainer {...props}>
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
      </CustomMenuContainer>
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
      <CustomMenuContainer {...props}>
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
      </CustomMenuContainer>
    )
  }

  if (
    [
      columnnsKeys.client.FREELANCE_REQUESTS_CREATED_BY,
      columnnsKeys.freelancer.FREELANCE_PROPOSALS_CREATED_BY,
    ].includes(currentColumn.columnKey)
  ) {
    return (
      <CustomMenuContainer {...props}>
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
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.buyer.MY_ORDERS_STATUS].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <ClientOrderAllStatusesMenuItem orderStatusData={orderStatusData} />
      </CustomMenuContainer>
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
    const isTagsColumn = currentColumn.columnKey === columnnsKeys.shared.TAGS

    return (
      <CustomMenuContainer {...props}>
        <ObJectFieldMenuItem
          addNullObj={[
            columnnsKeys.client.WAREHOUSE_IN_STOCK_SHOPS,
            columnnsKeys.client.INVENTORY_SHOPS,
            columnnsKeys.shared.TAGS,
          ].includes(currentColumn.columnKey)}
          nullObjName={isTagsColumn ? t(TranslationKey.Empty) : undefined}
          nullObjKey={isTagsColumn ? 'title' : 'name'}
          data={props[currentColumn.field]}
          field={currentColumn.field}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.client.IDEA_SHOPS].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <IdeaShopsFieldMenuItem
          data={props}
          field={['parentProductShop', 'childProductShop']}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.RED_FLAGS) {
    return (
      <CustomMenuContainer {...props}>
        <RedFlagsCellMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.BOXES_STATUS) {
    return (
      <CustomMenuContainer {...props}>
        <BoxestatusMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
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
      columnnsKeys.admin.STRATEGY_STATUS,
      columnnsKeys.shared.TASK_COMPLEXITY,
    ].includes(currentColumn.columnKey)
  ) {
    return (
      <CustomMenuContainer {...props}>
        <NormalFieldMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          columnKey={currentColumn.columnKey}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (
    [
      columnnsKeys.client.WAREHOUSE_IN_STOCK_PRODUCT,
      columnnsKeys.client.INVENTORY_PRODUCT,
      columnnsKeys.client.SHOP_REPORT,
    ].includes(currentColumn.columnKey)
  ) {
    const isShopReportColumn = currentColumn.columnKey === columnnsKeys.client.SHOP_REPORT

    return (
      <CustomMenuContainer {...props}>
        <ProductMenuItem
          withoutTitle={isShopReportColumn}
          skuOption={isShopReportColumn}
          field={currentColumn.field}
          data={props}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.shared.DATE_DETAILS].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <DateDetailsMenuItem
          field={currentColumn.field}
          data={props}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (
    [
      columnnsKeys.shared.BATCHES_PRODUCTS,
      columnnsKeys.freelancer.FREELANCER_VACANT_REQUEST_PRODUCT,
      columnnsKeys.client.SHOP_REPORT,
    ].includes(currentColumn.columnKey)
  ) {
    return (
      <CustomMenuContainer {...props}>
        <ProductMenuItem
          withoutSku
          data={props}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS) {
    return (
      <CustomMenuContainer {...props}>
        <OrderOrItemMenuItem
          data={props}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION) {
    return (
      <CustomMenuContainer {...props}>
        <DestinationMenuItem
          data={props}
          filterRequestStatus={filterRequestStatus}
          onClose={hideMenu}
          onClickFilterBtn={onClickFilterBtn}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.shared.DATE].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <FromToDateMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.shared.BATCHES_SHIPPING_DATE].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <BatchShippingDateCellMenuItem
          data={props}
          field={currentColumn.field}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.shared.BATCHES_TRACKING].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <BatchTrackingCellMenuItem
          data={props}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.client.WAREHOUSE_ID, columnnsKeys.shared.QUANTITY].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <NumberFieldMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.shared.SECONDS].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <SecondsCellMenuItem
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.buyer.TO_PAY) {
    return (
      <CustomMenuContainer {...props}>
        <ToPayCellMenuItem
          data={props}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.client.INVENTORY_IN_STOCK].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <InStockMenuItem
          data={props?.amountInBoxes}
          field={'amountInBoxes'}
          defaultOption={currentColumn?.defaultOption}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.client.FREELANCE_REQUEST_TYPE].includes(currentColumn.columnKey)) {
    return (
      <CustomMenuContainer {...props}>
        <FreelanceRequestType
          data={props[currentColumn.field]}
          field={currentColumn.field}
          filterRequestStatus={filterRequestStatus}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </CustomMenuContainer>
    )
  }

  if ([columnnsKeys.shared.NUMBERS].includes(currentColumn.columnKey)) {
    return (
      <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} {...other}>
        <NumbersColumnMenu
          filtersData={props}
          fields={currentColumn.fields}
          table={currentColumn.table}
          filterRequestStatus={filterRequestStatus}
          defaultOption={currentColumn?.defaultOption}
          onClickFilterBtn={onClickFilterBtn}
          onClose={hideMenu}
          onChangeFullFieldMenuItem={onChangeFullFieldMenuItem}
          onClickAccept={onClickAccept}
        />
      </GridColumnMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.client.FREELANCER_REQUEST_LISTING) {
    return (
      <CustomMenuContainer {...props}>
        <OnListingCellMenuItem data={props} onClose={hideMenu} />
      </CustomMenuContainer>
    )
  }

  if (currentColumn.columnKey === columnnsKeys.shared.YES_NO) {
    const menuItemSettings = {
      yesCustomText: t(TranslationKey.Yes),
      noCustomText: t(TranslationKey.No),
    }

    if (currentColumn.field === 'children') {
      menuItemSettings.yesCustomText = t(TranslationKey.Variation)
      menuItemSettings.noCustomText = t(TranslationKey.Parent)
    }

    return (
      <CustomMenuContainer {...props}>
        <YesNoCellMenuItem data={props} {...menuItemSettings} field={currentColumn.field} onClose={hideMenu} />
      </CustomMenuContainer>
    )
  }

  return <GridColumnMenu {...props} />
}
