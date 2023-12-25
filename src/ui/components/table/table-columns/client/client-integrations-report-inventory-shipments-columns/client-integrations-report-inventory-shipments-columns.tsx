import { GridRenderCellParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'
import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { t } from '@utils/translations'

export const clientIntegrationsReportInventoryShipmentsColumns = () => [
  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridRenderCellParams<Date>) => <NormDateCell value={params.value} />,
    width: 118,
  },

  {
    field: 'sku',
    headerName: t(TranslationKey.SKU),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.SKU)} />,

    renderCell: (params: GridRenderCellParams) => (
      <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} sku={params.row?.sku} />
    ),
    width: 185,
    sortable: false,
  },

  {
    field: 'shipmentId',
    headerName: 'shipmentId',
    renderHeader: () => <MultilineTextHeaderCell text={'Shipment ID'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 143,
  },

  {
    field: 'referenceId',
    headerName: 'referenceId',
    renderHeader: () => <MultilineTextHeaderCell text={'Reference ID'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 108,
  },

  {
    field: 'dateCreated',
    headerName: 'dateCreated',
    renderHeader: () => <MultilineTextHeaderCell text={'Date created'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
    width: 118,
  },

  {
    field: 'dateUpdated',
    headerName: 'dateUpdated',
    renderHeader: () => <MultilineTextHeaderCell text={'Date updated'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
    width: 118,
  },

  {
    field: 'shipTo',
    headerName: 'shipTo',
    renderHeader: () => <MultilineTextHeaderCell text={'Ship to'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,
  },

  {
    field: 'unitsExpected',
    headerName: 'unitsExpected',
    renderHeader: () => <MultilineTextHeaderCell text={'Units expected'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,
  },

  {
    field: 'status',
    headerName: 'status',
    renderHeader: () => <MultilineTextHeaderCell text={'Status'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 83,
  },

  {
    field: 'scheduledCarrierDeliveryDate',
    headerName: 'scheduledCarrierDeliveryDate',
    renderHeader: () => <MultilineTextHeaderCell text={'Scheduled carrier delivery date'} />,
    renderCell: (params: GridRenderCellParams) => <MultilineTextCell text={params.value} />,
    width: 155,
  },

  {
    field: 'deliveryWindowStart',
    headerName: 'deliveryWindowStart',
    renderHeader: () => <MultilineTextHeaderCell text={'Delivery window start'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
    width: 118,
  },

  {
    field: 'deliveryWindowEnd',
    headerName: 'deliveryWindowEnd',
    renderHeader: () => <MultilineTextHeaderCell text={'Delivery window end'} />,
    renderCell: (params: GridRenderCellParams) => <NormDateCell value={params.value} />,
    width: 118,
  },
]
