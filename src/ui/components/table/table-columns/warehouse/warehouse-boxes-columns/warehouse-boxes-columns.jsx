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
  RedFlagsCell,
  UserLinkCell,
  WarehouseBoxesBtnsCell,
} from '@components/data-grid/data-grid-cells'
import { Dimensions } from '@components/shared/dimensions'
import { SizeSwitcher } from '@components/shared/size-switcher'

import { calcFinalWeightForBox } from '@utils/calculation'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getFileNameFromUrl } from '@utils/get-file-name-from-url'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { Entities } from '@hooks/use-dimensions'

export const warehouseBoxesViewColumns = (handlers, getUnitsOption) => [
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
    field: 'asin',
    headerName: t(TranslationKey.Product),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Product)} />,
    valueGetter: ({ row }) =>
      row.originalData.items
        ?.map(
          item =>
            `ASIN: ${item?.product?.asin || t(TranslationKey.Missing)} / SKU: ${
              item?.product?.skuByClient || t(TranslationKey.Missing)
            }`,
        )
        .join(', '),
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
    width: 320,
    filterable: false,

    columnKey: columnnsKeys.client.WAREHOUSE_IN_STOCK_PRODUCT,
  },

  {
    field: 'shippingLabel',
    headerName: `Shipping label / Barcode / ${t(TranslationKey['Transparency codes'])}`,
    renderHeader: () => (
      <MultilineTextHeaderCell text={`Shipping label / Barcode / ${t(TranslationKey['Transparency codes'])}`} />
    ),

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
    valueGetter: ({ row }) => {
      const shippingLabelLink = row?.originalData?.shippingLabel
        ? getAmazonImageUrl(row?.originalData?.shippingLabel, true)
        : t(TranslationKey.Missing)

      return shippingLabelLink
    },
    filterable: false,
    sortable: false,
    width: 280,

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
    field: 'destinationId',
    headerName: t(TranslationKey['Destination and tariff']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Destination and tariff'])} />,
    valueGetter: ({ row }) => `${row.warehouse || ''} / ${row.logicsTariff || ''}`,
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
    width: 150,
    sortable: false,
  },

  {
    field: 'batchHumanFriendlyId',
    headerName: t(TranslationKey.Batch),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Batch)} />,
    valueGetter: ({ row }) => row?.originalData?.batch?.humanFriendlyId || t(TranslationKey['Outside Batch']),
    renderCell: params => (
      <MultilineTextCell
        text={params.row?.originalData?.batch?.humanFriendlyId || t(TranslationKey['Outside Batch'])}
      />
    ),
    type: 'number',
    width: 110,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'dimansions',
    headerName: t(TranslationKey.Dimensions),
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Dimensions)}
        component={<SizeSwitcher condition={getUnitsOption()} onChangeCondition={handlers.onChangeUnitsOption} />}
      />
    ),
    valueGetter: ({ row }) => {
      const box = row.originalData

      const boxFinalWeight = toFixed(calcFinalWeightForBox(box, row.volumeWeightCoefficient), 2)
      return `L:${box?.lengthCmWarehouse}, W:${box?.widthCmWarehouse}, H:${box?.heightCmWarehouse}, FW:${boxFinalWeight}`
    },
    renderCell: params => (
      <Dimensions
        isCell
        isTotalWeight
        data={params.row.originalData}
        sizeSetting={getUnitsOption()}
        calculationField={Entities.WAREHOUSE}
      />
    ),
    width: 210,
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
    renderHeader: () => <MultilineTextHeaderCell text={'PREP ID'} />,

    renderCell: params => (
      <ChangeInputCell
        isString
        maxLength={25}
        rowId={params.row.originalData._id}
        text={params.value}
        onClickSubmit={handlers.onClickSavePrepId}
      />
    ),
    width: 240,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'redFlags',
    headerName: t(TranslationKey['Red flags']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Red flags'])} />,
    renderCell: params => <RedFlagsCell flags={params.row?.originalData?.items?.[0]?.product?.redFlags} />,
    valueGetter: ({ row }) => row?.originalData?.items?.[0]?.product?.redFlags?.map(el => el?.title).join(', '),
    width: 130,
    columnKey: columnnsKeys.shared.RED_FLAGS,
  },
]
