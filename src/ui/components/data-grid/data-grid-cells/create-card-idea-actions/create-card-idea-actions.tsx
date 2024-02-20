/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

interface CreateCardIdeaActionsProps {
  row: any
  rowHandlers: {
    onClickAcceptOnCreatingProduct: (id: string) => void
  }
}

export const CreateCardIdeaActionsCell: FC<CreateCardIdeaActionsProps> = memo(({ rowHandlers, row }) => {
  return (
    <Button
      styleType={ButtonType.SUCCESS}
      disabled={!row.childProduct && row.variation}
      onClick={() => rowHandlers.onClickAcceptOnCreatingProduct(row._id)}
    >
      {t(TranslationKey.Accept)}
    </Button>
  )
})
