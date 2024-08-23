/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './idea-supplier-cell.style'

interface IdeaSupplierCellProps {
  suppliers: any
  onClickAddSupplier: () => void
}

export const IdeaSupplierCell: FC<IdeaSupplierCellProps> = memo(({ onClickAddSupplier, suppliers }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.ideaSupplier}>
      {!!suppliers.length && <p>{suppliers[0].name}</p>}
      {!suppliers.length && (
        <Button styleType={ButtonStyle.SUCCESS} onClick={onClickAddSupplier}>
          <FiPlus style={{ width: 16, height: 16 }} />
          {t(TranslationKey.Add)}
        </Button>
      )}
    </div>
  )
})
