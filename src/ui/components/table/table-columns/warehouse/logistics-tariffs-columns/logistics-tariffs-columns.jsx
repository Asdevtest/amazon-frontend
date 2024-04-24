import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextAlignLeftCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  WarehouseTariffDatesCell,
  WarehouseTariffDestinationCell,
  WarehouseTariffRatesCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const logisticsTariffsColumns = (handlers, isArchive) => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Tariff name'])} />,

    width: 165,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,

    width: 290,
    renderCell: params => <MultilineTextAlignLeftCell text={params.value} />,
  },

  {
    field: 'destination',
    headerName: t(TranslationKey.Region),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Region)} />,

    renderCell: () => <WarehouseTariffDestinationCell />,
    width: 150,
    filterable: false,
    sortable: false,
  },

  {
    field: 'inYuansRates',
    headerName: t(TranslationKey.Rate) + ', ¥',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', ¥'} />,

    renderCell: params => <WarehouseTariffRatesCell inYuans conditionsByRegion={params.row.conditionsByRegion} />,
    width: 95,
    filterable: false,
    sortable: false,
  },

  {
    field: 'rates',
    headerName: t(TranslationKey.Rate) + ', $',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Rate) + ', $'} />,

    renderCell: params => <WarehouseTariffRatesCell conditionsByRegion={params.row.conditionsByRegion} />,
    width: 95,
    filterable: false,
    sortable: false,
  },

  {
    field: 'dates',
    headerName: t(TranslationKey.Dates),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,

    renderCell: params => (
      <WarehouseTariffDatesCell cls={params.row?.cls} etd={params.row?.etd} eta={params.row?.eta} />
    ),
    width: 323,
    filterable: false,
    sortable: false,
  },

  {
    field: 'deliveryTimeInDay',
    headerName: t(TranslationKey['Time on the road, days']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Time on the road, days'])} />,

    type: 'number',
    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'minWeightInKg',
    headerName: t(TranslationKey['Min. weight, kg']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Min. weight, kg'])} />,

    type: 'number',
    width: 120,
    renderCell: params => <MultilineTextCell text={params.value} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,

    width: 145,
    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        isThirdButton
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        firstButtonTooltipText={t(TranslationKey.Edit)}
        firstButtonElement={<EditOutlinedIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonTooltipText={t(TranslationKey['Move to archive'])}
        secondButtonElement={isArchive ? '/assets/icons/arrow-up.svg' : '/assets/icons/arrow-down.svg'}
        secondButtonStyle={isArchive ? ButtonStyle.SUCCESS : ButtonStyle.PRIMARY}
        thirdButtonTooltipText={t(TranslationKey.Remove)}
        thirdButtonElement={<DeleteOutlineOutlinedIcon />}
        thirdButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => handlers.onClickEditBtn(params.row.originalData)}
        onClickSecondButton={() => handlers.onTriggerArchive(params.row.originalData)}
        onClickThirdButton={() => handlers.onClickRemoveBtn(params.row.originalData)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    renderCell: params => <NormDateCell value={params.value} />,
    width: 120,
  },
]
