import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './tariff-info-cell.style'

interface TariffInfoCellProps {
  title?: string
  description?: string
}

export const TariffInfoCell: FC<TariffInfoCellProps> = memo(({ title, description }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.tariffWrapper}>
      <p title={title} className={cx(styles.tariffTitle, styles.tariffDescription)}>
        {title || t(TranslationKey.Missing)}
      </p>
      {description ? (
        <p title={description} className={styles.tariffDescription}>
          {description}
        </p>
      ) : null}
    </div>
  )
})
