/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './idea-supplier-cell.style'

interface IdeaSupplierCellProps {
  suppliers: any
  onClickAddSupplier: () => void
}

export const IdeaSupplierCell: FC<IdeaSupplierCellProps> = React.memo(({ onClickAddSupplier, suppliers }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.ideaSupplier}>
      {!!suppliers.length && <p>{suppliers[0].name}</p>}
      {!suppliers.length && (
        <Button success className={styles.buttonWithIcon} onClick={onClickAddSupplier}>
          <PlusIcon /> {t(TranslationKey.Add)}
        </Button>
      )}
    </div>
  )
})
