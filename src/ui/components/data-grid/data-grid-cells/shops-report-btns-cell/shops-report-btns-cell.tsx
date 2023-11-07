import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CopyValue } from '@components/shared/copy-value'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './shops-report-btns-cell.style'

interface ShopsReportBtnsCellProps {
  value: string
  onClickSeeMore: () => void
}

export const ShopsReportBtnsCell: FC<ShopsReportBtnsCellProps> = React.memo(({ value, onClickSeeMore }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.shopsReportBtnsWrapper}>
      <a download target="_blank" rel="noreferrer" href={value} className={styles.downloadLink}>
        {t(TranslationKey.download)}
      </a>
      <Button className={styles.copyImgButton}>
        <CopyValue text={value} />
      </Button>

      <Button variant="contained" color="primary" className={styles.viewBtn} onClick={onClickSeeMore}>
        {t(TranslationKey.View)}
      </Button>
    </div>
  )
})
