/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './product-my-requests-btns-cell.style'

interface ProductMyRequestsBtnsCellProps {
  data: any
  handlers: {
    onClickOpenRequest: (requestId: string) => void
    onClickOpenResult: (data: any) => void
  }
}

export const ProductMyRequestsBtnsCell: FC<ProductMyRequestsBtnsCellProps> = React.memo(({ data, handlers }) => {
  const { classes: styles } = useStyles()

  const disableOpenResultBtn =
    !data.countProposalsByStatuses.acceptedProposals &&
    !data.countProposalsByStatuses.atWorkProposals &&
    !data.countProposalsByStatuses.verifyingProposals

  return (
    <div className={styles.productMyRequestsBtnsWrapper}>
      <Button
        variant="contained"
        color="primary"
        className={styles.productMyRequestsBtn}
        onClick={() => handlers.onClickOpenRequest(data._id)}
      >
        {t(TranslationKey['Open a request'])}
      </Button>
      <Button
        success
        disabled={disableOpenResultBtn}
        className={styles.productMyRequestsBtn}
        onClick={() => handlers.onClickOpenResult(data)}
      >
        {t(TranslationKey['Open result'])}
      </Button>
    </div>
  )
})
