/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

interface AddAsinIdeaActionsCellProps {
  row: any
  rowHandlers: {
    onClickAcceptOnAddingAsin: (id: string) => void
  }
}

export const AddAsinIdeaActionsCell: FC<AddAsinIdeaActionsCellProps> = memo(({ rowHandlers, row }) => (
  <Button
    isTableButton
    fullWidth
    styleType={ButtonStyle.SUCCESS}
    disabled={
      row.originalData.variation
        ? !row?.originalData?.childProduct?.barCode
        : !row?.originalData?.parentProduct?.barCode
    }
    onClick={() => rowHandlers.onClickAcceptOnAddingAsin(row._id)}
  >
    {t(TranslationKey.Accept)}
  </Button>
))
