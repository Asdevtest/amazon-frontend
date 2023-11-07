/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './product-my-requests-btns-cell.style'

interface ProductMyRequestsBtnsCellProps {
  rowId: string
  row: any
  handlers: {
    onClickOpenRequest: (rowId: string) => void
    onClickOpenResult: (rowId: string) => void
  }
}

export const ProductMyRequestsBtnsCell: FC<ProductMyRequestsBtnsCellProps> = React.memo(({ rowId, row, handlers }) => {
  const { classes: styles } = useDataGridCellStyles()

  const disableOpenResultBtn =
    !row.countProposalsByStatuses.acceptedProposals &&
    !row.countProposalsByStatuses.atWorkProposals &&
    !row.countProposalsByStatuses.verifyingProposals

  return (
    <div className={styles.productMyRequestsBtnsWrapper}>
      <Button
        variant="contained"
        color="primary"
        className={styles.productMyRequestsBtn}
        onClick={() => handlers.onClickOpenRequest(rowId)}
      >
        {t(TranslationKey['Open a request'])}
      </Button>
      <Button
        success
        disabled={disableOpenResultBtn}
        className={styles.productMyRequestsBtn}
        onClick={() => handlers.onClickOpenResult(rowId)}
      >
        {t(TranslationKey['Open result'])}
      </Button>
    </div>
  )
})
