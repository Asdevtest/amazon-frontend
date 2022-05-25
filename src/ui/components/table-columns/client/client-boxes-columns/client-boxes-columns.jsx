import React from 'react'

import {texts} from '@constants/texts'
import {TranslationKey} from '@constants/translations/translation-key'

import {
  ChangeChipCell,
  NormDateCell,
  OrderCell,
  OrderManyItemsCell,
  renderFieldValueCell,
  ShortBoxDimensions,
  SuperboxQtyCell,
  ToFixedWithDollarSignCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {t} from '@utils/translations'

const textConsts = getLocalizedTexts(texts, 'ru').clientBoxesTableColumns

export const clientBoxesViewColumns = handlers => [
  {
    field: 'isDraft',
    headerName: '',
    renderCell: params => (params.value ? 'isDraft' : 'OK'),
    width: 60,
    type: 'boolean',
  },

  {
    field: 'humanFriendlyId',
    headerName: textConsts.boxIdField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 50,
  },

  {
    field: 'orders',
    headerName: t(TranslationKey.Product),
    width: 400,
    renderCell: params =>
      params.row.originalData.items.length > 1 ? (
        <OrderManyItemsCell box={params.row.originalData} />
      ) : (
        <OrderCell
          product={params.row.originalData.items[0].product}
          superbox={params.row.originalData.amount > 1 && params.row.originalData.amount}
        />
      ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'qty',
    headerName: t(TranslationKey.Quantity),
    renderCell: params =>
      params.row.originalData.amount > 1 ? (
        <SuperboxQtyCell qty={params.row.qty} superbox={params.row.originalData.amount} />
      ) : (
        renderFieldValueCell(params.value)
      ),
    width: 110,
    type: 'number',
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Warehouse),
    renderCell: params => renderFieldValueCell(params.value),
    width: 160,
  },

  {
    field: 'amazonPrice',
    headerName: t(TranslationKey['Total price']),
    renderCell: params => <ToFixedWithDollarSignCell value={params.value} fix={2} />,
    width: 120,
    type: 'number',
  },

  {
    field: 'fbaShipment',
    headerName: 'FBA SHIPMENT/Shipping Label',
    renderCell: params => (
      <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <ChangeChipCell
          row={params.row.originalData}
          value={params.row.shippingLabel}
          text={'Set Shipping Label'}
          onClickChip={handlers.onClickShippingLabel}
          onDoubleClickChip={handlers.onDoubleClickShippingLabel}
          onDeleteChip={handlers.onDeleteShippingLabel}
        />

        <ChangeChipCell
          row={params.row.originalData}
          value={params.row.fbaShipment}
          text={textConsts.fbaShipmentChip}
          onClickChip={handlers.onClickFbaShipment}
          onDoubleClickChip={handlers.onDoubleClickFbaShipment}
          onDeleteChip={handlers.onDeleteFbaShipment}
        />
      </div>
    ),
    minWidth: 250,
    headerAlign: 'center',
  },

  {
    field: 'dimansions',
    headerName: t(TranslationKey.Demensions),
    renderCell: params => (
      <ShortBoxDimensions box={params.row.originalData} volumeWeightCoefficient={params.row.volumeWeightCoefficient} />
    ),
    width: 230,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 110,
    type: 'date',
  },
]
