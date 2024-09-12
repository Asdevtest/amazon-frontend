/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

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
        <CustomButton type="primary" size="small" icon={<FiPlus size={16} />} onClick={onClickAddSupplier}>
          {t(TranslationKey.Add)}
        </CustomButton>
      )}
    </div>
  )
})
