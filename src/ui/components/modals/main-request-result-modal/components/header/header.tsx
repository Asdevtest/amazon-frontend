import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { CheckCircleIcon } from '@components/shared/svg-icons'
import { Text } from '@components/shared/text'

import { minsToTime } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './header.styles'

interface HeaderProps {
  isClient: boolean
  asin: string
  executionTime: number
  xid: number
}

export const Header: FC<HeaderProps> = memo(props => {
  const { isClient, asin, executionTime, xid } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.header}>
      <div className={styles.flexContainer}>
        <CheckCircleIcon className={styles.icon} />
        <p className={cx(styles.title, styles.bold)}>
          {t(TranslationKey['Result of the request'])}
          {xid ? ' / ID' : ''}
        </p>
        <Text text={String(xid)} />
      </div>

      <div className={styles.flexContainer}>
        {!isClient ? (
          <p className={styles.text}>
            <span className={styles.textSecond}>{`${t(TranslationKey['Time to complete'])}: `}</span>
            <span className={styles.bold}>{minsToTime(executionTime)}</span>
          </p>
        ) : null}

        <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={asin} textStyles={styles.text} />
      </div>
    </div>
  )
})
