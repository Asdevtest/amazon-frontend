/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

interface CreateCardIdeaActionsProps {
  row: any
  rowHandlers: {
    onClickAcceptOnCreatingProduct: (id: string) => void
  }
}

export const CreateCardIdeaActionsCell: FC<CreateCardIdeaActionsProps> = memo(({ rowHandlers, row }) => {
  return (
    <Button
      isTableButton
      fullWidth
      styleType={ButtonStyle.SUCCESS}
      disabled={!row.childProduct && row.variation}
      onClick={() => rowHandlers.onClickAcceptOnCreatingProduct(row._id)}
    >
      {t(TranslationKey.Accept)}
    </Button>
  )
})
