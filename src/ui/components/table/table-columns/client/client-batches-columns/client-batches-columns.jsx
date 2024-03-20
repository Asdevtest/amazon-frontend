import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  BatchBoxesCell,
  BatchTrackingCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  ToFixedWithKgSignCell,
  UserLinkCell,
  WarehouseTariffDatesCell,
} from '@components/data-grid/data-grid-cells'
import { DataGridSelectViewProductBatch } from '@components/data-grid/data-grid-custom-components/data-grid-select-view-product-batch'

import { getNewTariffTextForBoxOrOrder, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

export const clientBatchesViewColumns = (rowHandlers, getProductViewMode) => [
  {
    field: 'asin',
    renderHeader: () => (
      <MultilineTextHeaderCell
        text={t(TranslationKey.Product)}
        component={
          <DataGridSelectViewProductBatch
            changeViewModeHandler={rowHandlers?.changeViewModeHandler}
            selectedViewMode={getProductViewMode}
            rootStyles={{ marginLeft: 15, marginRight: 15 }}
          />
        }
      />
    ),
    headerName: t(TranslationKey.Product),
    width: 420,
    renderCell: params => <BatchBoxesCell boxes={params.row.originalData.boxes} productViewMode={getProductViewMode} />,
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.shared.BATCHES_PRODUCTS,
  },

  {
    field: 'title',
    headerName: t(TranslationKey['Batch title']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch title'])} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    width: 150,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Destination),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Destination)} />,
    renderCell: params => <MultilineTextCell text={params.row?.boxes?.[0]?.destination?.name} />,
    width: 130,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'quantityBoxes',
    headerName: t(TranslationKey.Boxes),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Boxes)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 70,
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'humanFriendlyId',
    headerName: t(TranslationKey.ID),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.ID)} />,

    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 80,

    columnKey: columnnsKeys.shared.STRING,
  },

  {
    field: 'storekeeper',
    headerName: t(TranslationKey['Int warehouse']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Int warehouse'])} />,

    renderCell: ({ row }) => <UserLinkCell blackText name={row?.storekeeper?.name} userId={row?.storekeeper?._id} />,
    width: 150,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'logicsTariff',
    headerName: t(TranslationKey.Tariff),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Tariff)} />,

    renderCell: params => {
      return <MultilineTextCell text={getNewTariffTextForBoxOrOrder(params.row.originalData.boxes[0])} />
    },
    width: 160,
    sortable: false,

    columnKey: columnnsKeys.shared.OBJECT,
  },

  {
    field: 'trackingNumber',
    headerName: t(TranslationKey['Batch tracking']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Batch tracking'])} />,
    renderCell: params => (
      <BatchTrackingCell
        disabled
        disableMultilineForTrack
        rowHandlers={rowHandlers}
        id={params.row?.originalData?._id}
        arrivalDate={params.row?.originalData?.arrivalDate}
        trackingNumber={params.row?.originalData?.trackingNumber}
      />
    ),
    width: 198,
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.shared.BATCHES_TRACKING,
  },

  {
    field: 'finalWeight',
    headerName: t(TranslationKey['Final weight']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Final weight'])} />,
    renderCell: params => <ToFixedWithKgSignCell value={params.row.originalData.finalWeight} fix={2} />,

    type: 'number',
    width: 100,

    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'deliveryTotalPrice',
    headerName: t(TranslationKey['Delivery cost']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Delivery cost'])} />,
    renderCell: params => <MultilineTextCell text={toFixedWithDollarSign(params.value, 2)} />,

    type: 'number',
    width: 110,
    sortable: false,
    columnKey: columnnsKeys.shared.QUANTITY,
  },

  {
    field: 'cls',
    headerName: t(TranslationKey['Shipping dates']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Shipping dates'])} />,

    renderCell: params => (
      <WarehouseTariffDatesCell
        cls={params.row.originalData.boxes[0].logicsTariff?.cls}
        etd={params.row.originalData.boxes[0].logicsTariff?.etd}
        eta={params.row.originalData.boxes[0].logicsTariff?.eta}
      />
    ),

    width: 350,
    filterable: false,
    sortable: false,

    columnKey: columnnsKeys.shared.BATCHES_SHIPPING_DATE,
  },

  {
    field: 'updatedAt',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell value={params.value} />,
    width: 130,
    // type: 'date',

    columnKey: columnnsKeys.shared.DATE,
  },
]
