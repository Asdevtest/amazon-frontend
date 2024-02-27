import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell, MultilineTextCell, MultilineTextHeaderCell, NormDateCell } from '@components/data-grid/data-grid-cells'

import { ButtonStyle } from '@typings/enums/button-style'
import { t } from '@utils/translations'

export const depersonalizedPickColumns = (handlers, isSupervisor) => [
  {
    field: 'number',
    headerName: '№',
    renderHeader: () => <MultilineTextHeaderCell textCenter text={'№'} />,
    renderCell: params => <MultilineTextCell text={params.value} />,
    type: 'number',
    width: 300,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Actions),
    renderHeader: () => <MultilineTextHeaderCell textCenter text={t(TranslationKey.Actions)} />,

    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
        firstButtonTooltipText={
          isSupervisor
            ? t(TranslationKey['Assign a product card to a supervisor'])
            : t(TranslationKey['To assign the order to Byer'])
        }
        firstButtonElement={t(TranslationKey['Get to work'])}
        firstButtonStyle={ButtonStyle.PRIMARY}
        onClickFirstButton={() => handlers.onPickUp(params.row.originalData)}
      />
    ),
    width: 150,
    align: 'center',
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,

    minWidth: 150,
    flex: 1,
    renderCell: params => <NormDateCell value={params.value} />,
    // type: 'date',
  },
]
