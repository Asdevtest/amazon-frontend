import React from 'react'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ChangeInputCell,
  DownloadAndPrintFilesCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  OrderCell,
  OrderManyItemsCell,
  OrdersIdsItemsCell,
  ShortBoxDimensions,
  UserLinkCell,
  WarehouseBoxesBtnsCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { t } from '@utils/translations'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'

export const warehouseBoxesViewColumns = (handlers, getUser, getUnitsOption) => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey['Box ID']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Box ID'])} />,
    type: 'number',
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 120,
    columnKey: columnnsKeys.client.WAREHOUSE_ID,
  },

  {
    field: 'orderIdsItems',
    headerName: t(TranslationKey['№ Order/ № Item']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,

    renderCell: params => <OrdersIdsItemsCell value={params.value} />,
    width: 160,
    sortable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    width: 380,
    renderCell: params => {
      return params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          box={params.row.originalData}
          product={params.row.originalData.items[0]?.product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
        />
      )
    },
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_PRODUCT,
  },

  {
    field: 'shippingLabel',
    headerName: 'Shipping label/Barcode',
    renderHeader: () => <MultilineTextHeaderCell text={'Shipping label / Barcode'} />,

    width: 250,
    renderCell: params => (
      <DownloadAndPrintFilesCell
        files={[
          {
            title: 'Shipping label',
            fileUrl: params.row.originalData.shippingLabel,
            fileName: getFileNameFromUrl(params.row.originalData.shippingLabel).name,
            fileType: getFileNameFromUrl(params.row.originalData.shippingLabel).type,
          },
          {
            title: 'Barcode',
            fileUrl: params.row.originalData.items[0].barCode ?? params.row.originalData.items[0].product.barCode,
            fileName: getFileNameFromUrl(
              params.row.originalData.items[0].barCode ?? params.row.originalData.items[0].product.barCode,
            ).name,
            fileType: getFileNameFromUrl(
              params.row.originalData.items[0].barCode ?? params.row.originalData.items[0].product.barCode,
            ).type,
          },
        ]}
      />
    ),
    filterable: false,
    sortable: false,

    // columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_PRODUCT,
  },

  {
    field: 'amount',
    headerName: t(TranslationKey.Quantity),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Quantity)} />,

    renderCell: params => (
      // params.row.originalData.amount > 1 ? (
      //   <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
      // ) : (
      <MultilineTextCell text={params.value * params.row.originalData.amount} />
    ),
    // )
    width: 110,
    type: 'number',
    sortable: false,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey['Destination and tariff']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Destination and tariff'])} />,

    renderCell: params => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', width: '100%' }}>
        <MultilineTextCell text={params.row.warehouse} />
        <MultilineTextCell text={params.row.logicsTariff} />
      </div>
    ),
    width: 170,
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_DESTINATION,
  },

  {
    field: 'client',
    headerName: t(TranslationKey.Client),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,

    renderCell: params => <UserLinkCell blackText name={params.value} userId={params.row.originalData.client?._id} />,
    width: 200,
    sortable: false,
  },

  {
    field: 'batchId',
    headerName: t(TranslationKey.Batch),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Batch)} />,

    renderCell: params => <MultilineTextCell text={params.value} noTextText={t(TranslationKey['Outside Batch'])} />,
    type: 'number',
    width: 110,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'dimansions',
    headerName: t(TranslationKey.Dimensions),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Dimensions)}
        component={
          <CustomSwitcher
            condition={getUnitsOption()}
            nameFirstArg={unitsOfChangeOptions.EU}
            nameSecondArg={unitsOfChangeOptions.US}
            firstArgValue={unitsOfChangeOptions.EU}
            secondArgValue={unitsOfChangeOptions.US}
            changeConditionHandler={handlers.onChangeUnitsOption}
          />
        }
      />
    ),

    renderCell: params => (
      <ShortBoxDimensions
        isShipping
        box={params.row.originalData}
        volumeWeightCoefficient={params.row.volumeWeightCoefficient}
        curUser={getUser()?.role}
        handlers={handlers}
        unitsOption={getUnitsOption()}
      />
    ),
    width: 230,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 230,

    renderCell: params => (
      <WarehouseBoxesBtnsCell
        row={params.row.originalData}
        handlers={handlers}
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'prepId',
    headerName: 'PREP ID',
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={'PREP ID'}
        // isShowIconOnHover={onHover && params.field && onHover === params.field}
        // isFilterActive={columnMenuSettings?.[params.field]?.currentFilterData?.length}
      />
    ),

    renderCell: params => (
      <ChangeInputCell
        maxLength={25}
        rowId={params.row.originalData._id}
        text={params.value}
        onClickSubmit={handlers.onClickSavePrepId}
      />
    ),
    width: 240,

    columnKey: columnnsKeys.shared.STRING,
  },
]
