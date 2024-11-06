import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { formatSnakeCaseString } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './integration-result-item.style'

import { IIntegrationResult, ShopUpdateResult } from '../shop-notification.type'

interface IntegrationResultItemProps {
  type: ShopUpdateResult
  tables: IIntegrationResult[ShopUpdateResult.SUCCESS] | IIntegrationResult[ShopUpdateResult.ERROR]
}

export const IntegrationResultItem: FC<IntegrationResultItemProps> = memo(({ type, tables }) => {
  const { classes: styles, cx } = useStyles()

  const isSuccess = type === ShopUpdateResult.SUCCESS
  const title = t(TranslationKey[isSuccess ? 'Successfully integrated' : 'Failed'])

  return (
    <div>
      <p className={cx(styles.title, isSuccess ? styles.success : styles.error)}>{`${title}:`}</p>

      <ul className={styles.list}>
        {tables?.map((table, index) => {
          const value = typeof table === 'string' ? table : `${table?.table}: `
          const error = typeof table === 'string' ? '' : table?.error

          return (
            <li key={index}>
              <p className={styles.listItemText}>
                {formatSnakeCaseString(value)}
                {error ? <p>{error}</p> : null}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
})
