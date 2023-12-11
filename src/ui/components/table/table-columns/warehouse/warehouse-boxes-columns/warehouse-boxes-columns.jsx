import { unitsOfChangeOptions } from '@constants/configs/sizes-settings'
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
  ShortBoxDimensionsCell,
  UserLinkCell,
  WarehouseBoxesBtnsCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { CustomSwitcher } from '@components/shared/custom-switcher'

import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { t } from '@utils/translations'

export const warehouseBoxesViewColumns = (handlers, getUser, getUnitsOption) => [
  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey['Box ID']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Box ID'])} />,
    type: 'number',
    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 80,
    columnKey: columnnsKeys.client.WAREHOUSE_ID,
  },

  {
    field: 'orderIdsItems',
    headerName: t(TranslationKey['№ Order/ № Item']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['№ Order/ № Item'])} />,

    renderCell: params => <OrdersIdsItemsCell value={params.value} />,
    width: 140,
    sortable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_ORDER_IDS_ITEMS,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,

    width: 320,
    renderCell: params => {
      return params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          imageSize={'big'}
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
    headerName: `Shipping label / Barcode / ${t(TranslationKey['Transparency codes'])}`,
    renderHeader: () => (
      <MultilineTextHeaderCell text={`Shipping label / Barcode / ${t(TranslationKey['Transparency codes'])}`} />
    ),

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
          {
            title: t(TranslationKey['Transparency codes']),
            fileUrl: params.row.originalData.items[0].transparencyFile,
            fileName: getFileNameFromUrl(params.row.originalData.items[0].transparencyFile).name,
            fileType: getFileNameFromUrl(params.row.originalData.items[0].transparencyFile).type,
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
    renderCell: params => <MultilineTextCell text={params.value * params.row.originalData.amount} />,
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
    width: 140,
    sortable: false,
  },

  {
    field: 'batchHumanFriendlyId',
    headerName: t(TranslationKey.Batch),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Batch)} />,

    renderCell: params => <MultilineTextCell text={params.value} noText={t(TranslationKey['Outside Batch'])} />,
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
          <div>
            <CustomSwitcher
              condition={getUnitsOption()}
              switcherSettings={[
                { label: () => unitsOfChangeOptions.EU, value: unitsOfChangeOptions.EU },
                { label: () => unitsOfChangeOptions.US, value: unitsOfChangeOptions.US },
              ]}
              changeConditionHandler={handlers.onChangeUnitsOption}
            />
          </div>
        }
      />
    ),

    renderCell: params => (
      <ShortBoxDimensionsCell
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
